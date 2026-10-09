import { ArrowUpRight } from '@phosphor-icons/react'
import { projects, upcoming } from '../data/projects'
import { profile } from '../data/profile'
import ProjectCover from './ProjectCover'
import { MaskLines, Reveal } from './Reveal'
import './Work.css'

function ProjectCard({ project, index, onOpen }) {
  return (
    <Reveal as="li" className="project-card" delay={(index % 2) * 0.12} amount={0.15}>
      <button
        type="button"
        className="project-card__button"
        onClick={() => onOpen(project.slug)}
        aria-label={`Open details for ${project.title}`}
        aria-haspopup="dialog"
      >
        <div className="project-card__media">
          <ProjectCover project={project} />
          <span className="badge project-card__badge" aria-hidden="true">
            <ArrowUpRight size={20} weight="light" />
          </span>
          <div className="project-card__label">
            <span className="project-card__title">{project.title}</span>
            <span className="meta">{project.category}</span>
          </div>
        </div>
      </button>
      <div className="project-card__info">
        <p className="body-text">{project.summary}</p>
        {project.year && <span className="meta muted">{project.year}</span>}
      </div>
    </Reveal>
  )
}

// Placeholder card for the project that is still being built.
function UpcomingCard({ index }) {
  return (
    <Reveal as="li" className="project-card project-card--upcoming" delay={(index % 2) * 0.12} amount={0.15}>
      <a
        className="project-card__button"
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label={`${upcoming.title}: coming soon. ${upcoming.linkLabel}`}
      >
        <div className="project-card__media upcoming">
          <div className="mosaic upcoming__mosaic" aria-hidden="true">
            {[0, 1, 2].map((c) => (
              <div key={c} className="mosaic__col">
                {[0, 1, 2].map((r) => (
                  <div key={r} className="mosaic__tile upcoming__tile">
                    <span />
                    <span />
                    <span />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="upcoming__center">
            <span className="label">{upcoming.label}</span>
            <span className="upcoming__title serif">{upcoming.title}</span>
            <span className="meta muted">Coming soon</span>
          </div>
        </div>
      </a>
      <div className="project-card__info">
        <p className="body-text">{upcoming.text}</p>
        <a className="text-link upcoming__link" href={profile.github} target="_blank" rel="noreferrer">
          <span className="badge badge--sm">
            <ArrowUpRight size={18} weight="light" />
          </span>
          GitHub
        </a>
      </div>
    </Reveal>
  )
}

export default function Work({ onOpenProject }) {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <div className="work__head">
          <h2 id="work-title" className="h2">
            <MaskLines
              lines={[
                <>
                  Selected <span className="serif">Work</span>
                </>,
              ]}
            />
          </h2>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            <span className="badge badge--sm">
              <ArrowUpRight size={18} weight="light" />
            </span>
            All on GitHub
          </a>
        </div>

        <ul className="work__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onOpen={onOpenProject} />
          ))}
          {upcoming && <UpcomingCard index={projects.length} />}
        </ul>
      </div>
    </section>
  )
}
