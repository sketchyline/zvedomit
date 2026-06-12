"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const words = text.split(" ");

  useEffect(() => {
    function update() {
      if (!pRef.current) return;
      const rect = pRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const entered = vh * 0.85 - rect.top;
      const total = rect.height + vh * 0.55;
      const next = Math.min(Math.max(entered / total, 0), 1);

      // progress nikdy neklesá — slova zůstanou viditelná při scrollu nahoru
      if (next <= progressRef.current) return;
      progressRef.current = next;

      const count = spansRef.current.length;
      spansRef.current.forEach((span, i) => {
        const threshold = i / count;
        const wordProgress = Math.min(Math.max((next - threshold) / (1 / count), 0), 1);
        span.style.opacity = String(wordProgress);
      });
    }

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <p ref={pRef} className={className} style={{ willChange: "contents" }}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={el => { if (el) spansRef.current[i] = el; }}
          style={{ opacity: 0 }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
