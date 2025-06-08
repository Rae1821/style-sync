import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

const Features2 = () => {
  return (
    <section className="py-12">
      <div className="container relative flex flex-col items-center md:px-0 lg:pt-8">
        <div className="relative z-10 w-full justify-between lg:flex lg:flex-col">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tighter md:text-7xl">
            What You Get
          </h2>
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
          {/* <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-3xl"
          >
            <CarouselContent>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> */}

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-3xl"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center gap-12 p-6">
                      <Image
                        src="/icons/dashboard-draw.svg"
                        alt="Dashboard"
                        width={250}
                        height={300}
                      />
                      <p className="font-medium text-sm tracking-tighter lg:text-base">
                        Personalized Dashboard
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center gap-12 p-6">
                      <Image
                        src="/icons/product-search-draw.svg"
                        alt="Dashboard"
                        width={250}
                        height={300}
                      />
                      <p className="font-medium text-sm tracking-tighter">
                        Customized Product Search
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center gap-12 p-6">
                      <Image
                        src="/icons/ai-style-sesh-draw.svg"
                        alt="Dashboard"
                        width={250}
                        height={300}
                      />
                      <p className="font-medium text-sm tracking-tighter">
                        AI Style Sessions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center gap-12 p-6">
                      <Image
                        src="/icons/moodboard-draw.svg"
                        alt="Dashboard"
                        width={250}
                        height={350}
                      />
                      <p className="font-medium text-sm tracking-tighter">
                        Moodboard
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center gap-12 p-6">
                      <Image
                        src="/icons/style-school-draw.svg"
                        alt="Dashboard"
                        width={250}
                        height={250}
                      />
                      <p className="font-medium text-sm tracking-tighter">
                        Style School
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <div
            className="relative w-full"
            role="region"
            aria-roledescription="carousel"
            data-slot="carousel"
          >
            <div className="overflow-hidden" data-slot="carousel-content">
              <div
                className="m-0 flex w-full transform-[translate3d(-618px, 0px, 0px)] transition-transform duration-300 ease-in-out"
                // style={{transform: translate3d(-618px, 0px, 0px);}}
              >
                <div
                  role="group"
                  aria-roledescription="slide"
                  data-slot="carousel"
                  className="min-w-0 shrink-0 grow-0 basis-full px-z md:basis-1/2 lg:basis-1/3 transform-3d"
                  //   style={{transform: translate3d(0px, 0px, 0px)}}
                >
                  <div className="group relative flex h-96 w-full items-end rounded-3xl bg-muted text-ellipsis">
                    <Image
                      className="absolute f-full opacity-100 transition-all ease-in-out group-hover:scale-90 group-hover:opacity-60"
                      src="/icons/placeholder-1.svg"
                      height={291}
                      width={396}
                      alt="placeholder image"
                    />
                    <div className="mt-5 flex w-full justify-between">
                      <h5 className="w-1/2 text-2xl leading-7 font-medium tracking-tighter transition-all ease-in-out group-hover:ml-4">
                        Benefit one goes here
                      </h5>
                      <Link href="/" className="relative-0 cursor-pointer">
                        <Button
                          data-slot="button"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive border shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2 bg-transparent has-[>svg]:px-3 h-12 w-12 rounded-full transition-all ease-in-out hover:bg-muted"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus scale-150"
                            aria-hidden="true"
                          >
                            <path d="<5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  role="group"
                  data-slot="carousel-item"
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative flex h-96 w-full items-end rounded-3xl bg-muted text-ellipsis">
                    <Image
                      className="absolute f-full opacity-100 transition-all ease-in-out group-hover:scale-90 group-hover:opacity-60"
                      src="/icons/placeholder-1.svg"
                      height={291}
                      width={396}
                      alt="placeholder image"
                    />
                    <div className="mt-5 flex w-full justify-between">
                      <h5 className="w-1/2 text-2xl leading-7 font-medium tracking-tighter transition-all ease-in-out group-hover:ml-4">
                        Benefit one goes here
                      </h5>
                      <Link href="/" className="relative-0 cursor-pointer">
                        <Button
                          data-slot="button"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive border shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2 bg-transparent has-[>svg]:px-3 h-12 w-12 rounded-full transition-all ease-in-out hover:bg-muted"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus scale-150"
                            aria-hidden="true"
                          >
                            <path d="<5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  role="group"
                  data-slot="carousel-item"
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative flex h-96 w-full items-end rounded-3xl bg-muted text-ellipsis">
                    <Image
                      className="absolute f-full opacity-100 transition-all ease-in-out group-hover:scale-90 group-hover:opacity-60"
                      src="/icons/placeholder-1.svg"
                      height={291}
                      width={396}
                      alt="placeholder image"
                    />
                    <div className="mt-5 flex w-full justify-between">
                      <h5 className="w-1/2 text-2xl leading-7 font-medium tracking-tighter transition-all ease-in-out group-hover:ml-4">
                        Benefit one goes here
                      </h5>
                      <Link href="/" className="relative-0 cursor-pointer">
                        <Button
                          data-slot="button"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive border shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2 bg-transparent has-[>svg]:px-3 h-12 w-12 rounded-full transition-all ease-in-out hover:bg-muted"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus scale-150"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex w-full items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">01</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">04</span>
              </div>
              <div className="relative mr-10 flex gap-2">
                <Button
                  data-slot="carousel-previous"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 absolute size-8 rounded-full top-1/2 -left-12 -translate-y-1/2 h-10 w-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-left"
                  >
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                  <span className="sr-only">Previous slide</span>
                </Button>
                <Button
                  data-slot="carousel-next"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none [&_svg:not([class*='size-4'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:bg-primary/80 hover:text-primary-foreground absolute size-8 rounded-full top-1/2 -right-12 -translate-y-1/2 h-10 w-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  <span className="sr-only">Next Slide</span>
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Features2;
