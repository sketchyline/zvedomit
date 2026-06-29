"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Úvod", href: "#", bold: true },
  { label: "Proč koučování", href: "#proc-koucovani", bold: false },
  { label: "Osobní příběh", href: "#osobni-pribeh", bold: false },
  { label: "Reference", href: "#reference", bold: false },
  { label: "Kontakt", href: "#kontakt", bold: false },
];

function FooterLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/footer-logo.svg"
      alt="Zvědomit"
      width={271}
      height={52}
      className={className}
      unoptimized
    />
  );
}

export function Footer() {
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setPhotoVisible(true);
      return;
    }
    const el = photoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhotoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 150px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer>
      {/* Photo + watermark area */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/background_logo.svg"
          alt=""
          className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[992px] max-w-none pointer-events-none select-none"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 381 293"
          xmlns="http://www.w3.org/2000/svg"
          className="lg:hidden absolute top-0 left-0 w-full h-auto pointer-events-none select-none"
        >
          <path
            d="M150.863 289.274L54.1712 201.394C51.889 199.23 48.0454 200.913 48.0454 204.038V231.448C48.0454 236.497 43.9615 240.585 38.9168 240.585H9.12863C4.08386 240.585 0 236.497 0 231.448V108.104C0 100.169 9.48897 95.9616 15.3745 101.251L154.226 227.241C156.388 229.284 159.871 229.044 161.793 226.88L365.025 3.03233C370.67 -3.21905 381 0.868393 381 9.1635V148.617C381 153.667 376.916 157.754 371.871 157.754H342.203C337.159 157.754 333.075 153.667 333.075 148.617V120.847C333.075 117 328.27 115.076 325.748 117.962L171.162 288.312C165.877 294.203 156.748 294.563 150.983 289.274H150.863Z"
            fill="black"
            fillOpacity={0.18}
          />
        </svg>

        {/* Fotka — vyjíždí zpoza tmavé karty když footer vstoupí do viewportu */}
        <div
          ref={photoRef}
          className="relative z-10 max-w-[642px] mx-auto"
          style={{
            transform: photoVisible ? "translateY(0)" : "translateY(300px)",
            transition: reducedMotion ? "none" : "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Image
            src="/footer_vojta 1.png"
            alt="Vojtěch Majer"
            width={642}
            height={766}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Dark section — -mt-[50px] překrývá jen okraj foto oblasti, ruce jsou viditelné */}
      <div className="relative z-10 -mt-[50px] mx-[14px] mb-[14px] lg:mx-[37px] lg:mb-[37px] bg-foreground rounded-[24px] lg:rounded-[45px]">

        {/* ── Mobile layout ── */}
        <div className="lg:hidden px-5 pt-[41px] pb-10">
          <div className="flex justify-center">
            <FooterLogo className="h-[52px] w-auto" />
          </div>

          <nav className="mt-14 flex flex-col gap-5">
            {navLinks.map(({ label, href, bold }) => (
              <a
                key={label}
                href={href}
                className={`text-[18px] text-white ${bold ? "font-bold" : "font-normal"}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-9 flex flex-col gap-5">
            <p className="font-bold text-[18px] text-white">Sledujte mě</p>
            <a href="https://www.linkedin.com/in/vojtech-majer/" target="_blank" rel="noopener noreferrer" className="text-[18px] text-white font-normal">LinkedIn</a>
          </div>

          <p className="mt-[104px] text-white text-[2.5rem] font-normal leading-tight">
            Nejlepší rada je totiž ta, kterou si dáte sami.
          </p>

          <div className="mt-[114px]">
            <div className="flex gap-4">
              <a href="#" className="text-[13px] text-white underline">Nastavení cookies</a>
            </div>
            <p className="mt-3 text-[13px] text-white">© 2026 Zvědomit. Všechna práva vyhrazena.</p>
          </div>
        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden lg:flex lg:flex-col px-[var(--px)] pt-[66px] pb-[37px]">
          <div className="flex items-start justify-between">
            <FooterLogo className="h-[52px] w-auto" />
            <div className="flex gap-20 items-start">
              <nav className="flex flex-col gap-5">
                {navLinks.map(({ label, href, bold }) => (
                  <a
                    key={label}
                    href={href}
                    className={`text-[18px] text-white ${bold ? "font-bold" : "font-normal"}`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-5">
                <p className="font-bold text-[18px] text-white">Sledujte mě</p>
                <a href="https://www.linkedin.com/in/vojtech-majer/" target="_blank" rel="noopener noreferrer" className="text-[18px] text-white font-normal">LinkedIn</a>
              </div>
            </div>
          </div>

          <p className="mt-12 text-white text-[clamp(1.5rem,3.5vw,4.5rem)] font-normal leading-tight whitespace-nowrap text-center">
            Nejlepší rada je totiž ta, kterou si dáte sami.
          </p>

          <div className="mt-[130px] flex items-center justify-between">
            <p className="text-[14px] text-white">© 2026 Zvědomit. Všechna práva vyhrazena.</p>
            <div className="flex gap-4">
              <a href="#" className="text-[14px] text-white underline">Nastavení cookies</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
