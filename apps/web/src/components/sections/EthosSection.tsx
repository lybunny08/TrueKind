"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ITEMS = [
  { icon: "/icon-highest-standards.svg", title: "100% Transparent Formulas", subtitle: "Highest Standards.", description: "We formulate to the highest standards of efficacy and safety – using only proven, verified ingredients in bio-compatible bases; and free from over 1800 questionable ingredients" },
  { icon: "/icon-real-results.svg", title: "Only Verified Ingredients", subtitle: "Real Results.", description: "Skin care packed with anti oxidants, skin replenishing and skin restoring agents in stable pH levels that don’t promise miracles, but deliver real results." },
];

export function EthosSection() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, ".ethos__title .line, .ethos__title-2 .line", { start: "top 80%", y: 40, stagger: 0.1 });
  useScrollReveal(root, ".ethos__item", { start: "top 90%", y: 30, stagger: 0.2 });

  return (
    <section ref={root} id="ethos">
      <div className="container">
        <span className="pill mb-4 d-md-none">Ethos</span>
        <div className="ethos__text">
          <h2 className="ethos__title d-none d-md-block">
            <span className="masking-text"><span className="line"> Radical </span></span>
            <span className="masking-text"><span className="line"> Transparency. </span></span>
          </h2>
          <h2 className="ethos__title-2">
            <span className="masking-text"><span className="line"><span className="font-serif text-uppercase">Hide</span></span></span>
            <span className="masking-text"><span className="line"> Nothing. </span></span>
          </h2>
        </div>

        <div className="media-img n-a ethos__image parallax-scroll">
          <Image src="/texture.png" alt="Philosophy" width={494} height={728} />
        </div>

        <Link href="/philosophy" className="ethos__arrow">
          <span className="arrowlong"><ArrowRight /></span>
          <span className="text-[0.8rem] underline">Our Philosophy</span>
        </Link>

        {ITEMS.map((item) => (
          <div key={item.title} className="ethos__item">
            <div className="flex items-center gap-4">
              <Image src={item.icon} alt="" width={45} height={45} className="ethos__icon" />
              <h3>{item.title}</h3>
            </div>
            <p className="mt-4 text-[0.95rem] leading-[1.4] text-gray3"><span className="font-semibold text-[#3b3b3b]">{item.subtitle}</span><br />{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArrowRight() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-45"><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.2" /></svg>;
}