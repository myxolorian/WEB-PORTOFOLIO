import './ProjectCover.css'

// The artwork of a project: its first screenshot in a tilted browser window on a
// tinted backdrop, or a typographic cover when the project has no screenshots yet.
export default function ProjectCover({ project, flat = false, eager = false }) {
  const cover = project.cover ?? project.gallery[0]?.src

  return (
    <div className={`cover ${flat ? 'cover--flat' : ''}`} style={{ '--accent': project.accent }}>
      <div className="cover__backdrop" aria-hidden="true" />
      {cover ? (
        <div className="cover__window">
          <div className="cover__bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <img
            src={cover}
            alt={`${project.title} screenshot`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ) : (
        <div className="cover__type" aria-hidden="true">
          <span className="serif">{project.title}</span>
        </div>
      )}
    </div>
  )
}
