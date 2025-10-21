import type {CSSProperties} from 'react'

import type {BackgroundComponent, BackgroundTone} from '@/types/pageBuilder'

const toneSettings: Record<BackgroundTone, {background: string; text: string; divider: string; pattern: string}> = {
  surface: {
    background: 'rgb(var(--dc-surface))',
    text: 'rgb(var(--dc-navy))',
    divider: 'rgba(15, 23, 42, 0.12)',
    pattern: 'rgba(15, 23, 42, 0.06)',
  },
  soft: {
    background: 'rgb(var(--dc-bg-soft))',
    text: 'rgb(var(--dc-navy))',
    divider: 'rgba(15, 23, 42, 0.12)',
    pattern: 'rgba(15, 23, 42, 0.08)',
  },
  brand: {
    background: 'rgb(var(--dc-brand))',
    text: 'rgb(var(--dc-surface))',
    divider: 'rgba(255, 255, 255, 0.25)',
    pattern: 'rgba(255, 255, 255, 0.15)',
  },
  contrast: {
    background: 'rgb(var(--dc-navy))',
    text: 'rgb(var(--dc-surface))',
    divider: 'rgba(255, 255, 255, 0.2)',
    pattern: 'rgba(255, 255, 255, 0.12)',
  },
}

function getToneSetting(tone?: BackgroundTone) {
  if (!tone) return toneSettings.surface
  return toneSettings[tone] ?? toneSettings.surface
}

export function getToneTextColor(tone?: BackgroundTone) {
  return getToneSetting(tone).text
}

export default function BackgroundLayer({background, className}: {background?: BackgroundComponent | null; className?: string}) {
  if (!background) return null

  const tone = background.tone ?? 'surface'
  const settings = getToneSetting(tone)
  const layers: string[] = []
  const baseStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    backgroundColor: settings.background,
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 'inherit',
    boxShadow: background.showDivider
      ? `inset 0 1px 0 0 ${settings.divider}, inset 0 -1px 0 0 ${settings.divider}`
      : undefined,
  }

  if (background.texture && background.texture !== 'none') {
    switch (background.texture) {
      case 'dots':
        layers.push(`radial-gradient(circle at 1px 1px, ${settings.pattern} 1px, transparent 0)`)
        baseStyle.backgroundSize = '24px 24px'
        break
      case 'grid':
        layers.push(
          `linear-gradient(${settings.pattern} 1px, transparent 0), linear-gradient(90deg, ${settings.pattern} 1px, transparent 0)`,
        )
        baseStyle.backgroundSize = '32px 32px'
        break
      default:
        break
    }
  }

  const style: CSSProperties = {
    ...baseStyle,
    backgroundImage: layers.length ? layers.join(',') : undefined,
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
