import { CONTACT, SITE_REPO_URL } from '../../data/contact'
import { ContactButtons } from '../ui/ContactButtons'
import { FadeUp } from '../ui/ScrollReveal'

const footerAccentClasses = ['text-brand-blue', 'text-brand-teal', 'text-brand-amber']

export function Footer() {
  return (
    <footer className="py-16 px-6" style={{ background: '#161610' }}>
      <FadeUp className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          {(['K', 'A', 'Y'] as const).map((letter, i) => (
            <div key={letter} className="flex items-center gap-3">
              <span
                className={`text-2xl font-bold ${footerAccentClasses[i]}`}
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                {letter}
              </span>
              {i < 2 && <span style={{ color: '#3D3D37', fontSize: '1.25rem' }}>·</span>}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p
            className="text-lg font-semibold mb-1"
            style={{ color: '#F0F0EE', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            {CONTACT.name}
          </p>
          <p className="text-sm" style={{ color: '#A8A8A3', fontFamily: 'Inter, sans-serif' }}>
            {CONTACT.role}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <ContactButtons variant="dark" />
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <p className="text-xs" style={{ color: '#A8A8A3', fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} {CONTACT.name}
          </p>
          <a
            href={SITE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline"
            style={{ color: '#7A7A75', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
          >
            View source
          </a>
        </div>
      </FadeUp>
    </footer>
  )
}
