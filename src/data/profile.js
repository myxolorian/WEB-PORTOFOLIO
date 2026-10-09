// Personal info used across the whole site.
// Edit the values here and every section updates automatically.

export const profile = {
  name: 'Kevin Mahardhika Mulya',
  firstName: 'Kevin',
  shortName: 'kevin',
  role: 'Fullstack Developer & AI Engineer',
  location: 'Jakarta, Indonesia',
  university: 'BINUS University',

  // PHOTO (shown in the hero, inside the circle)
  // Put your photo in /public/images/ and point this path to it, e.g. '/images/kevin.png'.
  // Works best with a transparent PNG/WebP portrait (head and shoulders, face centred).
  // Set it to null to show a styled placeholder instead.
  photo: '/images/kevin.png',

  email: 'kevinmahardhika6@gmail.com',
  phone: '+62 812-1357-3753',
  whatsapp: 'https://wa.me/6281213573753',
  linkedin: 'https://www.linkedin.com/in/kevin-mahardhika-mulya',
  github: 'https://github.com/myxolorian',
  cv: '/KevinMahardhikaMulya_CV_2026.pdf',

  hero: {
    greeting: 'Hi, I am',
    titleTop: 'Fullstack Developer',
    titleBottom: '& AI Engineer',
    subtitle:
      'Computer Science student at BINUS University building AI-driven web apps that turn complex problems into useful products.',
    // Numbers in the stats box. `decimals` controls the count-up animation.
    stats: [
      { value: 5, suffix: '+', label: 'Projects built' },
      { value: 3, label: 'Organizations' },
      { value: 3.5, decimals: 2, label: 'GPA' },
    ],
  },
}
// Navbar and footer links, in the same order as the sections on the page.
export const navLinks = [
  { id: 'top', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
