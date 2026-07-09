import { motion, useReducedMotion } from 'framer-motion'
import { buildCards } from '../../data/buildCards'
import { FadeUp, StaggerGrid, StaggerItem } from '../ui/ScrollReveal'
import { ToolkitCarousel } from './ToolkitCarousel'

export function WhatIBuild() {
  const reduced = useReducedMotion()

  return (
    <section id="whatIBuild" className="py-20 pb-6 px-6 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            What I Build.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-16">
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            I design and build AI systems end-to-end. From the model and data layer through agent
            orchestration, APIs, and the infrastructure that keeps it running. Focused on solutions
            that operate reliably beyond the prototype stage.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-7">
          <p
            className="text-xs tracking-widest uppercase text-gray-400 dark:text-gray-400"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Areas of Expertise
          </p>
        </FadeUp>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {buildCards.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.label}>
                <motion.div
                  className="h-full"
                  whileHover={reduced ? {} : { y: -4, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                >
                  <div className="rounded-2xl p-7 border-2 h-full flex flex-col bg-brand-blue-tint border-brand-blue-border dark:bg-brand-blue-tint-dark dark:border-brand-blue-border-dark">
                    {/* Header row: icon badge + title/subtitle */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand-blue">
                        <Icon size={20} color="#fff" />
                      </div>
                      <div>
                        <h3
                          className="text-lg font-semibold leading-tight text-brand-blue-dark dark:text-brand-blue-dark-text"
                          style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                        >
                          {item.label}
                        </h3>
                        <p
                          className="text-xs font-medium mt-0.5 text-brand-blue dark:text-brand-blue-dark-text"
                          style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed text-brand-blue-dark/70 dark:text-brand-blue-dark-text/80"
                      style={{ fontFamily: 'Inter, sans-serif' }}
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
