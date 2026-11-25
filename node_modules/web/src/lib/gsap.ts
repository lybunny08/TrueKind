"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  CustomEase.create("tk-ease", "0.18,0.71,0.11,1");
}

export const TK_EASE = "tk-ease";
export { gsap, ScrollTrigger, useGSAP };

/**
 * Reveal lines with a fallback timeout: even if requestAnimationFrame is
 * throttled/blocked (headless, background tab), content becomes visible.
 * Uses fromTo so the end state is explicit.
 */
export function revealLines(targets: string | Element | Element[], delay = 0) {
  const els = typeof targets === "string" ? gsap.utils.toArray<HTMLElement>(targets) : (Array.isArray(targets) ? targets : [targets]);
  if (!els.length) return;
  gsap.fromTo(
    els,
    { yPercent: 105 },
    {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.08,
      delay,
      ease: "tk-ease",
      overwrite: true,
    }
  );
  // Safety: force final state after 2.5s in case rAF never ticks
  if (typeof window !== "undefined") {
    window.setTimeout(() => {
      gsap.set(els, { clearProps: "transform" });
    }, 2500);
  }
}