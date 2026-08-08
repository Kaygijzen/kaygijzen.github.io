import { useState, type ReactNode } from 'react'
import { ThemeContext, getInitialTheme, type Theme } from '../../hooks/useTheme'

const STORAGE_KEY = 'theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      // Only a manual toggle persists — until then the inline script in
      // index.html defaults every load to light.
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
