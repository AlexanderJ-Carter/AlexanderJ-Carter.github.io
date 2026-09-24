import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { SiteAnnouncement } from '@/components/SiteAnnouncement'

export async function AnnouncementBanner() {
  const data = await getCachedGlobal('announcement', 0)()
  return <SiteAnnouncement data={data} />
}
