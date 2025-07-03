/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["blob.v0.dev"],
    unoptimized: true,
  },
  trailingSlash: true,
  output: "export",
  distDir: "out",
}

module.exports = nextConfig
