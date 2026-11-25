"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Reliable scroll reveal: sets the initial hidden state, then animates once
 * when the trigger enters. Handles React StrictMode double-invocation by
 * resetting state on each effect run.
 */
export function useScrollReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  selector: string,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  }
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const targets = container.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const y = options?.y ?? 50;
    const stagger = options?.stagger ?? 0.12;
    const duration = options?.duration ?? 0.9;

    let played = false;
    gsap.set(targets, { autoAlpha: 0, y });

    const play = () => {
      if (played) return;
      played = true;
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        stagger,
        duration,
        ease: "tk-ease",
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: options?.start ?? "top 80%",
      once: true,
      onEnter: play,
    });

    // If already in view on load, play immediately
    if (trigger.progress > 0 || trigger.isActive) play();

    // Safety fallback: reveal after 3s even if rAF is throttled
    const safety = window.setTimeout(() => {
      if (!played) {
        played = true;
        gsap.set(targets, { autoAlpha: 1, y: 0 });
      }
    }, 3000);

    return () => {
      window.clearTimeout(safety);
      trigger.kill();
      gsap.set(targets, { clearProps: "opacity,visibility,transform" });
    };
  }, [containerRef, selector, options?.y, options?.stagger, options?.duration, options?.start]);
}