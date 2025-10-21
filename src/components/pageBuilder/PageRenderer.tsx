import type {ReactNode} from 'react'

import ButtonBlock from './ButtonBlock'
import ImageBlock from './ImageBlock'
import RichTextBlock from './RichTextBlock'
import VideoBlock from './VideoBlock'
import type {PageComponent, PageDocument} from '@/types/pageBuilder'

function renderComponent(component: PageComponent): ReactNode {
  switch (component._type) {
    case 'richTextComponent':
      return <RichTextBlock component={component} />
    case 'imageComponent':
      return <ImageBlock component={component} />
    case 'videoComponent':
      return <VideoBlock component={component} />
    case 'buttonComponent':
      return <ButtonBlock component={component} />
    default:
      return null
  }
}

export default function PageRenderer({page}: {page: PageDocument}) {
  if (!page.blocks?.length) {
    return <p className="px-6 py-12 text-[rgb(var(--dc-text))]">Deze pagina heeft nog geen inhoud.</p>
  }

  return (
    <div className="flex flex-col gap-10">
      {page.blocks.map((block) => (
        <div key={block._key}>{renderComponent(block)}</div>
      ))}
    </div>
  )
}
