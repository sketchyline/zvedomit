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

    // pageYOffset === 0 at mount (head script forces scroll to top on load)
    // so getBoundingClientRect().top equals the document-relative position
    let elTop = el.getBoundingClientRect().top;
    let elHeight = el.offsetHeight;

    function update() {
      // window.pageYOffset is always current on iOS — unlike getBoundingClientRect()
      // which can return stale values during momentum scroll after finger lift
      const scrollY = window.pageYOffset;
      const vh = window.innerHeight;
      const entered = scrollY + vh * 0.85 - elTop;
      const total = elHeight + vh * 0.55;
      const next = Math.min(Math.max(entered / total, 0), 1);

      if (next <= progressRef.current) return;
      progressRef.current = next;

      // Direct DOM update — no React re-render, no batching delay
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

    function onResize() {
      elTop = el!.getBoundingClientRect().top + window.pageYOffset;
      elHeight = el!.offsetHeight;
      update();
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
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
          style={{ opacity: 0 }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
