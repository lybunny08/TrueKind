"use client";

import Link from "next/link";
import { MediaImg } from "@/components/ui/MediaImg";

export function PromotionalSection() {
  return (
    <section id="quiz">
      <div className="half__grid half__grid-1">
        <div className="half__grid-content">
          {/* Curved arrow SVG */}
          <svg width="639" height="384" viewBox="0 0 639 384" fill="none" className="quiz-arrow" aria-hidden="true">
            <path d="M638.076 321.851C638.377 321.9 638.58 322.184 638.531 322.485L637.721 327.385C637.672 327.685 637.388 327.889 637.087 327.839C636.786 327.79 636.583 327.506 636.632 327.205L637.352 322.849L632.996 322.13C632.696 322.08 632.492 321.796 632.542 321.496C632.592 321.195 632.876 320.992 633.176 321.041L638.076 321.851ZM-87.3542 0.407563C-107.563 75.761 -86.4598 143.569 -39.8796 200.418C6.71312 257.283 78.7928 303.173 160.472 334.605C242.146 366.035 333.378 382.993 418.236 382.025C503.101 381.058 581.536 362.162 637.665 321.946L638.308 322.844C581.929 363.238 503.244 382.16 418.248 383.129C333.245 384.098 241.874 367.113 160.076 335.635C78.2819 304.159 6.01781 258.176 -40.7333 201.118C-87.497 144.044 -108.737 75.8778 -88.4201 0.121688L-87.3542 0.407563Z" fill="#353535" />
          </svg>

          {/* Quality image */}
          <MediaImg src="/175A3642-3-741.jpg" alt="" sizes="(max-width:768px) 60vw, 384px" width={134} height={175} />

          <div className="half__grid-text">
            <div className="pill">QUALITY</div>
            <h3 className="half__grid-title">Only proven Ingredients, quality over quantity always!</h3>
            <p className="text-gray2">Its about what we don&apos;t put in. Squeaky clean formulas with over 1500 Negative Ingredients.</p>
          </div>

          {/* Offer text overlay on image */}
          <div className="offer__text">
            <h3 className="title font-heading">
              <span className="masking-text"><span className="line">Exciting</span></span>
              <span className="masking-text"><span className="line">offers <i>awaits</i></span></span>
            </h3>
            <p className="description">Shop now to get a chance to win 2 extra products. Grab the offer before it ends.</p>
          </div>

          <div className="offer__cta">
            <Link href="/products" className="offer__more">
              <span className="arrowlong"><ArrowRight /></span>
              <span>Shop Now</span>
            </Link>
          </div>
        </div>

        <div className="half__grid-img parallax is--parallax">
          <MediaImg src="/offer.jpg" alt="Offer" sizes="50vw" parallax width={768} height={1026} />
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-45"><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.2" /></svg>;
}