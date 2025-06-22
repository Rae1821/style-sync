import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

import Navbar from "./Navbar";
import { Separator } from "./ui/separator";

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild className="align-middle">
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-6 bg-white md:hidden z-1000">
          <SheetHeader className="flex flex-row items-center pb-0">
            <SheetTitle>
              {" "}
              <div className="flex items-end">
                <Image
                  src="/images/logo-2.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </div>
            </SheetTitle>
          </SheetHeader>
          <Separator className="bg-neutral-100" />

          <div className="pl-8">
            <Navbar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
