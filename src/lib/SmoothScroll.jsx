import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const SmoothScrollContext = createContext(null)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis gives the page its smooth, weighted scroll. The context exposes a small
// API so components can scroll to sections and lock scrolling (e.g. for the modal).
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const lockCount = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: false,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const api = useMemo(
    () => ({
      scrollTo(target, options = {}) {
        const lenis = lenisRef.current
        if (lenis) {
          lenis.scrollTo(target, { duration: 1.6, ...options })
          return
        }
        const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior })
          return
        }
        const el = typeof target === 'string' ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior })
      },
      lock() {
        lockCount.current += 1
        lenisRef.current?.stop()
        document.documentElement.classList.add('is-scroll-locked')
      },
      unlock() {
        lockCount.current = Math.max(0, lockCount.current - 1)
        if (lockCount.current > 0) return
        lenisRef.current?.start()
        document.documentElement.classList.remove('is-scroll-locked')
      },
    }),
    [],
  )

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used inside <SmoothScrollProvider>')
  return ctx
}
