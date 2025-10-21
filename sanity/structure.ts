import {BookOpenIcon, FileTextIcon, HomeIcon, LayersIcon, UsersIcon, TagIcon} from './lib/featherIcons'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .id('homePage')
        .schemaType('homePage')
        .icon(HomeIcon)
        .title('Homepagina'),
      S.documentTypeListItem('page')
        .title('Alle pagina\'s')
        .icon(FileTextIcon)
        .defaultOrdering([{field: 'title', direction: 'asc'}]),

      S.divider(),

      S.documentTypeListItem('post')
        .title('Blogposts')
        .icon(BookOpenIcon)
        .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),

      S.divider(),

      S.documentListItem()
        .id('navigation')
        .schemaType('navigation')
        .icon(LayersIcon)
        .title('Header navigatie'),
      S.documentListItem()
        .id('footerNavigation')
        .schemaType('footerNavigation')
        .icon(LayersIcon)
        .title('Footer navigatie'),

      S.divider(),

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
