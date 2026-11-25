import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/portfolio';

const NAV_ITEMS = [
  { label: 'Index', href: '#index' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F5F4EF]/95 backdrop-blur-sm border-b border-[#DAD9D2]'
          : 'bg-[#F5F4EF]/90 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-14 md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line wordmark */}
        <a
          href="#index"
          className="font-display text-lg font-bold tracking-tight text-[#171717] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
          aria-label="Muhammad Yuhal Fata — Home"
        >
          {SITE_CONFIG.shortMark}
        </a>

        {/* Zone 2: Primary navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#777771]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="editorial-underline hover:text-[#171717] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Availability indicator / primary action */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="#contact"
            className="font-mono text-xs tracking-tight text-[#171717] bg-[#B7F36B] hover:bg-[#a6e658] px-3.5 py-2 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
          >
            Open to interesting projects
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-[#F5F4EF] border-b border-[#DAD9D2] px-6 py-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-3 text-base font-medium text-[#171717] border-b border-[#DAD9D2]/60 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 pt-4 border-t border-[#DAD9D2] flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#777771]">
              {SITE_CONFIG.availability}
            </span>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="font-mono text-xs text-[#171717] bg-[#B7F36B] px-3 py-2 whitespace-nowrap shrink-0"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
