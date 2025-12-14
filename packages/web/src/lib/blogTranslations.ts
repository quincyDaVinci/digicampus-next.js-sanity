// Blog UI translations (hardcoded text that doesn't belong in Sanity Studio)
export const blogTranslations = {
  nl: {
    // Navigation
    home: 'Home',
    blog: 'Blog',
    backToBlog: 'Terug naar blog',
    backToAllBlogs: 'Terug naar alle blogs',
    
    // Categories
    allCategories: 'Alle categorieën',
    filterByCategory: 'Filter op categorie',
    filteredByCategory: 'Gefilterd op categorie',
    postsFound: 'berichten gevonden',
    allCategoriesShown: 'Alle categorieën weergegeven',
    
    // Sorting
    sort: 'Sorteren',
    sortOptions: 'Sorteer opties',
    sortedBy: 'Gesorteerd op',
    newest: 'Nieuwste eerst',
    oldest: 'Oudste eerst',
    mostPopular: 'Populairste',
    shortestReadTime: 'Kortste leestijd',
    
    // View modes
    view: 'Weergave',
    viewOptions: 'Weergave opties',
    grid: 'Raster',
    list: 'Lijst',
    
    // Time and reading
    minRead: 'min leestijd',
    publishedOn: 'Gepubliceerd op',
    
    // Pagination
    page: 'Pagina',
    of: 'van',
    previous: 'Vorige',
    next: 'Volgende',
    
    // Posts
    noPosts: 'Geen berichten gevonden',
    readMore: 'Lees meer',
    
    // Highlighted
    highlightedPosts: 'Uitgelichte berichten',
    moreBlogs: 'Meer blogs',
  },
  en: {
    // Navigation
    home: 'Home',
    blog: 'Blog',
    backToBlog: 'Back to blog',
    backToAllBlogs: 'Back to all blogs',
    
    // Categories
    allCategories: 'All categories',
    filterByCategory: 'Filter by category',
    filteredByCategory: 'Filtered by category',
    postsFound: 'posts found',
    allCategoriesShown: 'All categories shown',
    
    // Sorting
    sort: 'Sort',
    sortOptions: 'Sort options',
    sortedBy: 'Sorted by',
    newest: 'Newest first',
    oldest: 'Oldest first',
    mostPopular: 'Most popular',
    shortestReadTime: 'Shortest read time',
    
    // View modes
    view: 'View',
    viewOptions: 'View options',
    grid: 'Grid',
    list: 'List',
    
    // Time and reading
    minRead: 'min read',
    publishedOn: 'Published on',
    
    // Pagination
    page: 'Page',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
    
    // Posts
    noPosts: 'No posts found',
    readMore: 'Read more',
    
    // Highlighted
    highlightedPosts: 'Featured posts',
    moreBlogs: 'More blogs',
  },
} as const

export type BlogTranslationKey = keyof typeof blogTranslations.nl
export type SupportedBlogLang = 'nl' | 'en'

export function getBlogTranslation(lang: string, key: BlogTranslationKey): string {
  const safeLang = (lang === 'en' ? 'en' : 'nl') as SupportedBlogLang
  return blogTranslations[safeLang][key]
}
