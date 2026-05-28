/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Bütün TypeScript xətalarını keç
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint xətalarını görməzdən gəl
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
