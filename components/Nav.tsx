import { useEffect, useState } from 'react';
import type { Theme } from '../pages';

type NavProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const links = [
  { label: 'research', href: '#research' },
  { label: 'work', href: '#work' },
  { label: 'experience', href: '#about' },
  { label: 'résumé', href: '/Cherika_Kaushal_CV.pdf' },
];

export default function Nav({ theme, toggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`nav w3-bar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo w3-bar-item" aria-label="Cherika Kaushal home">
          ck.
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            type="button"
          >
            <span className="theme-btn-dot" />
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} type="button">
          x
        </button>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
