import React from "react";
import CoolButton from "./CoolButton";

const CTA = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center rounded-lg bg-muted p-8 text-center md:rounded-xl lg:p-16">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Ready To Get Started?
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            Join our community of fashion enthusiasts and discover the perfect
            outfits for your body shape and style. Sign up now to unlock
            personalized recommendations and exclusive content!
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <CoolButton title="Yes I'm ready!" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
