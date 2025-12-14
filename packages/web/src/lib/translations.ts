// General UI translations for non-blog pages
export const translations = {
  nl: {
    // Welcome page (no content yet)
    welcomeTitle: 'Welkom bij Jouw Nieuwe Next.js & Sanity App!',
    welcomeMessage: 'Het lijkt erop dat je nog geen homepage content hebt ingesteld. Om te beginnen, ga naar de Sanity Studio en maak je homepage door modules en content toe te voegen.',
    
    // Fallback notices
    notTranslatedToEnglish: 'Deze pagina is nog niet vertaald naar het Engels — we tonen de standaardinhoud.',
    notTranslatedToDutch: 'Deze pagina is nog niet vertaald naar Nederlands — we tonen de standaardinhoud.',
    
    // Contact form
    contactFormLabel: 'Contactformulier',
    nameLabel: 'Naam',
    emailLabel: 'E-mail',
    messageLabel: 'Bericht',
    required: 'vereist',
    namePlaceholder: 'Uw volledige naam',
    emailPlaceholder: 'uw.email@voorbeeld.nl',
    emailHint: 'We delen uw e-mailadres nooit met anderen.',
    messagePlaceholder: 'Vertel ons hoe we u kunnen helpen...',
    sendMessage: 'Bericht versturen',
    sending: 'Versturen...',
    successMessage: '✓ Bedankt! Uw bericht is succesvol verzonden.',
    errorMessage: '✗ Er is iets misgegaan. Probeer het opnieuw.',
  },
  en: {
    // Welcome page (no content yet)
    welcomeTitle: 'Welcome to Your New Next.js & Sanity App!',
    welcomeMessage: "It looks like you haven't set up your home page content yet. To get started, head over to the Sanity Studio and create your home page by adding modules and content.",
    
    // Fallback notices
    notTranslatedToEnglish: 'This page is not yet translated to English — showing the default language content.',
    notTranslatedToDutch: 'This page is not yet translated to Dutch — showing the default language content.',
    
    // Contact form
    contactFormLabel: 'Contact form',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    required: 'required',
    namePlaceholder: 'Your full name',
    emailPlaceholder: 'your.email@example.com',
    emailHint: "We'll never share your email with anyone else.",
    messagePlaceholder: 'Tell us how we can help you...',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    successMessage: '✓ Thank you! Your message has been sent successfully.',
    errorMessage: '✗ Something went wrong. Please try again.',
  },
} as const

export type TranslationKey = keyof typeof translations.nl
export type SupportedLang = 'nl' | 'en'

export function getTranslation(lang: string, key: TranslationKey): string {
  const safeLang = (lang === 'en' ? 'en' : 'nl') as SupportedLang
  return translations[safeLang][key]
}
