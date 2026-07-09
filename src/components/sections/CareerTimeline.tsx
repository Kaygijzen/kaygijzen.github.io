import { timelineMilestones } from '../../data/timeline'
import type { TimelineMilestone } from '../../types/content'
import { FadeUp } from '../ui/ScrollReveal'

function TimelineNode({ milestone, size = 16 }: { milestone: TimelineMilestone; size?: number }) {
  const isEducation = milestone.type === 'education'
  const ringSize = size + 8

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: ringSize, height: ringSize }}
    >
      {milestone.current && (
        <span
          aria-hidden
          className="timeline-pulse-ring absolute border-brand-blue"
          style={{
            width: ringSize,
            height: ringSize,
            borderRadius: '50%',
            borderWidth: 2,
            borderStyle: 'solid',
          }}
        />
      )}
      <span
        className={`border-brand-blue ${isEducation ? 'bg-white dark:bg-gray-800' : 'bg-brand-blue'}`}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          borderWidth: '2.5px',
          borderStyle: 'solid',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  )
}

function TimelineEntryText({
  milestone,
  align = 'center',
}: {
  milestone: TimelineMilestone
  align?: 'center' | 'left'
}) {
  return (
    <div style={{ maxWidth: 150, textAlign: align }}>
      <p
        className="leading-tight text-gray-900 dark:text-gray-50"
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          fontSize: '0.8rem',
        }}
      >
        {milestone.org}
      </p>
      <p
        className="leading-snug mt-0.5 text-gray-600 dark:text-gray-300"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem' }}
      >
        {milestone.role}
      </p>
      <p
        className="leading-snug text-gray-400 dark:text-gray-500"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.64rem' }}
      >
        {milestone.dateRange}
      </p>
    </div>
  )
}

function CareerTimelineHorizontal() {
  return (
    <div className="hidden md:block" style={{ paddingRight: 30 }}>
      <div className="relative">
        {/* Gradient path + forward arrowhead */}
        <div
          aria-hidden
          className="absolute top-1/2 left-0 -translate-y-1/2"
          style={{
            right: 30,
            height: 3,
            background: 'linear-gradient(90deg, #185FA5 0%, #0F6E56 100%)',
            borderRadius: 2,
          }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            right: 0,
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderLeft: '13px solid #0F6E56',
          }}
        />

        <div className="relative flex justify-between items-stretch">
          {timelineMilestones.map((milestone, i) => {
            const labelAbove = i % 2 === 0

            return (
              <div
                key={milestone.id}
                className="flex flex-col items-center"
                style={{ flex: '0 0 auto' }}
              >
                {/* Above slot — either this milestone's label, or the branch offshoot */}
                <div
                  className="flex flex-col items-center justify-end"
                  style={{ height: 92, marginBottom: 10 }}
                >
                  {labelAbove && <TimelineEntryText milestone={milestone} />}
                </div>

                <TimelineNode milestone={milestone} />

                {/* Below slot */}
                <div
                  className="flex flex-col items-center justify-start"
                  style={{ height: 92, marginTop: 10 }}
                >
                  {!labelAbove && <TimelineEntryText milestone={milestone} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CareerTimelineVertical() {
  // Fixed intrinsic width = node (24px) + gap (16px) + label max-width (150px),
  // centered as one unit via mx-auto. The line/arrow below are positioned
  // relative to this centered column (not the full-width section), so they
  // track the node centers regardless of viewport width.
  const COLUMN_WIDTH = 190
  const NODE_CENTER = 12

  return (
    <div className="md:hidden" style={{ paddingBottom: 32 }}>
      <div className="relative mx-auto" style={{ width: COLUMN_WIDTH }}>
        {/* Gradient path + forward arrowhead */}
        <div
          aria-hidden
          className="absolute top-0"
          style={{
            left: NODE_CENTER - 1.5,
            bottom: 26,
            width: 3,
            background: 'linear-gradient(180deg, #185FA5 0%, #0F6E56 100%)',
            borderRadius: 2,
          }}
        />
        <div
          aria-hidden
          className="absolute"
          style={{
            left: NODE_CENTER - 7,
            bottom: 0,
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '13px solid #0F6E56',
          }}
        />

        <div className="relative flex flex-col">
          {timelineMilestones.map((milestone, i) => {
            return (
              <div
                key={milestone.id}
                style={{ marginBottom: i === timelineMilestones.length - 1 ? 0 : 34 }}
              >
                <div className="flex items-start gap-4">
                  <TimelineNode milestone={milestone} />
                  <div className="pt-0.5">
                    <TimelineEntryText milestone={milestone} align="left" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function CareerTimeline() {
  return (
    <section id="timeline" className="py-20  px-6 pb-14 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Career Timeline.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-10">
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            From full-stack software development to AI engineering, building expertise across the
            software and AI lifecycle.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <CareerTimelineHorizontal />
          <CareerTimelineVertical />
        </FadeUp>
      </div>
    </section>
  )
}
