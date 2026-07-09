import { CONTACT } from '../../data/contact'
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
          <p className="text-sm" style={{ color: '#56564F', fontFamily: 'Inter, sans-serif' }}>
            {CONTACT.role}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <ContactButtons variant="dark" />
        </div>

        <p className="text-xs" style={{ color: '#3D3D37', fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} {CONTACT.name}
        </p>
      </FadeUp>
    </footer>
  )
}
