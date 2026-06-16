"use client";

import { useEffect, useMemo, useRef } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef(0);

  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // pageYOffset === 0 at mount (head script forces scroll to top)
    let elTop = el.getBoundingClientRect().top;
    let elHeight = el.offsetHeight;
    let rafId: number;

    function tick() {
      // rAF fires at 60 fps and window.pageYOffset is always current —
      // unlike scroll events which can be sparse during iOS momentum scroll
      const scrollY = window.pageYOffset;
      const vh = window.innerHeight;
      const entered = scrollY + vh * 0.85 - elTop;
      const total = elHeight + vh * 0.55;
      const next = Math.min(Math.max(entered / total, 0), 1);

      if (next > progressRef.current) {
        progressRef.current = next;
        wordsRef.current.forEach((span, i) => {
          if (!span) return;
          const threshold = i / words.length;
          const wordProgress = Math.min(
            Math.max((next - threshold) / (1 / words.length), 0),
            1
          );
          span.style.opacity = String(wordProgress);
        });
      }

      // Keep looping until fully revealed, then stop
      if (progressRef.current < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function onResize() {
      elTop = el!.getBoundingClientRect().top + window.pageYOffset;
      elHeight = el!.offsetHeight;
    }

    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [words]);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => {
            wordsRef.current[i] = el;
          }}
          style={{ opacity: 0, transition: "opacity 0.25s ease" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
