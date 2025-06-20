/** @type {import('next').NextConfig} */
const nextConfig = {
  // CSS files are now handled natively by Next.js
  // No need for additional CSS plugins or cssLoaderOptions
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: false
  }
}

export default nextConfig
