/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    IMG_UPLOAD_LINK: process.env.IMG_UPLOAD_LINK,
  },
};

module.exports = nextConfig;
