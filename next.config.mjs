/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    domains:['lh3.googleusercontent.com',"res.cloudinary.com"]
  },
  typescript:{ignoreBuildErrors:true}
};

export default nextConfig;
