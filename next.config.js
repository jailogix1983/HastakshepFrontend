/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH
      : "",
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };
  //   return config;
  // },
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["www.youtube.com", "localhost", "i.ytimg.com", "hastakshep.com"],
  },
  compress: false,
  trailingSlash: true,
};

