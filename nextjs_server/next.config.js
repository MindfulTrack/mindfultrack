/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['picsum.photos', 'picsum', 'mindfultrack.org', 'mindfultrack-files.s3.us-east-2.amazonaws.com'],
    },
    env: {
      region: "us-east-2",
      accessKeyId: "AKIA5FTZDMMVVOJPP4F6",
      secretAccessKey: "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",
    }
  };
  
  module.exports = nextConfig;