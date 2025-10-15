import { VideoSectionData } from '@/types/homepage'

interface VideoSectionProps {
  data?: VideoSectionData
}

export default function VideoSection({ data }: VideoSectionProps) {
  if (!data?.videoUrl) {
    return null
  }

  return (
    <section
      aria-labelledby="video-section-heading"
      className="bg-dc-surface-98"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.title ? (
          <h2
            id="video-section-heading"
            className="text-3xl font-semibold text-[rgb(var(--dc-on-surface))]"
          >
            {data.title}
          </h2>
        ) : null}
        {data.description ? (
          <p className="mt-4 max-w-3xl text-lg text-[rgb(var(--dc-on-surface-variant))]">
            {data.description}
          </p>
        ) : null}
        <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-[rgb(var(--dc-surface))] shadow-lg">
          <iframe
            title={data.videoTitle || data.title || 'Informatieve video'}
            src={data.videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  )
}