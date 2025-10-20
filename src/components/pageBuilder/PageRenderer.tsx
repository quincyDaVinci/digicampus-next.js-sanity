import type {CSSProperties, ReactNode} from 'react'

import BackgroundLayer from './BackgroundLayer'
import BlogCard from './BlogCard'
import ButtonBlock from './ButtonBlock'
import Carousel from './Carousel'
import ImageBlock from './ImageBlock'
import RichTextBlock from './RichTextBlock'
import VideoBlock from './VideoBlock'
import type {PageComponent, PageDocument, PageSection} from '@/types/pageBuilder'

const paddingYMap = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
} as const

const paddingXMap = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
} as const

const contentWidthMap = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-7xl',
  full: 'max-w-none w-full',
} as const

const componentSpacingMap = {
  tight: 'space-y-4',
  normal: 'space-y-6',
  relaxed: 'space-y-10',
} as const

function renderComponent(component: PageComponent, depth = 0): ReactNode {
  if (!component?._type) return null
  if (depth > 3) return null

  switch (component._type) {
    case 'richTextComponent':
      return <RichTextBlock component={component} />
    case 'imageComponent':
      return <ImageBlock component={component} />
    case 'videoComponent':
      return <VideoBlock component={component} />
    case 'buttonComponent':
      return <ButtonBlock component={component} />
    case 'blogCardComponent':
      return <BlogCard component={component} />
    case 'carouselComponent': {
      if (!component.items?.length) return null
      const renderedItems = component.items
        .map((item) => renderComponent(item as PageComponent, depth + 1))
        .filter(Boolean) as ReactNode[]
      if (!renderedItems.length) return null
      return (
        <Carousel
          ariaLabel={component.ariaLabel}
          autoPlay={component.autoPlay}
          interval={component.interval}
          showIndicators={component.showIndicators}
          spacing={component.spacing}
        >
          {renderedItems}
        </Carousel>
      )
    }
    default:
      return null
  }
}

function SectionContainer({section, children}: {section: PageSection; children: ReactNode}) {
  const layout = section.layout ?? {}
  const paddingY = layout.paddingY ? paddingYMap[layout.paddingY] : paddingYMap.lg
  const paddingX = layout.paddingX ? paddingXMap[layout.paddingX] : paddingXMap.md
  const contentWidth = layout.contentWidth ? contentWidthMap[layout.contentWidth] : contentWidthMap.default
  const horizontalAlignment = layout.horizontalAlignment ?? 'left'

  const alignmentClass =
    horizontalAlignment === 'center'
      ? 'items-center'
      : horizontalAlignment === 'right'
        ? 'items-end'
        : 'items-start'

  const containerClasses = [
    'relative z-10 mx-auto flex w-full flex-col',
    alignmentClass,
    paddingX,
    contentWidth,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={`relative ${paddingY}`}>
      {section.background ? <BackgroundLayer background={section.background} /> : null}
      <div className={containerClasses} style={{color: 'rgb(var(--dc-text))'}}>
        {section.title ? (
          <h2 className="mb-8 text-fluid-lg font-semibold text-[rgb(var(--dc-navy))]">
            {section.title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  )
}

export default function PageRenderer({page}: {page: PageDocument}) {
  if (!page.sections?.length) {
    return <p className="px-6 py-12 text-[rgb(var(--dc-text))]">Deze pagina heeft nog geen inhoud.</p>
  }

  return (
    <div className="flex flex-col gap-12">
      {page.sections.map((section) => {
        const columns = section.columns ?? []

        const gridTemplate = columns.length > 1
          ? columns
              .map((column) => {
                switch (column.width) {
                  case '1/2':
                    return 'minmax(0, 1fr)'
                  case '1/3':
                    return 'minmax(0, 1fr)'
                  case '2/3':
                    return 'minmax(0, 2fr)'
                  default:
                    return 'minmax(0, 1fr)'
                }
              })
              .join(' ')
          : undefined

        return (
          <SectionContainer key={section._key} section={section}>
            <div
              className={`${columns.length > 1 ? 'grid gap-8 md:gap-10' : 'flex flex-col'} w-full`}
              style={gridTemplate ? ({gridTemplateColumns: gridTemplate} as CSSProperties) : undefined}
            >
              {columns.map((column) => {
                const spacingClass = column.componentSpacing ? componentSpacingMap[column.componentSpacing] : componentSpacingMap.normal
                const verticalAlignment = column.verticalAlignment ?? 'flex-start'
                let justifyContent = verticalAlignment
                if (column.placement === 'bottom') justifyContent = 'flex-end'
                if (column.placement === 'top') justifyContent = 'flex-start'
                const alignItems = column.horizontalAlignment ?? 'flex-start'
                const computedAlignItems = column.placement === 'left' ? 'flex-start' : column.placement === 'right' ? 'flex-end' : alignItems

                return (
                  <div
                    key={column._key}
                    className={`flex flex-col ${spacingClass}`}
                    style={{
                      justifyContent,
                      alignItems: computedAlignItems,
                    }}
                  >
                    {column.components?.map((component) => (
                      <div key={component._key}>{renderComponent(component, 0)}</div>
                    ))}
                  </div>
                )
              })}
            </div>
          </SectionContainer>
        )
      })}
    </div>
  )
}
