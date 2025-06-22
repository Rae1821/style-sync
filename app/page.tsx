import CTA from "@/components/CTA";
// import Features from "@/components/Features";
import Features2 from "@/components/Features2";
// import Hero from "@/components/Hero";
import { Hero1 } from "@/components/hero1";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="">
      <div className="shapedividers_com-5733 z-100">
        <Hero1 />
      </div>

      <div className="bg-red-300">
        <div className="px-8 mx-auto max-w-5xl">
          <HowItWorks />
        </div>
      </div>
      <div className="shapedividers_com-1919">
        <div className="mt-4 px-8 mx-auto max-w-5xl ">
          <Features2 />
        </div>
      </div>
      <div className="mt-4 px-8 mx-auto max-w-5xl">
        <CTA />
      </div>
    </div>
  );
}
