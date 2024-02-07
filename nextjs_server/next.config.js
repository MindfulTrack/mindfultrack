/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['picsum.photos', 'picsum', 'mindfultrack.org'],
      
    },
  };
  
  module.exports = nextConfig;

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
  