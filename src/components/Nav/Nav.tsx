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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <HogwartsCrest size={44} />
          <span className={styles.brandText}>Hogwarts Quidditch</span>
        </Link>

        {/* Desktop nav links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`${styles.link} ${pathname === href ? styles.active : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop team switcher */}
        <div className={`${styles.teamSwitcher} ${styles.desktopOnly}`} ref={ref}>
          <button
            className={styles.switcherButton}
            onClick={() => setDropdownOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            Jump to team
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdown} role="listbox">
              {TEAMS.map((team) => (
                <div key={team.id} role="option" aria-selected={false} className={styles.dropdownItem}
                  onClick={() => { router.push(`/teams/${team.id}`); setDropdownOpen(false); }}>
                  <span className={styles.teamDot} style={{ background: team.colors.primary }} />
                  {team.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineTop : ''}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineMid : ''}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineBot : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          <p className={styles.mobileTeamLabel}>Jump to team</p>
          {TEAMS.map((team) => (
            <button key={team.id} className={styles.mobileTeamBtn}
              onClick={() => { router.push(`/teams/${team.id}`); setMenuOpen(false); }}>
              <span className={styles.teamDot} style={{ background: team.colors.primary }} />
              {team.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
