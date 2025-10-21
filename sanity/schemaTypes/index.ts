import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {tagType} from './tagType'
import {navigationType} from './navigationType'
import {postType} from './postType'
import {authorType} from './authorType'
import {blogSectionType} from './blogSectionType'
import {hybridComponentType} from './hybridComponentType'
import {ctaBannerType} from './ctaBannerType'
import {heroSectionType} from './heroSectionType'
import {homePageType} from './homePageType'
import {linkFieldType} from './linkFieldType'
import {pageColumnType} from './pageColumnType'
import {pageSectionType} from './pageSectionType'
import {pageType} from './pageType'
import {partnerLogoType, partnersSectionType} from './partnersSectionType'
import {projectCardType, projectsSectionType} from './projectCardType'
import {textImageSectionType} from './textImageSectionType'
import {videoSectionType} from './videoSectionType'
import {backgroundComponentType} from './components/backgroundComponentType'
import {imageComponentType} from './components/imageComponentType'
import {richTextComponentType} from './components/richTextComponentType'
import {videoComponentType} from './components/videoComponentType'
import {buttonComponentType} from './components/buttonComponentType'
import {blogCardComponentType} from './components/blogCardComponentType'
import {carouselComponentType} from './components/carouselComponentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    tagType,
    navigationType,
    postType,
    authorType,
    linkFieldType,
    pageColumnType,
    pageSectionType,
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
    backgroundComponentType,
    imageComponentType,
    richTextComponentType,
    videoComponentType,
    buttonComponentType,
    blogCardComponentType,
    carouselComponentType,
  ],
}