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
          style={
            visible
              ? {
                  // @keyframes animation: Safari iOS-safe — keyframe explicitly defines
                  // the "from" state so Safari doesn't need a prior paint at opacity:0.
                  // CSS transition can fail on Safari when opacity+transition change together.
                  animation: `word-reveal 0.4s ease ${i * 30}ms both`,
                }
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
