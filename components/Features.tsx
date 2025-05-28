import Image from "next/image";
import { MdOutlineDiamond } from "react-icons/md";

const Features = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="gap mx-auto flex max-w-screen-sm flex-col justify-center items-center gap-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">What You Get</h1>
          <p className="text-xl text-muted-foreground md:text-lg">
            Discover the benefits of using our AI-powered fashion assistant.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative isolate h-80 flex flex-col justify-between gap-6 rounded-lg bg-muted/70 p-8 md:col-span-2 lg:col-span-2">
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary to-transparent"></div>
            <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-background/15 backdrop-blur-sm">
              <MdOutlineDiamond className="text-white size-6" />
            </span>

            <h2 className="mb-1 text-2xl font-medium">AI Style Sessions</h2>
            <p className="text-muted-foreground">
              Upload a photo of any clothing item and get immediate personalized
              style recommendations according to your body shape and fashion
              style.
            </p>
          </div>
          <div className="group relative isolate flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8">
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary to-transparent"></div>
            <Image
              src="/images/products.jpg"
              height={291}
              width={396}
              alt="placeholder image"
              className="absolute inset-0 -z-20 size-full rounded-2xl object-cover opacity-30 transition-transform duration-300"
            />
            <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-background/15 backdrop-blur-sm">
              <MdOutlineDiamond className="text-white size-6" />
            </span>
            <div>
              <h2 className="mb-1 text-2xl font-medium">Products Search</h2>
              <p className="text-muted-foreground">
                Hop over to our products page where you&asop;ll find
                personalized search terms for your body shape and fashions style
                to help you find the perfect items
              </p>
            </div>
          </div>
          <div className="flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8">
            <MdOutlineDiamond className="text-red-300 size-6" />
            <div>
              <h2 className="mb-1 text-2xl font-medium">Moodboard</h2>
              <p className="text-muted-foreground">
                Find your favorite products on our moodboard and add in your own
                photos to mix and match to your heart&apos;s content.
              </p>
            </div>
          </div>
          {/* <div className="flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8">
            <MdOutlineDiamond className="text-red-300 size-6" />
            <div>
              <h2 className="mb-1 text-2xl font-medium">Learning Corner</h2>
              <p className="text-muted-foreground">
                Coming soon! We are working on a learning corner where you can
                learn how to mix and match colors and prints in the most
                flattering way for your body shape and fashion style.
              </p>
            </div>
          </div> */}
          <div className="flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8 lg:col-span-2">
            <span className="flex size-12 items-center justify-center rounded-xl border border-background/20 bg-red-300/15 backdrop-blur-sm">
              <MdOutlineDiamond className="text-red-300 size-6" />
            </span>
            <div className="flex flex-col gap-4 lg:flex-row">
              <div>
                <h2 className="mb-1 text-2xl font-medium">
                  Personalized Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Your personalized dashboard is where you can find all your
                  favorite products, outfits, and style sessions in one place.
                </p>
              </div>
              <Image
                src="/images/dashboard-pic.png"
                height={291}
                width={396}
                alt="placeholder image"
                className="h-full min-h-0 rounded-lg object-cover transition-transform duration-300 hover:-translate-y-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
