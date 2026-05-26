"use client";

import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Proč koučování", href: "#proc-koucovani" },
  { label: "Osobní příběh", href: "#osobni-pribeh" },
  { label: "Reference", href: "#reference" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <nav aria-label="Hlavní navigace" className="sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between px-[var(--px)] py-4">

        {/* Logo */}
        <a href="/" aria-label="zvědomit – domů">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Nav Logo.svg"
            alt="zvědomit"
            width={171}
            height={33}
            className="h-[33px] w-auto"
          />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-12 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-base text-muted hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA button */}
        <a
          href="#kontakt"
          className="hidden md:inline-block bg-foreground text-background text-base rounded-full px-10 py-3 hover:opacity-80 transition-opacity duration-150"
        >
          Pojďme začít
        </a>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Zavřít navigační menu" : "Otevřít navigační menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`block h-[2px] w-6 bg-foreground transition-transform duration-200 origin-center ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-foreground transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-foreground transition-transform duration-200 origin-center ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden flex flex-col border-t border-surface px-[var(--px)] py-6 gap-5 bg-background"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-muted hover:text-foreground transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="mt-2 inline-block self-start bg-foreground text-background text-base rounded-full px-10 py-3 hover:opacity-80 transition-opacity duration-150"
            onClick={() => setIsOpen(false)}
          >
            Pojďme začít
          </a>
        </div>
      )}
    </nav>
  );
}
