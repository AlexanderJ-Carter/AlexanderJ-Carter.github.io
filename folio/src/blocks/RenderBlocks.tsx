import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

function renderOne(block: Page['layout'][0], index: number, bare: boolean) {
  const { blockType } = block
  if (!blockType || !(blockType in blockComponents)) return null
  const Block = blockComponents[blockType]
  if (!Block) return null
  const inner = (
    // @ts-expect-error block prop shapes vary by type
    <Block {...block} disableInnerContainer />
  )
  if (bare) return <React.Fragment key={index}>{inner}</React.Fragment>
  return (
    <div className="my-10 md:my-14" key={index}>
      {inner}
    </div>
  )
}

export function blockPanels(blocks: Page['layout'][0][] | null | undefined): React.ReactNode[] {
  if (!blocks?.length) return []
  return blocks
    .map((block, index) => renderOne(block, index, true))
    .filter(Boolean) as React.ReactNode[]
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return <Fragment>{blocks.map((block, index) => renderOne(block, index, false))}</Fragment>
  }

  return null
}
