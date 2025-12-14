"use client";

import type { ContactSectionProps } from "@/types/sections";
import { useState, FormEvent } from "react";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/lib/translations";

export default function ContactSection(props: ContactSectionProps) {
  const { heading, badgeText, description } = props;
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const pathname = usePathname();
  const lang = pathname?.split('/')?.[1] === 'en' ? 'en' : 'nl';
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormStatus("success");
    
    // Reset after 3 seconds
    setTimeout(() => setFormStatus("idle"), 3000);
  };

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
          
          <form 
            className="flex flex-col gap-4 mt-4" 
            onSubmit={handleSubmit}
            aria-label={t('contactFormLabel')}
          >
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="contact-name" 
                className="text-sm font-medium"
              >
                {t('nameLabel')} <span className="text-red-600" aria-label={t('required')}>*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder={t('namePlaceholder')}
                required
                aria-required="true"
                className="border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow"
                disabled={formStatus === "submitting"}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label 
                htmlFor="contact-email" 
                className="text-sm font-medium"
              >
                {t('emailLabel')} <span className="text-red-600" aria-label={t('required')}>*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                required
                aria-required="true"
                aria-describedby="email-hint"
                className="border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow"
                disabled={formStatus === "submitting"}
              />
              <span id="email-hint" className="text-xs text-muted-foreground">
                {t('emailHint')}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label 
                htmlFor="contact-message" 
                className="text-sm font-medium"
              >
                {t('messageLabel')} <span className="text-red-600" aria-label={t('required')}>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={t('messagePlaceholder')}
                rows={5}
                required
                aria-required="true"
                className="border border-dc rounded-md px-4 py-2 ring-dc-focus focus:outline-none focus:ring-2 transition-shadow resize-vertical"
                disabled={formStatus === "submitting"}
              />
            </div>

            {formStatus === "success" && (
              <div 
                role="status" 
                aria-live="polite"
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md px-4 py-3 text-sm"
              >
                {t('successMessage')}
              </div>
            )}

            {formStatus === "error" && (
              <div 
                role="alert" 
                aria-live="assertive"
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md px-4 py-3 text-sm"
              >
                {t('errorMessage')}
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="rounded-md px-4 py-2 text-sm font-medium ring-dc-focus focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: "hsl(var(--dc-primary))", color: "white" }}
              aria-busy={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? t('sending') : t('sendMessage')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

