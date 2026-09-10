'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type PreloadImage = { src: string; priority?: boolean }

// Tier 1 (priority=true): hero + above-fold card images on /about — biggest LCP impact
// Tier 2 (default): experience + projects list and detail images, eager-loaded via fill in viewport
const siteImages: PreloadImage[] = [
  { src: '/misc/pfp_yes.jpg', priority: true },
  { src: '/projects/atv.png', priority: true },
  { src: '/about/cachedImage.png', priority: true },
  { src: '/about/second.JPG', priority: true },
  { src: '/about/eclipse.jpg', priority: true },
  { src: '/about/embedded_.jpg', priority: true },

  { src: '/experience/twossite2.png' },
  { src: '/experience/conavi.jpg' },
  { src: '/experience/uofc3.png' },
  { src: '/experience/robim3.png' },
  { src: '/projects/wato.jpg' },
  { src: '/projects/WATonomous.png' },
  { src: '/projects/ecl.jpg' },

  { src: '/projects/aicaryes.png' },
  { src: '/projects/conc.png' },
  { src: '/projects/nova.png' },
  { src: '/projects/gpagain.JPG' },
  { src: '/projects/westmechpic.png' },
  { src: '/projects/original.jpg' },
  { src: '/projects/InterviewTrainer.png' },
  { src: '/projects/MentalSupport.png' },
  { src: '/projects/AE.jpg' },
  { src: '/projects/robot.png' },
  { src: '/projects/triballs.jpg' },
  { src: '/projects/trophies.JPG' },
  { src: '/projects/gp.jpg' },
  { src: '/projects/image_2.avif' },
  { src: '/projects/maxresdefault.jpg' },
  { src: '/projects/sac1.png' },
  { src: '/projects/sac2.png' },
]

// Mounts after the page has loaded and the hero has finished animating, so
// these decodes never compete with the first paint.
const PRELOAD_DELAY_MS = 3000

export default function ImagePreloader() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let timer = 0
    const arm = () => { timer = window.setTimeout(() => setReady(true), PRELOAD_DELAY_MS) }
    if (document.readyState === 'complete') arm()
    else window.addEventListener('load', arm, { once: true })
    return () => {
      window.removeEventListener('load', arm)
      window.clearTimeout(timer)
    }
  }, [])

  if (!ready) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {siteImages.map(({ src }) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      ))}
    </div>
  )
}
