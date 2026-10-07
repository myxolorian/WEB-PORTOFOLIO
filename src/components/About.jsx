import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { DownloadSimple } from '@phosphor-icons/react'
import { profile } from '../data/profile'
import { externalProps, socials } from '../lib/socials'
import Portrait from './Portrait'
import { MaskLines, Reveal } from './Reveal'
import './About.css'

function NameTrack({ hidden }) {
  const [first, ...rest] = profile.name.split(' ')
  return (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {[0, 1].map((n) => (
        <span key={n} className="about__name">
          {first} <span className="serif">{rest.join(' ')}</span>
        </span>
      ))}
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])

  const { about } = profile

  return (
    <section id="about" className="section about" ref={ref} aria-labelledby="about-title">
      <div className="about__stage">
        <div className="marquee about__marquee" style={{ '--marquee-duration': '60s' }}>
          <NameTrack />
          <NameTrack hidden />
        </div>
        <motion.div className="about__portrait" style={{ y: portraitY }}>
          <Portrait />
        </motion.div>
      </div>

      <div className="container about__content">
        <h2 id="about-title" className="about__heading">
          <MaskLines lines={[about.headingTop, <span className="serif">{about.headingBottom}</span>]} />
        </h2>

        <div className="about__text">
          {about.paragraphs.map((text, i) => (
            <Reveal as="p" key={i} className="about__paragraph" delay={i * 0.1}>
              {text}
            </Reveal>
          ))}

          <Reveal className="about__facts" delay={0.2}>
            {about.facts.map((fact) => (
              <div key={fact.label} className="about__fact">
                <span className="meta muted">{fact.label}</span>
                <span className="about__fact-value">{fact.value}</span>
              </div>
            ))}
          </Reveal>

          <Reveal className="about__actions" delay={0.3}>
            <div className="about__socials">
              {socials.slice(0, 3).map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="badge about__social"
                  aria-label={label}
                  {...externalProps(href)}
                >
                  <Icon size={20} weight="light" />
                </a>
              ))}
            </div>
            <a className="btn btn--ghost" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV
              <DownloadSimple size={18} weight="light" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
