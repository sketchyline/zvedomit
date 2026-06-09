"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const navLinks = [
  { label: "Proč koučování", href: "#proc-koucovani" },
  { label: "Osobní příběh", href: "#osobni-pribeh" },
  { label: "Reference", href: "#reference" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = () => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  };

  // Esc key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus first link on open
  useEffect(() => {
    if (isOpen) firstLinkRef.current?.focus();
  }, [isOpen]);

  return (
    <nav aria-label="Hlavní navigace" className="sticky top-0 z-50">
      {/*
        Frosted glass background je záměrně oddělený do potomka — ne přímo na <nav>.
        backdrop-filter na elementu vytvoří v Chromu/Safarim nový containing block
        pro position:fixed potomky, což by zlomilo fullscreen overlay.
      */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md pointer-events-none" aria-hidden="true" />

      {/* Nav bar content */}
      <div className="relative flex items-center justify-between px-5 md:px-[var(--px)] py-4">

        {/* Logo */}
        <a href="/" aria-label="zvědomit – domů">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Nav Logo.svg"
            alt="zvědomit"
            width={171}
            height={33}
            className="h-[26px] w-auto md:h-[33px]"
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
          className={`md:hidden p-2 text-foreground transition-opacity duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hamburger_menu_icon.svg" alt="" width={24} height={24} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile fullscreen overlay — fixed inset-0 funguje správně, protože <nav> nemá backdrop-filter */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigační menu"
        className={`md:hidden fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo — stejná pozice jako v nav baru */}
        <a href="/" aria-label="zvědomit – domů" className="absolute top-4 left-5 p-0" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Nav Logo.svg"
            alt="zvědomit"
            width={171}
            height={33}
            className="h-[26px] w-auto"
          />
        </a>

        {/* Zavřít */}
        <button
          onClick={close}
          aria-label="Zavřít menu"
          className="absolute top-4 right-5 p-2 text-foreground"
        >
          <X size={24} />
        </button>

        {/* Nav links */}
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            ref={i === 0 ? firstLinkRef : undefined}
            href={link.href}
            className="text-h3 font-medium text-foreground hover:text-muted transition-colors duration-150"
            onClick={close}
          >
            {link.label}
          </a>
        ))}

        <a
          href="#kontakt"
          className="mt-4 bg-foreground text-background text-base rounded-full px-10 py-3 hover:opacity-80 transition-opacity duration-150"
          onClick={close}
        >
          Pojďme začít
        </a>
      </div>
    </nav>
  );
}
