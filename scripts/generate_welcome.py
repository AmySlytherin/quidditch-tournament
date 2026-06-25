"""
Generate welcome.mp3 chime sequence for the Quidditch landing page.

Edit SEQUENCE and MODE, then run:
    python3 scripts/generate_welcome.py

MODE options:
    'guitar'      — electric guitar, driven harmonics, fast attack
    'bells'       — bell/chime, inharmonic partials, exponential decay
    'harpsichord' — plucked harpsichord, bright attack, quick decay
    'celesta'     — celesta/glockenspiel, bright metallic, clean overtones
    'all'         — renders all four

SEQUENCE format:  (note, duration)  or  (note, duration, gap_after)
    gap_after overrides the global GAP for just that note — use it for breaths/pauses.

Note names: C4, D4, E4, F4, F#4, G4, A4, A#4, B4  (and other octaves)
"""

import wave, struct, math, subprocess, os, random

SAMPLE_RATE = 44100

# ── Edit these ───────────────────────────────────────────────────────────────
MODE = 'all'   # 'guitar' | 'bells' | 'harpsichord' | 'celesta' | 'all'

GAP = 0.06  # default silence between notes (seconds)

#  3/4 feel: B E G | F# E . | B A (breath) F#
#  7th note (A) lands heavier with longer duration
#  breath before final F# via gap_after on A
SEQUENCE = [
    # (note,   duration,  gap_after)  ← gap_after is optional
    ('B4',  0.42),
    ('E4',  0.38),
    ('G4',  0.38),
    ('F#4', 0.44),
    ('E4',  0.80),          # held — end of phrase 1
    ('B4',  0.40),
    ('A4',  0.62, 0.22),    # lands heavy; 0.22s breath before the final note
    ('F#4', 1.10),          # final note, let it ring
]
# ─────────────────────────────────────────────────────────────────────────────

NOTE_FREQS = {
    'C3':  130.81, 'D3':  146.83, 'E3':  164.81, 'F3':  174.61,
    'F#3': 185.00, 'G3':  196.00, 'A3':  220.00, 'B3':  246.94,
    'C4':  261.63, 'C#4': 277.18, 'D4':  293.66, 'D#4': 311.13,
    'E4':  329.63, 'F4':  349.23, 'F#4': 369.99, 'G4':  392.00,
    'G#4': 415.30, 'A4':  440.00, 'A#4': 466.16, 'B4':  493.88,
    'C5':  523.25, 'D5':  587.33, 'E5':  659.25, 'F5':  698.46,
    'F#5': 739.99, 'G5':  783.99, 'A5':  880.00, 'B5':  987.77,
}


def guitar(freq: float, duration: float) -> list[float]:
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        attack = min(t / 0.005, 1.0)
        decay = math.exp(-3.0 * t / duration)
        env = attack * decay
        val = (
            0.50 * math.sin(2 * math.pi * freq * t) +
            0.30 * math.sin(2 * math.pi * freq * 2 * t) +
            0.12 * math.sin(2 * math.pi * freq * 3 * t) +
            0.05 * math.sin(2 * math.pi * freq * 4 * t) +
            0.02 * math.sin(2 * math.pi * freq * 5 * t)
        )
        val = math.tanh(val * 1.8) / math.tanh(1.8)
        samples.append(val * env)
    return samples


def bells(freq: float, duration: float) -> list[float]:
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-4.5 * t / duration)
        val = (
            0.60 * math.sin(2 * math.pi * freq * t) +
            0.25 * math.sin(2 * math.pi * freq * 2.756 * t) +
            0.10 * math.sin(2 * math.pi * freq * 5.404 * t) +
            0.05 * math.sin(2 * math.pi * freq * 3.000 * t)
        )
        samples.append(val * env)
    return samples


def harpsichord(freq: float, duration: float) -> list[float]:
    buf_len = int(SAMPLE_RATE / freq)
    buf = [random.uniform(-1, 1) for _ in range(buf_len)]
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = min(t / 0.002, 1.0) * math.exp(-5.5 * t / duration)
        out = buf[i % buf_len]
        buf[i % buf_len] = 0.5 * (buf[i % buf_len] + buf[(i + 1) % buf_len])
        samples.append(out * env)
    return samples


def celesta(freq: float, duration: float) -> list[float]:
    """
    Celesta / glockenspiel: struck metal bar.
    Clean fundamental + two bright overtones, very fast hammer attack,
    slow resonant decay — like a music-box or celesta key.
    """
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Percussive transient on the strike, then long resonant tail
        attack = min(t / 0.003, 1.0)
        decay = math.exp(-2.8 * t / duration)
        env = attack * decay
        # Fundamental + two near-harmonic overtones typical of struck bars
        val = (
            0.65 * math.sin(2 * math.pi * freq * t) +
            0.22 * math.sin(2 * math.pi * freq * 2.93 * t) +  # bar 2nd mode
            0.10 * math.sin(2 * math.pi * freq * 5.74 * t) +  # bar 3rd mode
            0.03 * math.sin(2 * math.pi * freq * 2.00 * t)    # faint octave
        )
        samples.append(val * env)
    return samples


MODES = {
    'guitar':      guitar,
    'bells':       bells,
    'harpsichord': harpsichord,
    'celesta':     celesta,
}


def silence(duration: float) -> list[float]:
    return [0.0] * int(SAMPLE_RATE * duration)


def render(mode: str) -> list[float]:
    if mode not in MODES:
        raise ValueError(f"Unknown mode {mode!r}. Choose from: {list(MODES)}")
    synth = MODES[mode]
    all_samples: list[float] = []
    for entry in SEQUENCE:
        note, dur = entry[0], entry[1]
        gap_after = entry[2] if len(entry) > 2 else GAP
        if note not in NOTE_FREQS:
            raise ValueError(f"Unknown note: {note!r}. Add it to NOTE_FREQS.")
        all_samples += synth(NOTE_FREQS[note], dur)
        all_samples += silence(gap_after)
    peak = max(abs(s) for s in all_samples)
    return [s / peak * 0.9 for s in all_samples]


def write_mp3(samples: list[float], mp3_path: str) -> None:
    wav_path = mp3_path.replace('.mp3', '.wav')
    with wave.open(wav_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        for s in samples:
            wf.writeframes(struct.pack('<h', int(s * 32767)))
    subprocess.run(['afconvert', '-f', 'mp4f', '-d', 'aac', wav_path, mp3_path], check=True)
    os.remove(wav_path)


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public = os.path.join(script_dir, '..', 'public')

    modes_to_render = list(MODES.keys()) if MODE == 'all' else [MODE]

    for mode in modes_to_render:
        samples = render(mode)
        mp3_path = os.path.join(public, f'welcome-{mode}.mp3')
        write_mp3(samples, mp3_path)
        print(f"[{mode}] Written: {os.path.normpath(mp3_path)}")


if __name__ == '__main__':
    main()
