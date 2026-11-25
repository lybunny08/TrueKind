"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useDragScroll } from "@/hooks/useDragScroll";
import { MediaImg } from "@/components/ui/MediaImg";
import type { Product } from "@/types";

const COLLECTIONS = [
  { name: "Pure Brilliance", italic: "Brilliance" as const, image: "/explore-1.jpg", products: PRODUCTS.filter((p) => p.collection === "Pure Brilliance") },
  { name: "Varnaya Blends", italic: "Blends" as const, image: "/explore-2.jpg", products: PRODUCTS.filter((p) => p.collection === "Varnaya Blends") },
];

export function ProductCollections() {
  const root = useRef<HTMLElement>(null);
  useScrollReveal(root, ".product__card", { start: "top 90%", y: 50, stagger: 0.1 });

  return (
    <section ref={root} id="explore">
      <h2 className="explore__title text-center">
        <div className="masking-text"><div className="line">Explore</div></div>
        <div className="masking-text"><div className="line"><span className="font-serif">pure potency</span></div></div>
      </h2>
      <div className="container" />

      {COLLECTIONS.map((c) => (
        <div key={c.name} className="half__grid half__grid-1">
          <div className="half__grid-img parallax is--parallax">
            <MediaImg src={c.image} alt={c.name} sizes="50vw" parallax width={768} height={1026} />
          </div>
          <div className="half__grid-content">
            <div className="half__grid-text">
              <h3 className="half__grid-title">
                <div className="masking-text"><div className="line">{c.name.split(" ")[0]}</div></div>
                <div className="masking-text"><div className="line"><span className="font-serif">{c.italic}</span></div></div>
              </h3>
              <Link href="/products" className="slider-arrow icon-clone white" aria-label={`Shop ${c.name}`}>
                <ArrowRight className="h-4 w-4 text-white" />
              </Link>
            </div>
            <CollectionSlider products={c.products} />
            <p className="text-uppercase maxwidth">Stay glowing and healthy without having to think about it.</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function CollectionSlider({ products }: { products: Product[] }) {
  const dragRef = useDragScroll<HTMLDivElement>();

  return (
    <div ref={dragRef} className="half__grid-product swiper" style={{ cursor: "grab" }}>
      <div className="swiper-wrapper">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}