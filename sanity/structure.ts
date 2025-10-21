import {
  BookOpenIcon,
  FileTextIcon,
  HomeIcon,
  LayersIcon,
  UsersIcon,
  TagIcon,
} from './lib/featherIcons'
import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/structure'

import PreviewPane from './lib/PreviewPane'

const previewOptions = {
  previewBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(FileTextIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
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
                    ]),
                ),
              S.divider(),
              S.listItem()
                .title('All Pages')
                .icon(FileTextIcon)
                .child(
                  S.documentTypeList('page')
                    .title('All Pages')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),
            ]),
        ),
      S.listItem()
        .title('Blogs')
        .icon(BookOpenIcon)
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.divider(),
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
              S.documentListItem()
                .id('footerNavigation')
                .schemaType('footerNavigation')
                .title('Footer Navigation'),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('author')
        .title('Team Members')
        .icon(UsersIcon),
      S.divider(),
      S.documentTypeListItem('tag')
        .title('Tags')
        .icon(TagIcon),
      S.documentTypeListItem('category')
        .title('Categories')
        .icon(TagIcon),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (['page', 'post', 'homePage'].includes(schemaType)) {
    return S.document().views([
      S.view.form().title('✏️ Bewerken'),
      S.view
        .component(PreviewPane)
        .options(previewOptions)
        .title('🔍 Preview'),
    ])
  }

  return S.document().views([S.view.form()])
}
