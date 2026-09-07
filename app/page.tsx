'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ProjectDetailOverlay from './components/ProjectDetailOverlay'
import { projectDetails } from './data/projects'

// How far (as a fraction of viewport height) a pinned section drifts up while
// the next section overtakes it at full scroll speed.
const STACK_PARALLAX = 0.2

// Desktop: pins a full-viewport section at the top of the screen so the next
// section scrolls up over it; while being overtaken, the pinned section drifts
// up slowly, making the incoming section appear to move faster.
// Mobile: plain stacked sections, no pinning or parallax.
function StackedSection({ index, children }: { index: number; children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (v) => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return 0
    const vh = window.innerHeight
    const progress = Math.min(Math.max((v - index * vh) / vh, 0), 1)
    return -progress * vh * STACK_PARALLAX
  })

  return (
    <div className="relative md:sticky md:top-0" style={{ zIndex: index + 1, height: '100svh' }}>
      <motion.div style={{ y, height: '100%' }}>{children}</motion.div>
    </div>
  )
}

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = projectDetails.find(p => p.id === selectedId) ?? null

  return (
    <>
      {/* Zero-height anchors mark each section's scroll slot. Sticky wrappers
          report pinned (visual) positions, so the navbar targets these instead. */}
      <div id="home" />
      <StackedSection index={0}>
        <HeroSection />
      </StackedSection>
      <div id="about" />
      <StackedSection index={1}>
        <AboutSection />
      </StackedSection>
      <div id="experience" />
      <StackedSection index={2}>
        <ExperienceSection />
      </StackedSection>
      <div id="projects" />
      <div style={{ position: 'relative', zIndex: 4 }}>
        <ProjectsSection onSelectProject={setSelectedId} />
      </div>
      <AnimatePresence>
        {selected && (
          <ProjectDetailOverlay project={selected} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
