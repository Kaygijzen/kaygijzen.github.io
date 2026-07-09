import { useEffect, useState } from 'react'
import { navLinks } from '../../data/nav'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl pointer-events-auto transition-all duration-300 border border-gray-200 dark:border-gray-700 ${
          scrolled ? 'bg-white/92 dark:bg-gray-900/92' : 'bg-white/55 dark:bg-gray-900/55'
        }`}
        style={{
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {navLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.href}
              href={link.href}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center no-underline whitespace-nowrap text-gray-700 dark:text-gray-300"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              {Icon ? (
                <Icon size={15} />
              ) : (
                <>
                  <span className="sm:hidden">{link.short}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </>
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
