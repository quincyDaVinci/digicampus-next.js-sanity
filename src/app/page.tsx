import { groq } from 'next-sanity'

import CTABanner from '@/components/sections/CTABanner'
import HeroSection from '@/components/sections/HeroSection'
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
  partnersSection
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
    cta: { label: 'Ontdek onze labs', href: '/labs' },
  },
  videoSection: {
    title: 'Maak kennis met Digicampus',
    description:
      'Bekijk hoe wij experimenteren met nieuwe oplossingen voor inwoners, ondernemers en professionals.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/V1Pl8CzNzCw',
    videoTitle: 'Introductie Digicampus',
  },
  textWithImageSection: {
    heading: 'Onze manier van samenwerken',
    body:
      'In onze labs combineren we onderzoek, ontwerp en uitvoering. Met partners testen we ideeën vroegtijdig met gebruikers en delen we inzichten open zodat iedereen kan meedoen.',
    imagePosition: 'right',
  },
  ctaBanner: {
    heading: 'Doe mee met onze innovatieprojecten',
    body:
      'Heb je een vraagstuk rondom digitale overheid? Sluit aan bij een bestaand traject of start samen een nieuw experiment.',
    cta: { label: 'Plan een kennismaking', href: '/contact' },
  },
  blogSection: {
    heading: 'Laatste nieuws',
    description: 'Blijf op de hoogte van onderzoeken, pilots en evenementen uit de Digicampus community.',
    maxPosts: 3,
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
        link: { label: 'Lees meer', href: '/projecten/digitale-identiteit' },
      },
      {
        title: 'Datadelen met regie',
        description:
          'We verkennen hoe inwoners grip houden op hun gegevens wanneer organisaties samenwerken in ecosystemen.',
        link: { label: 'Bekijk initiatief', href: '/projecten/datadelen' },
      },
      {
        title: 'Samenwerkende loketten',
        description:
          'Gemeenten en uitvoeringsorganisaties verbeteren de dienstverlening rondom levensgebeurtenissen.',
        link: { label: 'Ontdek het lab', href: '/projecten/loketten' },
      },
    ],
  },
  partnersSection: {
    heading: 'Partnerorganisaties',
    logos: [
      { name: 'Rijksoverheid' },
      { name: 'Gemeente Amsterdam' },
      { name: 'TU Delft' },
      { name: 'Logius' },
    ],
  },
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
    </div>
  )
}