"use client";

// import { logout } from "@/actions/auth";

import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear cookies on the client side
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to home page
    router.push("/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="rounded-sm border-4 border-black bg-red-300 px-6 py-2 text-sm hover:bg-transparent"
    >
      Logout
    </button>
  );
};

export default Logout;
