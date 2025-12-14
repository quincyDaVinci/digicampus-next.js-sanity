import {BookOpenIcon, FileTextIcon, HomeIcon, UsersIcon, TagIcon, LayersIcon, PackageIcon} from './lib/featherIcons'
import {CogIcon, LinkIcon} from '@sanity/icons'
import WarningsPanel from './components/WarningsPanel'
import LibraryManager from './components/LibraryManager'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      // Website-instellingen (Singleton)
      S.listItem()
        .title('Website-instellingen')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Website-instellingen')
            .items([
              S.listItem()
                .title('Site metadata')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('site')
                    .documentId('site')
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
              // All other pages grouped by language
              S.listItem()
                .title('Nederlands')
                .icon(FileTextIcon)
                .child(
                  S.documentTypeList('page')
                    .title('Pagina\'s — Nederlands')
                    .filter('_type == "page" && (language == $lang || !defined(language))')
                    .params({lang: 'nl'})
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.listItem()
                .title('English')
                .icon(FileTextIcon)
                .child(
                  S.documentTypeList('page')
                    .title('Pagina\'s — English')
                    .filter('_type == "page" && language == $lang')
                    .params({lang: 'en'})
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              S.documentTypeListItem('page')
                .title('Alle pagina\'s (all languages)')
                .icon(FileTextIcon),
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
                .title('Blogs pagina')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                ),
              S.divider(),
              // Blog posts grouped by language
              S.listItem()
                .title('NL - Blogs')
                .icon(BookOpenIcon)
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blogberichten — Nederlands')
                    .filter('_type == "blogPost" && (language == $lang || !defined(language))')
                    .params({lang: 'nl'})
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('EN - Blogs')
                .icon(BookOpenIcon)
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blogberichten — English')
                    .filter('_type == "blogPost" && language == $lang')
                    .params({lang: 'en'})
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.documentTypeListItem('blogPost')
                .title('Alle blogberichten')
                .icon(BookOpenIcon),
              S.divider(),
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
              .icon(LinkIcon)
              .child(
                S.list()
                  .title('Navigation')
                  .items([
                    S.listItem()
                      .title('Navigation settings')
                      .icon(LinkIcon)
                      .child(
                        S.document()
                          .schemaType('navigationSettings')
                          .documentId('navigationSettings')
                          .title('Navigation settings')
                      ),
                    S.listItem()
                      .title('Header')
                      .icon(LinkIcon)
                      .child(
                        S.documentTypeList('navigation')
                          .title('Header navigation')
                          .filter('_type == "navigation" && role == $role')
                          .params({role: 'header'})
                      ),
                    S.listItem()
                      .title('Footer')
                      .icon(LinkIcon)
                      .child(
                        S.documentTypeList('navigation')
                          .title('Footer navigation')
                          .filter('_type == "navigation" && role == $role')
                          .params({role: 'footer'})
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
        .icon(CogIcon)
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
        .icon(CogIcon)
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
        .icon(CogIcon)
        .child(
          S.component(WarningsPanel).id('warningsPanel').title('Warnings & Alerts')
        ),


      // Tags
      S.documentTypeListItem('tag')
        .title('Tags')
        .icon(TagIcon),
    ])
