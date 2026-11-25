"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import { gsap, useGSAP, revealLines } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      revealLines(".intro__title .line, .intro__desc .line", 0.1);
      gsap.fromTo(".intro__cta", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.4, ease: "tk-ease" });
      gsap.to(".intro__image .parallax-image", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="intro">
      <div className="intro__text">
        <div className="intro__title text-center text-none">
          <h1 data-split="" className="text-white">
            <span className="masking-text"><span className="line"><span className="font-serif">True</span>  to Oneself</span></span>
            <span className="masking-text"><span className="line">kind to <span className="font-serif">Nature</span></span></span>
          </h1>
        </div>
        <p className="intro__desc maxwidth text-center">
          <span className="masking-text"><span className="line">Unreservedly honest products that truly work, be</span></span>
          <span className="masking-text"><span className="line">kind to skin and the planet – no exceptions!</span></span>
        </p>
      </div>

      <div className="intro__image">
        <div className="overlay-black" />
        <div className="parallax">
          <div className="media-video parallax-image desktop">
            <video autoPlay loop muted playsInline preload="metadata" poster="/hero-poster.jpg">
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="media-video parallax-image mobile">
            <video autoPlay loop muted playsInline preload="metadata" poster="/hero-poster-m.jpg">
              <source src="/hero-m.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <Link href="/products" className="intro__cta">
        <span className="masking-text"><span className="text text-uppercase">Explore All Products</span></span>
        <span className="intro__cta-arrow"><ArrowIcon className="w-5" /></span>
      </Link>
    </section>
  );
}