"use client";

import { useState } from "react";
import { CartProvider } from "@/contexts/cart";
import { Preloader } from "@/components/layout/Preloader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <CartProvider>
      {showPreloader && <Preloader onDone={() => setShowPreloader(false)} />}
      {children}
    </CartProvider>
  );
}
