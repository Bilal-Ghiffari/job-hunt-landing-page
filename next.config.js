/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "okickjuxalflcjoxrszt.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
