"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES } from "@/lib/data";
import { useProducts } from "@/hooks/useApiData";
import { MediaImg } from "@/components/ui/MediaImg";

const RANGES = [
  "Pure Brilliance",
  "Varnaya Blends",
  "Daily Dew",
  "Clear Difference",
  "C Luminance",
];

const INGREDIENTS = [
  "AHAs", "Hyaluronic Acid", "Niacinamide", "Vitamin C", "Azelaic Acid",
  "BHAs", "CICA", "Pentavitin", "Rosehip", "Phyto Retinol", "Squalane",
];

const COLLECTION_HEADINGS: Record<string, string> = {
  "Pure Brilliance": "For Glowing & Healthy Skin, Pure Brilliance",
  "Varnaya Blends": "A Blend of Ayurveda & Science, Varnaya Blends",
  "Daily Dew": "For Daily Hydration & Nourishment, Daily Dew",
  "Clear Difference": "For Reduce Blackouts & Breakouts, Clear Difference",
  "C Luminance": "For Brightening & Revitalizing, C Luminance",
};

export default function ShopPage() {
  const { products: PRODUCTS, loading } = useProducts();
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedRanges.length > 0 && !selectedRanges.includes(product.collection)) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.category)) return false;
      return true;
    });
  }, [PRODUCTS, selectedRanges, selectedTypes]);

  return (
    <div>
      {/* Hero — "MEET OUR complete lineup" with shop banner covering the whole section */}
      <section id="shop-hero" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", padding: "0 clamp(20px, 4.5vw, 64px)", background: "radial-gradient(ellipse 60% 55% at 55% 60%, #fff 0%, transparent 70%), #f3f3f4", margin: 0 }}>
        <h1 style={{ position: "absolute", zIndex: 2, left: "clamp(20px, 4.8vw, 68px)", top: "17%", fontWeight: 600, fontSize: "clamp(48px, 7.7vw, 112px)", lineHeight: 1, letterSpacing: "-0.035em", color: "#3a3a3a", textTransform: "none" }}>
          MEET OUR
        </h1>

        <svg viewBox="0 0 400 270" fill="none" aria-hidden="true" style={{ position: "absolute", zIndex: 1, left: "41.5%", top: "18%", width: "39%", height: "auto", pointerEvents: "none" }}>
          <path d="M2 18 C 210 -30, 385 70, 394 255" stroke="#2b2b2b" strokeWidth="1.3" />
          <path d="m389 246 5 11 5-11" stroke="#2b2b2b" strokeWidth="1.3" />
        </svg>

        {/* Shop banner image covering the whole section */}
        <img
          src="/shop-hero.jpg"
          alt="Mains tenant un sérum true.Kind"
          style={{ position: "absolute", zIndex: 1, left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply" }}
        />
        <img
          className="mobile-only"
          src="/shop-hero-m.jpg"
          alt="Mains tenant un sérum true.Kind"
          style={{ position: "absolute", zIndex: 1, left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "multiply", display: "none" }}
        />

        <p style={{ position: "absolute", zIndex: 2, right: "clamp(20px, 6.5vw, 96px)", bottom: "12%", fontFamily: "'Editorial New', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(48px, 7.2vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#3a3a3a" }}>
          complete
          <br />
          lineup
        </p>

        <aside style={{ position: "absolute", zIndex: 3, left: "clamp(20px, 4.7vw, 68px)", bottom: "5%", width: "clamp(240px, 22vw, 300px)", minHeight: "236px", padding: "22px 18px 18px", display: "flex", flexDirection: "column", borderRadius: "14px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(10px)" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#2b2b2b" }}>
            Find Your
            <em style={{ display: "block", fontFamily: "'Editorial New', serif", fontWeight: 400, fontSize: "25px" }}>Routine</em>
          </h2>
          <p style={{ marginTop: "14px", fontSize: "9.5px", lineHeight: 1.5, color: "#b4b4b8" }}>
            Answer a few simple question about your skin and we will build you a perfect personalised regimen for your skin goals.
          </p>
          <Link href="/" style={{ marginTop: "8px", height: "40px", borderRadius: "999px", background: "#3a3a3a", color: "#fff", fontSize: "10px", fontWeight: 500, letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
            GET YOUR REGIMEN
          </Link>
        </aside>
      </section>

      {/* Understand Your Routine */}
      <section className="container">
        <div className="row gy-5 gy-md-0">
          <div className="col-md-6">
            <h2>Understand Your Routine</h2>
            <p className="text-gray3 maxwidth mt-4">
              Skincare is not just about the products you use, but it&apos;s also about how you use those products effectively. Head over to clean journal to read more.
            </p>
            <Link href="/journal" className="link text-uppercase font-small mt-4 d-inline-block">Read More</Link>
          </div>
        </div>
      </section>

      {/* Find Your Routine */}
      <section className="container">
        <div className="row gy-5 gy-md-0">
          <div className="col-md-6">
            <h2>Find Your Routine</h2>
            <p className="text-gray3 maxwidth mt-4">
              Answer a few simple question about your skin and we will build you a perfect personalised regimen for your skin goals.
            </p>
            <Link href="/" className="link text-uppercase font-small mt-4 d-inline-block">Get Your Regimen</Link>
          </div>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="container">
        <h3 className="mb-4">Filters</h3>
        <div className="row">
          <aside className="col-md-3">
            <div className="filter-group">
              <h4 className="font-small text-gray2 text-uppercase">Range</h4>
              <ul>
                {RANGES.map((range) => (
                  <li key={range}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={selectedRanges.includes(range)} onChange={() => toggle(range, selectedRanges, setSelectedRanges)} />
                      {range}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <h4 className="font-small text-gray2 text-uppercase">Type</h4>
              <ul>
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={selectedTypes.includes(category.name)} onChange={() => toggle(category.name, selectedTypes, setSelectedTypes)} />
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <h4 className="font-small text-gray2 text-uppercase">Ingredients</h4>
              <ul>
                {INGREDIENTS.map((ingredient) => (
                  <li key={ingredient}>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={selectedIngredients.includes(ingredient)} onChange={() => toggle(ingredient, selectedIngredients, setSelectedIngredients)} />
                      {ingredient}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="col-md-9">
            <p className="text-gray2 mb-4">{loading ? "Loading..." : `${filteredProducts.length} products`}</p>
            <div className="row gy-5">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collection sections — grouped by range, as in the original */}
      {RANGES.map((range) => {
        const rangeProducts = PRODUCTS.filter((p) => p.collection === range);
        if (rangeProducts.length === 0) return null;
        return (
          <section key={range} className="container">
            <h2 className="mb-8">{COLLECTION_HEADINGS[range] || range}</h2>
            <div className="row gy-5">
              {rangeProducts.map((product) => (
                <div key={product.id} className="col-md-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}