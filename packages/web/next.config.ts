import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [{protocol:'https', hostname:'cdn.sanity.io'}] },
  // Internationalization handled via App Router route groups (`src/app/[lang]/*`).
  // Removed `i18n` here because App Router manages routing and locale detection.
  
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
  
  // Enable path aliases to reference sanity utilities
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sanity': path.resolve(__dirname, 'src/sanity'),
    };
    return config;
  },
};


export default nextConfig;
