'use client'

import {useEffect, useMemo, useState} from 'react'
import type {ReactNode} from 'react'

interface CarouselProps {
  ariaLabel: string
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  spacing?: 'tight' | 'normal' | 'loose'
  children: ReactNode[]
}

const spacingPadding: Record<NonNullable<CarouselProps['spacing']>, string> = {
  tight: 'px-2 md:px-4',
  normal: 'px-4 md:px-8',
  loose: 'px-6 md:px-12',
}

export default function Carousel({
  ariaLabel,
  autoPlay = false,
  interval = 8000,
  showIndicators = true,
  spacing = 'normal',
  children,
}: CarouselProps) {
  const slides = useMemo(() => (Array.isArray(children) ? children : [children]), [children])
  const slideCount = slides.length
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!autoPlay || slideCount <= 1) return undefined
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount)
    }, Math.max(interval, 3000))
    return () => window.clearInterval(timer)
  }, [autoPlay, interval, slideCount])

  const goTo = (index: number) => {
    setCurrent((index + slideCount) % slideCount)
  }

  const paddingClass = spacingPadding[spacing]

  return (
    <section
      className="relative"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{transform: `translateX(-${current * 100}%)`}}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full shrink-0 ${paddingClass}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} van ${slideCount}`}
            >
              <div className="h-full">{slide}</div>
            </div>
          ))}
        </div>
      </div>
      {slideCount > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            className="rounded-full border border-[rgb(var(--dc-border)/0.5)] px-4 py-2 text-sm font-medium text-[rgb(var(--dc-text))] transition hover:bg-[rgb(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.2)]"
            aria-label="Vorige slide"
          >
            Vorige
          </button>
          {showIndicators ? (
            <div className="flex items-center gap-2" aria-hidden>
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-8 rounded-full transition ${
                    index === current
                      ? 'bg-[rgb(var(--dc-brand))]'
                      : 'bg-[rgb(var(--dc-border)/0.4)]'
                  }`}
                />
              ))}
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            className="rounded-full border border-[rgb(var(--dc-border)/0.5)] px-4 py-2 text-sm font-medium text-[rgb(var(--dc-text))] transition hover:bg-[rgb(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.2)]"
            aria-label="Volgende slide"
          >
            Volgende
          </button>
        </div>
      ) : null}
    </section>
  )
}
