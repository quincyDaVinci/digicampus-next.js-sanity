"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'

type ParallaxImageProps = {
  src: string
  fullSrc?: string
  alt: string
  // visible height of the image container in px
  displayHeight?: number
  // extra vertical pixels to render beyond the visible container so parallax doesn't reveal edges
  extraHeight?: number
}

export default function ParallaxImage({
  src,
  fullSrc,
  alt,
  displayHeight = 500,
  extraHeight = 260,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion by rendering a static image without scroll listeners
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) {
      if (innerRef.current) {
        innerRef.current.style.transform = 'translateY(0)'
      }
      return
    }

    // Refs/locals to avoid triggering React renders on scroll
    const targetOffsetRef = { current: 0 }
    let ticking = false
    let visible = true

    const apply = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = `translateY(${targetOffsetRef.current}px)`
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!containerRef.current || !visible) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const p = Math.max(0, Math.min(1, scrollProgress))
      const maxOffset = extraHeight / 2
      targetOffsetRef.current = (p - 0.5) * 2 * maxOffset

      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    // IntersectionObserver to avoid work when off-screen
    const observer = new IntersectionObserver((entries) => {
      const e = entries[0]
      visible = !!e?.isIntersecting
      if (visible) handleScroll()
    }, { threshold: [0, 0.1, 0.5, 1] })

    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [extraHeight])

  const innerStyle: React.CSSProperties = {
    position: 'absolute',
    top: -(extraHeight / 2),
    left: 0,
    right: 0,
    bottom: -(extraHeight / 2),
    // transform will be updated directly via RAF for low-latency updates
    willChange: 'transform',
  }

  const visibleStyle: React.CSSProperties = {
    height: `${displayHeight}px`,
    maxHeight: `${displayHeight}px`,
  }

  // Use fullSrc when provided (higher-res); fall back to src
  const usedSrc = fullSrc || src

  return (
    <div
      ref={containerRef}
      className="mb-12 overflow-hidden rounded-2xl relative"
      style={{ backgroundColor: '#ffffff', position: 'relative', ...visibleStyle }}
    >
      <div ref={innerRef} style={innerStyle} aria-hidden>
        <Image
          src={usedSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
      </div>
    </div>
  )
}
