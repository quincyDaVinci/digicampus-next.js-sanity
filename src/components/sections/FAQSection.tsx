"use client";

import type { FAQSectionProps } from "@/types/sections";

export default function FAQSection(props: FAQSectionProps) {
  const { heading, subheading, badgeText, faqItems = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            {badgeText && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4">
                {badgeText}
              </div>
            )}
            {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
            {subheading && <p className="text-muted-foreground mt-4">{subheading}</p>}
          </div>
          <div className="max-w-3xl mx-auto w-full space-y-4 mt-8">
            {faqItems.map((item) => (
              <details key={item._key} className="border rounded-lg p-4">
                <summary className="font-medium cursor-pointer">{item.question}</summary>
                <p className="text-muted-foreground mt-2">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
