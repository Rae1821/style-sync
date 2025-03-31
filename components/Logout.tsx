"use client";

// import { logout } from "@/actions/auth";

import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        // Clear cookies on the client side
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirect to login page
        router.push('/login');
    }
  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
