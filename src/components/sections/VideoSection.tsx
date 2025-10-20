import { PlayIcon } from '@/components/icons/FeatherIcons'
import { HybridBadge, HybridSection } from '@/components/ui/HybridComponents'
import { VideoSectionData } from '@/types/homepage'

interface VideoSectionProps {
  data?: VideoSectionData
}

export default function VideoSection({ data }: VideoSectionProps) {
  if (!data?.videoUrl) {
    return null
  }

  return (
    <HybridSection aria-labelledby="video-section-heading" variant={data.stylePreset ?? 'structured'}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="space-y-4">
            <HybridBadge tone="accent" aria-hidden>
              Video
            </HybridBadge>
            {data.title ? (
              <h2 id="video-section-heading" className="text-3xl font-semibold">
                {data.title}
              </h2>
            ) : null}
            {data.description ? (
              <p className="max-w-3xl text-lg text-[rgb(var(--dc-text)/0.88)] dark:text-[rgb(var(--dc-text)/0.9)]">
                {data.description}
              </p>
            ) : null}
          </div>
          <figure className="flex flex-col gap-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-[rgb(var(--dc-primary)/0.65)] bg-[rgb(var(--dc-surface))] shadow-xl">
              <iframe
                title={data.videoTitle || data.title || 'Informatieve video'}
                src={data.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
            {data.videoTitle ? (
              <figcaption className="text-sm text-[rgb(var(--dc-text)/0.85)] dark:text-[rgb(var(--dc-text)/0.88)]">
                <PlayIcon aria-hidden focusable="false" className="mr-2 inline h-4 w-4" />
                {data.videoTitle}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </HybridSection>
  )
}