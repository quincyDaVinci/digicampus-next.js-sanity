import { groq } from 'next-sanity'

import CTABanner from '@/components/sections/CTABanner'
import HeroSection from '@/components/sections/HeroSection'
import HybridComponentGallery from '@/components/sections/HybridComponentGallery'
import PartnersMarquee from '@/components/sections/PartnersMarquee'
import ProjectsSection from '@/components/sections/ProjectsSection'
import RecentBlogsSection from '@/components/sections/RecentBlogsSection'
import TextImageSection from '@/components/sections/TextImageSection'
import VideoSection from '@/components/sections/VideoSection'
import { BlogPostCard, HomePageData } from '@/types/homepage'

const homePageQuery = groq`*[_type == "homePage"][0]{
  heroSection,
  videoSection,
  textWithImageSection,
  ctaBanner,
  blogSection,
  projectsSection,
  partnersSection,
  hybridComponents
}`

const recentPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "summary": coalesce(pt::text(body[0]), ""),
  "mainImage": mainImage{..., alt}
}`

const fallbackHomePage: HomePageData = {
  heroSection: {
    heading: 'Samen bouwen aan een toekomstbestendige digitale overheid',
    intro:
      'Digicampus is het innovatieplatform waar overheid, markt, wetenschap en samenleving samenwerken aan betrouwbare digitale diensten.',
    cta: {
      label: 'Ontdek onze labs',
      href: '/labs',
      ariaLabel: 'Ontdek onze labs bij Digicampus',
    },
    stylePreset: 'fresh',
  },
  videoSection: {
    title: 'Maak kennis met Digicampus',
    description:
      'Bekijk hoe wij experimenteren met nieuwe oplossingen voor inwoners, ondernemers en professionals.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/V1Pl8CzNzCw',
    videoTitle: 'Introductie Digicampus',
    stylePreset: 'structured',
  },
  textWithImageSection: {
    heading: 'Onze manier van samenwerken',
    body:
      'In onze labs combineren we onderzoek, ontwerp en uitvoering. Met partners testen we ideeën vroegtijdig met gebruikers en delen we inzichten open zodat iedereen kan meedoen.',
    imagePosition: 'right',
    stylePreset: 'fresh',
    cardTone: 'accent',
  },
  ctaBanner: {
    heading: 'Doe mee met onze innovatieprojecten',
    body:
      'Heb je een vraagstuk rondom digitale overheid? Sluit aan bij een bestaand traject of start samen een nieuw experiment.',
    cta: {
      label: 'Plan een kennismaking',
      href: '/contact',
      ariaLabel: 'Plan een kennismakingsafspraak met Digicampus',
    },
    stylePreset: 'contrast',
  },
  blogSection: {
    heading: 'Laatste nieuws',
    description: 'Blijf op de hoogte van onderzoeken, pilots en evenementen uit de Digicampus community.',
    maxPosts: 3,
    stylePreset: 'structured',
    cardTone: 'surface',
  },
  projectsSection: {
    heading: 'Projecten waar je ons van kent',
    description:
      'We werken zichtbaar aan digitale oplossingen die burgers en professionals daadwerkelijk helpen.',
    projects: [
      {
        title: 'Digitale identiteit',
        description:
          'Met publieke partners ontwerpen we toegankelijke en veilige manieren om online zaken te regelen.',
        link: {
          label: 'Lees meer',
          href: '/projecten/digitale-identiteit',
          ariaLabel: 'Lees meer over Digitale identiteit',
        },
        tone: 'surface',
      },
      {
        title: 'Datadelen met regie',
        description:
          'We verkennen hoe inwoners grip houden op hun gegevens wanneer organisaties samenwerken in ecosystemen.',
        link: {
          label: 'Bekijk initiatief',
          href: '/projecten/datadelen',
          ariaLabel: 'Bekijk initiatief Datadelen met regie',
        },
        tone: 'accent',
      },
      {
        title: 'Samenwerkende loketten',
        description:
          'Gemeenten en uitvoeringsorganisaties verbeteren de dienstverlening rondom levensgebeurtenissen.',
        link: {
          label: 'Ontdek het lab',
          href: '/projecten/loketten',
          ariaLabel: 'Ontdek het lab Samenwerkende loketten',
        },
        tone: 'contrast',
      },
    ],
    stylePreset: 'structured',
  },
  partnersSection: {
    heading: 'Partnerorganisaties',
    logos: [
      { name: 'Rijksoverheid' },
      { name: 'Gemeente Amsterdam' },
      { name: 'TU Delft' },
      { name: 'Logius' },
    ],
    stylePreset: 'fresh',
  },
  hybridComponents: [
    {
      _key: 'hybrid-feature-1',
      _type: 'hybridComponent',
      variant: 'feature',
      tone: 'surface',
      eyebrow: 'Innovatie in uitvoering',
      title: 'Co-creatie met partners',
      body: 'We brengen overheid, markt en wetenschap samen in labs waar prototypes snel met echte gebruikers worden getest.',
      icon: 'layers',
      cta: {
        label: 'Bekijk onze labs',
        href: '/labs',
        ariaLabel: 'Bekijk onze labs in de hybride bibliotheek',
      },
      stylePreset: 'structured',
    },
    {
      _key: 'hybrid-callout-1',
      _type: 'hybridComponent',
      variant: 'callout',
      tone: 'accent',
      eyebrow: 'Mee experimenteren',
      title: 'Start een gezamenlijk traject',
      body: 'Heb je een vraagstuk rondom publieke dienstverlening? Onze coaches helpen bij het vormgeven van een veilig experiment.',
      icon: 'flag',
      cta: {
        label: 'Plan een intake',
        href: '/contact',
        ariaLabel: 'Plan een intake voor een nieuw traject',
      },
      stylePreset: 'fresh',
    },
    {
      _key: 'hybrid-feature-2',
      _type: 'hybridComponent',
      variant: 'feature',
      tone: 'contrast',
      eyebrow: 'Kennisdeling',
      title: 'Open inzichten voor iedereen',
      body: 'Alle lessen en resultaten publiceren we toegankelijk, zodat andere organisaties kunnen versnellen.',
      icon: 'book-open',
      stylePreset: 'structured',
    },
  ],
}

const fallbackPosts: BlogPostCard[] = []

export default async function Page() {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let homePageData: HomePageData | null = null
  let posts: BlogPostCard[] = []

  if (hasSanityCredentials) {
    try {
      const { client } = await import('@sanity/lib/client') //@/../sanity/lib/client
      homePageData = await client.fetch<HomePageData | null>(homePageQuery)
      const blogLimit = homePageData?.blogSection?.maxPosts ?? 3
      posts = (await client.fetch<BlogPostCard[] | null>(recentPostsQuery, { limit: blogLimit })) ?? []
    } catch (error) {
      console.error('Kon homepage gegevens niet uit Sanity laden:', error)
    }
  }

  const pageData = homePageData ?? fallbackHomePage
  const blogPosts = posts.length > 0 ? posts : fallbackPosts

  return (
    <div className="flex flex-col">
      <a href="#main" className="skip-link sr-only focus:not-sr-only">Ga naar hoofdinhoud</a>
      <HeroSection data={pageData.heroSection} />
      <VideoSection data={pageData.videoSection} />
      <TextImageSection data={pageData.textWithImageSection} />
      <CTABanner data={pageData.ctaBanner} />
      <RecentBlogsSection data={pageData.blogSection} posts={blogPosts} />
      <ProjectsSection data={pageData.projectsSection} />
      <PartnersMarquee data={pageData.partnersSection} />
      <HybridComponentGallery components={pageData.hybridComponents} />
    </div>
  )
}