// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Example: allow Next/Image to load from picsum (you mentioned this earlier)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  },

  // No alias needed for "@/": TypeScript handles it via tsconfig paths
  // webpack(config) { return config }
}

export default nextConfig
