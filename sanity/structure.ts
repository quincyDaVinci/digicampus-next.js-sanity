import { BookOpenIcon, FileTextIcon, HomeIcon, LayersIcon, UsersIcon, TagIcon, SettingsIcon, PackageIcon } from './lib/featherIcons'
import TranslationFixer from './components/TranslationFixer'
import WarningsPanel from './components/WarningsPanel'
import LibraryManager from './components/LibraryManager'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      // Website-instellingen (Singleton)
      S.listItem()
        .title('Website-instellingen')
        .icon(SettingsIcon)
        .child(
          S.list()
            .title('Website-instellingen')
            .items([
              S.listItem()
                .title('Site metadata')
                .icon(SettingsIcon)
                .child(
                  S.document()
                    .schemaType('site')
                    .documentId('site')
                ),
              S.listItem()
                .title('Fix translations')
                .icon(SettingsIcon)
                .child(
                  S.component(TranslationFixer).id('translationFixer').title('Fix translations')
                ),
            ])
        ),

      S.divider(),

      // Pagina's met geneste structuur
      S.listItem()
        .title('Pagina’s')
        .icon(FileTextIcon)
        .child(
          S.list()
            .title('Pagina’s')
            .items([
              // Home Page (Singleton)
              S.listItem()
                .title('Homepagina')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.divider(),
              // All other pages
              S.listItem()
                .title('Alle pagina’s')
                .icon(FileTextIcon)
                .child(
                  S.documentTypeList('page')
                    .title('Alle pagina’s')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // Blogsectie
      S.listItem()
        .title('Blog')
        .icon(BookOpenIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              // Blog Page (Singleton)
              S.listItem()
                .title('Blogpagina-instellingen')
                .icon(SettingsIcon)
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                ),
              S.divider(),
              S.listItem()
                .title('Blogs')
                .icon(BookOpenIcon)
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blogberichten')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Categorieën')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('blogCategory')
                    .title('Blogcategorieën')
                ),
            ])
        ),

      S.divider(),

      // Navigatie (multiple menus)
      S.listItem()
        .title('Navigation')
        .icon(LayersIcon)
        .child(
          S.list()
            .title('Navigation')
            .items([
              S.listItem()
                .title('Navigation settings')
                .icon(LayersIcon)
                .child(
                  S.document()
                    .schemaType('navigationSettings')
                    .documentId('navigationSettings')
                    .title('Navigation settings')
                ),
              S.divider(),
              S.listItem()
                .title('Header')
                .icon(LayersIcon)
                .child(
                  S.list()
                    .title('Header navigation')
                    .items([
                      S.listItem()
                        .title('Nederlands')
                        .child(
                          S.documentTypeList('navigation')
                            .title('Header — Nederlands')
                            .filter('_type == "navigation" && role == $role && (language == $lang || !defined(language))')
                            .params({role: 'header', lang: 'nl'})
                        ),
                      S.listItem()
                        .title('English')
                        .child(
                          S.documentTypeList('navigation')
                            .title('Header — English')
                            .filter('_type == "navigation" && role == $role && language == $lang')
                            .params({role: 'header', lang: 'en'})
                        ),
                    ])
                ),
              S.listItem()
                .title('Footer')
                .icon(LayersIcon)
                .child(
                  S.list()
                    .title('Footer navigation')
                    .items([
                      S.listItem()
                        .title('Nederlands')
                        .child(
                          S.documentTypeList('navigation')
                            .title('Footer — Nederlands')
                            .filter('_type == "navigation" && role == $role && (language == $lang || !defined(language))')
                            .params({role: 'footer', lang: 'nl'})
                        ),
                      S.listItem()
                        .title('English')
                        .child(
                          S.documentTypeList('navigation')
                            .title('Footer — English')
                            .filter('_type == "navigation" && role == $role && language == $lang')
                            .params({role: 'footer', lang: 'en'})
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),

      // Legacy content cleanup helpers were temporary and have been removed

      // Auteurs / Teamleden
      S.documentTypeListItem('author')
        .title('Teamleden')
        .icon(UsersIcon),

      // Team settings (categories + ordering)
      S.listItem()
        .title('Team instellingen')
        .icon(SettingsIcon)
        .child(
          S.list()
            .title('Team instellingen')
            .items([
              S.listItem()
                .title('Categorieën')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('teamCategory')
                    .title('Team categorieën')
                ),
              S.listItem()
                .title('Categorie volgorde')
                .icon(LayersIcon)
                .child(
                  S.document()
                    .schemaType('teamSettings')
                    .documentId('teamSettings')
                ),
            ])
        ),

      S.divider(),

      // Developer Opties (Singleton)
      S.listItem()
        .title('Developer Opties')
        .icon(SettingsIcon)
        .child(
          S.document()
            .schemaType('devSettings')
            .documentId('devSettings')
        ),

      S.divider(),

      // Library (opens Media tool directly)
      S.listItem()
        .title('Library')
        .icon(PackageIcon)
        .child(
          S.component(LibraryManager).id('libraryManager').title('Library')
        ),

      // Warnings / Admin alerts
      S.listItem()
        .title('Warnings')
        .icon(SettingsIcon)
        .child(
          S.component(WarningsPanel).id('warningsPanel').title('Warnings & Alerts')
        ),


      // Tags
      S.documentTypeListItem('tag')
        .title('Tags')
        .icon(TagIcon),
    ])
