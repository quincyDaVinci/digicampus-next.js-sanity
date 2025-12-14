"use client";

import type { SectionHeaderProps } from "@/types/sections";

export default function SectionHeader(props: SectionHeaderProps) {
    const { tagline, title, body, alignment = 'center' } = props;

    const alignmentClass = alignment === 'center' ? 'text-center mx-auto' : 'text-left';
    const maxWidthClass = alignment === 'center' ? 'max-w-3xl' : 'max-w-4xl';

    return (
        <section className="w-full py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6">
                <div className={`flex flex-col gap-4 ${alignmentClass} ${maxWidthClass}`}>
                    {tagline && (
                        <span className="text-sm font-semibold text-[hsl(var(--dc-brand))] uppercase tracking-wide">
                            {tagline}
                        </span>
                    )}

                    {title && (
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--dc-text))]">
                            {title}
                        </h2>
                    )}

                    {body && (
                        <p className="text-lg text-[hsl(var(--dc-text-muted))] leading-relaxed mt-2">
                            {body}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
