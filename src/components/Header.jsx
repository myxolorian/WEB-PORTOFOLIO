import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { navLinks, profile } from '../data/profile'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { EASE } from '../lib/easing'
import './Header.css'

export default function Header() {
  const { scrollTo, lock, unlock } = useSmoothScroll()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('top')

  // Hide the bar while scrolling down, bring it back when scrolling up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 240 && y > prev)
  })

  // Highlight the link of the section currently in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    lock()
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      unlock()
    }
  }, [menuOpen, lock, unlock])

  const go = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    // wait a frame so the scroll lock from the mobile menu is released first
    requestAnimationFrame(() => scrollTo(id === 'top' ? 0 : `#${id}`))
  }

  return (
    <header className="header">
      <motion.nav
        className={`header__bar ${scrolled || menuOpen ? 'is-scrolled' : ''}`}
        aria-label="Main"
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%', opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="header__inner">
          <a href="#top" className="logo" onClick={(e) => go(e, 'top')} aria-label="Back to top">
            {profile.shortName}
            <span>.</span>
          </a>

          <ul className="header__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`header__link ${active === link.id ? 'is-active' : ''}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={(e) => go(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn--primary header__cta" onClick={(e) => go(e, 'contact')}>
            Let’s talk
          </a>

          <button
            type="button"
            className="header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="mobile-menu__links">
              {navLinks.map((link, i) => (
                <li key={link.id} className="mask-line">
                  <motion.a
                    href={`#${link.id}`}
                    className={`mobile-menu__link mask-line__inner ${active === link.id ? 'is-active' : ''}`}
                    onClick={(e) => go(e, link.id)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <span className="mobile-menu__index meta muted">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mobile-menu__footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a className="meta muted" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <div className="mobile-menu__socials">
                <a className="meta" href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="meta" href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
