import { toolkitItems } from '../../data/toolkit'
import { useCarousel } from '../../hooks/useCarousel'
import { Carousel } from '../ui/Carousel'
import { IconTile } from '../ui/IconTile'
import { FadeUp } from '../ui/ScrollReveal'

const TOOLKIT_GAP = 12

function computeCardWidth(containerWidth: number) {
  return containerWidth < 640 ? Math.floor(containerWidth / 3.2) : 120
}

export function ToolkitCarousel() {
  const carousel = useCarousel({
    items: toolkitItems,
    gap: TOOLKIT_GAP,
    computeCardWidth,
    clones: 25,
    autoAdvanceMs: 3000,
    resumeDelayMs: 2000,
    velocityProjectionSeconds: 0.2,
    maxFlickSteps: 3,
  })

  return (
    <FadeUp delay={0.2} className="mt-20">
      <p
        className="text-xs tracking-widest uppercase text-center mb-7"
        style={{ color: '#A8A8A3', fontFamily: '"Space Grotesk", sans-serif' }}
      >
        Toolkit
      </p>

      <Carousel
        {...carousel}
        gap={TOOLKIT_GAP}
        prevLabel="Previous tool"
        nextLabel="Next tool"
        itemKey={(item, i) => `${item.label}-${i}`}
        renderItem={(item, _i, { isActive }) => (
          <IconTile
            icon={item.icon}
            label={item.label}
            size={carousel.cardWidth}
            isActive={isActive}
          />
        )}
      />
    </FadeUp>
  )
}
