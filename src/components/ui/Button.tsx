import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

/**
 * Button / Primary — reusable across all sections.
 * Matches Figma: black pill, 172×50px, Gabarito Regular 16px white text.
 */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-[family-name:var(--font-gabarito)] text-base font-normal leading-none rounded-[25px] px-[2.4rem] h-[50px] bg-black text-white transition-opacity hover:opacity-75 whitespace-nowrap";

  const classes = `${base} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
