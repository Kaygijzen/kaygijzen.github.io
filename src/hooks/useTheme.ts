import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

// Created here (not in ThemeProvider.tsx) so this stays a plain hook
// module — mixing a component export with a hook export in one file
// breaks Vite Fast Refresh for that file.
export const ThemeContext = createContext<ThemeContextValue | null>(null)

// The contact-button row (and thus the theme toggle inside it) renders
// twice on the page — once in Hero, once in Footer. Both read from the
// same ThemeProvider (see ../components/ui/ThemeProvider.tsx) so toggling
// in one place is reflected in both, instead of each holding its own
// independent (and easily out-of-sync) state.
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}

// The actual initial class is already applied synchronously by the
// blocking inline script in index.html (avoids a flash of the wrong
// theme before React hydrates). This just reads whatever it decided.
export function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}
