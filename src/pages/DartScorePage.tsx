import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { PhoneMockup } from '../components/PhoneMockup'
import { ContactButton } from '../components/ui/ContactButton'
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
  const [isDark, setIsDark] = useState(false)

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-gray-100'
      }`}
    >
      <ContactButton
        onClick={() => setIsDark((prev) => !prev)}
        ariaLabel="Toggle background color"
        className={`fixed top-4 right-4 z-50 hover-fill-blue ${
          isDark
            ? 'border-gray-700 bg-gray-800 text-gray-200'
            : 'border-black/[0.16] bg-black/[0.05] text-gray-600'
        }`}
        icon={
          <span className="relative block w-4 h-4">
            <Sun
              size={16}
              className={`absolute inset-0 transition-all duration-300 ${
                isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
            <Moon
              size={16}
              className={`absolute inset-0 transition-all duration-300 ${
                isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
          </span>
        }
      />

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
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        © 2026 Kay Gijzen
      </p>
    </div>
  )
}
