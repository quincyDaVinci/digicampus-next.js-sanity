"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CloseIcon } from './icons/FeatherIcons'

type ImageLightboxProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  caption?: string
  sizeClass?: string
}

export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  className,
  caption,
  sizeClass = '',
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <figure className={`my-8 ${sizeClass}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="block w-full cursor-zoom-in hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg"
          aria-label={`Open full size image: ${alt}`}
          type="button"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
          />
        </button>
        {caption && (
          <figcaption className="mt-2 text-center text-sm italic" style={{color: 'hsl(var(--dc-text) / 0.7)'}}>
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{backgroundColor: 'hsl(0 0% 0% / 0.9)', overflow: 'hidden'}}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(false) }}
        role="button"
        tabIndex={0}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            aria-label="Close image"
            type="button"
          >
            <CloseIcon className="w-8 h-8 text-white" aria-hidden />
          </button>
          
          <div className="relative flex flex-col items-center justify-center gap-4 max-w-7xl max-h-[90vh]">
            <div
              className="relative"
               onClick={(e) => e.stopPropagation()}
               onKeyDown={(e) => e.stopPropagation()}
               role="presentation"
            >
              <Image
                src={src}
                alt={alt}
                width={2400}
                height={1350}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                priority
              />
            </div>
            
            {caption && (
              <div
                  className="max-w-3xl px-6 py-3 rounded-lg text-center text-white text-sm"
                style={{backgroundColor: 'hsl(0 0% 0% / 0.7)'}}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="presentation"
              >
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
