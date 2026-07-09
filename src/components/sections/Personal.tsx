import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalCards } from '../../data/personalCards'
import { FadeUp, StaggerGrid } from '../ui/ScrollReveal'
import { STAGGER_ITEM } from '../../lib/motion'

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
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.10) 55%, transparent 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-white font-semibold text-lg leading-tight mb-1"
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </p>
        <p
          className="text-white text-xs leading-snug"
          style={{
            fontFamily: 'Inter, sans-serif',
            opacity: 0.82,
            textShadow: '0 1px 2px rgba(0,0,0,0.4)',
          }}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}

export function Personal() {
  return (
    <section id="outsideWork" className="py-20 px-6" style={{ background: '#F8F8F7' }}>
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-6">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              color: '#161610',
              letterSpacing: '-0.02em',
            }}
          >
            Outside Work.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-10">
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#56564F', fontFamily: 'Inter, sans-serif' }}
          >
            {
              "While I get a lot of energy from my work, these are the places, passions, and side quests that fill the hours beyond it. Because there's more to life than stand-ups and deployment pipelines."
            }
          </p>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4">
          {personalCards.map((card) => (
            <BentoCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              accentBorder={card.accentBorder}
              accentTint={card.accentTint}
              className={card.className}
            />
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
