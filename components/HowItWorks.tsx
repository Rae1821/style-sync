// import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex max-w-screen-md flex-col justify-center">
          <h2 className="text-4xl font-semibold tracking-tighter md:text-7xl">
            How It Works
          </h2>
          <p className="md:text-base">
            Get your style sync session started in 3 easy steps. <br />
          </p>
        </div>
        <div className="mt-8 mx-auto flex max-w-screen-lg flex-col gap-4 lg:gap-12">
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 shrink-0"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  1
                </span>
                <span className="h-20 w-[3px] shrink-0 bg-gradient-to-b from-transparent to-black opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">Body Shape</h3>
                <p className="text-sm min-[960px]:text-base">
                  Use our simple calculator to quickly find out your body shape.
                  The results will be saved to your dashboard for easy access.
                </p>
              </div>
            </div>

            <video
              width="396"
              height="291"
              controls
              preload="none"
              autoPlay
              muted
              loop
              className="shadow-lg rounded-xl z-100"
            >
              <source src="/video/body-shape-calc-2.mov" type="video/mp4" />
            </video>
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="relative flex flex-col items-center justify-between gap-1">
                <span className="absolute -top-8 h-8 w-[3px] bg-black opacity-70 shrink-0"></span>
                <span className="absolute -bottom-8 mx-auto h-8 w-[3px] shrink-0 bg-black opacity-70 "></span>
                <span className="h-20 w-[3px] shrink-0 bg-black opacity-70"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  2
                </span>
                <span className="h-20 w-[3px] shrink-0 bg-black opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">Fashion Style</h3>
                <p className="text-sm min-[960px]:text-base">
                  Take our quick and easy quiz to find out your fashion style.
                  You can take the quiz as many times as you want, the results
                  will be saved to your dashboard.
                </p>
              </div>
            </div>

            <video
              width="396"
              height="291"
              controls
              preload="none"
              autoPlay
              muted
              loop
              className="shadow-lg rounded-xl z-100"
            >
              <source src="/video/fashion-style-quiz-2.mov" type="video/mp4" />
            </video>
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 w-[3px] shrink-0 bg-gradient-to-t from-transparent to-black opacity-70"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  3
                </span>
                <span className="h-20 shrink-0"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">Style Sesh</h3>
                <p className="text-sm min-[960px]:text-base">
                  Upload a picture of a piece of clothing in your style session
                  and get personalized outfit recommendations for multiple
                  occasions. Then save them to your favorites with one click!
                </p>
              </div>
            </div>

            <video
              width="396"
              height="291"
              controls
              preload="none"
              autoPlay
              muted
              loop
              className="shadow-lg rounded-xl"
            >
              <source src="/video/style-sesh.mov" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
