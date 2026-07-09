import { Mail, Moon, Sun } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { CONTACT } from '../../data/contact'
import { useTheme } from '../../hooks/useTheme'
import { ContactButton } from './ContactButton'

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

type ContactButtonsVariant = 'light' | 'dark'

// Hero sits on the toggleable page background (light or dark); Footer
// always sits on its own fixed dark background regardless of the site
// theme, so it doesn't need dark: variants of its own.
//
// Hover fills for all four buttons live in index.css as `.hover-fill-*`
// classes, scoped to `@media (hover: hover) and (pointer: fine)` — not as
// Tailwind `hover:` utilities — so tapping on touch devices can never
// leave a button stuck in its hover color.
const VARIANT_CLASSES: Record<
  ContactButtonsVariant,
  { base: string; }
> = {
  light: {
    base: 'border-black/[0.16] bg-black/[0.05] text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300',
  },
  dark: {
    base: 'border-gray-700 bg-gray-800 text-gray-200',
  },
}

// Email/LinkedIn/GitHub/theme-toggle button row shared by Hero and Footer.
// Renders no wrapping element of its own — the caller supplies the layout
// wrapper (Hero animates it in, Footer doesn't) — so it always slots in as
// four sibling buttons.
export function ContactButtons({ variant }: { variant: ContactButtonsVariant }) {
  const v = VARIANT_CLASSES[variant]
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <>
      <ContactButton
        href={`mailto:${CONTACT.email}`}
        ariaLabel="Send email"
        icon={<Mail size={17} />}
        className={`${v.base} hover-fill-blue`}
      />
      <ContactButton
        href={CONTACT.linkedinUrl}
        external
        ariaLabel="LinkedIn profile"
        icon={LinkedInIcon}
        className={`${v.base} hover-fill-blue`}
      />
      <ContactButton
        href={CONTACT.githubUrl}
        external
        ariaLabel="GitHub profile"
        icon={<SiGithub size={17} />}
        className={`${v.base} hover-fill-blue`}
      />
      <ContactButton
        onClick={toggleTheme}
        ariaLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`${v.base} hover-fill-blue`}
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
    </>
  )
}
