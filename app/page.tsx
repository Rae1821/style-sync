import CTA from "@/components/CTA";
// import Features from "@/components/Features";
import Features2 from "@/components/Features2";
// import Hero from "@/components/Hero";
import { Hero1 } from "@/components/hero1";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="mb-12">
      <Hero1 />

      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <HowItWorks />
      </div>
      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <Features2 />
      </div>
      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <CTA />
      </div>
    </div>
  );
}
