import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion, type PanInfo } from 'framer-motion'

export interface UseCarouselOptions<T> {
  items: T[]
  gap: number
  computeCardWidth: (containerWidth: number) => number
  /**
   * How many items are cloned onto each end of the track to fake an
   * infinite loop. Needs to cover both the widest possible half-viewport
   * (so the clone buffer never runs out mid-drag and exposes a seam) AND a
   * burst of rapid arrow clicks — each click retargets the in-flight
   * spring before it settles, so the index can walk several items past the
   * real loop boundary before the loop-reset gets a chance to fire. A
   * generous buffer means the index can never walk past the end of the
   * array before that reset runs, even under ~20-30 rapid clicks.
   */
  clones?: number
  autoAdvanceMs?: number
  resumeDelayMs?: number
  /** How many seconds of released drag velocity get projected forward when
   *  deciding how many cards a flick should carry through. */
  velocityProjectionSeconds?: number
  maxFlickSteps?: number
  initialContainerWidth?: number
}

export function useCarousel<T>({
  items,
  gap,
  computeCardWidth,
  clones = 5,
  autoAdvanceMs = 3000,
  resumeDelayMs = 2000,
  velocityProjectionSeconds = 0.2,
  maxFlickSteps = 3,
  initialContainerWidth = 800,
}: UseCarouselOptions<T>) {
  const n = items.length

  const loopItems = useMemo(() => {
    // Build the clone buffers cyclically rather than with a single slice —
    // `clones` can be larger than the real item count, in which case a
    // plain slice would silently clamp instead of wrapping around.
    const leading = Array.from(
      { length: clones },
      (_, i) => items[(((n - clones + i) % n) + n) % n]
    )
    const trailing = Array.from({ length: clones }, (_, i) => items[i % n])
    return [...leading, ...items, ...trailing]
  }, [items, n, clones])
  const loopLength = loopItems.length

  // `current` indexes into `loopItems`; `clones` is real index 0.
  const [current, setCurrent] = useState(clones)
  const [instant, setInstant] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [resumeDelay, setResumeDelay] = useState(false)
  const [containerWidth, setContainerWidth] = useState(() =>
    typeof window !== 'undefined' ? Math.min(window.innerWidth, 1040) : initialContainerWidth
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const cardWidth = computeCardWidth(containerWidth)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const trackX = containerWidth / 2 - cardWidth / 2 - current * (cardWidth + gap)
  const maxX = containerWidth / 2 - cardWidth / 2
  const minX = maxX - (loopLength - 1) * (cardWidth + gap)

  const prev = () => {
    setInstant(false)
    setCurrent((c) => c - 1)
  }
  const next = () => {
    setInstant(false)
    setCurrent((c) => c + 1)
  }

  // Once the spring settles on a cloned card at either end, silently rebase
  // — no transition — to the equivalent position in the real, middle copy.
  // The clone renders identically to the real card, so the jump is
  // invisible. Uses a full modulo correction (not a single ± n) because a
  // burst of rapid clicks can retarget the in-flight animation many times
  // before it ever settles, so `current` may have drifted several
  // loop-lengths past the boundary by the time this finally runs — one ± n
  // step wouldn't be enough to land it back in the safe zone.
  const handleTrackAnimationComplete = () => {
    if (current < clones || current >= clones + n) {
      const realIndex = (((current - clones) % n) + n) % n
      setInstant(true)
      setCurrent(clones + realIndex)
    }
  }

  const handleDragStart = () => setIsDragging(true)

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    // Project the release velocity forward on top of how far they already
    // dragged, so a fast short flick can carry through multiple cards while
    // a slow deliberate drag still just nudges one card at a time.
    const step = cardWidth + gap
    const projected = info.offset.x + info.velocity.x * velocityProjectionSeconds
    const steps = Math.max(-maxFlickSteps, Math.min(maxFlickSteps, Math.round(-projected / step)))
    if (steps !== 0) {
      setInstant(false)
      setCurrent((c) => c + steps)
    }
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  // Pause while hovering/dragging; resume a couple of seconds after both stop.
  useEffect(() => {
    if (isHovering || isDragging) {
      setResumeDelay(true)
      return
    }
    const t = setTimeout(() => setResumeDelay(false), resumeDelayMs)
    return () => clearTimeout(t)
  }, [isHovering, isDragging, resumeDelayMs])

  const autoAdvancePaused = reduced || isHovering || isDragging || resumeDelay

  useEffect(() => {
    if (autoAdvancePaused) return
    const id = setInterval(() => {
      setInstant(false)
      setCurrent((c) => c + 1)
    }, autoAdvanceMs)
    return () => clearInterval(id)
  }, [autoAdvancePaused, autoAdvanceMs])

  const trackTransition =
    reduced || instant
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 170, damping: 40, mass: 1 }

  return {
    containerRef,
    loopItems,
    current,
    cardWidth,
    trackX,
    trackTransition,
    reduced,
    dragConstraints: { left: minX, right: maxX },
    dragElastic: 1,
    prev,
    next,
    onAnimationComplete: handleTrackAnimationComplete,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }
}
