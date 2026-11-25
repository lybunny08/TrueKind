"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ITEMS = [
  { title: "Clean, Beyond Reproach", icon: "/icon-clean-beyond-reproach.svg", description: "Truly clean with only verified ingredients; and free from over 1800 questionable ingredients. Because what you put on your skin matters." },
  { title: "Radical Transparency", icon: "/icon-radical-transparency.svg", description: "No black boxes, nothing to hide, we disclose our full formulas, so you will never have to guess what's in it and how much." },
  { title: "Potent & Multi Tasking", icon: "/icon-potent-multi-tasking.svg", description: "Our formulas are chock-a-block with actives, anti oxidants, skin restoring agents backed by dermal science that aim to deliver real results." },
  { title: "Conscious & Responsible", icon: "/icon-conscious-responsible.svg", description: "Peta Certified Vegan and Cruelty Free. Our products are always housed in responsible packaging and made sustainably." },
];

export function BrandCommitments() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, ".ingredients__item", { start: "top 90%", y: 40, stagger: 0.12 });

  return (
    <section ref={root} id="ingredients">
      <div className="container">
        <div className="ingredients__text">
          <h2 className="ingredients__title">
            <span className="masking-text"><span className="line" style={{ textAlign: "start" }}>Clean, Conscious,</span></span>
            <span className="masking-text"><span className="line" style={{ textAlign: "start" }}>Performance</span></span>
            <span className="masking-text"><span className="line" style={{ textAlign: "start" }}><span className="ingredients__title-serif font-serif text-underline-border">skincare.</span></span></span>
          </h2>
          <p className="ingredients__desc maxwidth">Unreservedly honest products that truly work, be kind to skin and the planet – no exceptions!</p>
          <div className="ingredients__bgmobile" />
          <svg className="ingredients__arrow" viewBox="0 0 122 195" width="122" height="195" fill="none" aria-hidden="true">
            <path d="M62 194C62 194 61 188 61 188M61 188L61 193M61 188L57 193" stroke="#3b3b3b" strokeWidth="1" />
          </svg>
        </div>

        <div className="ingredients__wrapper">
          <div className="ingredients__image-wrapper">
            <Image src="/ingredients-clip.jpg" alt="" className="ingredients__image" fill sizes="70vw" />
          </div>
          <div className="ingredients__image-1"><Image src="/leaf.png" alt="" width={133} height={130} /></div>
          <div className="ingredients__image-2"><Image src="/empress.png" alt="" width={133} height={135} /></div>

          <div className="ingredients__firstrow">
            <CommitmentCard item={ITEMS[0]} />
            <CommitmentCard item={ITEMS[1]} />
          </div>
          <div className="ingredients__secondrow">
            <CommitmentCard item={ITEMS[2]} />
            <CommitmentCard item={ITEMS[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CommitmentCard({ item }: { item: (typeof ITEMS)[number] }) {
  return (
    <div className="ingredients__item">
      <div className="ingredients__item-icon"><Image src={item.icon} alt="" width={64} height={64} /></div>
      <h3 className="ingredients__item-title">{item.title}</h3>
      <p className="ingredients__item-desc">{item.description}</p>
    </div>
  );
}