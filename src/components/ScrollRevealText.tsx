"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver runs on the compositor thread — fires reliably on iOS
    // even during fast momentum scroll, unlike scroll events which iOS throttles.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            // CSS transition runs on GPU compositor — smooth regardless of JS thread.
            // Stagger delay creates the one-word-at-a-time cascade effect.
            transition: visible ? `opacity 0.35s ease ${i * 30}ms` : "none",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
