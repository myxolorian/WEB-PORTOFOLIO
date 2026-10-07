import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { SmoothScrollProvider } from './lib/SmoothScroll'
import Header from './components/Header'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import Work from './components/Work'
import Experience from './components/Experience'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const closeProject = useCallback(() => setActiveProject(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <a className="skip-link btn btn--primary" href="#work">
          Skip to projects
        </a>
        <Header />
        <main>
          <Hero />
          <TechMarquee />
          <Services onOpenProject={setActiveProject} />
          <Work onOpenProject={setActiveProject} />
          <Experience />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer onOpenProject={setActiveProject} />
        <ProjectModal slug={activeProject} onClose={closeProject} onChange={setActiveProject} />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
