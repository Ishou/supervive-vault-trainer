// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["geist"],
  experimental: {
    swcPlugins: [["swc-plugin-coverage-instrument", {}]],
  },
};

module.exports = nextConfig;
