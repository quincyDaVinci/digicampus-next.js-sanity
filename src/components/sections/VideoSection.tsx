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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="space-y-3">
            <HybridBadge tone="accent" aria-hidden>
              Video
            </HybridBadge>
            {data.title ? (
              <h2 id="video-section-heading" className="text-3xl font-semibold">
                {data.title}
              </h2>
            ) : null}
            {data.description ? (
              <p className="max-w-3xl text-lg text-[rgb(var(--dc-text)/0.78)] dark:text-[rgb(var(--dc-text)/0.82)]">
                {data.description}
              </p>
            ) : null}
          </div>
          <figure className="flex flex-col gap-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-[rgb(var(--dc-border))] bg-[rgb(var(--dc-surface))] shadow-2xl">
              <iframe
                title={data.videoTitle || data.title || 'Informatieve video'}
                src={data.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-[1.45rem] border-0"
              />
            </div>
            {(data.videoTitle || data.title) && (
              <figcaption className="text-sm text-[rgb(var(--dc-text)/0.72)] dark:text-[rgb(var(--dc-text)/0.76)]">
                <span className="inline-flex items-center gap-2 font-semibold text-[rgb(var(--dc-text))] dark:text-[rgb(var(--dc-text))]">
                  <PlayIcon aria-hidden focusable="false" />
                  {data.videoTitle || data.title}
                </span>
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </HybridSection>
  )
}