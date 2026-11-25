"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/contexts/cart";
import { formatPrice } from "@/lib/utils";

const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (_data: CheckoutForm) => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login?redirect=/checkout");
        return;
      }
      // Try to create order and payment via backend
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.product.id,
              quantity: i.quantity,
            })),
          }),
        }
      );
      if (!orderResponse.ok) throw new Error("Failed to create order");
      const order = await orderResponse.json();

      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/payments/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId: order.id,
            successUrl: `${window.location.origin}/checkout/success`,
            cancelUrl: `${window.location.origin}/cart`,
          }),
        }
      );
      if (!paymentResponse.ok) throw new Error("Failed to initialize payment");
      const payment = await paymentResponse.json();

      if (payment.url) {
        window.location.href = payment.url;
      } else {
        clearCart();
        router.push("/checkout/success");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during checkout"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl mb-4">Your cart is empty</h1>
          <Link href="/products" className="text-[1px] hover:underline">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-playfair text-3xl md:text-4xl font-light mb-12">
          Checkout
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-playfair text-xl font-light mb-6">
              Shipping Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                  Address
                </label>
                <input
                  {...register("address")}
                  className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                    City
                  </label>
                  <input
                    {...register("city")}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                    State
                  </label>
                  <input
                    {...register("state")}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    {...register("postalCode")}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                    Country
                  </label>
                  <input
                    {...register("country")}
                    defaultValue="India"
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  {errors.country && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-light mb-6">
              Order Summary
            </h2>
            <div className="border border-black/10 p-6">
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 mt-8 text-sm uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
              <p className="text-xs text-black/60 mt-4 text-center">
                Secure payment processing via Stripe
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}