import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Icon } from '../ui';

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Projects', href: 'https://github.com/cherikakaushal?tab=repositories' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '/Cherika_Kaushal_CV.pdf' },
  { label: 'Contact', href: '#contact' },
];

type SiteNavProps = {
  dark: boolean;
  onThemeChange: () => void;
};

export function SiteNav({ dark, onThemeChange }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a className="site-logo" href="#top" aria-label="Cherika Kaushal, home">CK.</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="theme-control" type="button" onClick={onThemeChange} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
            <Icon icon={dark ? Sun : Moon} size={16} />
          </button>
          <button className="menu-control" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>
            <Icon icon={open ? X : Menu} size={18} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map((link) => <a href={link.href} key={link.label} onClick={() => setOpen(false)}>{link.label}</a>)}
        </nav>
      )}
    </header>
  );
}
