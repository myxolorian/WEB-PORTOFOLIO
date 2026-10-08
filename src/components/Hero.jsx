import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'
import { profile } from '../data/profile'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { externalProps, socials } from '../lib/socials'
import { EASE } from '../lib/easing'
import Portrait from './Portrait'
import { MaskLines } from './Reveal'
import './Hero.css'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const format = (n, decimals, suffix = '') => `${n.toFixed(decimals)}${suffix}`

// Counts up from zero the first time the number scrolls into view.
function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!inView || !el) return undefined
    if (reduceMotion) {
      el.textContent = format(value, decimals, suffix)
      return undefined
    }
    const controls = animate(0, value, {
      duration: 1.8,
      delay: 0.9,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = format(v, decimals, suffix)
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value, decimals, suffix])

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {format(0, decimals, suffix)}
      </span>
      <span className="sr-only">{format(value, decimals, suffix)}</span>
    </>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollTo } = useSmoothScroll()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // gentle parallax: the photo drifts slower than the page
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  const { hero } = profile

  return (
    <section id="top" className="hero" ref={ref} aria-labelledby="hero-name">
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <motion.div className="hero__text" variants={stagger} initial="hidden" animate="show">
          <motion.p className="hero__greeting" variants={rise}>
            {hero.greeting}
          </motion.p>
          <motion.h1 id="hero-name" className="hero__name" variants={rise}>
            {profile.name}
          </motion.h1>

          <p className="hero__title">
            <MaskLines
              animateOnMount
              delay={0.45}
              stagger={0.14}
              lines={[hero.titleTop, <span className="serif">{hero.titleBottom}</span>]}
            />
          </p>

          <motion.p className="hero__subtitle" variants={rise}>
            {hero.subtitle}
          </motion.p>

          <motion.ul className="hero__socials" variants={rise} aria-label="Social links">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} className="badge hero__social" aria-label={label} {...externalProps(href)}>
                  <Icon size={20} weight="light" />
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div className="hero__actions" variants={rise}>
            <a
              href="#contact"
              className="btn btn--primary hero__btn"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#contact')
              }}
            >
              Let’s talk
              <ArrowUpRight size={18} weight="light" />
            </a>
            <a className="btn btn--ghost hero__btn" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV
              <DownloadSimple size={18} weight="light" />
            </a>
          </motion.div>

          <motion.ul className="hero__stats" variants={rise}>
            {hero.stats.map((stat) => (
              <li key={stat.label} className="hero__stat">
                <strong className="hero__stat-value">
                  <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </strong>
                <span className="hero__stat-label">{stat.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="hero__visual" style={{ y: photoY }}>
          <motion.div
            className="hero__frame"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
          >
            <motion.div
              className="hero__circle"
              aria-hidden="true"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
            />
            <Portrait priority />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
