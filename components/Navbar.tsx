import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex w-full items-center">
      <div>
        <ul className="flex w-full cursor-pointer flex-col items-start gap-5 text-sm font-semibold tracking-wider md:flex-row md:items-center md:justify-between">
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
          {!session?.user ? (
            <Link className="font-bold" href="/login">
              <div className="rounded-sm border-4 border-black bg-red-300 px-4 py-2 text-sm hover:bg-transparent">
                Login
              </div>
            </Link>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" className="cursor-pointer">
                Logout
              </Button>
            </form>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
