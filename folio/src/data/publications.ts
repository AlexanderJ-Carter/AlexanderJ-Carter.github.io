import type { InstancePublication } from '@/instance/types'
import { getInstance } from '@/instance'

export type PubLink = { label: string; href: string }
export type Publication = InstancePublication

export function getResearchProfiles() {
  return getInstance().research.profiles
}

export function getPublications(opts?: { limit?: number }): Publication[] {
  const all = getInstance().research.publications
  if (opts?.limit != null) return all.slice(0, opts.limit)
  return all
}
