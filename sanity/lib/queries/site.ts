import { groq } from 'next-sanity'

/**
 * Query to fetch site settings including header and footer navigation
 * Uses language-filter plugin: fetches all translations, app selects by language
 */
export const siteSettingsQuery = groq`
  *[_type == "site" && _id == "site"][0]{
    _id,
    title,
    "translations": translations[] { language, title },
    "logo": logo,
    "logoAlt": logo.alt,
    header->{
      _id,
      title,
      items[]{
        _type,
        _type == "link" => {
          _key,
          label,
          "translations": translations[] { language, label },
          type,
          type == "internal" => {
            "internalType": internal->_type,
            "href": select(
              internal->_type == "blogPage" => "/" + $lang + "/blog",
              internal->_type == "homePage" => "/" + $lang,
                "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.localizedSlugs.en.current, internal->metadata.localizedSlugs.nl.current)
            )
          },
          type == "external" => {
            "href": external
          }
        },
        _type == "link.list" => {
          _key,
          "label": link.label,
          "translations": link.translations[] { language, label },
          "items": links[]{
            _key,
            label,
            "translations": translations[] { language, label },
            type,
            type == "internal" => {
              "internalType": internal->_type,
              "href": select(
                internal->_type == "blogPage" => "/" + $lang + "/blog",
                internal->_type == "homePage" => "/" + $lang,
                  "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.localizedSlugs.en.current, internal->metadata.localizedSlugs.nl.current)
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
      _key,
      label,
      "translations": translations[] { language, label },
      type,
      type == "internal" => {
        "internalType": internal->_type,
        "href": select(
          internal->_type == "blogPage" => "/" + $lang + "/blog",
          internal->_type == "homePage" => "/" + $lang,
              "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.localizedSlugs.en.current, internal->metadata.localizedSlugs.nl.current)
        )
      },
      type == "external" => {
        "href": external
      }
    },
    footer->{
      _id,
      language,
      title,
      items[]{
        _type,
        _type == "link" => {
          _key,
          label,
          "translations": translations[] { language, label },
          type,
          type == "internal" => {
            "internalType": internal->_type,
            "href": select(
              internal->_type == "blogPage" => "/" + $lang + "/blog",
              internal->_type == "homePage" => "/" + $lang,
                "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.localizedSlugs.en.current, internal->metadata.localizedSlugs.nl.current)
            )
          },
          type == "external" => {
            "href": external
          }
        },
        _type == "link.list" => {
          _key,
          "label": link.label,
          "translations": link.translations[] { language, label },
          "items": links[]{
            _key,
            label,
            "translations": translations[] { language, label },
            type,
            type == "internal" => {
              "internalType": internal->_type,
              "href": select(
                internal->_type == "blogPage" => "/" + $lang + "/blog",
                internal->_type == "homePage" => "/" + $lang,
                  "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.localizedSlugs.en.current, internal->metadata.localizedSlugs.nl.current)
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
 * Query to fetch a navigation document by language
 * Simplified for new navigationItem structure
 */
export const navigationByLangQuery = groq`
  *[_type == "navigation" && language == $lang][0]{
    _id,
    title,
    language,
    items[]{
      "label": select($lang == "en" => labelEn, label),
      links[]{
        _key,
        label,
        "translations": translations[] { language, label },
        type,
        type == "internal" => {
          "internalType": internal->_type,
          "href": select(
            internal->_type == "blogPage" => "/" + $lang + "/blog",
            internal->_type == "homePage" => "/" + $lang,
            "/" + $lang + "/" + coalesce(internal->metadata.localizedSlugs[$lang].current, internal->metadata.localizedSlugs.en.current, internal->metadata.localizedSlugs.nl.current)
          )
        },
        type == "external" => { "href": external }
      }
    }
  }
`
