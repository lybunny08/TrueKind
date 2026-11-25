import { Hero } from "@/components/sections/Hero";
import { BrandCommitments } from "@/components/sections/BrandCommitments";
import { ProductCollections } from "@/components/sections/ProductCollections";
import { EthosSection } from "@/components/sections/EthosSection";
import { PromotionalSection } from "@/components/sections/PromotionalSection";
import { JournalSection } from "@/components/sections/JournalSection";
import { InstagramSection } from "@/components/sections/InstagramSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCommitments />
      <ProductCollections />
      <EthosSection />
      <PromotionalSection />
      <JournalSection />
      <InstagramSection />
    </>
  );
}