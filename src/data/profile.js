// Personal info used across the whole site.
// Edit the values here and every section updates automatically.

export const profile = {
  name: 'Kevin Mahardhika Mulya',
  firstName: 'Kevin',
  shortName: 'kevin',
  role: 'Fullstack Developer & AI Engineer',
  location: 'Jakarta, Indonesia',
  university: 'BINUS University',

  // PHOTO PLACEHOLDER
  // 1. Put your photo in /public/images/ (e.g. /public/images/kevin.png)
  // 2. Change the value below to '/images/kevin.png'
  // A portrait with a dark or transparent background blends best with the design.
  // While this is null, a styled placeholder is shown instead.
  photo: null,

  email: 'kevinmahardhika6@gmail.com',
  phone: '+62 812-1357-3753',
  whatsapp: 'https://wa.me/6281213573753',
  linkedin: 'https://www.linkedin.com/in/kevin-mahardhika-mulya',
  github: 'https://github.com/myxolorian',
  cv: '/KevinMahardhikaMulya_CV_2026.pdf',

  hero: {
    titleTop: 'Fullstack Developer',
    titleBottom: '& AI Engineer',
    subtitle:
      'Computer Science student at BINUS University building AI-driven web apps that turn complex problems into useful products.',
  },

  about: {
    headingTop: 'Tech that solves',
    headingBottom: 'real human problems.',
    paragraphs: [
      "Hello! I'm Kevin Mahardhika Mulya, a Computer Science student at BINUS University with a deep interest in Artificial Intelligence and full-stack development.",
      "My interest in tech started when I built my first website. I quickly realised I enjoy solving complex problems, so I expanded into AI/ML. Since then I've built several projects that merge AI with web applications. For me, tech is not simply about writing code. It is about solving real human problems and turning them into solutions that help many people.",
    ],
    facts: [
      { label: 'Based in', value: 'Jakarta, Indonesia' },
      { label: 'Studying', value: 'Computer Science, BINUS' },
      { label: 'GPA', value: '3.50 / 4.00' },
      { label: 'Graduating', value: '2028' },
    ],
  },
}

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
]
