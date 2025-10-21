import {BookOpenIcon, FileTextIcon, HomeIcon, LayersIcon, UsersIcon, TagIcon} from './lib/featherIcons'
import type {StructureResolver} from 'sanity/structure'
import {PreviewPaneWithSearch} from './components/PreviewPaneWithSearch'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  const documentWithPreview = (schemaType: string) => (documentId: string) =>
    S.document()
      .documentId(documentId)
      .schemaType(schemaType)
      .views([
        S.view.form().title('Bewerken'),
        S.view.component(PreviewPaneWithSearch).title('Preview'),
      ])

  return S.list()
    .title('Content')
    .items([
      // Pages section with nested structure
      S.listItem()
        .title('Pages')
        .icon(FileTextIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              // Premade pages subsection
              S.listItem()
                .title('Premade Pages')
                .icon(HomeIcon)
                .child(
                  S.list()
                    .title('Premade Pages')
                    .items([
                      S.documentListItem()
                        .id('homePage')
                        .schemaType('homePage')
                        .title('Home Page')
                        .child(documentWithPreview('homePage')('homePage')),
                      // Add more premade page templates here in the future
                    ])
                ),
              S.divider(),
              // All other pages
              S.listItem()
                .title('All Pages')
                .icon(FileTextIcon)
                .child(
                  S.documentTypeList('page')
                    .title('All Pages')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                    .child((documentId) => documentWithPreview('page')(documentId)),
                ),
            ])
        ),
      
      // Blogs section
      S.listItem()
        .title('Blogs')
        .icon(BookOpenIcon)
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
        ),
      
      S.divider(),
      
      // Navigation section
      S.listItem()
        .title('Navigation')
        .icon(LayersIcon)
        .child(
          S.list()
            .title('Navigation')
            .items([
              S.documentListItem()
                .id('navigation')
                .schemaType('navigation')
                .title('Header Navigation')
                .child(documentWithPreview('navigation')('navigation')),
              S.documentListItem()
                .id('footerNavigation')
                .schemaType('footerNavigation')
                .title('Footer Navigation')
                .child(documentWithPreview('footerNavigation')('footerNavigation')),
            ])
        ),
      
      S.divider(),
      
      // Team Members
      S.documentTypeListItem('author')
        .title('Team Members')
        .icon(UsersIcon),
      
      S.divider(),
      
      // Tags
      S.documentTypeListItem('tag')
        .title('Tags')
        .icon(TagIcon),
      
      // Categories
      S.documentTypeListItem('category')
        .title('Categories')
        .icon(TagIcon),
    ])
}
