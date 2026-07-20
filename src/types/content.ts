import type { ComponentType } from 'react'

// Shared icon type: covers both react-icons (plain function components) and
// lucide-react (forwardRef components) — every icon used across the site's
// content data satisfies this shape.
export type IconComponent = ComponentType<{ size?: number; color?: string; className?: string }>

export interface ContactInfo {
  name: string
  role: string
  email: string
  linkedinUrl: string
  githubUrl: string
}

export interface NavLink {
  href: string
  label: string | null
  short: string | null
  icon: IconComponent | null
}

export interface BuildCard {
  label: string
  subtitle: string
  description: string
  icon: IconComponent
}

export interface ToolkitItem {
  icon: IconComponent
  label: string
}

export interface TimelineMilestone {
  id: string
  org: string
  role: string
  dateRange: string
  type: 'education' | 'work'
  current?: boolean
}

export interface AppInfo {
  id: string
  name: string
  appStoreUrl: string | null
  playStoreUrl: string | null
}

export interface PersonalCard {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  accentBorder: string
  accentTint: string
  className?: string
}
