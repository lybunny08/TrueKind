import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "TrueKind | Clean, Conscious Skincare",
  description:
    "Unreservedly honest products that truly work, be kind to skin and the planet – no exceptions!",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}