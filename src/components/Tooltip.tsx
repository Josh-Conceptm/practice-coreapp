import { useEffect, useRef, useState, type ReactNode } from 'react'
import Button from './Button'

export interface TooltipProps {
  title: string
  body: string
  actionLabel: string
  /** The element the tooltip attaches to — hovering it (or the tooltip
   *  itself, once open) keeps the tooltip open. */
  children: ReactNode
}

// Judgment call: hovering alone leaves a small dead zone between the
// anchor and the tooltip (the gap from its `mt-2` offset below it), so
// moving the cursor there in one continuous motion can briefly cross
// neither element. A short close-delay — cancelled by a mouseenter on
// either the anchor or the tooltip — bridges that gap; without it, the
// tooltip would close as soon as the cursor left the anchor and never get
// a chance to reopen on the way to the tooltip itself. This delay wasn't
// spelled out in the spec — flagging it as an addition on top of the
// literal "opens on hover / closes on leave" behavior described.
const CLOSE_DELAY_MS = 150

// Figma node 4078:51506 ("tooltip"): 172px card, 12px radius, 12px
// top/side + 8px bottom padding, 8px gap between title/body/action,
// positioned below the anchor.
function Tooltip({ title, body, actionLabel, children }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleOpen = () => {
    cancelClose()
    setOpen(true)
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  useEffect(() => cancelClose, [])

  return (
    <span
      className="relative inline-flex shrink-0"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      {children}
      {open && (
        <div
          role="tooltip"
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
          className="absolute top-full left-0 z-10 mt-2 flex w-[172px] flex-col gap-2 rounded-xl bg-background-primary px-3 pt-3 pb-2 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)]"
        >
          <p className="w-full text-heading-2xs font-sans font-medium text-content-primary">{title}</p>
          <p className="w-full text-label-caption font-sans font-normal text-content-primary">{body}</p>
          {/* `!` modifier required — see BankCard's Remove Bank button for
              why a plain className color override on borderless isn't
              reliable. */}
          <Button
            variant="borderless"
            size="small"
            onClick={() => setOpen(false)}
            className="self-start !text-action-primary"
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </span>
  )
}

export default Tooltip
