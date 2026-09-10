'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const nameClasses = 'text-[29vw] leading-[0.9] tracking-tight text-foreground whitespace-nowrap'

const nameStyle = {
  fontFamily: 'var(--font-bebas-neue), system-ui, sans-serif',
  transform: 'scaleY(1.5)',
  WebkitTextStroke: '0.015em currentColor',
  textBox: 'trim-both cap alphabetic',
} as React.CSSProperties

const photoMask =
  'linear-gradient(to bottom, transparent, black 18%, black 72%, transparent), linear-gradient(to right, transparent, black 32%, black 68%, transparent)'

const HeroSection = () => {
  // Entrance animations wait for the photo to decode so the first frame is smooth.
  const [loaded, setLoaded] = useState(false)
  const { scrollY } = useScroll()
  const exitShift = (v: number, factor: number) => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return 0
    const vh = window.innerHeight
    const progress = Math.min(Math.max(v / vh, 0), 1)
    return progress * vh * factor
  }

  const textY = useTransform(scrollY, (v) => exitShift(v, -0.14))
  const imgY = useTransform(scrollY, (v) => exitShift(v, 0.1))

  const nameEnter = {
    initial: { opacity: 0, y: 80 },
    animate: loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <section className="page-hero bg-background relative overflow-hidden">
      <motion.div className="absolute inset-0 flex items-center justify-center text-center" style={{ y: textY }}>
        <motion.h1 className={nameClasses} style={nameStyle} {...nameEnter}>
          ZECHARIAH
        </motion.h1>
      </motion.div>

      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ y: imgY }}>
        <motion.div
          className="relative h-screen w-screen md:h-[90vh] md:w-[40vw]"
          initial={{ opacity: 0, y: 60 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Image
            src="/backgrounds/background_2.JPG"
            alt="Zechariah Wang"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
            style={{
              maskImage: photoMask,
              WebkitMaskImage: photoMask,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 42%, black 58%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 42%, black 58%)',
          y: textY,
        }}
      >
        <motion.div className={nameClasses} style={nameStyle} {...nameEnter}>
          ZECHARIAH
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
