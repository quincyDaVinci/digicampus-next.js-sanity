import type {VideoComponent} from '@/types/pageBuilder'

interface VideoBlockProps {
  component: VideoComponent
}

export default function VideoBlock({component}: VideoBlockProps) {
  const title = component.title || 'Video'
  const transcriptId = component.transcript ? `${component._key}-transcript` : undefined
  const posterUrl = component.poster?.asset?.url
  const captionsDataUrl = component.transcript
    ? `data:text/vtt;charset=utf-8,${encodeURIComponent(`WEBVTT\n\n00:00.000 --> 01:00.000\n${component.transcript}`)}`
    : undefined

  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(component.videoUrl)
  const hasTranscript = Boolean(component.transcript)

  return (
    <section className="w-full space-y-4" aria-label={title}>
      <div className="relative w-full overflow-hidden rounded-2xl bg-[rgb(var(--dc-text)/0.06)] shadow-lg">
        {isDirectVideo ? (
          hasTranscript ? (
            <video
              className="h-full w-full object-cover"
              controls
              poster={posterUrl}
              aria-describedby={transcriptId}
            >
              <source src={component.videoUrl} />
              <track kind="captions" src={captionsDataUrl!} srcLang="nl" label="Transcript" default />
            </video>
          ) : (
            <div className="p-6 text-sm text-[rgb(var(--dc-text))]">
              Voeg een transcript toe om deze video af te spelen.
            </div>
          )
        ) : (
          <div className="relative pt-[56.25%]">
            <iframe
              src={component.videoUrl}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
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
