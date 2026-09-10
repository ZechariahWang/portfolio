'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const skills = [
  { label: 'Robotics',     tech: 'ROS2, Linux, Docker, Microcontrollers, SoC',             image: '/about/cachedImage.png' },
  { label: 'AI & ML',      tech: 'PyTorch, OpenCV, SB3, PyBullet, Gymnasium',              image: '/about/eclipse.jpg' },
  { label: 'Fullstack',    tech: 'React, AWS, PostgreSQL, .NET, Node.js',                  image: '/about/second.JPG' },
  { label: 'CAD',          tech: 'Blender, SolidWorks, AutoCAD',                           image: '/about/embedded_.jpg' }
  // { label: 'Product',      tech: 'Davinci Resolve, Figma, Photoshop, Git',                 image: '/about/embedded_.jpg' },
]

export default function AboutSection() {
  const [activeSkill, setActiveSkill] = useState<number | null>(0)
  const activeImage = activeSkill !== null ? skills[activeSkill].image : null

  return (
    <section
      className="bg-background pt-14"
      style={{ height: '100svh', overflow: 'hidden', position: 'relative' }}
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

      {/* Right: photo bled into background — desktop only */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
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
              {/* Fade left into background */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to left, transparent 30%, var(--background) 100%)',
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

      {/* Left: content */}
      <div className="relative z-[1] h-full flex items-center justify-center md:justify-start px-6 md:pl-20 md:pr-0">
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="mb-8"
          >
            <span className="font-mono uppercase" style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
              02 — About
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(4rem, 9vw, 8rem)',
                color: 'var(--foreground)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                textTransform: 'uppercase',
                marginTop: '1.1rem',
                transform: 'scaleX(1.15) scaleY(1.3)',
                transformOrigin: 'top left',
                // ponytail: scaleY overflows the layout box by 0.3 x cap height (~0.22em); margin re-creates that clearance
                marginBottom: '0.45em',
                WebkitTextStroke: '0.01em currentColor',
                textBox: 'trim-both cap alphabetic',
              } as React.CSSProperties}
            >
              ABOUT.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
            className="text-[15px] text-muted-foreground leading-[1.7] mb-4"
          >
            I started at 210 as the software team lead for 6+ years, and qualified for the World Championships <strong>7x</strong>. I then built an autonomous UGV for the U.S. Army and secured <strong>$25,000</strong> in funding within two weeks. I now attend the University of Waterloo for <strong>Mechatronics Engineering</strong>, and am currently working at RoBIM this summer on robots for prefabrication.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-2"
          >
            Skills & Technologies
          </motion.p>

          <div>
            {skills.map((skill, i) => {
              const isActive = activeSkill === i
              return (
                <motion.button
                  key={skill.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ x: 6 }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.25 + i * 0.06, ease: [0.65, 0, 0.35, 1] },
                    x: { duration: 0.12, ease: 'easeOut' },
                  }}
                  onClick={() => setActiveSkill(isActive ? null : i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--border)',
                    padding: '1.1rem 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '1.5rem',
                  }}
                >
                  <span style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                    transition: 'color 0.25s ease',
                    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                    flexShrink: 0,
                  }}>
                    {skill.label}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: isActive
                      ? 'var(--muted-foreground)'
                      : 'color-mix(in srgb, var(--muted-foreground) 45%, transparent)',
                    transition: 'color 0.25s ease',
                    textAlign: 'right',
                  }}>
                    {skill.tech}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
