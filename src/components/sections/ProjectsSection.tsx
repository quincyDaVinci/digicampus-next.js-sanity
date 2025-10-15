import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '@/lib/sanityImage'
import { ProjectsSectionData } from '@/types/homepage'

interface ProjectsSectionProps {
  data?: ProjectsSectionData
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data) {
    return null
  }

  const { heading, description, projects } = data

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="bg-dc-surface-98" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {heading ? (
          <h2 id="projects-heading" className="text-3xl font-semibold text-[rgb(var(--dc-on-surface))]">
            {heading}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-4 max-w-3xl text-lg text-[rgb(var(--dc-on-surface-variant))]">
            {description}
          </p>
        ) : null}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            // Check if image has a valid asset reference
            const hasValidImage = project.image && typeof project.image === 'object' && 'asset' in project.image
            const imageUrl = hasValidImage ? urlForImage(project.image)?.width(600).height(400).fit('crop').url() : null

            return (
              <article
                key={`${project.title ?? 'project'}-${index}`}
                className={[
                  'flex h-full flex-col overflow-hidden rounded-3xl border border-dc',
                  'bg-[rgb(var(--dc-surface))] shadow-sm',
                ].join(' ')}
              >
                {imageUrl ? (
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={imageUrl}
                      alt={project.image?.alt || ''}
                      fill
                      sizes="(min-width: 1280px) 20rem, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  {project.title ? (
                    <h3 className="text-xl font-semibold text-[rgb(var(--dc-on-surface))]">
                      {project.title}
                    </h3>
                  ) : null}
                  {project.description ? (
                    <p className="mt-4 text-base text-[rgb(var(--dc-on-surface-variant))]">
                      {project.description}
                    </p>
                  ) : null}
                  {project.link?.href && project.link.label ? (
                    <div className="mt-auto pt-6">
                      <Link
                        href={project.link.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--dc-primary))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-primary)/0.4)]"
                      >
                        {project.link.label}
                        <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}