import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { CONTACT, taglines } from '../../data/contact'
import { ContactButtons } from '../ui/ContactButtons'
import { EASE } from '../../lib/motion'

function PortraitPhoto() {
  const [error, setError] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94, y: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
      className="relative w-64 sm:w-80 md:w-full"
      style={{ maxWidth: '460px' }}
    >
      <div
        className="border-brand-blue-border bg-brand-blue-tint"
        style={{
          aspectRatio: '1',
          borderRadius: '62% 38% 46% 54% / 56% 44% 56% 44%',
          overflow: 'hidden',
          borderWidth: '3px',
          borderStyle: 'solid',
          boxShadow: '0 16px 64px rgba(24,95,165,0.18), 0 0 80px rgba(15,110,86,0.07)',
          position: 'relative',
        }}
      >
        {!error ? (
          <img
            src="/images/portrait.jpg"
            alt="Kay Gijzen"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
            onError={() => setError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(145deg, #E6F1FB 0%, #C8DFFB 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="text-brand-blue-border"
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              KG
            </span>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, rgba(24,95,165,0.06) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </motion.div>
  )
}

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [tagVisible, setTagVisible] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setTagVisible(false)
      setTimeout(() => {
        setTaglineIndex((i) => (i + 1) % taglines.length)
        setTagVisible(true)
      }, 350)
    }, 3800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
      style={{ background: '#F8F8F7' }}
    >
      {/* Ambient blobs — hidden on mobile (perf), visible sm+ */}
      <div
        aria-hidden
        className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className="bg-brand-blue"
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            opacity: 0.075,
            filter: 'blur(100px)',
          }}
        />
        <div
          className="bg-brand-teal"
          style={{
            position: 'absolute',
            top: '10%',
            right: '-20%',
            width: '58vw',
            height: '58vw',
            borderRadius: '50%',
            opacity: 0.075,
            filter: 'blur(95px)',
          }}
        />
        <div
          className="bg-brand-amber"
          style={{
            position: 'absolute',
            bottom: '-14%',
            left: '18%',
            width: '42vw',
            height: '42vw',
            borderRadius: '50%',
            opacity: 0.055,
            filter: 'blur(85px)',
          }}
        />
        <div
          className="bg-brand-coral"
          style={{
            position: 'absolute',
            top: '2%',
            right: '24%',
            width: '26vw',
            height: '26vw',
            borderRadius: '50%',
            opacity: 0.04,
            filter: 'blur(65px)',
          }}
        />
      </div>

      {/*
        Two-area CSS grid, photo as the primary visual:
          mobile (1 col): portrait → text+buttons
          desktop (2 col, even split): [text+buttons] [portrait]
        `order` classes keep the mobile stacking (photo first) while
        swapping to text-left/photo-right on desktop.
      */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 items-center">
        {/* Portrait — mobile: row 1 | desktop: col 2 */}
        <div className="order-1 md:order-2 flex justify-center">
          <PortraitPhoto />
        </div>

        {/* Name + role + tagline + buttons — mobile: row 2 | desktop: col 1 */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start">
          {/* Name */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left leading-tight mb-3"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              color: '#161610',
              letterSpacing: '-0.03em',
            }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {CONTACT.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            className="text-center md:text-left mb-6"
            style={{
              color: '#7A7A75',
              fontFamily: '"Space Grotesk", sans-serif',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
            }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            {CONTACT.role}
          </motion.p>

          {/* Rotating tagline */}
          <motion.div
            style={{ minHeight: '3.6rem' }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p
              className="text-base md:text-lg text-center md:text-left max-w-sm"
              style={{
                color: '#56564F',
                fontFamily: 'Inter, sans-serif',
                opacity: tagVisible ? 1 : 0,
                transition: 'opacity 0.32s ease',
              }}
            >
              {taglines[taglineIndex]}
            </p>
          </motion.div>

          {/* Contact buttons */}
          <motion.div
            className="flex gap-3 mt-6"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65, ease: EASE }}
          >
            <ContactButtons variant="light" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#identity"
        className="absolute bottom-10 flex flex-col items-center gap-2"
        style={{ color: '#A8A8A3', textDecoration: 'none' }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
        >
          Scroll
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
