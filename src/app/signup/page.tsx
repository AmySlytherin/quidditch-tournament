'use client';

import { useState } from 'react';
import styles from './page.module.css';

const HOUSES = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const POSITIONS = ['Keeper', 'Chaser', 'Beater', 'Seeker'];
const YEARS = [1, 2, 3, 4, 5, 6, 7];

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    house: '',
    year: '',
    position: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Something went wrong.');
      }
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.page} container`}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>⚡</div>
          <h1 className={styles.successTitle}>You&apos;re on the list!</h1>
          <p className={styles.successText}>
            Good luck at trials, {form.name}. May your broom fly true.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} container`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>⚡ 2025–2026 Season</p>
        <h1 className={styles.title}>Quidditch Trials</h1>
        <div className="page-divider"><span>✦</span></div>
        <p className={styles.subtitle}>
          Sign up to be considered for a place on your house team. Trials are open to all years.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={styles.input}
            placeholder="e.g. Harry Potter"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            placeholder="owl@hogwarts.ac.uk"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="house">House</label>
            <select
              id="house"
              name="house"
              className={styles.select}
              value={form.house}
              onChange={handleChange}
              required
            >
              <option value="">Select house</option>
              {HOUSES.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              className={styles.select}
              value={form.year}
              onChange={handleChange}
              required
            >
              <option value="">Select year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>Year {y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Preferred Position</label>
          <div className={styles.positionGrid}>
            {POSITIONS.map((pos) => (
              <label key={pos} className={`${styles.positionCard} ${form.position === pos ? styles.positionCardActive : ''}`}>
                <input
                  type="radio"
                  name="position"
                  value={pos}
                  checked={form.position === pos}
                  onChange={handleChange}
                  className={styles.positionRadio}
                />
                <span className={styles.positionIcon}>
                  {pos === 'Keeper' ? '🥅' : pos === 'Chaser' ? '🏆' : pos === 'Beater' ? '🏏' : '🟡'}
                </span>
                <span className={styles.positionName}>{pos}</span>
              </label>
            ))}
          </div>
        </div>

        {status === 'error' && (
          <p className={styles.errorMsg}>{errorMsg}</p>
        )}

        <button
          type="submit"
          className={styles.submit}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting…' : 'Sign Up for Trials'}
        </button>
      </form>
    </div>
  );
}
