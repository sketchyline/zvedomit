"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLSpanElement>("span[data-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        const toReveal: number[] = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            toReveal.push(Number((entry.target as HTMLElement).dataset.index));
            observer.unobserve(entry.target);
          }
        });
        if (toReveal.length > 0) {
          setRevealedIndices((prev) => {
            const next = new Set(prev);
            toReveal.forEach((i) => next.add(i));
            return next;
          });
        }
      },
      { threshold: 0 }
    );

    spans.forEach((span) => observer.observe(span));
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-index={i}
          style={{
            opacity: revealedIndices.has(i) ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
