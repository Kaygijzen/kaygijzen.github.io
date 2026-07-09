// Shared framer-motion constants used across sections. Kept in a plain
// module (not alongside the ScrollReveal components) so files that only
// need these values don't pull in component exports — mixing the two in
// one file breaks Vite Fast Refresh for that file.
export const EASE = [0.22, 1, 0.36, 1] as const

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}
