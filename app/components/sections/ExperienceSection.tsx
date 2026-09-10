'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { experiences } from '../../data/experiences'

const experienceImages: Record<string, string> = {
  'robim technologies':    '/experience/robim3.png',
  'exia labs':             '/projects/atv.png',
  'twos conversation':     '/experience/twossite2.png',
  'conavi medical':        '/experience/conavi.jpg',
  'university of calgary': '/experience/uofc3.png',
  'watonomous':            '/projects/wato.jpg',
  '210z robotics':       '/projects/ecl.jpg',
}

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const activeExp = activeIndex !== null ? experiences[activeIndex] : null
  const activeImage = activeExp ? (experienceImages[activeExp.company] ?? null) : null

  return (
    <section
      className="bg-background"
      style={{ height: '100svh', paddingTop: '3.5rem', overflow: 'hidden', position: 'relative' }}
    >
      {/* Mobile dynamic background */}
      <div
        className="md:hidden"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <AnimatePresence>
          {activeImage && (
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}
            >
              <Image
                src={activeImage}
                alt=""
                fill
                sizes="100vw"
                priority
                style={{ objectFit: 'cover', filter: 'brightness(0.28) saturate(0.55)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--background) 0%, transparent 25%, transparent 65%, var(--background) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--background) 0%, transparent 30%, transparent 70%, var(--background) 100%)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left: photo bled into background — desktop only */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '58%',
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <AnimatePresence>
          {activeImage && (
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}
            >
              <Image
                src={activeImage}
                alt=""
                fill
                sizes="58vw"
                priority
                style={{ objectFit: 'cover', filter: 'brightness(0.38) saturate(0.65)' }}
              />
              {/* Fade right into site background */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, transparent 30%, var(--background) 100%)',
              }} />
              {/* Fade top */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, var(--background) 0%, transparent 18%)',
              }} />
              {/* Fade bottom */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, var(--background) 0%, transparent 25%)',
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: experience list */}
      <div className="relative z-[1] h-full flex flex-col items-center md:items-end">
        <div
          className="w-full md:w-1/2 h-full overflow-y-auto flex flex-col justify-start md:justify-center"
          style={{ padding: '6vh clamp(1.5rem, 6vw, 5rem) 4vh clamp(1.5rem, 2rem, 2rem)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="mb-10 text-right"
          >
            <span className="font-mono uppercase" style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
              03 — Experience
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3.6rem, 8vw, 7rem)',
                color: 'var(--foreground)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                textTransform: 'uppercase',
                marginTop: '1.1rem',
                transform: 'scaleX(1.15) scaleY(1.3)',
                transformOrigin: 'top right',
                marginBottom: '0.22em',
                WebkitTextStroke: '0.01em currentColor',
                textBox: 'trim-both cap alphabetic',
              } as React.CSSProperties}
            >
              EXPERIENCE.
            </h1>
          </motion.div>

          <div>
            {experiences.map((exp, i) => {
              const isActive = activeIndex === i

              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ x: -6 }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.08 + i * 0.06, ease: [0.65, 0, 0.35, 1] },
                    x: { duration: 0.12, ease: 'easeOut' },
                  }}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    padding: '1.25rem 0',
                    cursor: 'pointer',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ textAlign: 'left', flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: '12px',
                          color: isActive ? 'var(--muted-foreground)' : 'color-mix(in srgb, var(--muted-foreground) 50%, transparent)',
                          transition: 'color 0.25s ease',
                          marginBottom: '0.2rem',
                        }}
                      >
                        {exp.period}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: isActive ? 'var(--muted-foreground)' : 'color-mix(in srgb, var(--muted-foreground) 50%, transparent)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {exp.location}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: 500,
                          color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                          transition: 'color 0.25s ease',
                          marginBottom: '0.2rem',
                        }}
                      >
                        {exp.company}
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: isActive ? 'var(--muted-foreground)' : 'color-mix(in srgb, var(--muted-foreground) 50%, transparent)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        {exp.title}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.85rem', justifyContent: 'flex-end' }}>
                          {exp.skills.map(skill => (
                            <span
                              key={skill}
                              style={{
                                fontSize: '11px',
                                color: 'var(--muted-foreground)',
                                border: '1px solid var(--border)',
                                borderRadius: '999px',
                                padding: '0.18rem 0.55rem',
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
