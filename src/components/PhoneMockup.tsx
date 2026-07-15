import { useState } from 'react'

// Real iPhone 12 Pro CSS viewport size. Kept as a hard pixel value (not
// vw/vh or a percentage of a flex/aspect-ratio parent) because the
// embedded Flutter web build reads its own iframe viewport size once and
// doesn't reliably recover from a mismatch — any scaling here (transform,
// zoom, or a size that isn't settled at mount) leaves Flutter painting a
// canvas larger than the visible box, which then gets clipped.
const SCREEN_WIDTH = 390
const SCREEN_HEIGHT = 844

interface PhoneMockupProps {
  src?: string
  title?: string
}

export function PhoneMockup({ src, title }: PhoneMockupProps) {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative w-[410px] h-[864px] rounded-[62px] bg-gradient-to-b from-gray-800 to-black p-[10px] shadow-2xl ring-1 ring-white/10">
      <div className="relative w-[390px] h-[844px] rounded-[52px] overflow-hidden bg-black shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 w-[390px] h-[844px] rounded-[22px] overflow-hidden bg-[#0F1F0F] pb-4">
          {src && (
            <>
              <iframe
                src={src}
                title={title ?? 'DartScore'}
                allow="microphone"
                width={SCREEN_WIDTH}
                height={SCREEN_HEIGHT}
                className="w-full h-full  border-0"
                style={{ colorScheme: 'light' }}
                onLoad={() => setLoading(false)}
              />
              {loading && (
                <div className="absolute inset-0 w-[390px] h-[844px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <span
                    className="text-xs font-medium text-gray-400 dark:text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Loading...
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Home indicator */}
        {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/90 rounded-full z-10" /> */}
      </div>
    </div>
  )
}
