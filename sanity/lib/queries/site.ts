import {groq} from 'next-sanity'

/**
 * Query to fetch site settings including header and footer navigation
 */
export const siteSettingsQuery = groq`
  *[_type == "site" && _id == "site"][0]{
    title,
    "translations": translations,
    "logo": logo,
    "logoAlt": logo.alt,
    header->{
      title,
      items[]{
        _type,
        _type == "link" => {
          label,
          "translations": translations,
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
          "translations": link.translations,
          "items": links[]{
            label,
            "translations": translations,
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
          "translations": translations,
          _type,
          _type == "link" => {
            label,
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
          "translations": link.translations,
          "items": links[]{
            label,
            "translations": translations,
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

/**
 * Query to fetch a navigation document for a specific language.
 * Returns the same projection shape used for the header in `siteSettingsQuery`.
 */
export const navigationByLangQuery = groq`
  *[_type == "navigation"][0]{
    title,
      items[]{
        _type,
        _type == "link" => {
          label: coalesce(translations[language == $lang][0].label, label),
        type,
        type == "internal" => {
          "internalType": internal->_type,
          "href": select(
            internal->_type == "blogPage" => "/" + $lang + "/blog",
            internal->_type == "homePage" => "/" + $lang,
            "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
          )
        },
        type == "external" => { "href": external }
      },
      _type == "link.list" => {
        "label": coalesce(link.translations[language == $lang][0].label, link.label),
        "items": links[]{
          label: coalesce(translations[language == $lang][0].label, label),
          type,
          type == "internal" => {
            "internalType": internal->_type,
            "href": select(
              internal->_type == "blogPage" => "/" + $lang + "/blog",
              internal->_type == "homePage" => "/" + $lang,
              "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.slug.current)
            )
          },
          type == "external" => { "href": external }
        }
      }
    },
  }
`
