/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.freepik.com",
      "images.squarespace-cdn.com",
      "spring-boot-online-platform.herokuapp.com",
    ],
  },
  i18n: {
    locales: ["en", "de", "ru", "ch", "fr", "uk"],
    defaultLocale: "ru",
  },
};

module.exports = nextConfig;
