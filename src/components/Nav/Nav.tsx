'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { TEAMS } from '@/data';
import HogwartsCrest from '@/components/HogwartsCrest/HogwartsCrest';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Standings' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/teams', label: 'Teams' },
  { href: '/rosters', label: 'Rosters' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <HogwartsCrest size={52} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem',
            fontWeight: 700,
            color: 'var(--color-accent)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            textShadow: '0 0 24px rgba(212,168,67,0.5)',
            lineHeight: 1,
          }}>
            Hogwarts Quidditch
          </span>
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                style={{ fontSize: '0.8rem' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.teamSwitcher} ref={ref}>
          <button
            className={styles.switcherButton}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            Jump to team
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div className={styles.dropdown} role="listbox">
              {TEAMS.map((team) => (
                <div
                  key={team.id}
                  role="option"
                  aria-selected={false}
                  className={styles.dropdownItem}
                  onClick={() => {
                    router.push(`/teams/${team.id}`);
                    setOpen(false);
                  }}
                >
                  <span
                    className={styles.teamDot}
                    style={{ background: team.colors.primary }}
                  />
                  {team.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
