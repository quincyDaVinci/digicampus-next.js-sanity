"use client";

import type { LogoCloudSectionProps } from "@/types/sections";
import { buildSrc } from 'sanity-image';
import Link from 'next/link';

export default function LogoCloudSection(props: LogoCloudSectionProps) {
    const { title, logos = [], grayscale = false } = props;

    return (
        <section className="w-full py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6">
                {title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-[hsl(var(--dc-text))] mb-12">
                        {title}
                    </h2>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    {logos.map((logo, idx) => {
                        // Build image URL
                        const imageUrl = (() => {
                            if (!logo.image || (typeof logo.image === 'object' && !logo.image.asset)) return null;
                            try {
                                const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
                                const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
                                const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined;
                                const asset = logo.image.asset;
                                let assetId: string | undefined;
                                if (typeof asset === 'string') {
                                    assetId = asset;
                                } else if (asset && typeof asset === 'object') {
                                    const maybe = asset as { _ref?: string; _id?: string };
                                    assetId = maybe._ref || maybe._id;
                                }
                                if (assetId && baseUrl) {
                                    const srcObj = buildSrc({ id: assetId, baseUrl, width: 400, height: 200, mode: 'cover' });
                                    return srcObj?.src ?? null;
                                }
                            } catch (err) {
                                return null;
                            }
                            return null;
                        })();

                        if (!imageUrl) return null;

                        const logoImage = (
                            <img
                                src={imageUrl}
                                alt={logo.alt || ''}
                                className={`w-full h-auto max-w-[120px] sm:max-w-[140px] object-contain transition-all duration-300 ${grayscale ? 'grayscale hover:grayscale-0 opacity-70 hover:opacity-100' : 'opacity-80 hover:opacity-100'
                                    }`}
                                loading="lazy"
                            />
                        );

                        return (
                            <div key={logo._key || idx} className="flex items-center justify-center">
                                {logo.url ? (
                                    <Link
                                        href={logo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded"
                                    >
                                        {logoImage}
                                    </Link>
                                ) : (
                                    logoImage
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
