import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { experience } from '../data/experience'
import { MaskLines, Reveal } from './Reveal'
import './Experience.css'

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 65%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head">
          <Reveal as="p" className="meta">
            Experience
          </Reveal>
          <h2 id="experience-title" className="h2">
            <MaskLines lines={['Where I’ve', <span className="serif">grown so far</span>]} />
          </h2>
          <Reveal as="p" className="body-text" delay={0.2}>
            Organizations, volunteering and study that shaped how I build and work with people.
          </Reveal>
        </header>

        <div className="timeline" ref={listRef}>
          <div className="timeline__line" aria-hidden="true">
            <motion.div className="timeline__line-fill" style={{ scaleY: progress }} />
          </div>

          <ol className="timeline__list">
            {experience.map((item, i) => (
              <li key={item.org} className={`timeline__item ${i % 2 ? 'is-left' : 'is-right'}`}>
                <div className="timeline__marker" aria-hidden="true">
                  <span className="badge meta">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <Reveal className="timeline__card card" y={50} amount={0.3}>
                  <span className="label timeline__type">{item.type}</span>
                  <div className="timeline__heading">
                    <p className="meta muted">
                      {item.period} · {item.location}
                    </p>
                    <h3 className="h4">{item.role}</h3>
                    <p className="timeline__org">{item.org}</p>
                  </div>
                  <ul className="timeline__points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
