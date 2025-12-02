"use client";

import React from "react";
import Image from "next/image";
import type { TeamSectionProps } from "@/types/sections";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { buildImageUrl } from "@/lib/sanityImage";

export default function TeamSection({ heading, subheading, autoIncludeAll, allTeamMembers = [], teamSettings }: TeamSectionProps) {
  // Since manual member selection and exclusions are handled on the author documents,
  // this section only respects `autoIncludeAll`. When disabled, the section renders no members.
  type Member = NonNullable<TeamSectionProps['allTeamMembers']>[number]
  let effectiveMembers: Member[] = []
  if (autoIncludeAll) {
    effectiveMembers = (allTeamMembers || []).filter((m) => (m?.includeInTeam !== false)) as Member[]
  } else {
    effectiveMembers = []
  }

  // Group members by category (category may be a referenced document or a legacy string)
  const groups: Record<string, Member[]> = {};
  effectiveMembers.forEach((m) => {
    if (!m) return
    let catKey = 'uncategorized'
    if (typeof m.category === 'string') {
      catKey = m.category.toString().toLowerCase()
    } else if (m.category && typeof m.category === 'object') {
      const c = m.category as { _id?: string; title?: string; slug?: { current?: string } }
      catKey = c._id || (c.slug && c.slug.current) || (c.title || 'uncategorized').toString().toLowerCase()
    }
    if (!groups[catKey]) groups[catKey] = [];
    groups[catKey].push(m as Member);
  });

  // Build ordered list of category keys based on teamSettings if provided
  const settingsOrder = (teamSettings && Array.isArray(teamSettings.categoriesOrder))
    ? teamSettings.categoriesOrder.map((c: any) => c._id || (c.slug && c.slug.current) || (c.title || '').toString().toLowerCase())
    : [];
  const remainingKeys = Object.keys(groups).filter(k => !settingsOrder.includes(k));
  const renderOrder = [...settingsOrder.filter(k => groups[k]), ...remainingKeys];

  return (
    <section aria-labelledby="team-heading" className="py-12">
      <div className="container mx-auto px-4">
        {heading && <h2 id="team-heading" className="text-2xl font-semibold mb-2">{heading}</h2>}
        {subheading && <p className="text-muted mb-6">{subheading}</p>}

        {renderOrder.map((catKey) => {
          const items = groups[catKey] || [];
          if (!items.length) return null;
          // determine label from first member's category object or fallback to settings or key
          const first = items[0];
          const label = typeof first.category === 'string'
            ? first.category
            : (first.category && (first.category as any).title) || (teamSettings && teamSettings.defaultCategoryTitle) || catKey;
          return (
            <div key={catKey} className="mb-8">
              <h3 className="text-lg font-medium mb-4">{label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((member) => {
                  const imageUrl = buildImageUrl(((member.image as { asset?: SanityImageSource })?.asset) || undefined) || undefined;
                  const imageAlt = (member.image && typeof member.image !== 'string' ? (member.image as { alt?: string })?.alt : undefined) || member.name || "team member";
                  const key = member._id || (member as any)._key || member.name;
                  return (
                    <article key={String(key)} className="flex items-center gap-4 bg-dc-surface-98 p-4 rounded">
                      <div className="w-16 h-16 relative shrink-0 rounded-full overflow-hidden bg-gray-100">
                        {imageUrl ? (
                          <Image src={imageUrl} alt={imageAlt} fill sizes="64px" className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-600">{(member.name || "").split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{member.name}</div>
                        <div className="text-sm text-muted">{member.position}</div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )
        })}

        {/* Fallback: if there are effectiveMembers but none matched the configured categories, show them */}
        {effectiveMembers.length > 0 && (() => {
          const displayedCount = Object.keys(groups).reduce((sum, k) => sum + (groups[k]?.length || 0), 0)
          if (displayedCount === 0) {
            return (
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Other team members</h3>
                <p className="text-sm text-muted mb-3">No members matched the configured categories; showing all members as a fallback.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {effectiveMembers.map((member) => {
                    const imageUrl = buildImageUrl(((member.image as { asset?: SanityImageSource })?.asset) || undefined) || undefined;
                    const imageAlt = (member.image && typeof member.image !== 'string' ? (member.image as { alt?: string })?.alt : undefined) || member.name || "team member";
                    const key = member._id || (member as any)._key || member.name;
                    return (
                      <article key={String(key)} className="flex items-center gap-4 bg-dc-surface-98 p-4 rounded">
                        <div className="w-16 h-16 relative shrink-0 rounded-full overflow-hidden bg-gray-100">
                          {imageUrl ? (
                            <Image src={imageUrl} alt={imageAlt} fill sizes="64px" className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-600">{(member.name || "").split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-muted">{member.position} — {typeof member.category === 'string' ? member.category : (member.category as any)?.title}</div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            )
          }
          return null
        })()}

        {effectiveMembers.length === 0 && (
          <div className="text-sm text-muted mt-4">
            {autoIncludeAll ? (
              <span>No team members found. Check authors have <strong>Include in team listings</strong> enabled in the Studio.</span>
            ) : (
              <span>Team auto-include is disabled for this section. Enable it in the Studio to show members.</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
