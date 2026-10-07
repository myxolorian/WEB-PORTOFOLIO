import { useId } from 'react'
import { profile } from '../data/profile'
import './Portrait.css'

// Shows the photo set in src/data/profile.js, or a styled placeholder until one is added.
export default function Portrait({ className = '', priority = false }) {
  // unique gradient ids, since the portrait appears more than once on the page
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  if (profile.photo) {
    return (
      <div className={`portrait ${className}`}>
        <img
          className="portrait__img"
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div className={`portrait portrait--placeholder ${className}`} role="img" aria-label="Photo placeholder">
      <svg className="portrait__silhouette" viewBox="0 0 400 350" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dac5a7" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#dac5a7" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#dac5a7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dac5a7" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#dac5a7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="132" rx="64" ry="76" fill={`url(#${uid}-fill)`} stroke={`url(#${uid}-rim)`} />
        <path
          d="M64 350c6-74 52-122 136-122s130 48 136 122"
          fill={`url(#${uid}-fill)`}
          stroke={`url(#${uid}-rim)`}
        />
      </svg>
      <span className="portrait__hint meta">Your photo here</span>
    </div>
  )
}
