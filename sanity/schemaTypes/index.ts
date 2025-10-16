import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {blogSectionType} from './blogSectionType'
import {hybridComponentType} from './hybridComponentType'
import {ctaBannerType} from './ctaBannerType'
import {heroSectionType} from './heroSectionType'
import {homePageType} from './homePageType'
import {linkFieldType} from './linkFieldType'
import {partnerLogoType, partnersSectionType} from './partnersSectionType'
import {projectCardType, projectsSectionType} from './projectCardType'
import {textImageSectionType} from './textImageSectionType'
import {videoSectionType} from './videoSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    linkFieldType,
    heroSectionType,
    videoSectionType,
    textImageSectionType,
    ctaBannerType,
    blogSectionType,
    projectCardType,
    projectsSectionType,
    partnerLogoType,
    partnersSectionType,
    hybridComponentType,
    homePageType,
  ],
}