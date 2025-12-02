import {BookOpenIcon, FileTextIcon, HomeIcon, LayersIcon, UsersIcon, TagIcon, SettingsIcon, PackageIcon} from './lib/featherIcons'
import TranslationFixer from './components/TranslationFixer'
import type {StructureResolver} from 'sanity/structure'

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
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
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
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
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
      
      // Navigatie (Singleton)
      S.listItem()
        .title('Navigatie')
        .icon(LayersIcon)
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
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
      
      // Tags
      S.documentTypeListItem('tag')
        .title('Tags')
        .icon(TagIcon),
    ])
