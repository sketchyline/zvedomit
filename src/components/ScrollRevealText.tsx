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
    let rafId: number | null = null;

    function tick() {
      const el = pRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = Math.min(Math.max((vh * 0.85 - rect.top) / (rect.height + vh * 0.55), 0), 1);

      if (next > progressRef.current) {
        progressRef.current = next;
        const count = spansRef.current.length;
        spansRef.current.forEach((span, i) => {
          const wp = Math.min(Math.max((next - i / count) / (1 / count), 0), 1);
          span.style.opacity = String(wp);
        });
      }

      if (progressRef.current < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
        observer.disconnect();
      }
    }

    // IntersectionObserver spustí rAF smyčku — nezávisle na scroll eventech.
    // Na iOS Safari scroll eventy nefirují během momentum scrollu → smyčka
    // čte getBoundingClientRect() každý frame a animace je vždy plynulá.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rafId === null) {
          rafId = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "0px 0px -5% 0px" }
    );

    if (pRef.current) observer.observe(pRef.current);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
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
