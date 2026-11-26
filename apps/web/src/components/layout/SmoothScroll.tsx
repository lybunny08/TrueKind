"use client";

import "lenis/dist/lenis.css";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useCart } from "@/contexts/cart";

function SmoothScrollEffects() {
  const lenis = useLenis();
  const pathname = usePathname();
  const { isOpen } = useCart();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (!lenis) return;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isOpen]);

  useEffect(() => {
    if (!lenis || previousPath.current === pathname) return;
    previousPath.current = pathname;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, respectReducedMotion: true }}>
      <SmoothScrollEffects />
      {children}
    </ReactLenis>
  );
}
