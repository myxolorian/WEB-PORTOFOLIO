import { ArrowUpRight } from '@phosphor-icons/react'
import { services } from '../data/services'
import { MaskLines, Reveal } from './Reveal'
import './Services.css'

export default function Services({ onOpenProject }) {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-head">
          <Reveal as="p" className="meta">
            Services
          </Reveal>
          <h2 id="services-title" className="h2">
            <MaskLines lines={['What I', <span className="serif">can do</span>]} />
          </h2>
          <Reveal as="p" className="body-text" delay={0.2}>
            From the database to the model to the interface, these are the things I build.
          </Reveal>
        </header>

        <ul className="services__grid">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 0.1} className="services__card card">
              <div className="services__text">
                <p className="meta muted">0{i + 1}</p>
                <h3 className="h4">{service.title}</h3>
                <p className="body-text">{service.text}</p>
              </div>
              <button type="button" className="text-link" onClick={() => onOpenProject(service.project)}>
                <span className="badge badge--sm">
                  <ArrowUpRight size={18} weight="light" />
                </span>
                {service.cta}
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
