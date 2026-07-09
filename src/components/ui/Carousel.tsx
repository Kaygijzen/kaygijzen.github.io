import type { ReactNode, RefObject } from 'react'
import { motion, type PanInfo, type Transition } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Presentational half of the carousel — all drag/loop/auto-advance state
// lives in the `useCarousel` hook; this component just renders whatever
// that hook's state currently says, plus per-item scale/opacity based on
// distance from the centered card.
export interface CarouselProps<T> {
  containerRef: RefObject<HTMLDivElement | null>
  loopItems: T[]
  current: number
  cardWidth: number
  gap: number
  trackX: number
  trackTransition: Transition
  reduced: boolean | null
  dragConstraints: { left: number; right: number }
  dragElastic: number
  prev: () => void
  next: () => void
  onAnimationComplete: () => void
  onDragStart: () => void
  onDragEnd: (event: PointerEvent, info: PanInfo) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  renderItem: (item: T, index: number, meta: { isActive: boolean; dist: number }) => ReactNode
  itemKey: (item: T, index: number) => string
  prevLabel?: string
  nextLabel?: string
}

export function Carousel<T>({
  containerRef,
  loopItems,
  current,
  cardWidth,
  gap,
  trackX,
  trackTransition,
  reduced,
  dragConstraints,
  dragElastic,
  prev,
  next,
  onAnimationComplete,
  onDragStart,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
  renderItem,
  itemKey,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: CarouselProps<T>) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {/* Card row — arrows anchor to this wrapper only, so they center
          against the cards regardless of what renders below them. */}
      <div ref={containerRef} className="relative">
        <button
          onClick={prev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full transition-opacity"
          style={{
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid #E2E2DF',
          }}
          aria-label={prevLabel}
        >
          <ChevronLeft size={16} color="#3D3D37" />
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full transition-opacity"
          style={{
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid #E2E2DF',
          }}
          aria-label={nextLabel}
        >
          <ChevronRight size={16} color="#3D3D37" />
        </button>

        <div className="overflow-hidden">
          <motion.div
            className="flex select-none"
            style={{ gap }}
            animate={{ x: trackX }}
            transition={trackTransition}
            onAnimationComplete={onAnimationComplete}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={dragElastic}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            {loopItems.map((item, i) => {
              const dist = Math.abs(i - current)
              const isActive = dist === 0
              return (
                <motion.div
                  key={itemKey(item, i)}
                  style={{ width: cardWidth, flexShrink: 0 }}
                  animate={{
                    scale: isActive ? 1 : dist === 1 ? 0.9 : 0.82,
                    opacity: isActive ? 1 : dist === 1 ? 0.55 : 0.3,
                  }}
                  transition={
                    reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 32 }
                  }
                >
                  {renderItem(item, i, { isActive, dist })}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
