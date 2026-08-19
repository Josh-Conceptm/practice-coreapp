import type { ReactNode } from 'react'
import { cx } from './shared'

export interface PreviewCardProps {
  previewImageUrl: string
  /** Decorative by default — the image is a visual preview, not content in
   *  its own right (matches the Figma source, which exports it `alt=""`).
   *  Give it real alt text if the image ever needs to be independently
   *  meaningful (e.g. a screen-reader-only description of the sheet). */
  previewImageAlt?: string
  /** Left side of the bottom row — name, dates, tags. Fully owned by the
   *  consumer, same as Card's slots. */
  meta: ReactNode
  /** Right side of the bottom row — the CTA buttons. The base handles
   *  *when* they're visible (hover/focus-reveal); the consumer only
   *  supplies *what* they are. */
  actions: ReactNode
  className?: string
}

// Figma nodes 3976:7324 / 3976:7343 ("spreadsheet preview" / "templates"):
// shared shell for the two gallery-card variants (SpreadsheetCard,
// TemplateCard) — image + a bottom row split into a meta slot and an
// actions slot. The actions slot is opacity-0 by default and fades in via
// `group-hover`/`group-focus-within` — Figma's "Default"/"Hover" variants
// are the same markup with only that opacity swapped, so centralizing the
// reveal here is what keeps the two cards from duplicating it.
function PreviewCard({
  previewImageUrl,
  previewImageAlt = '',
  meta,
  actions,
  className,
}: PreviewCardProps) {
  return (
    <div
      className={cx(
        'group flex w-full min-w-[480px] max-w-[618px] flex-col items-start gap-6 overflow-hidden rounded-[20px] border border-border-disabled bg-background-primary pb-4',
        className,
      )}
    >
      <img
        src={previewImageUrl}
        alt={previewImageAlt}
        className="aspect-[968/153] w-full shrink-0 border-b-[0.5px] border-border-tertiary object-cover"
      />
      <div className="flex w-full flex-wrap items-end justify-between gap-3 px-4">
        {meta}
        <div className="flex items-end justify-end gap-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
          {actions}
        </div>
      </div>
    </div>
  )
}

export default PreviewCard
