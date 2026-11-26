"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/cart";
import { ArrowIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const root = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !overlayRef.current) return;

    const drawer = root.current;
    const overlay = overlayRef.current;

    if (isOpen) {
      gsap.set(drawer, { visibility: "visible", pointerEvents: "auto" });
      gsap.to(overlay, { opacity: 0.6, duration: 0.8, ease: "power2.out" });
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => {
        gsap.set(drawer, { visibility: "hidden", pointerEvents: "none" });
      }});
    }
  }, [isOpen]);

  return (
    <div
      ref={root}
      className={`cart-drawer cart-ui fixed left-0 top-0 z-[1000] h-full w-screen overflow-hidden ${items.length === 0 ? "is--empty" : ""}`}
      style={{ visibility: "hidden", pointerEvents: "none" }}
    >
      <div ref={overlayRef} className="cart-drawer-overlay absolute inset-0 z-[1] bg-black opacity-0" onClick={closeCart} />
      <div
        className={`cart-drawer-content z-[2] flex h-full flex-col justify-between bg-white p-8 ${isOpen ? "cart-drawer-content--open" : ""}`}
      >
        {/* Header toujours en haut */}
        <div className="cart-drawer__header mb-[5vh] flex items-center justify-between">
          <h2 className="cart-drawer__header-title text-[2.5rem] leading-none">Your Cart</h2>
          <button onClick={closeCart} aria-label="Close cart" className="cart-drawer__header-close">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="cart-drawer-emptystate mt-[27vh] text-center text-[4rem] leading-[1.1] max-md:text-[3.8rem]">
            Your cart is empty
            <Link href="/products" onClick={closeCart} className="icon-global mx-auto mt-8 flex max-w-[95%]">
              <span>Browse Products</span>
            </Link>
          </div>
        )}

        <div data-lenis-prevent className="cart-drawer__list h-[75%] overflow-y-auto">
          {items.map((item) => (
            <div key={item.productId} className="product__list-item flex items-center gap-6 border-b border-[#d8d8d8] py-6">
              <div className="relative h-24 w-24 shrink-0">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain" sizes="96px" />
              </div>
              <div className="flex-1">
                <Link href={`/products/${item.product.slug}`} onClick={closeCart} className="link text-[1rem]">
                  {item.product.name}
                </Link>
                <p className="mt-1 text-[0.9rem]">{formatPrice(item.product.price)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="text-xl">−</button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="text-xl">+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.productId)} className="text-gray3 hover:text-[#3b3b3b]">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer mt-[5vh]">
            <div className="cart-drawer__footer-subtotal flex items-center justify-between text-[1.4rem]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-[0.8rem] text-gray3">Shipping, taxes, and discount codes are calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart} className="btn__icon cart-drawer__footer-checkout mt-4 bg-[#3b3b3b] text-white">
              Continue to checkout
              <span className="btn__icon-arrow bg-white"><ArrowIcon className="w-6 text-[#3b3b3b]" /></span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
