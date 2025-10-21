import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {tagType} from './tagType'
import {navigationType} from './navigationType'
import {footerNavigationType} from './footerNavigationType'
import {postType} from './postType'
import {authorType} from './authorType'
import {blogSectionType} from './blogSectionType'
import {hybridComponentType} from './hybridComponentType'
import {ctaBannerType} from './ctaBannerType'
import {heroSectionType} from './heroSectionType'
import {homePageType} from './homePageType'
import {linkFieldType} from './linkFieldType'
import {pageType} from './pageType'
import {partnerLogoType, partnersSectionType} from './partnersSectionType'
import {projectCardType, projectsSectionType} from './projectCardType'
import {textImageSectionType} from './textImageSectionType'
import {videoSectionType} from './videoSectionType'
import {imageComponentType} from './components/imageComponentType'
import {richTextComponentType} from './components/richTextComponentType'
import {videoComponentType} from './components/videoComponentType'
import {buttonComponentType} from './components/buttonComponentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    tagType,
    navigationType,
    footerNavigationType,
    postType,
    authorType,
    linkFieldType,
    pageType,
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
    imageComponentType,
    richTextComponentType,
    videoComponentType,
    buttonComponentType,
  ],
}