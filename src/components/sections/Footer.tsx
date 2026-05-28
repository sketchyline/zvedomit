import Image from "next/image";

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
  return (
    <footer>
      {/* Photo + watermark area */}
      <div className="relative bg-background overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden="true"
          src="/background_logo.svg"
          alt=""
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[992px] max-w-none pointer-events-none select-none"
        />
        <div className="relative z-10 max-w-[642px] mx-auto">
          <Image
            src="/footer_vojta 1.png"
            alt="Vojtěch Majer"
            width={642}
            height={766}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Dark section — bez horního marginu (fotka přisazená), boky + spodek: 14px mobil / 37px desktop */}
      <div className="mx-[14px] mb-[14px] lg:mx-[37px] lg:mb-[37px] bg-foreground rounded-[24px] lg:rounded-[45px]">

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
            <a href="#" className="text-[18px] text-white font-normal">Facebook</a>
            <a href="#" className="text-[18px] text-white font-normal">LinkedIn</a>
          </div>

          <p className="mt-[104px] text-white text-[2.5rem] font-normal leading-tight">
            Nejlepší rada je totiž ta, kterou si dáte sami.
          </p>

          <div className="mt-[114px]">
            <div className="flex gap-4">
              <a href="#" className="text-[13px] text-white underline">Podmínky používání</a>
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
                <a href="#" className="text-[18px] text-white font-normal">Facebook</a>
                <a href="#" className="text-[18px] text-white font-normal">LinkedIn</a>
              </div>
            </div>
          </div>

          <p className="mt-12 text-white text-[clamp(2.5rem,3.5vw,5rem)] font-normal leading-tight">
            Nejlepší rada je totiž ta, kterou si dáte sami.
          </p>

          <div className="mt-[130px] flex items-center justify-between">
            <p className="text-[14px] text-white">© 2026 Zvědomit. Všechna práva vyhrazena.</p>
            <div className="flex gap-4">
              <a href="#" className="text-[14px] text-white underline">Podmínky používání</a>
              <a href="#" className="text-[14px] text-white underline">Nastavení cookies</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
