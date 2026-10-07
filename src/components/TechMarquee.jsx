import { marqueeTech } from '../data/skills'
import './TechMarquee.css'

function Track({ hidden }) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {marqueeTech.map((name) => (
        <li key={name} className="tech-marquee__item">
          <span>{name}</span>
          <span className="tech-marquee__star" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
}

// Endless row of technologies, standing in for the client-logo strip of the design.
export default function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Technologies I work with">
      <div className="marquee" style={{ '--marquee-duration': '45s' }}>
        <Track />
        <Track hidden />
      </div>
    </section>
  )
}
