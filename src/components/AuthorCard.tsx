"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type AuthorCardProps = {
  author: {
    _id: string
    name: string
    slug?: string
    role?: string
    company?: string
  }
  authorImageUrl?: string | null
}

export default function AuthorCard({ author, authorImageUrl }: AuthorCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/auteur/${author.slug || author._id}`}
      className="group mb-8 flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] focus-visible:ring-offset-2"
      style={{
        backgroundColor: isHovered ? 'hsl(var(--dc-brand) / 0.08)' : 'hsl(var(--dc-surface-98))',
        border: `1px solid ${isHovered ? 'hsl(var(--dc-brand) / 0.3)' : 'hsl(var(--dc-border) / 0.2)'}`,
        transition: 'all 0.3s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {authorImageUrl ? (
        <Image
          src={authorImageUrl}
          alt={author.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-[hsl(var(--dc-border)/0.4)] transition-all duration-300 group-hover:scale-105 group-hover:ring-[hsl(var(--dc-brand)/0.5)]"
        />
      ) : (
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: 'hsl(var(--dc-brand)/0.15)',
            color: 'hsl(var(--dc-brand))',
          }}
          aria-hidden
        >
          {author.name.charAt(0)}
        </div>
      )}
      <div>
        <div
          className="font-semibold transition-colors duration-300"
          style={{ color: isHovered ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-text))' }}
        >
          {author.name}
        </div>
        {author.role && (
          <div className="text-sm" style={{ color: 'hsl(var(--dc-text) / 0.7)' }}>
            {author.role}
            {author.company && ` bij ${author.company}`}
          </div>
        )}
      </div>
    </Link>
  )
}
