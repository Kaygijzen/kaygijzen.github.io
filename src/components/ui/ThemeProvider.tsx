import { useState, type ReactNode } from 'react'
import { ThemeContext, getInitialTheme, type Theme } from '../../hooks/useTheme'

const STORAGE_KEY = 'theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      // Only a manual toggle persists — until then we keep following the
      // OS preference on every load (re-evaluated by the inline script).
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
