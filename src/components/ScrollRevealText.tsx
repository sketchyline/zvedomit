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

    // Žádný rAF throttle — přímé volání na každý scroll event.
    // Na mobilu Safari se eventy spouštějí v burst-ech; throttle by způsoboval
    // skokové odhalení více slov naráz místo plynulého postupu.
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p ref={pRef} className={className}>
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
