import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowsOut,
  CaretLeft,
  CaretRight,
  X,
} from '@phosphor-icons/react'
import { projects } from '../data/projects'
import { useSmoothScroll } from '../lib/SmoothScroll'
import ProjectCover from './ProjectCover'
import { EASE } from '../lib/easing'
import { optimized, srcSet } from '../lib/images'
import './ProjectModal.css'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Keep keyboard focus inside the dialog while it is open.
function trapFocus(e, container) {
  if (e.key !== 'Tab' || !container) return
  const items = [...container.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function Lightbox({ images, index, onClose, onChange }) {
  const image = images[index]
  const many = images.length > 1

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <button type="button" className="badge lightbox__close" onClick={onClose} aria-label="Close image">
        <X size={20} weight="light" />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={image.src}
          className="lightbox__figure"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={optimized(image.src, 1600)}
            alt={image.caption}
            onError={(e) => {
              if (e.currentTarget.dataset.fallback) return
              e.currentTarget.dataset.fallback = 'true'
              e.currentTarget.src = image.src
            }}
          />
          <figcaption className="meta">
            <span className="muted">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            {image.caption}
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {many && (
        <>
          <button
            type="button"
            className="badge lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation()
              onChange((index - 1 + images.length) % images.length)
            }}
          >
            <CaretLeft size={20} weight="light" />
          </button>
          <button
            type="button"
            className="badge lightbox__nav lightbox__nav--next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation()
              onChange((index + 1) % images.length)
            }}
          >
            <CaretRight size={20} weight="light" />
          </button>
        </>
      )}
    </motion.div>
  )
}

function ProjectDetails({ project, index, total, onNavigate, onOpenImage }) {
  const prev = projects[(index - 1 + total) % total]
  const next = projects[(index + 1) % total]

  const facts = [
    project.year && { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
    { label: 'Focus', value: project.category },
    {
      label: 'Built with',
      value: project.stack
        .flatMap((g) => g.items)
        .slice(0, 2)
        .join(', '),
    },
  ].filter(Boolean)

  return (
    <article className="pm">
      <header className="pm__hero">
        <p className="meta muted">
          Project {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
        </p>
        <h2 id="project-modal-title" className="pm__title display">
          {project.title}
        </h2>
        <p className="pm__tagline">{project.tagline}</p>

        <dl className="pm__facts">
          {facts.map((fact) => (
            <div key={fact.label} className="pm__fact card">
              <dt className="meta muted">{fact.label}</dt>
              <dd className="meta">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {project.links.length > 0 && (
          <div className="pm__links">
            {project.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`btn ${i === 0 ? 'btn--primary' : 'btn--ghost'}`}
              >
                {link.label}
                <ArrowUpRight size={18} weight="light" />
              </a>
            ))}
          </div>
        )}
      </header>

      {project.gallery.length > 0 && (
        <div className="pm__cover">
          <ProjectCover project={project} variant="flat" eager />
        </div>
      )}

      <div className="pm__body">
        <div className="pm__main">
          <section className="pm__block">
            <h3 className="meta muted">Overview</h3>
            <p className="pm__lead">{project.overview}</p>
          </section>

          {project.problem && (
            <section className="pm__block">
              <h3 className="meta muted">The problem</h3>
              <p className="body-text">{project.problem}</p>
            </section>
          )}

          <section className="pm__block">
            <h3 className="meta muted">What I built</h3>
            <ul className="pm__list">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {project.learnings && (
            <section className="pm__block">
              <h3 className="meta muted">Challenges &amp; learnings</h3>
              <blockquote className="pm__quote">
                <p>{project.learnings}</p>
              </blockquote>
            </section>
          )}
        </div>

        <aside className="pm__aside">
          <div className="pm__stack card">
            <h3 className="meta muted">Tech stack</h3>
            {project.stack.map((group) => (
              <div key={group.group} className="pm__stack-group">
                <p className="pm__stack-title">{group.group}</p>
                <ul className="pm__chips">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {project.gallery.length > 0 && (
        <section className="pm__gallery-wrap">
          <h3 className="pm__section-title">
            Project <span className="serif">gallery</span>
          </h3>
          <ul className="pm__gallery">
            {project.gallery.map((image, i) => (
              <li key={image.src}>
                <button
                  type="button"
                  className="pm__shot"
                  onClick={() => onOpenImage(i)}
                  aria-label={`View larger: ${image.caption}`}
                >
                  <span className="pm__shot-frame">
                    <img
                      src={optimized(image.src, 640)}
                      srcSet={srcSet(image.src)}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      alt={image.caption}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const img = e.currentTarget
                        if (img.dataset.fallback) return
                        img.dataset.fallback = 'true'
                        img.removeAttribute('srcset')
                        img.src = image.src
                      }}
                    />
                    <span className="badge badge--md pm__shot-icon" aria-hidden="true">
                      <ArrowsOut size={16} weight="light" />
                    </span>
                  </span>
                  <span className="pm__shot-caption">{image.caption}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="pm__pager" aria-label="Other projects">
        <button type="button" className="pm__pager-btn" onClick={() => onNavigate(-1)}>
          <span className="meta muted">
            <ArrowLeft size={14} weight="light" /> Previous
          </span>
          <span className="pm__pager-name">{prev.title}</span>
        </button>
        <button type="button" className="pm__pager-btn pm__pager-btn--next" onClick={() => onNavigate(1)}>
          <span className="meta muted">
            Next <ArrowRight size={14} weight="light" />
          </span>
          <span className="pm__pager-name">{next.title}</span>
        </button>
      </nav>
    </article>
  )
}

export default function ProjectModal({ slug, onClose, onChange }) {
  const { lock, unlock } = useSmoothScroll()
  const panelRef = useRef(null)
  const scrollRef = useRef(null)
  const closeRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const [shownSlug, setShownSlug] = useState(slug)

  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : null
  const open = Boolean(project)

  // Reset the lightbox whenever a different project is shown.
  if (slug !== shownSlug) {
    setShownSlug(slug)
    setLightbox(null)
  }

  const navigate = useCallback(
    (dir) => {
      const nextIndex = (index + dir + projects.length) % projects.length
      onChange(projects[nextIndex].slug)
    },
    [index, onChange],
  )

  // Lock page scroll and remember where focus was, so it can be restored on close.
  useEffect(() => {
    if (!open) return undefined
    const previouslyFocused = document.activeElement
    lock()
    const id = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }))
    return () => {
      cancelAnimationFrame(id)
      unlock()
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true })
    }
  }, [open, lock, unlock])

  // Start each project at the top of the pop-up.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (lightbox !== null) {
        const count = project.gallery.length
        if (e.key === 'Escape') setLightbox(null)
        if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % count)
        if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + count) % count)
        return
      }
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
      trapFocus(e, panelRef.current)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lightbox, project, onClose, navigate])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
          transition={{ duration: 0.4 }}
        >
          <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={panelRef}
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="modal__topbar">
              <span className="meta muted modal__crumb">{project.category}</span>
              <button
                ref={closeRef}
                type="button"
                className="badge modal__close"
                onClick={onClose}
                aria-label="Close project details"
              >
                <X size={20} weight="light" />
              </button>
            </div>

            <div className="modal__scroll" ref={scrollRef} data-lenis-prevent>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <ProjectDetails
                    project={project}
                    index={index}
                    total={projects.length}
                    onNavigate={navigate}
                    onOpenImage={setLightbox}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {lightbox !== null && (
                <Lightbox
                  images={project.gallery}
                  index={lightbox}
                  onClose={() => setLightbox(null)}
                  onChange={setLightbox}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
