import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3000"
      }
    ]
  }
};

export default nextConfig;
