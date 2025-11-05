'use client'

import { useEffect } from 'react'

/**
 * Client component that hides the site header and footer on Sanity Studio pages
 */
export default function HideHeader() {
  useEffect(() => {
    const headerElement = document.getElementsByTagName('header')
    const footerElement = document.getElementsByTagName('footer')
    
    if (headerElement[0]) {
      headerElement[0].style.display = 'none'
    }
    
    if (footerElement[0]) {
      footerElement[0].style.display = 'none'
    }

    // Cleanup: restore header and footer visibility when component unmounts
    return () => {
      const headerElement = document.getElementsByTagName('header')
      const footerElement = document.getElementsByTagName('footer')
      
      if (headerElement[0]) {
        headerElement[0].style.display = ''
      }
      
      if (footerElement[0]) {
        footerElement[0].style.display = ''
      }
    }
  }, [])

  return null
}
