import { navLinks } from '@/constants'
import { cookies } from 'next/headers';
import Link from 'next/link'
import React from 'react'
import Logout from './Logout';

const Navbar = async () => {
     const userCookies = await cookies();
        const user = userCookies.get('user');
  return (
    <nav className="flex w-full items-center">
        <div>
            <ul className="flex w-full cursor-pointer flex-col items-start gap-5 text-sm font-semibold tracking-wider md:flex-row md:items-center md:justify-between">
                {navLinks.map((link) => (
                    <li key={link.route}>
                        <Link href={link.route} className="over:underline hover:decoration-teal-300 hover:decoration-2 hover:underline-offset-2 hover:transition-all hover:duration-300 hover:ease-in">
                        {link.label}</Link>
                    </li>
                ))}
                {!user ? (
                    <>
                        <li>
                            <Link href="/dashboard" className="over:underline hover:decoration-teal-300 hover:decoration-2 hover:underline-offset-2 hover:transition-all hover:duration-300 hover:ease-in">
                            Dashboard</Link>
                        </li>
                        <li><Logout /></li>
                    </>
                ) : (
                    <Link href="/login">Login Here</Link>
                )}
            </ul>
        </div>
      
    </nav>
  )
}

export default Navbar
