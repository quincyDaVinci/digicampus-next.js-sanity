import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{protocol:'https', hostname:'cdn.sanity.io'}] },
  
  // Remove X-Frame-Options to allow embedding in Sanity Studio
  // Use CSP frame-ancestors for more control
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sanity.io https://*.sanity.studio https://vercel.app https://*.vercel.app",
          },
        ],
      },
    ]
  },
};


export default nextConfig;
