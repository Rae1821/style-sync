import { navLinks } from "@/constants";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

const Navbar = async () => {
  const userCookies = await cookies();
  const user = userCookies.get("user");
  return (
    <nav className="flex w-full items-center">
      <div>
        <ul className="flex w-full cursor-pointer flex-col items-start gap-5 text-sm font-semibold tracking-wider md:flex-row md:items-center md:justify-between">
          {!user ? (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <Link href="/login">
                <div className="rounded-sm border-4 border-black bg-red-300 px-6 py-2 text-sm hover:bg-transparent">
                  Login
                </div>
              </Link>
            </>
          ) : (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.route}>
                  <Link
                    href={link.route}
                    className="over:underline hover:decoration-teal-300 hover:decoration-2 hover:underline-offset-2 hover:transition-all hover:duration-300 hover:ease-in"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <Logout />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
