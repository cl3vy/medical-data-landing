"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/lib/examples";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[80] bg-[var(--color-bg)] border-b-2 border-[var(--color-divider)] transition-[box-shadow] duration-200"
        style={{ boxShadow: scrolled ? "var(--shadow-md)" : "none" }}
      >
        <div className="content-wrap flex items-center gap-6 py-3 min-h-[calc(var(--header-h)-2px)]">
          <a
            href="#top"
            className="mr-auto font-extrabold text-[19px] tracking-[-0.02em] no-underline text-[var(--color-text)]"
          >
            SIGIL
          </a>
          <nav
            data-desktop-only
            aria-label="Sections"
            className="flex items-center gap-6"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>
          <a
            data-desktop-only
            href="#inquire"
            className="btn btn-primary no-underline"
          >
            Free data appraisal
          </a>
          <button
            data-mobile-only
            type="button"
            className="btn btn-secondary"
            style={{ display: "none" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[79] bg-[var(--color-bg)] px-[var(--gutter)] pt-[calc(var(--header-h)+24px)] pb-[var(--space-group)] flex flex-col"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                className="font-extrabold text-[28px] text-[var(--color-text)] no-underline py-4 border-b-2 border-[var(--color-divider)]"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#inquire"
              onClick={closeMenu}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
              className="btn btn-primary btn-block mt-[var(--space-block)] py-4"
            >
              Free data appraisal
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
