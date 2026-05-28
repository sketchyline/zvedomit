import type { ReactNode } from "react";
import { Phone, Mail } from "lucide-react";

const paragraphs = [
  "Je čas na změnu, ať už v práci nebo v osobním životě? Začít s něčím, co delší dobu odkládáte, přitom vlastně ani nevíte proč?",
  "Nebo si jen potřebujete utřídit myšlenky a ujasnit, co je pro vás teď důležité?",
  "Ozvěte se. První setkání je prostorem, kde získáte všechny informace pro rozhodnutí, jestli vám spolupráce se mnou dává smysl.",
];

function ContactItem({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 text-foreground">{icon}</div>
      <div>
        <p className="font-bold text-[18px] leading-tight text-foreground">{label}</p>
        <a
          href={href}
          className="text-[18px] leading-tight text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity duration-150"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="kontakt" className="bg-background py-16 md:py-24 lg:py-32">
      <div className="px-5 lg:px-[var(--px)]">

        {/* Desktop */}
        <div className="hidden lg:flex lg:gap-24">

          {/* Left: label + heading + body */}
          <div className="flex-1">
            <p className="text-[15px] uppercase tracking-[0.15em] font-normal text-foreground mb-4">
              KONTAKT
            </p>
            <h2 className="text-h2 font-medium text-foreground leading-none mb-10">
              Pojďme<br />si promluvit
            </h2>
            <div className="flex flex-col gap-4 max-w-[408px]">
              {paragraphs.map((text, i) => (
                <p key={i} className="text-body text-foreground">{text}</p>
              ))}
            </div>
          </div>

          {/* Right: contact items bottom-aligned */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap gap-x-16 gap-y-8">
                <ContactItem
                  label="TELEFON"
                  value="+420 737 649 994"
                  href="tel:+420737649994"
                  icon={<Phone size={32} />}
                />
                <ContactItem
                  label="EMAIL"
                  value="vojtech.majer@zvedomit.cz"
                  href="mailto:vojtech.majer@zvedomit.cz"
                  icon={<Mail size={32} />}
                />
              </div>
              <ContactItem
                label="WHATSAPP"
                value="Napište mi a domluvíme se"
                href="https://wa.me/420737649994"
                icon={<img src="/whatsapp_icon.svg" alt="" aria-hidden="true" width={32} height={32} />}
              />
            </div>
          </div>

        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <p className="text-[13px] uppercase tracking-[0.15em] font-normal text-foreground mb-3">
            KONTAKT
          </p>
          <h2 className="text-[3rem] font-medium text-foreground leading-tight mb-6">
            Pojďme<br />si promluvit
          </h2>
          <div className="flex flex-col gap-3 mb-10">
            {paragraphs.map((text, i) => (
              <p key={i} className="text-[14px] text-foreground leading-snug">{text}</p>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <ContactItem
              label="TELEFON"
              value="+420 737 649 994"
              href="tel:+420737649994"
              icon={<Phone size={28} />}
            />
            <ContactItem
              label="WHATSAPP"
              value="Napište mi a domluvíme se"
              href="https://wa.me/420737649994"
              icon={<img src="/whatsapp_icon.svg" alt="" aria-hidden="true" width={28} height={28} />}
            />
            <ContactItem
              label="EMAIL"
              value="vojtech.majer@zvedomit.cz"
              href="mailto:vojtech.majer@zvedomit.cz"
              icon={<Mail size={28} />}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
