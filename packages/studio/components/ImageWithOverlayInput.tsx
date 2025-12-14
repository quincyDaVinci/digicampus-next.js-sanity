import React, {useState, useRef, useEffect} from 'react'
import {PatchEvent, set, unset} from 'sanity'

// A lightweight wrapper around the default image input that exposes
// a small overlay settings panel (enabled, direction, opacity).
// This keeps the native crop/hotspot modal but provides per-image overlay
// settings that are stored on the image object as `overlay`.
export default function ImageWithOverlayInput(props: any) {
  const {renderDefault, value, onChange} = props

  const overlay = (value && value.overlay) || null
  const [open, setOpen] = useState(false)

  // Refs/state for live preview overlay inside the image input
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [imageElementRect, setImageElementRect] = useState<null | {top:number,left:number,width:number,height:number}>(null)
  const [previewBgImage, setPreviewBgImage] = useState<string | null>(null)

  const enabled = !!overlay?.enabled
  const direction = overlay?.direction || 'down'
  const opacity = typeof overlay?.opacity === 'number' ? overlay.opacity : 0.5

  const setOverlay = (obj: Record<string, any> | null) => {
    if (obj) {
      onChange(PatchEvent.from(set(obj, ['overlay'])))
    } else {
      onChange(PatchEvent.from(unset(['overlay'])))
    }
  }

  const update = (patch: Record<string, any>) => {
    const next = {...(overlay || {}), ...patch}
    setOverlay(next)
  }

  // Compute live preview geometry and background whenever overlay changes or the container resizes
  useEffect(() => {
    const compute = () => {
      const container = containerRef.current
      if (!container) return
      const img = container.querySelector('img') as HTMLImageElement | null
      if (!img) {
        setImageElementRect(null)
        setPreviewBgImage(null)
        return
      }
      const imgRect = img.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setImageElementRect({
        top: imgRect.top - containerRect.top,
        left: imgRect.left - containerRect.left,
        width: imgRect.width,
        height: imgRect.height,
      })

      // Build preview gradient background
      const overlayOpacity = typeof overlay?.opacity === 'number' ? overlay.opacity : 0.5
      const start = 'rgba(0,0,0,0)'
      const end = `rgba(0,0,0,${Math.max(0, Math.min(1, overlayOpacity))})`
      const dir = overlay?.direction || 'down'
      const dirToCss: Record<string, string> = {up: 'to top', down: 'to bottom', left: 'to left', right: 'to right'}
      const cssDir = dirToCss[dir] || 'to bottom'
      setPreviewBgImage(`linear-gradient(${cssDir}, ${start}, ${end})`)
    }

    compute()
    let ro: ResizeObserver | null = null
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => compute())
      ro.observe(containerRef.current)
    }
    window.addEventListener('resize', compute)
    return () => {
      if (ro && containerRef.current) ro.unobserve(containerRef.current)
      window.removeEventListener('resize', compute)
    }
  }, [overlay])

  return (
    <div>
      {/* Render the default image input inside a relative container so we can
          draw a live overlay preview on top of the thumbnail. */}
      <div ref={containerRef} style={{position: 'relative'}}>
        {renderDefault(props)}

        {/* Live overlay preview positioned over the image thumbnail inside the input */}
        {imageElementRect && enabled && previewBgImage && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: imageElementRect.top + 'px',
              left: imageElementRect.left + 'px',
              width: imageElementRect.width + 'px',
              height: imageElementRect.height + 'px',
              pointerEvents: 'none',
              zIndex: 50,
              backgroundImage: previewBgImage,
              borderRadius: 6,
              mixBlendMode: 'normal',
            }}
          />
        )}
      </div>

      {/* Small controls area */}
      <div style={{marginTop: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap'}}>
        <label style={{display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500}}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => {
              if (e.target.checked) update({enabled: true, direction: direction, opacity})
              else setOverlay(null)
            }}
            style={{width: 16, height: 16, cursor: 'pointer'}}
          />
          <span>Enable overlay</span>
        </label>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: 500,
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'transparent',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            outline: 'none',
            boxShadow: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.03)'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
          }}
        >
          {open ? '▴ Hide settings' : '▾ Overlay settings'}
        </button>
      </div>

      {open && (
        <div style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 4,
          background: 'transparent',
        }}>
          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#2e3a4a'}}>Direction</div>
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
              {['up', 'down', 'left', 'right'].map((d) => (
                <label key={d} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: direction === d ? '#2276fc' : '#d3dce6',
                  background: direction === d ? '#e8f0fe' : '#fff',
                  color: direction === d ? '#2276fc' : '#2e3a4a',
                  fontWeight: direction === d ? 600 : 400,
                }}>
                  <input
                    type="radio"
                    name="overlay-direction"
                    value={d}
                    checked={direction === d}
                    onChange={() => update({direction: d})}
                    style={{margin: 0, cursor: 'pointer'}}
                  />
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#2e3a4a'}}>Opacity: {opacity.toFixed(2)}</div>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(e) => update({opacity: parseFloat(e.target.value)})}
                style={{flex: 1, height: 6, cursor: 'pointer'}}
              />
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(e) => update({opacity: Math.max(0, Math.min(1, parseFloat(e.target.value) || 0))})}
                style={{
                  width: 80,
                  padding: '6px 10px',
                  fontSize: 13,
                  border: '1px solid #d3dce6',
                  borderRadius: 4,
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
