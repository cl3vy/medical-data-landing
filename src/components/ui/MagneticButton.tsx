"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagneticButtonProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
  strength?: number;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  children,
  href,
  className,
  strength = 0.35,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={target}
      rel={rel}
    >
      {children}
    </motion.a>
  );
}
