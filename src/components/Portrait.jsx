import { useId } from 'react'
import { profile } from '../data/profile'
import './Portrait.css'

// The photo set in src/data/profile.js, or a styled silhouette while it is null.
// It fills its parent; the hero frame decides the size and the circular crop.
export default function Portrait({ priority = false }) {
  // unique gradient ids, in case the portrait is rendered more than once
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  if (profile.photo) {
    return (
      <img
        className="portrait"
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    )
  }

  return (
    <div className="portrait portrait--placeholder" role="img" aria-label="Photo placeholder">
      <svg viewBox="0 0 460 678" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dac5a7" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#dac5a7" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <ellipse cx="230" cy="230" rx="118" ry="140" fill={`url(#${uid}-fill)`} />
        <path d="M0 678c0-150 90-250 230-250s230 100 230 250z" fill={`url(#${uid}-fill)`} />
      </svg>
      <span className="portrait__hint meta">Your photo here</span>
    </div>
  )
}
