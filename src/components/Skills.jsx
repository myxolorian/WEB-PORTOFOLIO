import { Brain, Browser, Code, Database, Lightbulb, Translate } from '@phosphor-icons/react'
import { skillGroups } from '../data/skills'
import { MaskLines, Reveal } from './Reveal'
import './Skills.css'

const icons = {
  code: Code,
  browser: Browser,
  database: Database,
  brain: Brain,
  lightbulb: Lightbulb,
  translate: Translate,
}

export default function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head">
          <Reveal as="p" className="meta">
            Skills
          </Reveal>
          <h2 id="skills-title" className="h2">
            <MaskLines lines={['My everyday', <span className="serif">toolkit</span>]} />
          </h2>
          <Reveal as="p" className="body-text" delay={0.2}>
            The languages, frameworks and models I use to take an idea from a notebook to a working product.
          </Reveal>
        </header>

        <ul className="skills__grid">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon] ?? Code
            return (
              <Reveal as="li" key={group.id} className="skills__card card" delay={(i % 3) * 0.1}>
                <div className="skills__top">
                  <span className="badge">
                    <Icon size={20} weight="light" />
                  </span>
                  <span className="meta muted">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <h3 className="skills__title">{group.title}</h3>
                <ul className="skills__chips">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
