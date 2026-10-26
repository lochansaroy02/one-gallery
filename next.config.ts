import type { NextConfig } from "next";

// a static site: `next build` writes plain HTML, CSS and JS to out/
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
