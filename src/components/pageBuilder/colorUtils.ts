import type {DesignTokenValue} from '@/types/pageBuilder'

export const TOKEN_TO_VAR: Record<DesignTokenValue, string> = {
  surface: '--dc-surface',
  'bg-soft': '--dc-bg-soft',
  bg: '--dc-bg',
  brand: '--dc-brand',
  primary: '--dc-primary',
  navy: '--dc-navy',
  text: '--dc-text',
}

export function tokenToCss(token?: DesignTokenValue, alpha = 1) {
  if (!token) return undefined
  const cssVar = TOKEN_TO_VAR[token]
  const alphaSuffix = alpha < 1 ? ` / ${alpha}` : ''
  return `rgb(var(${cssVar})${alphaSuffix})`
}
