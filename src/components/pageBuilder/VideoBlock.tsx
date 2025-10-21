import type {VideoBlock as VideoBlockType} from '@/types/pageBuilder'

function getEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace('www.', '')

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        return url
      }
      const videoId = parsed.searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    if (host === 'youtu.be') {
      const cleanPath = parsed.pathname.replace(/^\/+/, '')
      return `https://www.youtube.com/embed/${cleanPath}`
    }

    if (host === 'vimeo.com') {
      const segments = parsed.pathname.split('/').filter(Boolean)
      const id = segments.pop()
      if (id) {
        return `https://player.vimeo.com/video/${id}`
      }
    }

    return url
  } catch (error) {
    console.warn('Kon video URL niet converteren:', error)
    return url
  }
}

interface VideoBlockProps {
  block: VideoBlockType
}

export default function VideoBlock({block}: VideoBlockProps) {
  const embedUrl = getEmbedUrl(block.videoUrl)
  const title = block.title || 'Video'

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative w-full overflow-hidden rounded-3xl bg-[rgb(var(--dc-text)/0.06)] shadow-lg">
        <div className="relative pt-[56.25%]">
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      {block.caption ? (
        <figcaption className="text-sm text-[rgb(var(--dc-text)/0.7)]">{block.caption}</figcaption>
      ) : null}
    </figure>
  )
}
