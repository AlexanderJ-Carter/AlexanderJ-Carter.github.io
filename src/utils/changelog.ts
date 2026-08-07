export type ChangelogSection = {
  heading: string;
  items: string[];
};

export type ChangelogRelease = {
  version: string;
  date?: string;
  sections: ChangelogSection[];
};

export function parseChangelog(markdown: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  let current: ChangelogRelease | null = null;
  let currentSection: ChangelogSection | null = null;

  for (const line of markdown.split('\n')) {
    const releaseMatch = line.match(
      /^## \[(.+?)\](?: - (\d{4}-\d{2}-\d{2}))?$/
    );
    if (releaseMatch) {
      if (current && hasContent(current)) releases.push(current);
      current = {
        version: releaseMatch[1],
        date: releaseMatch[2],
        sections: [],
      };
      currentSection = null;
      continue;
    }

    const sectionMatch = line.match(/^### (.+)$/);
    if (sectionMatch && current) {
      currentSection = { heading: sectionMatch[1], items: [] };
      current.sections.push(currentSection);
      continue;
    }

    if (line.startsWith('- ') && currentSection) {
      currentSection.items.push(line.slice(2).trim());
    }
  }

  if (current && hasContent(current)) releases.push(current);
  return releases;
}

function hasContent(release: ChangelogRelease): boolean {
  return release.sections.some((section) => section.items.length > 0);
}
