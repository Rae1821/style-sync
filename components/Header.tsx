import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
// import { cookies } from "next/headers";

const Header = async () => {
  // const userCookies = await cookies();
  // const user = userCookies.get("user");

  return (
    <header className="mx-auto flex w-full max-w-[1300px] items-center justify-between p-4 sm:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/logo-2.png" alt="logo" width={100} height={100} />
        {/* <p className="font-semibold">Style Sync</p> */}
      </Link>
      <div className="flex">
        <div className="hidden md:flex md:items-center md:justify-end md:gap-4">
          <Navbar />
        </div>

        <div className="flex items-center justify-end gap-4 md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
