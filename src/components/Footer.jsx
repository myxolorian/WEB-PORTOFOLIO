import { ArrowUp } from '@phosphor-icons/react'
import { navLinks, profile } from '../data/profile'
import { projects } from '../data/projects'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { externalProps, socials } from '../lib/socials'
import './Footer.css'

export default function Footer({ onOpenProject }) {
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()

  const go = (e, id) => {
    e.preventDefault()
    scrollTo(id === 'top' ? 0 : `#${id}`)
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="logo" onClick={(e) => go(e, 'top')}>
              {profile.shortName}
              <span>.</span>
            </a>
            <ul className="footer__socials">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className="footer__social" {...externalProps(href)}>
                    <span className="badge badge--md">
                      <Icon size={16} weight="light" />
                    </span>
                    <span className="meta">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <p className="footer__heading">Navigate</p>
            <ul className="footer__links">
              <li>
                <a href="#top" className="meta" onClick={(e) => go(e, 'top')}>
                  Home
                </a>
              </li>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="meta" onClick={(e) => go(e, link.id)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="meta" onClick={(e) => go(e, 'contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__heading">Projects</p>
            <ul className="footer__links">
              {projects.map((project) => (
                <li key={project.slug}>
                  <button type="button" className="meta" onClick={() => onOpenProject(project.slug)}>
                    {project.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Contact</p>
            <ul className="footer__links footer__links--plain">
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                  {profile.phone}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
            <a className="btn btn--primary footer__cv" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} {profile.name}. Built with React, deployed on Vercel.
          </p>
          <button type="button" className="footer__top text-link" onClick={() => scrollTo(0)}>
            To top
            <span className="badge">
              <ArrowUp size={20} weight="light" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
