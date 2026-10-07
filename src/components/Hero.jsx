import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from '@phosphor-icons/react'
import { profile } from '../data/profile'
import { useSmoothScroll } from '../lib/SmoothScroll'
import Portrait from './Portrait'
import { EASE } from '../lib/easing'
import { MaskLines } from './Reveal'
import './Hero.css'

export default function Hero() {
  const ref = useRef(null)
  const { scrollTo } = useSmoothScroll()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // gentle parallax: the portrait drifts slower than the page, the text fades out
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const { hero } = profile

  return (
    <section id="top" className="hero" ref={ref}>
      <motion.div
        className="hero__portrait"
        style={{ y: portraitY }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Portrait priority />
      </motion.div>

      <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <h1 className="hero__title display">
          <MaskLines
            animateOnMount
            delay={0.35}
            stagger={0.14}
            lines={[hero.titleTop, <span className="serif">{hero.titleBottom}</span>]}
          />
        </h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.button
          type="button"
          className="text-link hero__scroll"
          onClick={() => scrollTo('#work')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
        >
          <span className="badge">
            <ArrowDown size={20} weight="light" />
          </span>
          See my work
        </motion.button>
      </motion.div>
    </section>
  )
}
