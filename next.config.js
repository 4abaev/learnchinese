/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.timeweb.com",
      },
      {
        protocol: 'https',
        hostname: 'backend-learnshinese.ru',
        pathname: '/**',
      },
    ],
  },
};
