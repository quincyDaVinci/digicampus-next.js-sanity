import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{protocol:'https', hostname:'cdn.sanity.io'}] },
  
  // Allow the site to be embedded in iframes from Sanity Studio
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.sanity.io https://*.sanity.build",
          },
        ],
      },
    ]
  },
};


export default nextConfig;
