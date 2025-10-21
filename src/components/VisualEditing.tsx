'use client'

import {useLiveMode} from '@sanity/react-loader'
import {client} from '@sanity/lib/client'
import {useEffect} from 'react'

export function VisualEditing() {
  useLiveMode({client})
  
  useEffect(() => {
    // Dynamically import and enable visual editing
    const disable = import('@sanity/visual-editing')
      .then(({enableVisualEditing}) => enableVisualEditing())
      .catch((err) => {
        console.error('Failed to enable visual editing:', err)
        return () => {}
      })
    
    return () => {
      disable.then((disableFn) => disableFn())
    }
  }, [])
  
  return null
}
