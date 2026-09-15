'use client'

import { useEffect } from 'react'

const SECTION_IDS = ['home', 'about', 'experience', 'projects']

// True if the wheel event happens inside an inner scrollable container that
// can still move in that direction — native scrolling should handle it.
// Once the container hits its edge, the snap takes over.
function insideActiveScrollable(target: EventTarget | null, deltaY: number) {
  let el = target instanceof Element ? target : null
  while (el && el !== document.body && el !== document.documentElement) {
    const overflowY = getComputedStyle(el).overflowY
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
      if (deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true
      if (deltaY < 0 && el.scrollTop > 1) return true
    }
    el = el.parentElement
  }
  return false
}

// Desktop: a wheel gesture moves the page to the next/previous section's
// preset position instead of free-scrolling.
export default function SnapScroll() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    let animating = false
    let cooldownUntil = 0
    // Linux touchpads and hi-res wheels deliver a gesture as many tiny
    // deltas, so accumulate across events instead of judging each one.
    let pending = 0
    let pendingReset: ReturnType<typeof setTimeout> | undefined

    const anchorTops = () =>
      SECTION_IDS
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .map(el => el.getBoundingClientRect().top + window.scrollY)

    const snapTo = (top: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const target = Math.min(top, maxScroll)
      animating = true
      window.scrollTo({ top: target, behavior: 'smooth' })
      const start = performance.now()
      const settle = () => {
        if (Math.abs(window.scrollY - target) < 2 || performance.now() - start > 1500) {
          animating = false
          cooldownUntil = performance.now() + 400
        } else {
          requestAnimationFrame(settle)
        }
      }
      requestAnimationFrame(settle)
    }

    const onWheel = (e: WheelEvent) => {
      if (!mq.matches) return
      // Project detail overlay open — it locks the page and scrolls itself.
      if (document.documentElement.style.overflow === 'hidden') return
      if (insideActiveScrollable(e.target, e.deltaY)) return

      e.preventDefault()
      if (animating || performance.now() < cooldownUntil) { pending = 0; return }
      pending += e.deltaY
      clearTimeout(pendingReset)
      pendingReset = setTimeout(() => { pending = 0 }, 200)
      if (Math.abs(pending) < 20) return
      const direction = pending
      pending = 0

      const y = window.scrollY
      const tops = anchorTops()
      const next =
        direction > 0
          ? tops.find(top => top > y + 2)
          : [...tops].reverse().find(top => top < y - 2)
      if (next === undefined) return
      snapTo(next)
    }

    document.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      document.removeEventListener('wheel', onWheel)
      clearTimeout(pendingReset)
    }
  }, [])

  return null
}
