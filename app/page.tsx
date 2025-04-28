import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="mb-12">
      <Hero />

      <div className="mt-4 px-8">
        <Features />
      </div>
    </div>
  );
}
