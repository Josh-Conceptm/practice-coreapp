import type { ReactNode } from 'react'
import { cx } from './shared'

export interface CardProps {
  header?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  className?: string
}

// Purely a shell — no padding, no content, no card-specific logic. Slots are
// independently optional (mirrors the Figma component's own show/hide
// booleans) and each renders as its own bg-background-primary section;
// padding is the slot content's own concern so it can vary per consumer
// (e.g. BankCard's responsive 24px/16px). Meant to be small enough that
// future card variants just reuse it and supply different slot contents.
function Card({ header, body, footer, className }: CardProps) {
  return (
    <div
      className={cx(
        'w-full overflow-hidden rounded-2xl border-[0.8px] border-border-disabled',
        className,
      )}
    >
      {header && <div className="bg-background-primary">{header}</div>}
      {body && <div className="border-y-[0.8px] border-border-disabled bg-background-primary">{body}</div>}
      {footer && <div className="bg-background-primary">{footer}</div>}
    </div>
  )
}

export default Card
