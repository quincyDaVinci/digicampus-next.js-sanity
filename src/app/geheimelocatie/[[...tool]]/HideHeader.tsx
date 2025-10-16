'use client'

import { useEffect } from 'react'

/**
 * Client component that hides the site header on Sanity Studio pages
 */
export default function HideHeader() {
  useEffect(() => {
    const headerElement = document.getElementsByTagName('header')
    if (headerElement[0]) {
      headerElement[0].style.display = 'none'
    }

    // Cleanup: restore header visibility when component unmounts
    return () => {
      const headerElement = document.getElementsByTagName('header')
      if (headerElement[0]) {
        headerElement[0].style.display = ''
      }
    }
  }, [])

  return null
}
