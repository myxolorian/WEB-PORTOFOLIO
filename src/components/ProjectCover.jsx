import { optimized } from '../lib/images'
import './ProjectCover.css'

const COLS = 3
const ROWS = 3

// Loads the optimized WebP copy, and falls back to the original file if the
// copy has not been generated yet (e.g. a screenshot was just added).
function Shot({ src, width, alt = '', eager = false, className }) {
  return (
    <img
      className={className}
      src={optimized(src, width)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => {
        const img = e.currentTarget
        if (img.dataset.fallback) return
        img.dataset.fallback = 'true'
        img.src = src
      }}
    />
  )
}

// Spreads the gallery over a 3×3 grid, repeating images when there are fewer than nine.
function mosaicColumns(images) {
  return Array.from({ length: COLS }, (_, c) =>
    Array.from({ length: ROWS }, (_, r) => images[(c + r * COLS) % images.length]),
  )
}

// Project artwork.
// - "mosaic" (cards): a tilted grid of the project's screenshots on a gradient.
// - "flat" (pop-up header): the first screenshot in a browser window.
// Projects without screenshots get a typographic cover in both cases.
export default function ProjectCover({ project, variant = 'mosaic', eager = false }) {
  const images = project.gallery.map((g) => g.src)
  const style = { '--accent': project.accent, '--accent2': project.accent2 ?? project.accent }

  if (!images.length) {
    return (
      <div className="cover" style={style}>
        <div className="cover__backdrop" aria-hidden="true" />
        <div className="cover__type" aria-hidden="true">
          <span className="serif">{project.title}</span>
        </div>
      </div>
    )
  }

  if (variant === 'flat') {
    return (
      <div className="cover cover--flat" style={style}>
        <div className="cover__backdrop" aria-hidden="true" />
        <div className="cover__window">
          <div className="cover__bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <Shot src={images[0]} width={1600} alt={`${project.title} screenshot`} eager={eager} />
        </div>
      </div>
    )
  }

  return (
    <div className="cover cover--mosaic" style={style} aria-hidden="true">
      <div className="cover__backdrop" />
      <div className="mosaic">
        {mosaicColumns(images).map((column, c) => (
          <div key={c} className="mosaic__col">
            {column.map((src, r) => (
              <div key={r} className="mosaic__tile">
                <Shot src={src} width={640} eager={eager} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="cover__shade" />
    </div>
  )
}
