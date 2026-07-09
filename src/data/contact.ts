import type { ContactInfo } from '../types/content'

export const CONTACT: ContactInfo = {
  name: 'Kay Gijzen',
  role: 'AI Engineer · Sogeti · Leiden, NL',
  email: 'kay.gijzen@sogeti.com',
  linkedinUrl: 'https://linkedin.com/in/kay-gijzen',
  githubUrl: 'https://github.com/kaygijzen',
}

export const taglines = [
  'Engineering clever systems that create impact, end-to-end.',
  'Combining AI and software engineering.',
]

// This site's own repo — distinct from CONTACT.githubUrl, which points to
// the GitHub profile in general.
export const SITE_REPO_URL = 'https://github.com/kaygijzen/kaygijzen.github.io'
