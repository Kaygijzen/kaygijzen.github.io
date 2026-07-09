import { useRef } from 'react'
import { useInView, useReducedMotion, type UseInViewOptions } from 'framer-motion'

// Shared boilerplate behind the site's scroll-entrance components
// (FadeUp, StaggerGrid): a ref to observe, whether it's scrolled into view
// yet, and whether the user prefers reduced motion.
export function useScrollReveal(margin: UseInViewOptions['margin']) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin })
  const reduced = useReducedMotion()
  return { ref, inView, reduced }
}
