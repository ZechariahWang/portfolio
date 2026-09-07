'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { projects, projectCategories, projectsBackground, ProjectCategory, ProjectType } from '../../data/projects'

const EASE = [0.22, 1, 0.36, 1] as const

function BackgroundImage({ src }: { src: string }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', filter: 'brightness(0.22) saturate(0.5)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--background) 0%, transparent 40%, transparent 60%, var(--background) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 70%, var(--background) 100%)' }} />
    </div>
  )
}

function titleFontSize(len: number) {
  if (len <= 6) return 'clamp(4rem, 15vw, 13rem)'
  if (len <= 12) return 'clamp(3.2rem, 11vw, 9.5rem)'
  if (len <= 18) return 'clamp(2.6rem, 9vw, 7.5rem)'
  return 'clamp(2.3rem, 7.5vw, 6rem)'
}

function CategoryTile({
  category,
  index,
  count,
  onSelect,
}: {
  category: ProjectCategory
  index: number
  count: number
  onSelect: (key: ProjectType) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      onClick={() => onSelect(category.key)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View ${category.label} projects (${count})`}
      className="relative text-left focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:outline-none"
      style={{
        minHeight: 'clamp(340px, 52vh, 520px)',
        padding: '2rem',
        background: 'rgb(10 10 10 / 0.25)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform 0.4s ease',
        transform: hovered ? 'scale(1.005)' : 'scale(1)',
      }}
    >
      {/* Tile background image */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Image
          src={category.background}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
            filter: hovered ? 'brightness(0.7) saturate(0.9)' : 'brightness(0.5) saturate(0.75)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        {/* change this line for opacity */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgb(10 10 10 / 0.7) 0%, rgb(10 10 10 / 0.1) 55%, rgb(10 10 10 / 0.3) 100%)' }} /> 
        <div style={{ position: 'absolute', inset: 0, background: hovered ? `${category.accent}14` : 'transparent', transition: 'background 0.4s ease' }} />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '2px',
          background: category.accent,
          transformOrigin: 'left center',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 2,
        }}
      />
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 1 }}>
        <div className="font-mono" style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem', fontSize: '0.8rem', letterSpacing: '0.18em', marginBottom: '0.9rem' }}>
          <span style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ color: category.accent }}>
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            color: 'var(--foreground)',
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {category.label}
        </h3>
        <p
          style={{
            fontStyle: 'italic',
            color: 'var(--muted-foreground)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.3rem)',
            lineHeight: 1.5,
            marginTop: '0.8rem',
          }}
        >
          {category.description}
        </p>
      </div>
    </motion.button>
  )
}

function CategoryOverview({ onSelect }: { onSelect: (key: ProjectType) => void }) {
  return (
    <div style={{ position: 'relative' }}>
      <BackgroundImage src={projectsBackground} />
      <div className="overflow-x-hidden md:overflow-visible" style={{ position: 'relative', zIndex: 1 }}>
      <div className="page-container pt-[6vh] pb-12 flex flex-col justify-center" style={{ minHeight: '100svh' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="mb-10"
      >
        <span className="font-mono uppercase" style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
          04 — Projects
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            color: 'var(--foreground)',
            lineHeight: 1,
            marginTop: '1.1rem',
            transform: 'scaleX(1.15) scaleY(1.3)',
            transformOrigin: 'top left',
            marginBottom: '0.22em',
            WebkitTextStroke: '0.01em currentColor',
            textBox: 'trim-both cap alphabetic',
          } as React.CSSProperties}
        >
          PROJECTS.
        </h1>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-[2px] border"
        style={{ background: 'rgb(255 255 255 / 0.18)', borderColor: 'rgb(255 255 255 / 0.18)' }}
      >
        {projectCategories.map((category, i) => (
          <CategoryTile
            key={category.key}
            category={category}
            index={i}
            count={projects.filter(p => p.type === category.key).length}
            onSelect={onSelect}
          />
        ))}
      </div>
      </div>
      </div>
    </div>
  )
}

function PillButton({
  onClick,
  label,
  children,
  className = '',
  style,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`font-mono inline-flex items-center gap-2.5 rounded-full border border-border bg-background/60 px-6 py-2.5 cursor-pointer transition-colors duration-300 hover:border-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:outline-none ${className}`}
      style={{ fontSize: '0.8rem', letterSpacing: '0.18em', color: 'var(--muted-foreground)', borderRadius: '9999px', ...style }}
    >
      {children}
    </button>
  )
}

const Arrow = ({ flipped = false }: { flipped?: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    style={flipped ? { transform: 'scaleX(-1)' } : undefined}
    aria-hidden="true"
  >
    <path d="M5 12h14M14 6l6 6-6 6" />
  </svg>
)

const viewerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const viewerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

function ProjectViewer({
  category,
  activeIndex,
  direction,
  onBack,
  onPrev,
  onNext,
  onSelectProject,
}: {
  category: ProjectCategory
  activeIndex: number
  direction: number
  onBack: () => void
  onPrev: () => void
  onNext: () => void
  onSelectProject: (id: string) => void
}) {
  const categoryProjects = projects.filter(p => p.type === category.key)
  const project = categoryProjects[activeIndex]
  if (!project) return null

  const hasMultiple = categoryProjects.length > 1

  return (
    <div className="relative" style={{ minHeight: '100svh', overflow: 'hidden' }}>
      {/* Background follows the selected project */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          <BackgroundImage src={project.image} />
        </motion.div>
      </AnimatePresence>

      {/* Ghost watermark */}
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'absolute',
          right: 0,
          bottom: '-0.05em',
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(8rem, 14vw, 18rem)',
          color: 'var(--foreground)',
          opacity: 0.04,
          lineHeight: 0.8,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {category.label.toUpperCase()}
      </div>

      {/* Top bar */}
      <div className="page-container" style={{ position: 'absolute', top: '1.5rem', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <PillButton onClick={onBack} label="Back to categories">
          <Arrow flipped />
          BACK
        </PillButton>
        <span className="font-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', color: 'var(--muted-foreground)' }}>
          <span style={{ color: category.accent }}>{category.label.toUpperCase()}</span>
          {' · '}
          {activeIndex + 1} / {categoryProjects.length}
        </span>
      </div>

      {/* Desktop prev/next pills */}
      {hasMultiple && (
        <>
          <PillButton
            onClick={onPrev}
            label="Previous project"
            className="max-md:hidden"
            style={{ position: 'absolute', left: 'clamp(16px, 3vw, 48px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          >
            <Arrow flipped />
            PREV
          </PillButton>
          <PillButton
            onClick={onNext}
            label="Next project"
            className="max-md:hidden"
            style={{ position: 'absolute', right: 'clamp(16px, 3vw, 48px)', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          >
            NEXT
            <Arrow />
          </PillButton>
        </>
      )}

      <div
        className="overflow-x-hidden md:overflow-visible md:min-h-svh flex flex-col md:justify-center"
        style={{ position: 'relative', zIndex: 10 }}
      >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={project.id}
          className="page-container grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center pt-36 pb-16 lg:py-0"
          style={{ position: 'relative' }}
          initial={{ opacity: 0, x: 40 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 * direction }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Image — shown first on mobile */}
          <motion.button
            type="button"
            onClick={() => onSelectProject(project.id)}
            aria-label={`View details for ${project.title}`}
            className="relative block w-full border border-border cursor-pointer order-1 lg:order-2 focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:outline-none"
            style={{ height: 'clamp(400px, 74vh, 900px)', overflow: 'hidden', padding: 0 }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{ objectFit: 'cover', filter: 'saturate(0.9)' }}
            />
          </motion.button>

          {/* Text column */}
          <motion.div
            className="flex flex-col gap-7 order-2 lg:order-1"
            variants={viewerStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={viewerItem}
              className="font-mono uppercase"
              style={{ color: category.accent, fontSize: '0.85rem', letterSpacing: '0.25em', margin: 0 }}
            >
              {category.label}
            </motion.p>
            <motion.h2
              variants={viewerItem}
              onClick={() => onSelectProject(project.id)}
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: titleFontSize(project.title.length),
                color: 'var(--foreground)',
                lineHeight: 0.92,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                margin: 0,
                cursor: 'pointer',
                overflowWrap: 'break-word',
              }}
            >
              <span style={{ color: category.accent }}>{project.title.charAt(0)}</span>
              {project.title.slice(1)}
            </motion.h2>
            <motion.p
              variants={viewerItem}
              style={{
                fontStyle: 'italic',
                color: 'var(--muted-foreground)',
                fontSize: '1.3rem',
                lineHeight: 1.65,
                maxWidth: '38rem',
                margin: 0,
              }}
            >
              {project.description}
            </motion.p>
            <motion.div variants={viewerItem} className="border-t border-border pt-5 mt-2 flex flex-col gap-4">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.92rem',
                      padding: '0.35rem 0.9rem',
                      borderRadius: '999px',
                      border: '1px solid rgb(255 255 255 / 12%)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSelectProject(project.id)}
                className="font-mono self-start cursor-pointer transition-colors duration-300 hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:outline-none"
                style={{ fontSize: '0.85rem', letterSpacing: '0.18em', color: 'var(--muted-foreground)', padding: 0, background: 'none', border: 'none' }}
              >
                VIEW DETAILS →
              </button>
            </motion.div>

            {/* Mobile prev/next — desktop uses the side pills */}
            {hasMultiple && (
              <motion.div variants={viewerItem} className="flex gap-3 md:hidden">
                <PillButton onClick={onPrev} label="Previous project">
                  <Arrow flipped />
                  PREV
                </PillButton>
                <PillButton onClick={onNext} label="Next project">
                  NEXT
                  <Arrow />
                </PillButton>
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      </AnimatePresence>
      </div>
    </div>
  )
}

export default function ProjectsSection({ onSelectProject }: { onSelectProject: (id: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<ProjectType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const category = projectCategories.find(c => c.key === activeCategory) ?? null
  const count = category ? projects.filter(p => p.type === category.key).length : 0

  const enterCategory = (key: ProjectType) => {
    setActiveIndex(0)
    setDirection(1)
    setActiveCategory(key)
  }

  const prev = () => {
    setDirection(-1)
    setActiveIndex(i => (i - 1 + count) % count)
  }

  const next = () => {
    setDirection(1)
    setActiveIndex(i => (i + 1) % count)
  }

  return (
    <section className="bg-background pt-14" style={{ minHeight: '100svh', position: 'relative' }}>
      <AnimatePresence mode="wait" initial={false}>
        {category === null ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <CategoryOverview onSelect={enterCategory} />
          </motion.div>
        ) : (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <ProjectViewer
              category={category}
              activeIndex={activeIndex}
              direction={direction}
              onBack={() => setActiveCategory(null)}
              onPrev={prev}
              onNext={next}
              onSelectProject={onSelectProject}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
