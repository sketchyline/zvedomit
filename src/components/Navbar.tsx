"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Proč koučování", href: "#why-coaching" },
  { label: "Moje cesta", href: "#my-story" },
  { label: "Kontakt", href: "#contact" },
  { label: "Reference", href: "#testimonials" },
];

/**
 * Navbar — fixed, transparent at top of page.
 * After scrolling 60px down: frosted-glass background appears
 * (backdrop-blur + semi-transparent white) with a smooth transition.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed z-50 h-[87px] flex items-center transition-all duration-300"
      style={{
        top: 0,
        left: 0,
        right: 0,
        background: scrolled ? "rgba(255,255,255,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
      aria-label="Hlavní navigace"
    >
      <div
        className="w-full flex items-center justify-between"
        style={{ paddingLeft: "var(--px)", paddingRight: "var(--px)" }}
      >
        {/* Logo */}
        <a href="#" className="shrink-0">
          <Image
            src="/Nav%20Logo.svg"
            alt="zvědomit"
            width={140}
            height={27}
            priority
          />
        </a>

        {/* Nav links — centered */}
        <ul className="hidden lg:flex items-center gap-[52px] list-none absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-[family-name:var(--font-gabarito)] text-base font-normal text-[#3c3c3c] hover:text-black transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button href="#contact" className="hidden lg:inline-flex">
          Pojďme začít
        </Button>
      </div>
    </nav>
  );
}
