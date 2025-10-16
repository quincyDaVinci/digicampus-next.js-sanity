import { PlayIcon } from '@/components/icons/FeatherIcons'
import { HybridBadge, HybridCard, HybridSection } from '@/components/ui/HybridComponents'
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
        <HybridCard as="article" tone="surface" className="gap-6">
          <div>
            <HybridBadge tone="accent" aria-hidden>
              Video
            </HybridBadge>
            {data.title ? (
              <h2 id="video-section-heading" className="mt-3 text-3xl font-semibold">
                {data.title}
              </h2>
            ) : null}
            {data.description ? (
              <p className="mt-3 max-w-3xl text-lg text-[rgb(var(--dc-text)/0.78)] dark:text-[rgb(var(--dc-text)/0.82)]">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--dc-border)/0.2)] bg-[rgb(var(--dc-surface))] shadow-2xl">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[rgb(var(--dc-primary)/0.08)] to-transparent">
              <span className="sr-only">Video overlay</span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--dc-primary)/0.85)] text-[rgb(var(--dc-on-primary))] shadow-lg">
                <PlayIcon aria-hidden focusable="false" width="2em" height="2em" />
              </span>
            </div>
            <iframe
              title={data.videoTitle || data.title || 'Informatieve video'}
              src={data.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video h-full w-full border-0"
            />
          </div>
        </HybridCard>
      </div>
    </HybridSection>
  )
}