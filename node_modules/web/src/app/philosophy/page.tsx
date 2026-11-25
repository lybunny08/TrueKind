"use client";

import Image from "next/image";
import { MediaImg } from "@/components/ui/MediaImg";

function LeafIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
      <path d="M5 19c2-4 5-7 9-9" />
    </svg>
  );
}

export default function PhilosophyPage() {
  return (
    <div>
      {/* Hero — "Be True" / "Be Kind" with wave-masked portrait */}
      <section className="phil">
        {/* Decorative background curves */}
        <svg className="phil__lines" viewBox="0 0 1183 633" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 210 C 120 200, 220 270, 290 310" />
          <path d="M900 360 C 1020 345, 1100 338, 1183 338" />
        </svg>

        <h1 className="phil__title phil__title--top">
          <span className="font-serif">Be</span> True
        </h1>

        <svg className="phil__shape" viewBox="0 0 1183 440" role="img" aria-label="Portrait d'une femme, visage dans l'eau">
          <image
            href="/philosophy-m.png"
            x="0"
            y="0"
            width="1183"
            height="440"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>

        <a className="phil__down" href="#next" aria-label="Défiler vers le bas">
          <svg width="14" height="26" viewBox="0 0 14 26" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M7 1v23M1.5 18.5 7 24l5.5-5.5" />
          </svg>
        </a>

        <p className="phil__text">
          Our simple philosophy in all that we do. We are passionate about skin
          care, we are truekind.
        </p>

        <h2 className="phil__title phil__title--bottom">
          <span className="font-serif">Be</span> Kind
        </h2>
      </section>

      {/* Honest — "Be Kind" section with star, title, product, text, and face image */}
      <section className="honest">
        <div className="honest__left">
          <svg className="honest__star" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 0c.6 6.2 2.8 9.4 6 10.6 2.2.8 4 1.1 6 1.4-6.2.6-9.4 2.8-10.6 6-.8 2.2-1.1 4-1.4 6-.6-6.2-2.8-9.4-6-10.6C3.8 12.6 2 12.3 0 12c6.2-.6 9.4-2.8 10.6-6C11.4 3.8 11.7 2 12 0Z" />
          </svg>

          <h2 className="honest__title">
            Honest products that truly work <em>no exceptions!</em>
          </h2>

          <img className="honest__product" src="/explore-1.jpg" alt="Sérum true.Kind posé sur un fond crème" />

          <p className="honest__text">
            Drawing from our rich ayurvedic legacy of over 30 years and embracing
            dermal science, we aim to create transparent skincare that is
            incredibly effective, safe and without harming the environment or the
            planet.
          </p>
        </div>

        <div className="honest__right">
          <img src="/philosophy-m.png" alt="Gros plan sur un visage au teint lumineux" />
        </div>
      </section>

      {/* Clean — "Clean Ingredients, Radical Transparency." section */}
      <section className="clean">
        <h2 className="clean__title">
          Clean Ingredients,
          <br />
          <em>Radical</em> Transparency.
        </h2>

        <div className="clean__badge" aria-hidden="true">
          <LeafIcon />
        </div>

        <div className="clean__cols">
          <p>
            We formulate to the highest standards of efficacy and safety – using
            only proven, verified ingredients in bio-compatible bases; and free
            from over 1800 questionable ingredients.
          </p>
          <p>
            With no black boxes, and nothing to hide, we strive for radical
            formulation transparency, so you will never have to guess what and how
            much of it is in the products you use.
          </p>
        </div>
      </section>

      {/* Ingredients — "Only proven Ingredients, quality over quantity always!" */}
      <section className="ingr">
        <ul className="ingr__grid">
          {[
            { name: ["Centella", "Asiatica"], icon: "/ingredients/centella.png" },
            { name: ["Glycolic", "Acid"], icon: "/ingredients/glycolic.png" },
            { name: ["Azelaic", "Acid"], icon: "/ingredients/azelaic.png" },
            { name: ["Hyaluronic", "Acid"], icon: "/ingredients/hyaluronic.png" },
            { name: ["Pentavitin"], icon: "/ingredients/pentavitin.png" },
            { name: ["Fruit AHA", "Complex"], icon: "/ingredients/fruit-aha.png" },
          ].map(({ name, icon }) => (
            <li key={name.join(" ")} className="ingr__card">
              <span className="ingr__icon" style={{ backgroundImage: `url(${icon})` }} aria-hidden="true" />
              <span className="ingr__name">
                {name.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <div className="ingr__side">
          <div className="ingr__top">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 0c.5 6.4 2.7 9.5 6 10.7 2 .7 3.8 1 6 1.3-6.3.6-9.5 2.8-10.7 6-.7 2-1 3.8-1.3 6-.6-6.3-2.8-9.5-6-10.7C3.9 12.6 2 12.3 0 12c6.3-.6 9.5-2.8 10.7-6C11.4 4 11.7 2 12 0Z" />
            </svg>
            <h2>
              Only proven Ingredients, <em>quality over quantity</em> always!
            </h2>
          </div>

          <svg className="ingr__slash" viewBox="0 0 140 150" aria-hidden="true">
            <line x1="140" y1="0" x2="0" y2="150" />
          </svg>

          <p className="ingr__stat">
            <strong>1800+</strong>
            <span>
              unsafe ingredients <em>excluded</em>
            </span>
          </p>
        </div>
      </section>

      {/* Values — 6 icon badges */}
      <section className="values">
        <ul className="values__list">
          {[
            {
              label: ["Vegan & Cruelty", "Free"],
              icon: <span className="values__peta">PeTA</span>,
            },
            {
              label: ["100% Transparent", "& Proven Formula"],
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="10.5" cy="10.5" r="6" />
                  <path d="m15 15 5.5 5.5" />
                </svg>
              ),
            },
            {
              label: ["Kind to planet", "Packaging"],
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M8 16c0-4.5 2.5-7.5 8-8 0 5-2.5 8-7 8" />
                  <path d="M8 16c1.2-2 2.5-3.5 4.5-4.5" />
                </svg>
              ),
            },
            {
              label: ["Multitasking", "Formulas"],
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9.5 3.5h5M10.5 3.5v6L5 19.5c-.5 1 .1 2 1.2 2h11.600c1.1 0 1.700-1 1.2-2L13.5 9.5v-6" />
                  <path d="M7.5 15h9" />
                </svg>
              ),
            },
            {
              label: ["Sustainable", "Manufacturing"],
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 17.5h6M10 20.5h4M12 3.5a5.5 5.5 0 0 0-3.2 10c.7.600 1.2 1.5 1.2 2.5h4c0-1 .5-1.900 1.2-2.5A5.5 5.5 0 0 0 12 3.5Z" />
                  <path d="M10.5 10l1.5 2 1.5-2" />
                </svg>
              ),
            },
            {
              label: ["Clean & Pure", "Beauty"],
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 11c4 0 6.5 2.5 7.5 6.5 1-4 3.5-8 8-10.5-.5 5.5-2.5 9-8 11.5" />
                  <path d="M12 17.5v4" />
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <li key={label.join(" ")} className="values__item">
              <span className="values__circle">{icon}</span>
              <span className="values__label">
                {label.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}