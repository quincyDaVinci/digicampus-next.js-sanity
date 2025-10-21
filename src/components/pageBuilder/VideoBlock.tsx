import type {VideoComponent} from '@/types/pageBuilder'

interface VideoBlockProps {
  component: VideoComponent
}

export default function VideoBlock({component}: VideoBlockProps) {
  const transcriptId = component.transcript ? `${component._key}-transcript` : undefined

  return (
    <section className="w-full space-y-4" aria-label={component.title}>
      <div className="relative overflow-hidden rounded-2xl bg-[rgb(var(--dc-bg-soft))] shadow-lg">
        <div className="relative pt-[56.25%]">
          <iframe
            src={component.videoUrl}
            title={component.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            aria-describedby={transcriptId}
          />
        </div>
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
