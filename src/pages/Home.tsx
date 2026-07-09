import { ThemeProvider } from '../components/ui/ThemeProvider'
import { ScrollProgress } from '../components/ui/ScrollProgress'
import { Nav } from '../components/ui/Nav'
import { Hero } from '../components/sections/Hero'
import { WhatIBuild } from '../components/sections/WhatIBuild'
import { CareerTimeline } from '../components/sections/CareerTimeline'
import { Personal } from '../components/sections/Personal'
import { Footer } from '../components/sections/Footer'

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <WhatIBuild />
        <CareerTimeline />
        <Personal />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
