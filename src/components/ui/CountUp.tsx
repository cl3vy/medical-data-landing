"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CountUpProps = {
  value: number;
  prefix?: string;
  className?: string;
  duration?: number;
};

export function CountUp({
  value,
  prefix = "",
  className,
  duration = 1.6,
}: CountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = `${prefix}${value.toLocaleString("en-US")}`;
      return;
    }

    const obj = { n: 0 };
    el.textContent = `${prefix}0`;

    const tween = gsap.to(obj, {
      n: value,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.n).toLocaleString("en-US")}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, prefix, duration]);

  return (
    <p ref={ref} className={className} aria-label={`${prefix}${value.toLocaleString("en-US")}`}>
      {prefix}0
    </p>
  );
}
