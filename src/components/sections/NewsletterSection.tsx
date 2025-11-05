"use client";

import type { NewsletterSectionProps } from "@/types/sections";

export default function NewsletterSection(props: NewsletterSectionProps) {
  const { heading, subheading, badgeText, inputPlaceholder, buttonText } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 items-center text-center bg-muted rounded-lg p-14">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {badgeText}
            </div>
          )}
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {subheading && <p className="text-muted-foreground max-w-xl">{subheading}</p>}
          <form className="flex gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder={inputPlaceholder || "Enter your email"}
              className="flex-1 border rounded-md px-4 py-2"
            />
            <button
              type="submit"
              className="rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap"
              style={{ backgroundColor: "rgb(var(--dc-primary))", color: "white" }}
            >
              {buttonText || "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
