"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [revealed, setRevealed] = useState<ReadonlySet<number>>(new Set());
  const words = text.split(" ");

  useEffect(() => {
    const spans = spanRefs.current.filter((s): s is HTMLSpanElement => s !== null);
    if (!spans.length) return;

    // One observer watching every word span individually.
    // When each word enters the viewport, it animates in independently.
    const observer = new IntersectionObserver(
      (entries) => {
        const toReveal: number[] = [];
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = spans.indexOf(entry.target as HTMLSpanElement);
          if (idx >= 0) toReveal.push(idx);
          observer.unobserve(entry.target);
        });
        if (toReveal.length > 0) {
          setRevealed((prev) => {
            const next = new Set(prev);
            toReveal.forEach((i) => next.add(i));
            return next;
          });
        }
      },
      { threshold: 0.1 }
    );

    spans.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <p className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => { spanRefs.current[i] = el; }}
          style={
            revealed.has(i)
              ? { animation: "word-reveal 0.4s ease both" }
              : { opacity: 0 }
          }
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
