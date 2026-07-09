import type { IconComponent } from '../../types/content'

// The bordered icon+label tile used for each card in the toolkit carousel.
export function IconTile({
  icon: Icon,
  label,
  size,
  isActive,
}: {
  icon: IconComponent
  label: string
  size: number
  isActive: boolean
}) {
  const tone = isActive
    ? 'text-brand-blue dark:text-brand-blue-dark-text'
    : 'text-gray-500 dark:text-gray-300'

  return (
    <div
      // Card surface is deliberately a step lighter than the section's own
      // dark background (gray-800) — otherwise the tiles have no visible
      // border/fill against it and disappear in dark mode.
      className="rounded-2xl flex flex-col items-center justify-center gap-2 bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      style={{ width: size, height: size }}
    >
      <Icon size={Math.floor(size * 0.34)} className={tone} />
      <p
        className={`text-xs font-medium ${tone}`}
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          letterSpacing: '0.02em',
          fontSize: Math.max(9, Math.floor(size * 0.11)) + 'px',
        }}
      >
        {label}
      </p>
    </div>
  )
}
