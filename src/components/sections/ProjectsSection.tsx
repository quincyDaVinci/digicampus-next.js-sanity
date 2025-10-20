import Image from 'next/image'

import { ArrowRightIcon } from '@/components/icons/FeatherIcons'
import { HybridBadge, HybridCard, HybridLinkButton, HybridSection } from '@/components/ui/HybridComponents'
import { urlForImage } from '@/lib/sanityImage'
import { ProjectsSectionData } from '@/types/homepage'

interface ProjectsSectionProps {
  data?: ProjectsSectionData
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data) {
    return null
  }

  const { heading, description, projects, stylePreset } = data

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <HybridSection aria-labelledby="projects-heading" variant={stylePreset ?? 'structured'}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4">
          {heading ? (
            <h2 id="projects-heading" className="text-3xl font-semibold">
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-3xl text-lg text-[rgb(var(--dc-text)/0.78)] dark:text-[rgb(var(--dc-text)/0.82)]">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const hasValidImage = project.image && typeof project.image === 'object' && 'asset' in project.image
            const imageUrl = hasValidImage ? urlForImage(project.image)?.width(600).height(400).fit('max').url() : null
            const tone = project.tone ?? 'surface'

            return (
              <HybridCard key={`${project.title ?? 'project'}-${index}`} tone={tone} className="h-full overflow-hidden">
                {imageUrl ? (
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-[rgb(var(--dc-border))] bg-[rgb(var(--dc-surface))] p-4">
                    <Image
                      src={imageUrl}
                      alt={project.image?.alt || ''}
                      fill
                      sizes="(min-width: 1280px) 20rem, (min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                ) : null}
                <div className="hy-card__content flex-1">
                  <HybridBadge tone={tone === 'contrast' ? 'contrast' : tone === 'accent' ? 'accent' : 'muted'} aria-hidden>
                    Project
                  </HybridBadge>
                  {project.title ? (
                    <h3 className="text-xl font-semibold text-[rgb(var(--dc-text))] dark:text-[rgb(var(--dc-text))]">
                      {project.title}
                    </h3>
                  ) : null}
                  {project.description ? (
                    <p className="text-base text-[rgb(var(--dc-text)/0.75)] dark:text-[rgb(var(--dc-text)/0.8)]">
                      {project.description}
                    </p>
                  ) : null}
                </div>
                {project.link?.href && project.link.label ? (
                  <HybridLinkButton
                    href={project.link.href}
                    variant="secondary"
                    icon={<ArrowRightIcon aria-hidden focusable="false" />}
                    className="self-start"
                    aria-label={
                      project.link.ariaLabel ?? `${project.link.label} - ${project.title ?? 'Project'}`
                    }
                  >
                    {project.link.label}
                  </HybridLinkButton>
                ) : null}
              </HybridCard>
            )
          })}
        </div>
      </div>
    </HybridSection>
  )
}
