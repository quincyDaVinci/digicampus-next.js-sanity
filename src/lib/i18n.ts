export const supportedLanguages = ['en', 'nl'] as const
export type Lang = (typeof supportedLanguages)[number]
export const defaultLanguage: Lang = 'nl'

export function isSupportedLang(lang: string | undefined | null): lang is Lang {
  return !!lang && supportedLanguages.includes(lang as Lang)
}
