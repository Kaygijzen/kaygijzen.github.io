import { PhoneMockup } from '../components/PhoneMockup'
import { useResponsiveScale } from '../hooks/useResponsiveScale'

// PhoneMockup's actual rendered footprint (screen + bezel padding) — must
// match the w-[..]/h-[..] values on PhoneMockup's outer div.
const BEZEL_WIDTH = 410
const BEZEL_HEIGHT = 864
// Extra vertical space to reserve so the scaled mockup never grows large
// enough to crowd the bottom-anchored caption on short viewports.
const CAPTION_RESERVED_HEIGHT = 40

export default function DartScorePage() {
  const scale = useResponsiveScale(BEZEL_WIDTH, BEZEL_HEIGHT + CAPTION_RESERVED_HEIGHT)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {/*
          transform: scale() shrinks the mockup visually but not its layout
          box. This slot is sized to the actual scaled footprint so it takes
          up only the visible space when centering it in the viewport.
        */}
        <div
          className="flex items-center justify-center"
          style={{ width: BEZEL_WIDTH * scale, height: BEZEL_HEIGHT * scale }}
        >
          <div
            className="dartscore-scale-wrapper"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
          >
            <PhoneMockup src="/dartscore-app/index.html" />
          </div>
        </div>
      </div>

      <p
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 dark:text-gray-500"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        © 2026 Kay Gijzen
      </p>
    </div>
  )
}
