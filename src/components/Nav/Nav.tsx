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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <HogwartsCrest size={44} />
          <span className={styles.brandText}>Hogwarts Quidditch</span>
        </Link>

        {/* Hamburger + dropdown anchored to right side */}
        <div className={styles.menuWrap} ref={menuRef}>
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

          {menuOpen && (
            <div className={styles.dropdown}>
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href}
                  className={`${styles.dropdownLink} ${pathname === href ? styles.dropdownLinkActive : ''}`}>
                  {label}
                </Link>
              ))}
              <div className={styles.dropdownDivider} />
              <p className={styles.dropdownTeamLabel}>Jump to team</p>
              {TEAMS.map((team) => (
                <button key={team.id} className={styles.dropdownTeamBtn}
                  onClick={() => router.push(`/teams/${team.id}`)}>
                  <span className={styles.teamDot} style={{ background: team.colors.primary }} />
                  {team.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
