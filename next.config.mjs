/** @type import('next').NextConfig */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cinephoria.jeremysnnk.ovh',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};
export default nextConfig;
