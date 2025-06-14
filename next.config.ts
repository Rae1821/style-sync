import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn*.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "annic.scene7.com",
      },
      {
        protocol: "https",
        hostname: "shukronline.com",
      },
    ],
  },
};

export default nextConfig;
