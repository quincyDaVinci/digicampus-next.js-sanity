import {BookOpenIcon, FileTextIcon, HomeIcon, LayersIcon, UsersIcon, TagIcon, SettingsIcon, PackageIcon} from './lib/featherIcons'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (Singleton)
      S.listItem()
        .title('Site Settings')
        .icon(SettingsIcon)
        .child(
          S.document()
            .schemaType('site')
            .documentId('site')
        ),
      
      S.divider(),
      
      // Pages section with nested structure
      S.listItem()
        .title('Pages')
        .icon(FileTextIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              // Home Page (Singleton)
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
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
                ),
            ])
        ),
      
      S.divider(),
      
      // Blog section
      S.listItem()
        .title('Blog')
        .icon(BookOpenIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .icon(BookOpenIcon)
                .child(
                  S.documentTypeList('blogPost')
                    .title('Blog Posts')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('blogCategory')
                    .title('Blog Categories')
                ),
            ])
        ),
      
      S.divider(),
      
      // Navigation (Singleton)
      S.listItem()
        .title('Navigation')
        .icon(LayersIcon)
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
        ),
      
      S.divider(),

      // Legacy content cleanup helpers were temporary and have been removed
      
      // Authors/Team Members
      S.documentTypeListItem('author')
        .title('Authors')
        .icon(UsersIcon),
      
      S.divider(),
      
      // Tags
      S.documentTypeListItem('tag')
        .title('Tags')
        .icon(TagIcon),
    ])
