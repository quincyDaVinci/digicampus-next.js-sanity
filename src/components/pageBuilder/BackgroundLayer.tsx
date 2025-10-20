import type {CSSProperties} from 'react'

import {urlFor} from '@sanity/lib/image'

import type {BackgroundComponent} from '@/types/pageBuilder'

import {tokenToCss} from './colorUtils'

interface BackgroundLayerProps {
  background?: BackgroundComponent | null
  className?: string
}

export default function BackgroundLayer({background, className}: BackgroundLayerProps) {
  if (!background) return null

  const baseStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const layers: string[] = []
  let backgroundColor: string | undefined

  if (background.mode === 'color') {
    backgroundColor = tokenToCss(background.colorToken) ?? background.customColor ?? tokenToCss('surface')
  }

  if (background.mode === 'gradient') {
    const first = background.customColor ?? tokenToCss(background.colorToken) ?? tokenToCss('brand')
    const second = tokenToCss(background.secondaryColorToken) ?? tokenToCss('primary') ?? first
    layers.push(`linear-gradient(135deg, ${first}, ${second})`)
  }

  if (background.mode === 'image' && background.image?.asset) {
    const tintColor = tokenToCss(background.imageTint, background.imageTintOpacity ?? 0.45)
    if (tintColor) {
      layers.push(`linear-gradient(${tintColor}, ${tintColor})`)
    }
    const imageUrl = urlFor(background.image).width(2400).fit('max').auto('format').url()
    if (imageUrl) {
      layers.push(`url(${imageUrl})`)
    }
  }

  if (background.mode === 'texture') {
    const base = tokenToCss(background.colorToken) ?? 'rgb(var(--dc-bg-soft))'
    backgroundColor = base
    const patternColor = tokenToCss('brand', 0.1) ?? 'rgba(0,0,0,0.05)'
    switch (background.texture) {
      case 'dots':
        layers.push(
          `radial-gradient(circle at 1px 1px, ${patternColor} 1px, transparent 0)`,
        )
        baseStyle.backgroundSize = '24px 24px'
        break
      case 'grid':
        layers.push(
          `linear-gradient(${patternColor} 1px, transparent 0), linear-gradient(90deg, ${patternColor} 1px, transparent 0)`,
        )
        baseStyle.backgroundSize = '32px 32px'
        break
      case 'diagonal':
        layers.push(`repeating-linear-gradient(135deg, transparent, transparent 16px, ${patternColor} 16px, ${patternColor} 32px)`)
        break
      default:
        layers.push(`linear-gradient(${patternColor}, ${patternColor})`)
        break
    }
  }

  if (background.overlay) {
    const overlayColor = tokenToCss(background.overlay, background.overlayOpacity ?? 0.32)
    if (overlayColor) {
      layers.unshift(`linear-gradient(${overlayColor}, ${overlayColor})`)
    }
  }

  if (!layers.length && !backgroundColor) {
    backgroundColor = 'rgb(var(--dc-bg-soft))'
  }

  const style: CSSProperties = {
    ...baseStyle,
    backgroundColor,
    backgroundImage: layers.length ? layers.join(',') : undefined,
    backgroundBlendMode: layers.length > 1 ? 'overlay, normal' : undefined,
    borderRadius: 'inherit',
  }

  const isDecorative = !background.ariaLabel

  return (
    <div
      className={['absolute inset-0 overflow-hidden rounded-[inherit]', className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : background.ariaLabel}
    />
  )
}
