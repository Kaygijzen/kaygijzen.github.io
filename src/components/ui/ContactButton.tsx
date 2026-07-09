import type { ReactNode } from 'react'

type ContactButtonProps = {
  ariaLabel: string
  icon: ReactNode
  external?: boolean
  /** Base (+ dark:) Tailwind classes, plus a `.hover-fill-*` class (see
   *  index.css) for the hover treatment — kept out of Tailwind's `hover:`
   *  utilities so it can be scoped to real pointer devices. Icons should
   *  render via `currentColor` (no explicit `color` prop) so hover/dark
   *  text-color changes apply to them automatically. */
  className: string
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void })

// Circular icon button shared by every entry in the contact row (email,
// LinkedIn, GitHub, and the theme toggle) — renders as a link when given
// `href`, or a button when given `onClick`, but both share identical
// sizing/shape/transition so they read as one consistent row.
export function ContactButton({
  href,
  ariaLabel,
  icon,
  external,
  className,
  onClick,
}: ContactButtonProps) {
  const sharedClassName = `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 no-underline border-[1.5px] transition-colors duration-200 ${className}`

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={sharedClassName}
      >
        {icon}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={sharedClassName}>
      {icon}
    </button>
  )
}
