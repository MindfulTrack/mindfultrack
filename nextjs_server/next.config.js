/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['picsum.photos', 'picsum', 'mindfultrack.org'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',

        }
      ],
    },
  };
  
  module.exports = nextConfig;