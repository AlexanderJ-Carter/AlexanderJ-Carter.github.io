import { HeaderClient } from './Component.client'
import { getHeaderNav } from '@/instance'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  const fallbackNav = getHeaderNav().map((item) => ({ label: item.label, url: item.href }))

  return <HeaderClient data={headerData} fallbackNav={fallbackNav} />
}
