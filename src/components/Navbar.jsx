import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a className="navbar__logo" href="#hero" onClick={(e) => handleNav(e, '#hero')}>
        mitchou10
      </a>

      <button
        className={`navbar__burger${menuOpen ? ' open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href} onClick={(e) => handleNav(e, href)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
