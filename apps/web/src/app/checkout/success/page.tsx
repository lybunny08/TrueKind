"use client";

import Link from "next/link";
import { useCart } from "@/contexts/cart";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6 text-2xl">
          ✓
        </div>
        <h1 className="font-playfair text-3xl md:text-4xl font-light mb-4">
          Thank you for your order!
        </h1>
        <p className="text-sm text-black/60 mb-8 max-w-md mx-auto">
          Your order has been placed successfully. You will receive a
          confirmation email with your order details shortly.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-black text-white px-8 py-4 text-base hover:bg-[#1a1a1a] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}