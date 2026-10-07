import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from '@phosphor-icons/react'
import { profile } from '../data/profile'
import { MaskLines, Reveal } from './Reveal'
import './Contact.css'

function Band({ hidden }) {
  return (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="contact__band-item meta">
          <span>+++</span>
          <span>Let’s talk</span>
        </span>
      ))}
    </div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="contact__band">
        <div className="marquee" style={{ '--marquee-duration': '30s' }}>
          <Band />
          <Band hidden />
        </div>
      </div>

      <div className="contact__body">
        <Reveal as="p" className="meta">
          Have a role or project in mind?
        </Reveal>
        <h2 id="contact-title" className="contact__title display">
          <MaskLines lines={['Let’s build', <span className="serif">something great</span>]} />
        </h2>
        <Reveal as="p" className="contact__text" delay={0.15}>
          I’m open to internships, freelance projects and collaborations in fullstack development and AI.
        </Reveal>

        <Reveal className="contact__actions" delay={0.25}>
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Get in touch
            <ArrowUpRight size={18} weight="light" />
          </a>
          <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight size={18} weight="light" />
          </a>
        </Reveal>

        <Reveal className="contact__email" delay={0.35}>
          <span className="muted">{profile.email}</span>
          <button type="button" className="contact__copy meta" onClick={copyEmail}>
            {copied ? <Check size={14} weight="light" /> : <Copy size={14} weight="light" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
