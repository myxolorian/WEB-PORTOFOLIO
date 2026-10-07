import { EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react'
import { profile } from '../data/profile'

export const socials = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinLogo },
  { label: 'GitHub', href: profile.github, Icon: GithubLogo },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: EnvelopeSimple },
  { label: 'WhatsApp', href: profile.whatsapp, Icon: WhatsappLogo },
]

export const externalProps = (href) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}
