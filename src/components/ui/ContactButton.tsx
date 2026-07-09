import { useState, type ReactNode } from 'react'

export function ContactButton({
  href,
  ariaLabel,
  icon,
  external,
  baseBorder,
  baseBg,
  baseColor,
  hoverBg,
  hoverColor,
}: {
  href: string
  ariaLabel: string
  icon: ReactNode
  external?: boolean
  baseBorder: string
  baseBg: string
  baseColor: string
  hoverBg: string
  hoverColor: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: hovered ? '1.5px solid transparent' : `1.5px solid ${baseBorder}`,
        background: hovered ? hoverBg : baseBg,
        color: hovered ? hoverColor : baseColor,
        transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {icon}
    </a>
  )
}
