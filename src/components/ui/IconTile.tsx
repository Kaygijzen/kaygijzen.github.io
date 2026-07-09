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
  return (
    <div
      className="rounded-2xl flex flex-col items-center justify-center gap-2"
      style={{
        width: size,
        height: size,
        background: '#FAFAF9',
        border: '1px solid #E8E8E4',
      }}
    >
      <Icon size={Math.floor(size * 0.34)} color={isActive ? '#185FA5' : '#6B6B65'} />
      <p
        className="text-xs font-medium"
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          color: isActive ? '#185FA5' : '#7A7A75',
          letterSpacing: '0.02em',
          fontSize: Math.max(9, Math.floor(size * 0.11)) + 'px',
        }}
      >
        {label}
      </p>
    </div>
  )
}
