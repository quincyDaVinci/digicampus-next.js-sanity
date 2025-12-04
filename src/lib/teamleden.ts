import type { SanityImageSource } from '@sanity/image-url'

export type TeamMember = {
  _key: string
  name?: string
  position?: string
  category?: string
  // image can be a Sanity image object or a simple url string (for local preview)
  image?: string | { asset?: SanityImageSource; alt?: string }
}

export const TEAMLEDEN: TeamMember[] = [
  {
    _key: 't-1',
    name: 'Dr. Anna Jansen',
    position: 'Research Lead',
    category: 'innovatoren',
    image: '/assets/images/placeholder-avatar-1.png',
  },
  {
    _key: 't-2',
    name: 'Pieter van Dijk',
    position: 'Promovendus',
    category: 'promovendi',
    image: '/assets/images/placeholder-avatar-2.png',
  },
  {
    _key: 't-3',
    name: 'Dr. Sarah Lee',
    position: 'Associate Researcher',
    category: 'associate researchers',
    image: '/assets/images/placeholder-avatar-3.png',
  },
  {
    _key: 't-4',
    name: 'Mohammed Ali',
    position: 'Student Researcher',
    category: 'students',
    image: '/assets/images/placeholder-avatar-4.png',
  },
  {
    _key: 't-5',
    name: 'Prof. Ellen de Vries',
    position: 'Voorzitter',
    category: 'bestuurders',
    image: '/assets/images/placeholder-avatar-5.png',
  },
]

export default TEAMLEDEN
