import { motion } from 'motion/react'
import { EASE } from '../lib/easing'

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  span: motion.span,
}

// Fades and lifts its children into place the first time they scroll into view.
export function Reveal({ as = 'div', delay = 0, y = 40, amount = 0.2, children, ...rest }) {
  const Tag = tags[as] ?? motion.div
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Slides each line of a heading up from behind a mask, one after another.
// Pass `animateOnMount` for content that is visible on load (the hero).
export function MaskLines({ lines, delay = 0, stagger = 0.12, animateOnMount = false }) {
  // The wrapper is what gets observed: the inner line starts clipped by the mask,
  // so it would never count as "in view" by itself.
  const trigger = animateOnMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.5 } }

  return lines.map((line, i) => (
    <motion.span key={i} className="mask-line" initial="hidden" {...trigger}>
      <motion.span
        className="mask-line__inner"
        variants={{
          hidden: { y: '110%' },
          visible: { y: '0%', transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
        }}
      >
        {line}
      </motion.span>
    </motion.span>
  ))
}
