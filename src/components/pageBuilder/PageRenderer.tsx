import type {ReactNode} from 'react'

import ButtonBlock from './ButtonBlock'
import ImageBlock from './ImageBlock'
import TextBlock from './TextBlock'
import VideoBlock from './VideoBlock'
import type {PageBlock, PageDocument} from '@/types/pageBuilder'

function renderBlock(block: PageBlock): ReactNode {
  switch (block._type) {
    case 'textBlock':
      return <TextBlock block={block} />
    case 'imageBlock':
      return <ImageBlock block={block} />
    case 'videoBlock':
      return <VideoBlock block={block} />
    case 'buttonBlock':
      return <ButtonBlock block={block} />
    default:
      return null
  }
}

export default function PageRenderer({page}: {page: PageDocument}) {
  if (!page.blocks?.length) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-center text-[rgb(var(--dc-text))]">
        Deze pagina heeft nog geen inhoud. Voeg een blok toe in Sanity om te beginnen.
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12">
      {page.blocks.map((block) => {
        const rendered = renderBlock(block)
        if (!rendered) return null
        return (
          <section key={block._key} className="w-full">
            {rendered}
          </section>
        )
      })}
    </div>
  )
}
