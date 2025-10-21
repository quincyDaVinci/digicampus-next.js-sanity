import {BookOpenIcon, FileTextIcon, HomeIcon, LayersIcon, UsersIcon, TagIcon} from './lib/featherIcons'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
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
                        .title('Home Page'),
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
                .title('Header Navigation'),
              // Add footer navigation or other nav items here if needed
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
