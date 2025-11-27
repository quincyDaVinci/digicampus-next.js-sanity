import {groq} from 'next-sanity'

/**
 * Query to fetch site settings including header and footer navigation
 */
export const siteSettingsQuery = groq`
  *[_type == "site" && _id == "site"][0]{
    title,
    "logo": logo,
    "logoAlt": logo.alt,
    header->{
      language,
      title,
      items[]{
        _type,
        _type == "link" => {
          label,
          type,
          type == "internal" => {
            "internalType": internal->_type,
            "href": select(
              internal->_type == "blogPage" => "/" + $lang + "/blog",
              internal->_type == "homePage" => "/" + $lang,
              "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
            )
          },
          type == "external" => {
            "href": external
          }
        },
        _type == "link.list" => {
          "label": link.label,
          "items": links[]{
            label,
            type,
            type == "internal" => {
              "internalType": internal->_type,
              "href": select(
                internal->_type == "blogPage" => "/" + $lang + "/blog",
                internal->_type == "homePage" => "/" + $lang,
                "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
              )
            },
            type == "external" => {
              "href": external
            }
          }
        }
      }
    },
    ctas[]{
      label,
      type,
      type == "internal" => {
        "internalType": internal->_type,
        "href": select(
          internal->_type == "blogPage" => "/" + $lang + "/blog",
          internal->_type == "homePage" => "/" + $lang,
          "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
        )
      },
      type == "external" => {
        "href": external
      }
    },
    footer->{
      language,
      title,
      items[]{
        _type,
        _type == "link" => {
          label,
          type,
          type == "internal" => {
            "internalType": internal->_type,
            "href": select(
              internal->_type == "blogPage" => "/" + $lang + "/blog",
              internal->_type == "homePage" => "/" + $lang,
              "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
            )
          },
          type == "external" => {
            "href": external
          }
        },
        _type == "link.list" => {
          "label": link.label,
          "items": links[]{
            label,
            type,
            type == "internal" => {
              "internalType": internal->_type,
              "href": select(
                internal->_type == "blogPage" => "/" + $lang + "/blog",
                internal->_type == "homePage" => "/" + $lang,
                "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
              )
            },
            type == "external" => {
              "href": external
            }
          }
        }
      }
    },
    footerContent,
    copyright
  }
`
