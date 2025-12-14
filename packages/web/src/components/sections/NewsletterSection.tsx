"use client";

import type { NewsletterSectionProps } from "@/types/sections";
import { useState, FormEvent } from "react";

export default function NewsletterSection(props: NewsletterSectionProps) {
  const { heading, subheading, badgeText, inputPlaceholder, buttonText } = props;
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormStatus("success");
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 items-center text-center bg-muted rounded-lg p-14">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {badgeText}
            </div>
          )}
          {heading && (
            <h2 id="newsletter-heading" className="text-3xl md:text-5xl tracking-tighter">
              {heading}
            </h2>
          )}
          {subheading && (
            <p id="newsletter-description" className="text-muted-foreground max-w-xl">
              {subheading}
            </p>
          )}
          
          <form 
            className="flex flex-col sm:flex-row gap-2 w-full max-w-md"
            onSubmit={handleSubmit}
            aria-labelledby="newsletter-heading"
            aria-describedby="newsletter-description"
          >
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputPlaceholder || "Enter your email"}
                required
                aria-required="true"
                aria-describedby={formStatus === "error" ? "newsletter-error" : undefined}
                aria-invalid={formStatus === "error"}
                className="w-full border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow"
                disabled={formStatus === "submitting" || formStatus === "success"}
              />
            </div>
            <button
              type="submit"
              disabled={formStatus === "submitting" || formStatus === "success"}
              className="rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap ring-dc-focus focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: "hsl(var(--dc-primary))", color: "white" }}
              aria-busy={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? "Subscribing..." : formStatus === "success" ? "Subscribed!" : (buttonText || "Subscribe")}
            </button>
          </form>

          {formStatus === "success" && (
            <div 
              role="status" 
              aria-live="polite"
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md px-4 py-3 text-sm w-full max-w-md"
            >
              ✓ Thank you for subscribing! Check your inbox for confirmation.
            </div>
          )}

          {formStatus === "error" && (
            <div 
              id="newsletter-error"
              role="alert" 
              aria-live="assertive"
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md px-4 py-3 text-sm w-full max-w-md"
            >
              ✗ Something went wrong. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

