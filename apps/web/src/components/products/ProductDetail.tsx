"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/contexts/cart";
import { PRODUCTS, getProductBySlug } from "@/lib/data";
import { getProductDetails } from "@/lib/product-details";
import { formatPrice } from "@/lib/utils";
import { MediaImg } from "@/components/ui/MediaImg";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight } from "lucide-react";

const TABS = ["About", "Ingredients", "Usage", "FAQ"];

export default function ProductDetail({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("About");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const details = getProductDetails(slug);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const goesWell = details.goesWellWith
    ? PRODUCTS.find((p) => p.slug === details.goesWellWith)
    : undefined;

  return (
    <div>
      {/* Hero: product image + info */}
      <section className="container" style={{ marginTop: "6rem" }}>
        <div className="row">
          {/* Images */}
          <div className="col-md-7">
            <div className="media-img" style={{ height: "auto" }}>
              <MediaImg src={product.images[0]} alt={product.name} sizes="(max-width:768px) 100vw, 58vw" />
            </div>
          </div>

          {/* Info */}
          <div className="col-md-5">
            <Link href="/products" className="link font-small text-uppercase text-gray2">{product.collection}</Link>
            <h1 style={{ marginTop: "1rem" }}>{product.name}</h1>
            <p className="font-small text-gray2" style={{ marginTop: "0.5rem" }}>{product.volume}</p>
            <p className="text-gray3" style={{ marginTop: "1.5rem" }}>{details.subtitle || product.description}</p>
            <p style={{ marginTop: "1.5rem", fontSize: "1.4rem" }}>{formatPrice(product.price)}</p>

            {/* QTY */}
            <div className="flex items-center gap-4" style={{ marginTop: "2rem" }}>
              <span className="font-small text-gray2 text-uppercase">QTY</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl">−</button>
                <span className="font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-xl">+</button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={() => { for (let i = 0; i < quantity; i++) addItem(product); }}
              className="btn__icon" style={{ marginTop: "2rem", maxWidth: "100%" }}
            >
              Add to cart
              <span className="btn__icon-arrow"><ArrowRight className="h-4 w-4" /></span>
            </button>

            {/* Badges */}
            <ul className="row gy-4 mt-5" style={{ listStyle: "none" }}>
              {details.badges.map((badge) => (
                <li key={badge} className="col-6 text-center text-gray2 font-small">{badge}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Goes well with */}
        {goesWell && (
          <div style={{ marginTop: "5rem" }}>
            <h3>Goes well with</h3>
            <div className="row" style={{ marginTop: "2rem", maxWidth: "22rem" }}>
              <ProductCard product={goesWell} />
            </div>
          </div>
        )}
      </section>

      {/* Headline */}
      {details.headline && (
        <section className="container text-center">
          <h2 className="font-serif" style={{ textTransform: "none", maxWidth: "50rem", margin: "0 auto" }}>
            {details.headline}
          </h2>
        </section>
      )}

      {/* Recommended for + Good to know */}
      <section className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="font-small text-gray2 text-uppercase">Recommended for</p>
            <ul style={{ marginTop: "1rem" }}>
              {details.recommendedFor.map((item) => <li key={item} className="text-gray3">— {item}</li>)}
            </ul>
          </div>
          <div className="col-md-6">
            <p className="font-small text-gray2 text-uppercase">Good to know</p>
            <ul style={{ marginTop: "1rem" }}>
              <li className="text-gray3">— pH: 5.5</li>
              <li className="text-gray3">— Clean, verified ingredients</li>
              <li className="text-gray3">— Vegan, Cruelty-free</li>
            </ul>
          </div>
        </div>
      </section>

      {/* All about the product — tabs */}
      <section className="container">
        <h2 className="font-heading" style={{ textTransform: "none" }}>all about the Product</h2>
        <ul className="flex gap-6" style={{ marginTop: "2rem", listStyle: "none", borderBottom: "1px solid #d8d8d8" }}>
          {TABS.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "font-semibold" : "text-gray2"}
                style={{ paddingBottom: "1rem", borderBottom: activeTab === tab ? "2px solid #3b3b3b" : "none", textTransform: "uppercase", fontSize: ".8rem" }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "3rem" }}>
          {activeTab === "About" && <AboutTab details={details} />}
          {activeTab === "Ingredients" && <IngredientsTab details={details} />}
          {activeTab === "Usage" && <UsageTab details={details} />}
          {activeTab === "FAQ" && <FaqTab details={details} />}
        </div>
      </section>

      {/* Zero toxics */}
      <section className="container">
        <h2 className="font-heading">Zero toxics Given, 1800+ Restricted Ingredients.</h2>
        <div className="row" style={{ marginTop: "3rem" }}>
          <div className="col-md-6">
            <ul style={{ listStyle: "none" }}>
              {[
                { t: "No Ecology Disruptors", d: "No Animal derived ingredients, microplastics, silver & it's salts." },
                { t: "No Cancer Causers", d: "No Parabens, Formaldehyde-releasing agents, and Carcinogenic dyes." },
                { t: "No Hormone Disruptors", d: "No Phthalates, Synthetic fragrances, and Ethanolamines." },
                { t: "No Allergy Causers", d: "No Artificial fragrances, Dyes, and Irritating alcohols." },
              ].map((x) => (
                <li key={x.t} style={{ marginBottom: "2rem" }}>
                  <h4>{x.t}</h4>
                  <p className="text-gray3">{x.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <div className="media-img" style={{ height: "30rem" }}>
              <MediaImg src="/175A3642-3-741.jpg" alt="Zero toxics" sizes="50vw" />
            </div>
            <p className="text-gray3" style={{ marginTop: "2rem" }}>
              We take our formulation philosophy and ingredient safety very seriously, because what you put on your skin could impact your overall health and well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container">
        <h3 className="font-small text-gray2 text-uppercase">featured</h3>
        <div className="row gy-5">
          {related.map((p) => (
            <div key={p.id} className="col-md-3"><ProductCard product={p} /></div>
          ))}
        </div>
      </section>
    </div>
  );
}

import type { ProductDetailData } from "@/lib/product-details";

function AboutTab({ details }: { details: ProductDetailData }) {
  return (
    <div className="row">
      <div className="col-md-6">
        <h3>About The Product</h3>
        <p className="text-gray3" style={{ marginTop: "1rem" }}>{details.subtitle}</p>
        <h3 style={{ marginTop: "3rem" }}>Recommended For</h3>
        <ul style={{ marginTop: "1rem" }}>{details.recommendedFor.map((x) => <li key={x} className="text-gray3">— {x}</li>)}</ul>
        <h3 style={{ marginTop: "3rem" }}>Suitable For</h3>
        <ul style={{ marginTop: "1rem" }}>{details.suitableFor.map((x) => <li key={x} className="text-gray3">— {x}</li>)}</ul>
      </div>
      <div className="col-md-6">
        <div className="row">
          {details.benefits.map((b) => (
            <div key={b.name} className="col-6 text-center" style={{ marginBottom: "2rem" }}>
              {b.icon && <img src={b.icon} alt="" className="mx-auto" style={{ height: "4rem", width: "4rem", objectFit: "contain" }} />}
              <p className="font-small text-gray2">{b.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IngredientsTab({ details }: { details: ProductDetailData }) {
  return (
    <div>
      <h3>Key Ingredients</h3>
      <div className="row gy-5">
        {details.keyIngredients.map((ing) => (
          <div key={ing.name} className="col-md-3">
            {ing.image && <div className="media-img" style={{ height: "15rem" }}><img src={ing.image} alt={ing.name} className="w-full h-full object-cover" /></div>}
            <h4 style={{ marginTop: "1rem" }}>{ing.name}</h4>
            <p className="text-gray3" style={{ marginTop: ".5rem" }}>{ing.description}</p>
          </div>
        ))}
      </div>
      <Link href="/philosophy" className="link font-small text-uppercase" style={{ marginTop: "3rem", display: "inline-block" }}>Learn more about our philosophy</Link>
      <h3 style={{ marginTop: "4rem" }}>Full Ingredient List and Formula</h3>
      <div style={{ overflowX: "auto", marginTop: "2rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead><tr><th>Ingredients</th><th>EWG Safety Rating</th><th>Concentration</th></tr></thead>
          <tbody>
            {details.fullIngredientList.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #d8d8d8" }}>
                <td style={{ padding: "1rem" }}>{row.ingredient}</td>
                <td style={{ padding: "1rem" }}>{row.ewgRating}</td>
                <td style={{ padding: "1rem" }}>{row.concentration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsageTab({ details }: { details: ProductDetailData }) {
  const items = [
    ["When to apply", details.usage.whenToApply],
    ["How to use", details.usage.howToUse],
    ["Good to know", details.usage.goodToKnow],
    ["Dose", details.usage.dose],
    ["Precautions", details.usage.precautions],
  ];
  return (
    <div className="row">
      {items.map(([title, text]) => (
        <div key={title} className="col-md-4" style={{ marginBottom: "2rem" }}>
          <h3>{title}</h3>
          <p className="text-gray3" style={{ marginTop: ".5rem" }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function FaqTab({ details }: { details: ProductDetailData }) {
  return (
    <div>
      <h3>Frequently Asked Questions</h3>
      {details.faqs.map((faq) => (
        <div key={faq.question} style={{ marginTop: "2rem" }}>
          <h4>{faq.question}</h4>
          <p className="text-gray3" style={{ marginTop: ".5rem" }}>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}