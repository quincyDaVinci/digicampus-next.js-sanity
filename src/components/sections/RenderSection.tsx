"use client";

import React from "react";

// Import new section routers
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import BlogSection from "./BlogSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import NewsletterSection from "./NewsletterSection";
import MediaSection from "./MediaSection";
import DocumentAssetSection from "./DocumentAssetSection";
import TeamSection from "./TeamSection";

// Import existing pageBuilder component renderers
import RichTextBlock from "../pageBuilder/RichTextBlock";
import ImageBlock from "../pageBuilder/ImageBlock";
import VideoBlock from "../pageBuilder/VideoBlock";
import ButtonBlock from "../pageBuilder/ButtonBlock";
import BlogCard from "../pageBuilder/BlogCard";
import Carousel from "../pageBuilder/Carousel";

// Import types
import type { SectionProps } from "@/types/sections";
import type { PageComponent } from "@/types/pageBuilder";

interface RenderSectionProps {
  section: SectionProps | PageComponent | {_type: string; _key: string; [key: string]: unknown}
}

/**
 * RenderSection - Unified section renderer
 * Handles both new modular sections and existing pageBuilder components
 */
export default function RenderSection({ section }: RenderSectionProps) {
  // Route to the appropriate component based on _type
  switch (section._type) {
    // New modular sections
    case "heroSection":
      return <HeroSection {...(section as Extract<SectionProps, {_type: 'heroSection'}>)} />;
    case "featureSection":
      return <FeatureSection {...(section as Extract<SectionProps, {_type: 'featureSection'}>)} />;
    case "blogSection":
      return <BlogSection {...(section as Extract<SectionProps, {_type: 'blogSection'}>)} />;
    case "testimonialsSection":
      return <TestimonialsSection {...(section as Extract<SectionProps, {_type: 'testimonialsSection'}>)} />;
    case "pricingSection":
      return <PricingSection {...(section as Extract<SectionProps, {_type: 'pricingSection'}>)} />;
    case "ctaSection":
      return <CTASection {...(section as Extract<SectionProps, {_type: 'ctaSection'}>)} />;
    case "faqSection":
      return <FAQSection {...(section as Extract<SectionProps, {_type: 'faqSection'}>)} />;
    case "contactSection":
      return <ContactSection {...(section as Extract<SectionProps, {_type: 'contactSection'}>)} />;
    case "newsletterSection":
      return <NewsletterSection {...(section as Extract<SectionProps, {_type: 'newsletterSection'}>)} />;
    case "mediaSection":
      return <MediaSection {...(section as Extract<SectionProps, {_type: 'mediaSection'}>)} />;
    case "documentAsset":
      return <DocumentAssetSection {...(section as Extract<SectionProps, {_type: 'documentAsset'}>)} />;
    case "teamSection":
      return <TeamSection {...(section as Extract<SectionProps, {_type: 'teamSection'}>)} />;

    // Existing pageBuilder component types
    case "richTextComponent":
      return <RichTextBlock component={section as Extract<PageComponent, {_type: 'richTextComponent'}>} />;
    case "imageComponent":
      return <ImageBlock component={section as Extract<PageComponent, {_type: 'imageComponent'}>} />;
    case "videoComponent":
      return <VideoBlock component={section as Extract<PageComponent, {_type: 'videoComponent'}>} />;
    case "buttonComponent":
      return <ButtonBlock component={section as Extract<PageComponent, {_type: 'buttonComponent'}>} />;
    case "blogCardComponent":
      return <BlogCard component={section as Extract<PageComponent, {_type: 'blogCardComponent'}>} />;
    case "carouselComponent": {
      const carouselSection = section as Extract<PageComponent, {_type: 'carouselComponent'}>;
      return (
        <Carousel
          ariaLabel={carouselSection.ariaLabel}
          autoPlay={carouselSection.autoPlay}
          interval={carouselSection.interval}
          showIndicators={carouselSection.showIndicators}
          spacing={carouselSection.spacing}
        >
          {carouselSection.items.map((item) => (
            <RenderSection key={item._key} section={item} />
          ))}
        </Carousel>
      );
    }

    // Unknown type
    default:
      console.warn(`Unknown section type: ${section._type}`);
      return null;
  }
}

