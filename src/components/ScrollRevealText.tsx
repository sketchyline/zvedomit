"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start revealing when element top reaches 85% of viewport height
      // Finish when element bottom clears 30% of viewport height
      const entered = vh * 0.85 - rect.top;
      const total = rect.height + vh * 0.55;
      setProgress(Math.min(Math.max(entered / total, 0), 1));
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
        // Each word reveals as progress crosses its threshold
        const threshold = i / words.length;
        const wordProgress = Math.min(Math.max((progress - threshold) / (1 / words.length), 0), 1);
        return (
          <span
            key={i}
            style={{ opacity: wordProgress }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
