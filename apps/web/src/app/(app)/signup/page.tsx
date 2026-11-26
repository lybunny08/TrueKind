"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Registration failed");
      }
      const result = await response.json();
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="hidden md:block md:w-1/2 relative">
        <Image src="/signup.jpg" alt="Sign Up" fill sizes="50vw" className="object-cover" priority />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest font-medium hover:underline mb-12 inline-block"
          >
            ← Return to Store
          </Link>
          <h1 className="font-playfair text-3xl font-light mb-4">Sign Up</h1>
          <p className="text-sm text-black/60 mb-8">
            By accessing your TrueKind Account you can track and manage your
            orders and also save multiple addresses.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <div>
              <label className="block text-xs uppercase tracking-widest font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 text-sm uppercase tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-black/10 text-center">
            <p className="text-sm text-black/60 mb-2">
              Have an Account Already?
            </p>
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}