import type {SchemaPluginOptions} from 'sanity'

// Documents
import site from './documents/site'
import page from './documents/page'
import homePage from './documents/homePage'
import blogPost from './documents/blogPost'
import blogCategory from './documents/blogCategory'
import navigation from './documents/navigation'
import author from './documents/author'
import tag from './documents/tag'

// Objects
import metadata from './objects/metadata'
import link from './objects/link'
import linkList from './objects/linkList'
import cta from './objects/cta'
import moduleAttributes from './objects/moduleAttributes'

// Modules (Sections from sane-kit)
import heroSection from './modules/heroSection'
import featureSection from './modules/featureSection'
import blogSection from './modules/blogSection'
import statsSection from './modules/statsSection'
import testimonialsSection from './modules/testimonialsSection'
import pricingSection from './modules/pricingSection'
import casesSection from './modules/casesSection'
import ctaSection from './modules/ctaSection'
import faqSection from './modules/faqSection'
import contactSection from './modules/contactSection'
import newsletterSection from './modules/newsletterSection'
import compareFeaturesSection from './modules/compareFeaturesSection'
import compareFeature from './modules/compareFeature'
import mediaSection from './modules/mediaSection'

export const schema: SchemaPluginOptions = {
  types: [
    // Documents
    site,
    page,
    homePage,
    blogPost,
    blogCategory,
    navigation,
    author,
  tag,

    // Objects
    metadata,
    link,
    linkList,
    cta,
    moduleAttributes,

    // Modules (Sections)
    heroSection,
    featureSection,
    blogSection,
    statsSection,
    testimonialsSection,
    pricingSection,
    casesSection,
    ctaSection,
    faqSection,
    contactSection,
    newsletterSection,
    compareFeaturesSection,
    compareFeature,
    mediaSection,
  ],
}

// Document types that should only have one instance
const singletonTypes = ['site', 'homePage', 'navigation']
