import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex mx-auto max-w-screen-md flex-col justify-center gap-7 md:text-center">
          <h2 className="text-2xl md:text-4xl">Features</h2>
          <p className="text-sm text-muted-foregroud md:text-base">
            See the awesome things we offer
          </p>
        </div>
        <div className="mx-auto mt-14 flex max-w-screen-lg flex-col gap-4 lg:px-16">
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 shrink-0"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  1
                </span>
                <span className="h-20 w-[3px] shrink-0 bg-gradient-to-b from-transparent to-red-300 opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">Feature 1</h3>
                <p className="text-sm text-muted-foreground min-[960px]:text-base">
                  Feature description goes here. This is a brief description of
                  the feature and its benefits.
                </p>
              </div>
            </div>
            <Image
              src="./icons/placeholder-1.svg"
              height={291}
              width={396}
              alt="placeholder image"
              className="z-10 aspect-video w-full rounded-xl border object-cover min-[960px]:max-h-56 min-[960px]:w-auto"
            />
          </div>
          <div className="relative flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="absolute -top-8 h-8 w-[3px] bg-red-300 opacity-70 shrink-0"></span>
                <span className="absolute -bottom-8 mx-auto h-8 w-[3px] shrink-0 bg-red-300 opacity-70 "></span>
                <span className="h-20 w-[3px] shrink-0 bg-red-300 opacity-70"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  2
                </span>
                <span className="h-20 w-[3px] shrink-0 bg-red-300 opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">Feature 2</h3>
                <p className="text-sm text-muted-foreground min-[960px]:text-base">
                  Feature description goes here. This is a brief description of
                  the feature and its benefits.
                </p>
              </div>
            </div>
            <Image
              src="/icons/placeholder-1.svg"
              height={291}
              width={396}
              alt="placeholder image"
              className="z-10 aspect-video w-full rounded-xl border object-cover min-[960px]:max-h-56 min-[960px]:w-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 w-[3px] shrink-0 bg-gradient-to-t from-transparent to-red-300 opacity-70"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  3
                </span>
                <span className="h-20 shrink-0"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">Feature 3</h3>
                <p className="text-sm text-muted-foreground min-[960px]:text-base">
                  Feature description goes here. This is a brief description of
                  the feature and its benefits.
                </p>
              </div>
            </div>
            <Image
              src="/icons/placeholder-1.svg"
              height={291}
              width={396}
              alt="placeholder image"
              className="z-10 aspect-video w-full rounded-xl border object-cover min-[960px]:max-h-56 min-[960px]:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
