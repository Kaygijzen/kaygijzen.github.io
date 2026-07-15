import { useEffect, useState } from 'react'

const MARGIN_RATIO = 0.9
const RESIZE_DEBOUNCE_MS = 100

// Scales a fixed-size element down to fit the viewport, uniformly, via
// a wrapper transform — never touches the element's own layout size.
// Needed for embedded iframes (e.g. Flutter web) whose internal viewport
// must stay pinned to their real box size; only the painted result should
// shrink to fit smaller windows.
export function useResponsiveScale(width: number, height: number) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const computeScale = () => {
      const next = Math.min(
        1,
        (window.innerWidth * MARGIN_RATIO) / width,
        (window.innerHeight * MARGIN_RATIO) / height
      )
      setScale(next)
    }

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(computeScale, RESIZE_DEBOUNCE_MS)
    }

    computeScale()
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
  }, [width, height])

  return scale
}
