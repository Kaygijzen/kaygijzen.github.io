import { Mail } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { CONTACT } from '../../data/contact'
import { ContactButton } from './ContactButton'

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

type ContactButtonsVariant = 'light' | 'dark'

// Hero sits on the light hero background; Footer sits on the dark footer
// background — each needs its own base/hover palette to read correctly.
const VARIANT_STYLES: Record<
  ContactButtonsVariant,
  {
    baseBorder: string
    baseBg: string
    baseColor: string
    linkedinHover: string
    githubHover: string
    githubIconSize: number
  }
> = {
  light: {
    baseBorder: 'rgba(22,22,16,0.16)',
    baseBg: 'rgba(22,22,16,0.05)',
    baseColor: '#6B6B65',
    linkedinHover: '#0A66C2',
    githubHover: '#181717',
    githubIconSize: 17,
  },
  dark: {
    baseBorder: '#3D3D37',
    baseBg: '#272721',
    baseColor: '#E2E2DF',
    linkedinHover: '#0A66C2',
    githubHover: '#185FA5',
    githubIconSize: 16,
  },
}

// Email/LinkedIn/GitHub button trio shared by Hero and Footer. Renders no
// wrapping element of its own — the caller supplies the layout wrapper
// (Hero animates it in, Footer doesn't) — so it always slots in as three
// sibling buttons.
export function ContactButtons({ variant }: { variant: ContactButtonsVariant }) {
  const s = VARIANT_STYLES[variant]

  return (
    <>
      <ContactButton
        href={`mailto:${CONTACT.email}`}
        ariaLabel="Send email"
        icon={<Mail size={17} />}
        baseBorder={s.baseBorder}
        baseBg={s.baseBg}
        baseColor={s.baseColor}
        hoverBg="#185FA5"
        hoverColor="#fff"
      />
      <ContactButton
        href={CONTACT.linkedinUrl}
        external
        ariaLabel="LinkedIn profile"
        icon={LinkedInIcon}
        baseBorder={s.baseBorder}
        baseBg={s.baseBg}
        baseColor={s.baseColor}
        hoverBg={s.linkedinHover}
        hoverColor="#fff"
      />
      <ContactButton
        href={CONTACT.githubUrl}
        external
        ariaLabel="GitHub profile"
        icon={<SiGithub size={s.githubIconSize} />}
        baseBorder={s.baseBorder}
        baseBg={s.baseBg}
        baseColor={s.baseColor}
        hoverBg={s.githubHover}
        hoverColor="#fff"
      />
    </>
  )
}
