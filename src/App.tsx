import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { Code2, Bot, Mail, ArrowDown, House, ChevronLeft, ChevronRight, Brain, Network } from 'lucide-react'
import type { IconType } from 'react-icons'
import { SiPython, SiPytorch, SiLangchain, SiDatabricks, SiMlflow, SiDocker, SiFastapi, SiReact, SiPostgresql, SiGithub } from 'react-icons/si'

// ─── Animation primitives ─────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const STAGGER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={STAGGER_ITEM}>
      {children}
    </motion.div>
  )
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        background:
          'linear-gradient(90deg, #185FA5 0%, #0F6E56 40%, #854F0B 72%, #993C1D 100%)',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: '#hero', label: null, short: null, icon: House },
  // { href: '#identity', label: 'K · A · Y', short: 'K · A · Y', icon: null },
  // { href: '#palette', label: 'Colors', short: 'Colors', icon: null },
  { href: '#build', label: 'What I Build.', short: 'What I Build.', icon: null },
  { href: '#motifs', label: 'Outside Work.', short: 'Outside Work.', icon: null },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pt-3 sm:pt-4 pointer-events-none">
      <div
        className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl pointer-events-auto transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid #E2E2DF',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {navLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.href}
              href={link.href}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-gray-100 flex items-center justify-center"
              style={{ fontFamily: '"Space Grotesk", sans-serif', color: '#3D3D37', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {Icon ? <Icon size={15} color="#3D3D37" /> : (
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

// ─── Hero ────────────────────────────────────────────────────────────────────

const taglines = ['Engineering clever systems that create impact, end-to-end.', 'Combining AI and software engineering.']

const monogramData = [
  { letter: 'K', word: 'Kreative', bg: '#E6F1FB', border: '#85B7EB', text: '#042C53', accent: '#185FA5' },
  { letter: 'A', word: 'Artificial Intelligence', bg: '#E1F5EE', border: '#5DCAA5', text: '#04342C', accent: '#0F6E56' },
  { letter: 'Y', word: 'Young Professional', bg: '#FAEEDA', border: '#EF9F27', text: '#412402', accent: '#854F0B' },
]

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

function ContactButton({
  href,
  ariaLabel,
  icon,
  external,
  baseBorder,
  baseBg,
  baseColor,
  hoverBg,
  hoverColor,
}: {
  href: string
  ariaLabel: string
  icon: ReactNode
  external?: boolean
  baseBorder: string
  baseBg: string
  baseColor: string
  hoverBg: string
  hoverColor: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40, height: 40,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: hovered ? '1.5px solid transparent' : `1.5px solid ${baseBorder}`,
        background: hovered ? hoverBg : baseBg,
        color: hovered ? hoverColor : baseColor,
        transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {icon}
    </a>
  )
}

function PortraitPhoto() {
  const [error, setError] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      className="relative w-52 sm:w-64 md:w-full"
      style={{ maxWidth: '340px' }}
    >
      <div
        style={{
          aspectRatio: '1',
          borderRadius: '62% 38% 46% 54% / 56% 44% 56% 44%',
          overflow: 'hidden',
          border: '3px solid #85B7EB',
          boxShadow: '0 16px 64px rgba(24,95,165,0.18), 0 0 80px rgba(15,110,86,0.07)',
          background: '#E6F1FB',
          position: 'relative',
        }}
      >
        {!error ? (
          <img
            src="/images/portrait.jpg"
            alt="Kay Gijzen"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
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
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                color: '#85B7EB',
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

function Hero() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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
      <div aria-hidden className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: 'absolute', top: '-22%', left: '-12%', width: '55vw', height: '55vw', borderRadius: '50%', background: '#185FA5', opacity: 0.08, filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', top: '28%', right: '-18%', width: '48vw', height: '48vw', borderRadius: '50%', background: '#0F6E56', opacity: 0.065, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '-12%', left: '22%', width: '42vw', height: '42vw', borderRadius: '50%', background: '#854F0B', opacity: 0.055, filter: 'blur(85px)' }} />
        <div style={{ position: 'absolute', top: '8%', right: '18%', width: '24vw', height: '24vw', borderRadius: '50%', background: '#993C1D', opacity: 0.04, filter: 'blur(65px)' }} />
      </div>

      {/*
        Three-area CSS grid:
          mobile (1 col): monogram → portrait → text+buttons
          desktop (2 col): [monogram] [portrait (row-span-2)]
                           [text+buttons]
        Grid auto-placement handles the ordering without order hacks.
      */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_38%] gap-10 md:gap-x-14 md:gap-y-8">

        {/* Monogram — mobile: row 1 | desktop: col 1, row 1 */}
        <div className="flex items-center justify-center md:justify-start">
          <div className="relative flex items-center gap-2 md:gap-6 mb-6">
            {monogramData.map((item, i) => (
              <div key={item.letter} className="flex items-center gap-2 md:gap-6">
                <div className="relative flex flex-col items-center">
                  <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border-2 cursor-default select-none"
                    style={{ background: item.bg, borderColor: item.border }}
                    animate={
                      reduced
                        ? {}
                        : {
                            opacity: activeIndex !== null && activeIndex !== i ? 0.35 : 1,
                            scale: activeIndex === i ? 1.1 : 1,
                            boxShadow:
                              activeIndex === i
                                ? `0 8px 32px ${item.accent}44`
                                : '0 0px 0px rgba(0,0,0,0)',
                          }
                    }
                    transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                    onHoverStart={() => setActiveIndex(i)}
                    onHoverEnd={() => setActiveIndex(null)}
                    onClick={() => setActiveIndex((prev) => (prev === i ? null : i))}
                  >
                    <span
                      className="text-4xl md:text-5xl font-bold"
                      style={{ color: item.text, fontFamily: '"Space Grotesk", sans-serif' }}
                    >
                      {item.letter}
                    </span>
                  </motion.div>

                  {/* Meaning word — absolutely below the box */}
                  <div
                    className="absolute left-1/2 whitespace-nowrap pointer-events-none"
                    style={{ top: 'calc(100% + 8px)', transform: 'translateX(-50%)' }}
                  >
                    <AnimatePresence>
                      {activeIndex === i && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.18 }}
                          className="text-xs font-semibold"
                          style={{
                            color: item.accent,
                            fontFamily: '"Space Grotesk", sans-serif',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.word}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {i < 2 && (
                  <span
                    className="text-lg md:text-3xl font-light select-none"
                    style={{ color: '#CBCBC7', fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Portrait — mobile: row 2 | desktop: col 2, rows 1–2 */}
        <div className="flex justify-center md:self-center md:row-span-2">
          <PortraitPhoto />
        </div>

        {/* Name + role + tagline + buttons — mobile: row 3 | desktop: col 1, row 2 */}
        <div className="flex flex-col items-center md:items-start">
          {/* Name */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left leading-tight mb-3"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: '#161610', letterSpacing: '-0.03em' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Kay Gijzen
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
            AI Engineer · Sogeti · Leiden, NL
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
            <ContactButton
              href="mailto:kay.gijzen@sogeti.com"
              ariaLabel="Send email"
              icon={<Mail size={17} />}
              baseBorder="rgba(22,22,16,0.16)"
              baseBg="rgba(22,22,16,0.05)"
              baseColor="#6B6B65"
              hoverBg="#185FA5"
              hoverColor="#fff"
            />
            <ContactButton
              href="https://linkedin.com/in/kay-gijzen"
              external
              ariaLabel="LinkedIn profile"
              icon={LinkedInIcon}
              baseBorder="rgba(22,22,16,0.16)"
              baseBg="rgba(22,22,16,0.05)"
              baseColor="#6B6B65"
              hoverBg="#0A66C2"
              hoverColor="#fff"
            />
            <ContactButton
              href="https://github.com/kaygijzen"
              external
              ariaLabel="GitHub profile"
              icon={<SiGithub size={17} />}
              baseBorder="rgba(22,22,16,0.16)"
              baseBg="rgba(22,22,16,0.05)"
              baseColor="#6B6B65"
              hoverBg="#181717"
              hoverColor="#fff"
            />
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

// ─── What I Build ─────────────────────────────────────────────────────────────

const buildItems = [
  {
    label: 'Software Engineering',
    subtitle: 'The infrastructure AI runs on',
    description:
      'Developing end-to-end solutions across the full stack, from data ingestion and machine learning pipelines to deployed APIs, frontend applications, and automated delivery workflows.',
    icon: Code2,
  },
  {
    label: 'Machine Learning & MLOps',
    subtitle: 'From experiment to deployed model',
    description:
      'Delivering end-to-end MLOps, from experimentation and feature engineering to deployment, model governance, and drift monitoring to enable timely retraining.',
    icon: Network,
  },
  {
    label: 'RAG & Knowledge Systems',
    subtitle: 'Grounding LLMs in truth',
    description:
      'Grounding AI responses in trusted knowledge through retrieval, re-ranking, and evaluation — reducing hallucinations and improving factual accuracy.',
    icon: Brain,
  },
  {
    label: 'Agents & Orchestration',
    subtitle: 'Reasoning and tool use, with guard-rails',
    description:
      'Autonomous agents that reason, plan, and call tools reliably — with the guard-rails, fallbacks, and observability that make them safe to run in production.',
    icon: Bot,
  },
]

const TOOLKIT_ITEMS: { icon: IconType; label: string }[] = [
  { icon: SiPython, label: 'Python' },
  { icon: SiPytorch, label: 'PyTorch' },
  { icon: SiLangchain, label: 'LangChain' },
  { icon: SiDatabricks, label: 'Databricks' },
  { icon: SiMlflow, label: 'MLflow' },
  { icon: SiDocker, label: 'Docker' },
  { icon: SiFastapi, label: 'FastAPI' },
  { icon: SiReact, label: 'React' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
]

const TOOLKIT_GAP = 12

function ToolkitCarousel() {
  const [current, setCurrent] = useState(0)
  const [containerW, setContainerW] = useState(() =>
    typeof window !== 'undefined' ? Math.min(window.innerWidth, 1040) : 800
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const n = TOOLKIT_ITEMS.length

  const cardW = containerW < 640 ? Math.floor(containerW / 3.2) : 120

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const trackX = containerW / 2 - cardW / 2 - current * (cardW + TOOLKIT_GAP)
  const maxX = containerW / 2 - cardW / 2
  const minX = maxX - (n - 1) * (cardW + TOOLKIT_GAP)

  const prev = () => setCurrent((c) => Math.max(c - 1, 0))
  const next = () => setCurrent((c) => Math.min(c + 1, n - 1))

  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) next()
    else if (info.offset.x > 50 || info.velocity.x > 300) prev()
  }

  return (
    <FadeUp delay={0.2} className="mt-14">
      <p
        className="text-xs tracking-widest uppercase text-center mb-7"
        style={{ color: '#A8A8A3', fontFamily: '"Space Grotesk", sans-serif' }}
      >
        Toolkit
      </p>

      <div ref={containerRef} className="relative">
        <button
          onClick={prev}
          disabled={current === 0}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full transition-opacity disabled:opacity-25"
          style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E2DF' }}
          aria-label="Previous tool"
        >
          <ChevronLeft size={16} color="#3D3D37" />
        </button>
        <button
          onClick={next}
          disabled={current === n - 1}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full transition-opacity disabled:opacity-25"
          style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E2DF' }}
          aria-label="Next tool"
        >
          <ChevronRight size={16} color="#3D3D37" />
        </button>

        <div className="overflow-hidden">
          <motion.div
            className="flex select-none"
            style={{ gap: TOOLKIT_GAP }}
            animate={{ x: trackX }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 }
            }
            drag="x"
            dragConstraints={{ left: minX, right: maxX }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {TOOLKIT_ITEMS.map((item, i) => {
              const dist = Math.abs(i - current)
              const isActive = dist === 0
              const IconComp = item.icon
              return (
                <motion.div
                  key={item.label}
                  style={{ width: cardW, flexShrink: 0 }}
                  animate={{
                    scale: isActive ? 1 : dist === 1 ? 0.9 : 0.82,
                    opacity: isActive ? 1 : dist === 1 ? 0.55 : 0.3,
                  }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 280, damping: 32 }
                  }
                >
                  <div
                    className="rounded-2xl flex flex-col items-center justify-center gap-2"
                    style={{
                      width: cardW,
                      height: cardW,
                      background: '#FAFAF9',
                      border: '1px solid #E8E8E4',
                    }}
                  >
                    <IconComp
                      size={Math.floor(cardW * 0.34)}
                      color={isActive ? '#185FA5' : '#6B6B65'}
                    />
                    <p
                      className="text-xs font-medium"
                      style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        color: isActive ? '#185FA5' : '#7A7A75',
                        letterSpacing: '0.02em',
                        fontSize: Math.max(9, Math.floor(cardW * 0.11)) + 'px',
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <div className="flex justify-center items-center gap-1 mt-6">
          {TOOLKIT_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to ${TOOLKIT_ITEMS[i].label}`}
              style={{ padding: '5px 4px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <motion.div
                animate={{
                  width: i === current ? 16 : 6,
                  background: i === current ? '#185FA5' : '#CBCBC7',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ height: 6, borderRadius: 3 }}
              />
            </button>
          ))}
        </div>
      </div>
    </FadeUp>
  )
}

function WhatIBuild() {
  const reduced = useReducedMotion()

  return (
    <section id="build" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: '#161610', letterSpacing: '-0.02em' }}
          >
            What I Build.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-7">
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#56564F', fontFamily: 'Inter, sans-serif' }}
          >
            I design and build AI systems end-to-end. From the model and data layer through
            agent orchestration, APIs, and the infrastructure that keeps it running. 
            Focused on solutions that operate reliably beyond the prototype stage.
          </p>
        </FadeUp>


        <FadeUp delay={0.1} className="text-center mb-7">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: '#A8A8A3', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Areas of Expertise
          </p>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {buildItems.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.label}>
                <motion.div
                  className="h-full"
                  whileHover={reduced ? {} : { y: -4, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                >
                  <div
                    className="rounded-2xl p-7 border-2 h-full flex flex-col"
                    style={{ background: '#E6F1FB', borderColor: '#85B7EB' }}
                  >
                    {/* Header row: icon badge + title/subtitle */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: '#185FA5' }}
                      >
                        <Icon size={20} color="#fff" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold leading-tight"
                          style={{ fontFamily: '"Space Grotesk", sans-serif', color: '#042C53' }}
                        >
                          {item.label}
                        </h3>
                        <p
                          className="text-xs font-medium mt-0.5"
                          style={{ color: '#185FA5', fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.01em' }}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#042C53', opacity: 0.7, fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGrid>

        <ToolkitCarousel />
      </div>
    </section>
  )
}

// ─── Personal ─────────────────────────────────────────────────────────────────

function BentoCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  accentBorder,
  accentTint,
  className,
}: {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  accentBorder: string
  accentTint: string
  className?: string
}) {
  const [error, setError] = useState(false)

  return (
    <motion.div
      variants={STAGGER_ITEM}
      className={`rounded-[20px] overflow-hidden relative group ${className ?? ''}`}
      style={{ border: `2px solid ${accentBorder}` }}
    >
      {!error ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: accentTint }} />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.10) 55%, transparent 100%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-white font-semibold text-lg leading-tight mb-1"
          style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
        >
          {title}
        </p>
        <p
          className="text-white text-xs leading-snug"
          style={{ fontFamily: 'Inter, sans-serif', opacity: 0.82, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}

function Personal() {
  return (
    <section id="motifs" className="py-20 px-6" style={{ background: '#F8F8F7' }}>
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-6">
          {/* <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: '#A8A8A3', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Where I live, what I love, where I'm from
          </p> */}
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: '#161610', letterSpacing: '-0.02em' }}
          >
            Outside Work.
          </h2>
          
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-10">
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#56564F', fontFamily: 'Inter, sans-serif' }}
          >
            Where I live, what I love, where I'm from.
          </p>
        </FadeUp>

        {/*
          Desktop 6-col equal-card grid:
          Row 1 → Leiden[2]  Music[2]  Traveling[2]
          Row 2 → _[1]  Surfing[2]  Limburg[2]  _[1]  (centered via col-start-2)
          Mobile → single column, stacked in order
        */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4">
          <BentoCard
            title="Leiden"
            subtitle="Where I studied, and ultimately decided to stay."
            imageSrc="/images/leiden.png"
            imageAlt="Leiden canal"
            accentBorder="#85B7EB"
            accentTint="#E6F1FB"
            className="h-56 md:h-[260px] md:col-span-2"
          />
          <BentoCard
            title="Music"
            subtitle="Playing guitar in my own bands, and exploring live music, from reggae to punk."
            imageSrc="/images/guitar.jpg"
            imageAlt="Guitar"
            accentBorder="#F0997B"
            accentTint="#FAECE7"
            className="h-56 md:h-[260px] md:col-span-2"
          />
          <BentoCard
            title="Travel"
            subtitle="Exploring new cultures, ways of thinking, and amazing views."
            imageSrc="/images/machu_picchu_cropped.jpeg"
            imageAlt="Traveling"
            accentBorder="#5DCAA5"
            accentTint="#E1F5EE"
            className="h-56 md:h-[260px] md:col-span-2"
          />
          <BentoCard
            title="Surfing"
            subtitle="Making time to surf whenever I can."
            imageSrc="/images/surf_cropped.jpeg"
            imageAlt="Surfing"
            accentBorder="#5DCAA5"
            accentTint="#E1F5EE"
            className="h-56 md:h-[260px] md:col-span-2 md:col-start-2"
          />
          <BentoCard
            title="Limburg"
            subtitle="Born and raised in the sunny south."
            imageSrc="/images/limburg.png"
            imageAlt="Vlaai"
            accentBorder="#EF9F27"
            accentTint="#FAEEDA"
            className="h-56 md:h-[260px] md:col-span-2"
          />
        </StaggerGrid>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const footerAccents = ['#185FA5', '#0F6E56', '#854F0B']

function Footer() {
  return (
    <footer className="py-16 px-6" style={{ background: '#161610' }}>
      <FadeUp className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          {(['K', 'A', 'Y'] as const).map((letter, i) => (
            <div key={letter} className="flex items-center gap-3">
              <span
                className="text-2xl font-bold"
                style={{ color: footerAccents[i], fontFamily: '"Space Grotesk", sans-serif' }}
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
            Kay Gijzen
          </p>
          <p className="text-sm" style={{ color: '#56564F', fontFamily: 'Inter, sans-serif' }}>
            AI Engineer · Leiden, NL
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <ContactButton
            href="mailto:kay.gijzen@sogeti.com"
            ariaLabel="Send email"
            icon={<Mail size={17} />}
            baseBorder="#3D3D37"
            baseBg="#272721"
            baseColor="#E2E2DF"
            hoverBg="#185FA5"
            hoverColor="#fff"
          />
          <ContactButton
            href="https://linkedin.com/in/kay-gijzen"
            external
            ariaLabel="LinkedIn profile"
            icon={LinkedInIcon}
            baseBorder="#3D3D37"
            baseBg="#272721"
            baseColor="#E2E2DF"
            hoverBg="#0A66C2"
            hoverColor="#fff"
          />
          <ContactButton
            href="https://github.com/kaygijzen"
            external
            ariaLabel="GitHub profile"
            icon={<SiGithub size={16} />}
            baseBorder="#3D3D37"
            baseBg="#272721"
            baseColor="#E2E2DF"
            hoverBg="#185FA5"
            hoverColor="#fff"
          />
        </div>

        <p className="text-xs" style={{ color: '#3D3D37', fontFamily: 'Inter, sans-serif' }}>
          © {new Date().getFullYear()} Kay Gijzen
        </p>
      </FadeUp>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        {/* <Identity /> */}
        {/* <ColorPalette /> */}
        <WhatIBuild />
        <Personal />
      </main>
      <Footer />
    </>
  )
}
