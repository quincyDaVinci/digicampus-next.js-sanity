import type {VideoComponent} from '@/types/pageBuilder'

interface VideoBlockProps {
  component: VideoComponent
}

export default function VideoBlock({component}: VideoBlockProps) {
  const showControls = component.showControls ?? true
  const muted = component.muted ?? true
  const autoPlay = component.autoPlay ?? false
  const loop = component.loop ?? false
  const title = component.title || 'Video'
  const transcriptId = component.transcript ? `${component._key}-transcript` : undefined

  return (
    <section className="w-full space-y-4" aria-label={title}>
      <div className="relative w-full overflow-hidden rounded-3xl bg-[rgb(var(--dc-text)/0.06)] shadow-lg">
        {component.sourceType === 'file' && component.videoFile?.asset?.url ? (
          <video
            className="h-full w-full object-cover"
            controls={showControls}
            muted={muted}
            autoPlay={autoPlay}
            loop={loop}
            playsInline
            aria-describedby={transcriptId}
            poster={component.poster?.asset?.url}
          >
            <source src={component.videoFile.asset.url} />
            {component.captionsFile?.asset?.url ? (
              <track
                kind="captions"
                src={component.captionsFile.asset.url}
                srcLang="nl"
                label="Nederlands"
                default
              />
            ) : null}
          </video>
        ) : component.videoUrl ? (
          <div className="relative pt-[56.25%]">
            <iframe
              src={component.videoUrl}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </div>
      {component.transcript ? (
        <details
          id={transcriptId}
          className="rounded-2xl border border-[rgb(var(--dc-border)/0.35)] bg-[rgb(var(--dc-surface))] p-4 text-sm leading-relaxed text-[rgb(var(--dc-text))]"
        >
          <summary className="cursor-pointer font-semibold text-[rgb(var(--dc-brand))]">Transcript</summary>
          <p className="mt-2 whitespace-pre-wrap">{component.transcript}</p>
        </details>
      ) : null}
    </section>
  )
}
