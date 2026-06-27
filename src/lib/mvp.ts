const STORAGE_KEY = 'hq_mvp';

export function loadMvpVote(matchId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const map = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
    return map[matchId] ?? null;
  } catch {
    return null;
  }
}

export function saveMvpVote(matchId: string, playerId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const map = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
    map[matchId] = playerId;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}
