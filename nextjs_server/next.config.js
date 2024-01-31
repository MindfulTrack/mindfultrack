/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['picsum.photos', 'picsum'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',

        }
      ],
    },
  };
  
  module.exports = nextConfig;