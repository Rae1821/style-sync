import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="mb-12">
      <Hero />

      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <HowItWorks />
      </div>
      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <Features />
      </div>
      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <CTA />
      </div>
    </div>
  );
}
