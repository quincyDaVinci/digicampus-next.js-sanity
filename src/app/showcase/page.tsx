"use client";

import RenderSection from "@/components/sections/RenderSection";
import type { SectionProps } from "@/types/sections";

/**
 * Component Showcase Page
 * Displays all section components with different variants and filler content
 */
export default function ShowcasePage() {
  // Mock sections data with filler content
  const sections: SectionProps[] = [
    // Hero Section - Button Banner variant
    {
      _type: "heroSection",
      _key: "hero-1",
      variant: "buttonBanner",
      badgeText: "🎉 New Release",
      heading: "Build Better Digital Experiences",
      subheading: "Create stunning websites with our modular component system. Fast, accessible, and beautiful by default.",
      buttons: [
        {
          _key: "btn-1",
          label: "Get Started",
          url: "#",
          variant: "default",
          icon: "arrowRight",
        },
        {
          _key: "btn-2",
          label: "View Demo",
          url: "#",
          variant: "outline",
        },
      ],
    },

    // Hero Section - Badge Banner variant
    {
      _type: "heroSection",
      _key: "hero-2",
      variant: "badgeBanner",
      badgeText: "✨ Featured",
      heading: "Transform Your Digital Presence",
      subheading: "Leverage powerful components to create engaging user experiences that convert visitors into customers.",
      buttons: [
        {
          _key: "btn-3",
          label: "Learn More",
          url: "#",
          variant: "secondary",
        },
      ],
    },

    // Feature Section - Grid variant
    {
      _type: "featureSection",
      _key: "feature-1",
      variant: "grid",
      badgeText: "Features",
      heading: "Everything You Need to Succeed",
      subheading: "Powerful features designed to help you build amazing digital experiences without compromise.",
      features: [
        {
          _key: "feat-1",
          title: "Lightning Fast",
          description: "Optimized for performance with Next.js 15 and Turbopack. Your users will love the speed.",
          icon: "zap",
        },
        {
          _key: "feat-2",
          title: "Fully Accessible",
          description: "WCAG 2.1 AA compliant components with proper ARIA labels and keyboard navigation support.",
          icon: "accessibility",
        },
        {
          _key: "feat-3",
          title: "Dark Mode",
          description: "Beautiful dark mode support built-in with seamless theme switching and preference persistence.",
          icon: "moon",
        },
        {
          _key: "feat-4",
          title: "Responsive Design",
          description: "Mobile-first approach ensures your site looks great on any device, from phone to desktop.",
          icon: "smartphone",
        },
        {
          _key: "feat-5",
          title: "TypeScript",
          description: "Fully typed with TypeScript for better developer experience and fewer runtime errors.",
          icon: "code",
        },
        {
          _key: "feat-6",
          title: "Sanity CMS",
          description: "Integrated with Sanity for powerful content management with real-time collaboration.",
          icon: "database",
        },
      ],
    },

    // Stats Section
    {
      _type: "statsSection",
      _key: "stats-1",
      heading: "Trusted by Developers Worldwide",
      subheading: "Join thousands of teams building better digital experiences.",
      stats: [
        {
          _key: "stat-1",
          value: "10k+",
          label: "Active Users",
        },
        {
          _key: "stat-2",
          value: "99.9%",
          label: "Uptime",
        },
        {
          _key: "stat-3",
          value: "500+",
          label: "Components",
        },
        {
          _key: "stat-4",
          value: "24/7",
          label: "Support",
        },
      ],
    },

    // Testimonials Section
    {
      _type: "testimonialsSection",
      _key: "testimonials-1",
      heading: "What Our Clients Say",
      subheading: "Don't just take our word for it. Here's what real users have to say about our platform.",
      testimonials: [
        {
          _key: "test-1",
          quote: "This platform has completely transformed how we build websites. The component system is incredibly intuitive and saves us hours of development time.",
          name: "Sarah Johnson",
          title: "CTO, TechStart Inc.",
        },
        {
          _key: "test-2",
          quote: "The accessibility features are outstanding. We can finally deliver WCAG compliant sites without the usual headaches. Highly recommended!",
          name: "Michael Chen",
          title: "Lead Developer, AccessFirst",
        },
        {
          _key: "test-3",
          quote: "Best investment we've made this year. The dark mode implementation is flawless and our users love the new design.",
          name: "Emma Williams",
          title: "Product Manager, DesignHub",
        },
      ],
    },

    // Pricing Section
    {
      _type: "pricingSection",
      _key: "pricing-1",
      heading: "Simple, Transparent Pricing",
      subheading: "Choose the plan that fits your needs. All plans include core features.",
      plans: [
        {
          _key: "plan-1",
          title: "Starter",
          price: "€29/mo",
          description: "Perfect for small projects and personal sites.",
        },
        {
          _key: "plan-2",
          title: "Professional",
          price: "€79/mo",
          description: "Ideal for growing businesses and teams.",
        },
        {
          _key: "plan-3",
          title: "Enterprise",
          price: "Custom",
          description: "Advanced features for large organizations.",
        },
      ],
    },

    // CTA Section
    {
      _type: "ctaSection",
      _key: "cta-1",
      badgeText: "Limited Time Offer",
      heading: "Ready to Get Started?",
      subheading: "Join thousands of teams already building better digital experiences. Start your free trial today.",
      buttons: [
        {
          _key: "cta-btn-1",
          label: "Start Free Trial",
          url: "#",
        },
        {
          _key: "cta-btn-2",
          label: "Contact Sales",
          url: "#",
        },
      ],
    },

    // FAQ Section
    {
      _type: "faqSection",
      _key: "faq-1",
      badgeText: "FAQ",
      heading: "Frequently Asked Questions",
      subheading: "Everything you need to know about our platform and services.",
      faqItems: [
        {
          _key: "faq-q1",
          question: "How do I get started?",
          answer: "Getting started is easy! Sign up for a free account, choose your template, and start building. Our documentation will guide you through the process.",
        },
        {
          _key: "faq-q2",
          question: "Do you offer a free trial?",
          answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required.",
        },
        {
          _key: "faq-q3",
          question: "Can I cancel anytime?",
          answer: "Absolutely. You can cancel your subscription at any time from your account settings. No questions asked.",
        },
        {
          _key: "faq-q4",
          question: "What kind of support do you provide?",
          answer: "We offer 24/7 email support for all plans, live chat for Professional and Enterprise plans, and priority support for Enterprise customers.",
        },
        {
          _key: "faq-q5",
          question: "Is my data secure?",
          answer: "Yes! We take security seriously. All data is encrypted in transit and at rest, and we perform regular security audits.",
        },
      ],
    },

    // Contact Section
    {
      _type: "contactSection",
      _key: "contact-1",
      badgeText: "Get in Touch",
      heading: "Let's Work Together",
      description: "Have questions or want to discuss a project? We'd love to hear from you. Fill out the form and we'll get back to you within 24 hours.",
    },

    // Newsletter Section
    {
      _type: "newsletterSection",
      _key: "newsletter-1",
      badgeText: "Newsletter",
      heading: "Stay Updated",
      subheading: "Subscribe to our newsletter for the latest updates, tips, and exclusive content delivered to your inbox.",
      inputPlaceholder: "Enter your email",
      buttonText: "Subscribe",
    },

    // Compare Features Section
    {
      _type: "compareFeaturesSection",
      _key: "compare-1",
      badgeText: "Comparison",
      heading: "Compare Our Plans",
      subheading: "See which features are included in each plan to find the perfect fit for your needs.",
    },

    // Media Section - Image variant
    {
      _type: "mediaSection",
      _key: "media-1",
      variant: "contained",
      heading: "Beautiful Visual Content",
      description: "Showcase your work with stunning images and videos. Support for multiple aspect ratios and display variants.",
      mediaType: "image",
      aspectRatio: "16:9",
      maxWidth: "lg",
      rounded: true,
      shadow: true,
    },

    // Cases Section
    {
      _type: "casesSection",
      _key: "cases-1",
      heading: "Success Stories",
      subheading: "See how leading companies use our platform to build amazing digital experiences.",
      cases: [
        {
          _key: "case-1",
          name: "TechCorp Redesign",
        },
        {
          _key: "case-2",
          name: "E-commerce Platform",
        },
        {
          _key: "case-3",
          name: "SaaS Dashboard",
        },
      ],
    },

    // Blog Section
    {
      _type: "blogSection",
      _key: "blog-1",
      heading: "Latest from Our Blog",
      subheading: "Insights, tutorials, and best practices for building better digital experiences.",
      variant: "grid",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-dc">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Component Showcase
            </h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive gallery of all available section components with different variants and filler content.
              Use this page to visualize how components look with real content.
            </p>
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-24">
          {sections.map((section, index) => (
            <div key={section._key} className="space-y-4">
              {/* Section Label */}
              <div className="flex items-center gap-4">
                <div className="bg-dc-primary/10 text-dc-primary px-3 py-1 rounded-full text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {section._type.replace(/Section$/, "").replace(/([A-Z])/g, " $1").trim()}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Type: <code className="bg-dc-surface-98 px-2 py-0.5 rounded">{section._type}</code>
                    {(section as any).variant && (
                      <span className="ml-2">
                        • Variant: <code className="bg-dc-surface-98 px-2 py-0.5 rounded">{(section as any).variant}</code>
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Section Component */}
              <div className="border border-dc rounded-lg overflow-hidden">
                <RenderSection section={section} />
              </div>

              {/* Divider */}
              {index < sections.length - 1 && (
                <div className="divider-dc my-12" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t border-dc mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              This showcase demonstrates all available section components with realistic content.
            </p>
            <p className="text-sm">
              To create pages with these sections, use the Sanity Studio at{" "}
              <code className="bg-dc-surface-98 px-2 py-0.5 rounded">/geheimelocatie</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
