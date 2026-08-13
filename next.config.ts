import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.postimg.cc",
      },
      {
        hostname: "example.com",
      },
    ],
  },
}

export default nextConfig
