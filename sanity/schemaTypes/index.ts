import type {SchemaPluginOptions} from 'sanity'

// Documents
import site from './documents/site'
import page from './documents/page'
import homePage from './documents/homePage'
import blogPage from './documents/blogPage'
import blogPost from './documents/blogPost'
import blogCategory from './documents/blogCategory'
import navigation from './documents/navigation'
import author from './documents/author'
import teamCategory from './documents/teamCategory'
import teamSettings from './documents/teamSettings'
import tag from './documents/tag'
import siteSettings from './documents/siteSettings'

// Objects
import metadata from './objects/metadata'
import link from './objects/link'
import linkList from './objects/linkList'
import cta from './objects/cta'
import moduleAttributes from './objects/moduleAttributes'
import blogPostTranslation from './objects/blogPostTranslation'
import moduleTextOverride from './objects/moduleTextOverride'

// Modules (Sections from sane-kit)
import heroSection from './modules/heroSection'
import featureSection from './modules/featureSection'
import blogSection from './modules/blogSection'
import testimonialsSection from './modules/testimonialsSection'
import pricingSection from './modules/pricingSection'
import ctaSection from './modules/ctaSection'
import faqSection from './modules/faqSection'
import contactSection from './modules/contactSection'
import newsletterSection from './modules/newsletterSection'
import mediaSection from './modules/mediaSection'
import documentAsset from './modules/documentAsset'
import teamSection from './modules/teamSection'

export const schema: SchemaPluginOptions = {
  types: [
    // Documents
    site,
    page,
    homePage,
    blogPage,
    blogPost,
    blogCategory,
    navigation,
    author,
    teamCategory,
    teamSettings,
    tag,
    siteSettings,

    // Objects
    metadata,
    link,
    linkList,
    cta,
    moduleAttributes,
    blogPostTranslation,
    moduleTextOverride,
    // Modules (Sections)
    heroSection,
    featureSection,
    blogSection,
    testimonialsSection,
    pricingSection,
    ctaSection,
    faqSection,
    contactSection,
    newsletterSection,
    mediaSection,
    documentAsset,
    teamSection,
  ],
}

// Document types that should only have one instance
const singletonTypes = ['site', 'homePage', 'blogPage']
