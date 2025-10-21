import type {ReactNode} from 'react'

import ButtonBlock from './ButtonBlock'
import ImageBlock from './ImageBlock'
import RichTextBlock from './RichTextBlock'
import VideoBlock from './VideoBlock'
import type {PageComponent, PageDocument} from '@/types/pageBuilder'

function renderBlock(block: PageComponent): ReactNode {
  switch (block._type) {
    case 'richTextComponent':
      return <RichTextBlock component={block} />
    case 'imageComponent':
      return <ImageBlock component={block} />
    case 'videoComponent':
      return <VideoBlock component={block} />
    case 'buttonComponent':
      return <ButtonBlock component={block} />
    default:
      return null
  }
}

export default function PageRenderer({page}: {page: PageDocument}) {
  const blocks = page.blocks ?? []

  if (!blocks.length) {
    return <p className="px-6 py-12 text-[rgb(var(--dc-text))]">Deze pagina heeft nog geen inhoud.</p>
  }

  return (
    <div className="flex flex-col gap-12 py-12">
      {blocks.map((block) => {
        const rendered = renderBlock(block)
        if (!rendered) return null
        return (
          <div key={block._key} className="px-6">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 text-[rgb(var(--dc-text))]">
              {rendered}
            </div>
          </div>
        )
      })}
    </div>
  )
}
