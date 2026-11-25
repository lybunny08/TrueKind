"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/* Renders the original-style preloader: a big Editorial New number counter,
 * spinner, then two dark curtains split to reveal the site. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onDone();
    };

    // Animate counter 0 -> 100 with GSAP
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.floor(counter.v)),
    });

    const tl = gsap.timeline({ delay: 2.2, onComplete: finish });
    tl.to(el.querySelector(".preloader__inner"), { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" })
      .to(el.querySelectorAll(".bg__left, .bg__right"), { scaleY: 0, duration: 1, transformOrigin: "top", ease: "power3.inOut", stagger: 0.05 }, "-=0.2")
      .to(el, { autoAlpha: 0, duration: 0.1 });

    // Safety fallback: hide after 4s even if rAF is throttled (headless/background)
    const fallback = window.setTimeout(() => {
      tween.kill();
      tl.kill();
      if (el) el.style.display = "none";
      finish();
    }, 4000);

    return () => {
      window.clearTimeout(fallback);
      tween.kill();
      tl.kill();
    };
  }, [onDone]);

  return (
    <div ref={root} className="preloader">
      <div className="preloader__inner">
        <div className="text">{String(count).padStart(2, "0")}</div>
        <div className="loading"><span className="spinner" /></div>
      </div>
      <div className="bg"><div className="bg__left" /><div className="bg__right" /></div>
    </div>
  );
}