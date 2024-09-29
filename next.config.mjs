/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
};

// Wrap MDX and Next.js config with each other
export default nextConfig;
