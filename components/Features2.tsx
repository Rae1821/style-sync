import React from "react";

const Features2 = () => {
  return (
    <section className="py-32">
      <div className="container relative flex items-center md:px-0 lg:pt-8">
        <div className="relative z-10 w-full items-center justify-between lg:flex">
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tighter md:text-7xl">
            What You Get
          </h1>
          <p className="mt-8 max-w-lg tracking-tight text-muted-forground, md:text-xl lg:mt-0">
            Discover the benefits of using our AI-powered fashion assistant.
          </p>
        </div>
        <div className="relative mt-8 flex w-full items-center justify-center px-2 py-10">
          <div className="absolute top-4 -left-[12.5px] h-[1.5px] w-[110%] bg-muted md:-left-20"></div>
          <div className="absolute bottom-4 -left-[12,5px] h-[1.5px] w-[110%] bg-muted md:-left-20"></div>
          <div className="absolute -top-4 left-0 h-[110%] w-[1.5px] bg-muted"></div>
          <div className="absolute -top-4 right-0 h-[110%] w-[1.5px] bg-muted"></div>
          <div className="absolute top-[12.5px] left-[-3px] z-10 h-2 w-2 rounded-full bg-foreground"></div>
          <div className="absolute top-[12.5px] right-[-3px] z-10 h-2 w-2 rounded-full bg-foreground"></div>
          <div className="absolute bottom-[12.5px] left-[-3px] z-10 h-2 w-2 rounded-full bg-foreground"></div>
          <div className="absolute bottom-[12.5px] right-[-3px] z-10 h-2 w-2 rounded-full bg-foreground"></div>
          <div className="relative w-full">
            <div>Image goes here</div>
            <div>Image goes here</div>
            <div>Image goes here</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features2;
