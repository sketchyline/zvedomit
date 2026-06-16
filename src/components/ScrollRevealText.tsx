"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  // Tracks the highest progress ever reached — words only reveal, never hide.
  // setProgress(next) stays bidirectional so scroll events always trigger a
  // re-render (even when iOS returns slightly stale getBoundingClientRect values),
  // keeping the animation alive during momentum scroll.
  const maxProgress = useRef(0);

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const entered = vh * 0.85 - rect.top;
      const total = rect.height + vh * 0.55;
      const next = Math.min(Math.max(entered / total, 0), 1);
      maxProgress.current = Math.max(maxProgress.current, next);
      setProgress(next); // bidirectional — always triggers re-render
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const p = maxProgress.current; // one-way: words stay visible once revealed
        const threshold = i / words.length;
        const wordProgress = Math.min(Math.max((p - threshold) / (1 / words.length), 0), 1);
        return (
          <span key={i} style={{ opacity: wordProgress }}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
