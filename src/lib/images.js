// Maps an original screenshot path to the WebP copies made by scripts/optimize-images.mjs.
//   optimized('/images/projects/diva/01.png', 640) -> '/images/projects/diva/_opt/01-640.webp'
export const optimized = (src, width) => {
  const slash = src.lastIndexOf('/')
  const name = src.slice(slash + 1).replace(/\.[a-z0-9]+$/i, '')
  return `${src.slice(0, slash)}/_opt/${name}-${width}.webp`
}

export const srcSet = (src) => `${optimized(src, 640)} 640w, ${optimized(src, 1600)} 1600w`
