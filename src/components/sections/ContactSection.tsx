"use client";

import type { ContactSectionProps } from "@/types/sections";

export default function ContactSection(props: ContactSectionProps) {
  const { heading, badgeText, description } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit">
              {badgeText}
            </div>
          )}
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
          <form className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-md px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-md px-4 py-2"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="border rounded-md px-4 py-2"
            />
            <button
              type="submit"
              className="rounded-md px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "hsl(var(--dc-primary))", color: "white" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

