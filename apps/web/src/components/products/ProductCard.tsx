"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

/** Cart icon matching the original's .product__card-quickcart SVG exactly. */
function CartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="13" fill="white" />
      <path d="M8.77357 10.7989C8.81474 10.099 9.39438 9.55243 10.0955 9.55243H16.0403C16.7415 9.55243 17.3211 10.099 17.3623 10.7989L17.7342 17.1212C17.779 17.8819 17.1742 18.5233 16.4122 18.5233H9.72364C8.9617 18.5233 8.35692 17.8819 8.40167 17.1212L8.77357 10.7989Z" stroke="#424242" strokeWidth="0.601938" />
      <path d="M15.883 10.9417C15.883 8.76477 14.6224 7 13.0675 7C11.5125 7 10.252 8.76477 10.252 10.9417" stroke="#424242" strokeWidth="0.601938" strokeLinecap="round" />
    </svg>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const bg = product.collection === "Varnaya Blends" ? "rgb(216, 208, 196)" : "rgb(241, 204, 207)";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product__card swiper-slide"
      aria-label={product.name}
      style={{ backgroundColor: bg }}
    >
      <div className="product__card-head">
        <p className="product__card-category pill-fill">{product.collection}</p>
        <div
          className="product__card-quickcart"
          role="button"
          aria-label="Add to cart"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }
          }}
        >
          <CartIcon />
        </div>
      </div>

      <div className="product__content">
        <div className="media-img n-a product__card-img">
          <Image src={product.images[0]} alt={product.name} width={1000} height={1277} sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px" />
        </div>
        {product.images[1] && (
          <div className="media-img n-a product__card-img2" data-loading="true">
            <Image src={product.images[1]} alt={product.name} width={1000} height={1277} sizes="(max-width: 640px) 320px, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, (max-width: 1536px) 1280px, 1536px" />
          </div>
        )}
        <div className="product__card-foot">
          <h3 className="product__card-title">{product.name}</h3>
          <p className="product-price"> {formatPrice(product.price)} </p>
        </div>
      </div>
    </Link>
  );
}