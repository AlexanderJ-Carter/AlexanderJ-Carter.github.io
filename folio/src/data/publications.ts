import type { InstancePublication } from '@/instance/types'
import { getInstance } from '@/instance'

export type PubLink = { label: string; href: string }
export type Publication = InstancePublication

export function getResearchProfiles() {
  return getInstance().research.profiles
}

export function getPublications(): Publication[] {
  return getInstance().research.publications
}
