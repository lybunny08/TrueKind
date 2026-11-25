"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({ email: z.string().email("Please enter a valid email") });
type FormData = z.infer<typeof schema>;

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Subscription failed");
      setStatus("success");
      setMessage("Thank you for subscribing!");
      reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border" />
      <input type="email" placeholder="Enter your email" {...register("email")} />
      {errors.email && <p className="text-left text-[0.8rem] text-red-400 mt-2">{errors.email.message}</p>}
      {status === "success" && <p className="mt-2 text-[0.8rem] text-green-400">{message}</p>}
      {status === "error" && <p className="mt-2 text-[0.8rem] text-red-400">{message}</p>}
      <button type="submit" disabled={isSubmitting} className="footer__submit flex-center flex-column icon-clone magnet">
        <span className="arrowlong"><ArrowRight /></span>
        <span>{isSubmitting ? "..." : "Subscribe"}</span>
      </button>
    </form>
  );
}

function ArrowRight() {
  return <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="icon-arrowlong"><path d="M18.7 0.7C18.7 0.4 18.5 0.2 18.2 0.2L14 0.2C13.7 0.2 13.5 0.4 13.5 0.7C13.5 1 13.7 1.2 14 1.2L17.8 1.2L17.8 4.9C17.8 5.2 18 5.4 18.2 5.4C18.5 5.4 18.7 5.2 18.7 4.9L18.7 0.7ZM0.7 18.8L18.6 1L17.9 0.3L0.1 18.2L0.7 18.8Z" fill="white" /></svg>;
}