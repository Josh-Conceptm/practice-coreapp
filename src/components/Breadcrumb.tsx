import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import ChevronRightIcon from '../icons/ChevronRightIcon'
import { cx } from './shared'

export interface Crumb {
  id: string
  label: string
  /** Leading icon. Only ever provided for the first crumb — the component
   *  never renders one for any other position, even if supplied. */
  icon?: ReactNode
}

export type BreadcrumbVariant = 'desktop' | 'mobile'

export interface BreadcrumbProps {
  crumbs: Crumb[]
  /** Fired for any non-current crumb. The parent owns the trail — it's
   *  responsible for truncating `crumbs` back to this id/index and
   *  navigating; this component never mutates its own input. */
  onCrumbClick: (id: string, index: number) => void
  variant?: BreadcrumbVariant
}

// Figma node 4216:657 ("Breadcrumb Comp"): bar padding is the only thing
// that changes between variants — everything else below scales off its
// own per-variant table.
const BAR_PADDING: Record<BreadcrumbVariant, string> = {
  desktop: 'px-8 py-3', // space/2xl (32px) x, space/m (12px) y
  mobile: 'px-6 py-3', // space/xl (24px) x, space/m (12px) y unchanged
}

// 16px desktop / 12px mobile, applied to both the leading icon and every
// chevron separator.
const ICON_SIZE: Record<BreadcrumbVariant, string> = {
  desktop: 'size-4',
  mobile: 'size-3',
}

// Body/Small (14px) desktop, Label/Caption (12px) mobile.
const TEXT_SIZE: Record<BreadcrumbVariant, string> = {
  desktop: 'text-body-small',
  mobile: 'text-label-caption',
}

// Gap between a crumb's own icon/chevron and its label — 8px desktop,
// 4px mobile. The gap *between* crumbs (space/s, 8px) is constant across
// both variants and lives on the <ol> itself.
const INNER_GAP: Record<BreadcrumbVariant, string> = {
  desktop: 'gap-2',
  mobile: 'gap-1',
}

type DisplayItem = { type: 'crumb'; crumb: Crumb; index: number } | { type: 'ellipsis' }

/** Full trail, or (when collapsed) first crumb + "…" + the last two. */
function getDisplayItems(crumbs: Crumb[], collapse: boolean): DisplayItem[] {
  if (!collapse || crumbs.length <= 3) {
    return crumbs.map((crumb, index) => ({ type: 'crumb', crumb, index }))
  }
  return [
    { type: 'crumb', crumb: crumbs[0], index: 0 },
    { type: 'ellipsis' },
    { type: 'crumb', crumb: crumbs[crumbs.length - 2], index: crumbs.length - 2 },
    { type: 'crumb', crumb: crumbs[crumbs.length - 1], index: crumbs.length - 1 },
  ]
}

function CrumbIcon({ icon, variant }: { icon: ReactNode; variant: BreadcrumbVariant }) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full',
        ICON_SIZE[variant],
      )}
    >
      {icon}
    </span>
  )
}

/** Renders the <li> list shared by the real (interactive) trail and the
 *  off-screen measurer (inert) — one source of truth for markup/sizing so
 *  the two can never drift out of sync. */
function CrumbItems({
  displayItems,
  lastIndex,
  variant,
  onCrumbClick,
  interactive,
}: {
  displayItems: DisplayItem[]
  lastIndex: number
  variant: BreadcrumbVariant
  onCrumbClick: (id: string, index: number) => void
  interactive: boolean
}) {
  return (
    <>
      {displayItems.map((item, position) => {
        const isCurrent = item.type === 'crumb' && item.index === lastIndex
        const label = item.type === 'ellipsis' ? '…' : item.crumb.label
        const leadingIcon = item.type === 'crumb' && item.index === 0 ? item.crumb.icon : undefined

        return (
          <li
            key={item.type === 'ellipsis' ? 'ellipsis' : item.crumb.id}
            className={cx('flex shrink-0 items-center', INNER_GAP[variant])}
          >
            {position > 0 && (
              <ChevronRightIcon
                aria-hidden="true"
                className={cx(
                  ICON_SIZE[variant],
                  isCurrent ? 'text-action-secondary-default' : 'text-content-secondary',
                )}
              />
            )}
            {interactive && item.type === 'crumb' && !isCurrent ? (
              <button
                type="button"
                onClick={() => onCrumbClick(item.crumb.id, item.index)}
                className={cx(
                  'inline-flex cursor-pointer items-center whitespace-nowrap font-sans font-normal text-content-secondary transition-colors hover:text-content-primary',
                  INNER_GAP[variant],
                  TEXT_SIZE[variant],
                )}
              >
                {leadingIcon && <CrumbIcon icon={leadingIcon} variant={variant} />}
                {label}
              </button>
            ) : (
              <span
                {...(isCurrent ? { 'aria-current': 'page' as const } : {})}
                className={cx(
                  'inline-flex items-center whitespace-nowrap font-sans font-normal',
                  INNER_GAP[variant],
                  TEXT_SIZE[variant],
                  isCurrent ? 'text-action-secondary-default' : 'text-content-secondary',
                )}
              >
                {leadingIcon && <CrumbIcon icon={leadingIcon} variant={variant} />}
                {label}
              </span>
            )}
          </li>
        )
      })}
    </>
  )
}

function Breadcrumb({ crumbs, onCrumbClick, variant = 'desktop' }: BreadcrumbProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [collapsed, setCollapsed] = useState(false)

  const lastIndex = crumbs.length - 1
  const collapsible = crumbs.length > 3
  const fullDisplayItems = getDisplayItems(crumbs, false)
  const displayItems = getDisplayItems(crumbs, collapsed)

  // Collapse is driven by available width, not crumb count: an off-screen
  // clone of the *full* trail reports its natural (unwrapped) width, and
  // that's compared against the real row's own box on every resize.
  useLayoutEffect(() => {
    if (!collapsible) {
      setCollapsed(false)
      return
    }
    const list = listRef.current
    const measure = measureRef.current
    if (!list || !measure) return

    const recompute = () => setCollapsed(measure.scrollWidth > list.clientWidth)
    recompute()

    const observer = new ResizeObserver(recompute)
    observer.observe(list)
    return () => observer.disconnect()
  }, [collapsible, crumbs, variant])

  if (crumbs.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cx(
        'w-full rounded-t-2xl border-b-[0.8px] border-border-disabled bg-background-primary',
        BAR_PADDING[variant],
      )}
    >
      {collapsible && (
        // Off-screen measurer: absolutely positioned (shrink-to-fit, so
        // scrollWidth reflects the trail's true unwrapped width) and
        // visibility:hidden rather than display:none (which would report
        // a width of 0). Not part of the a11y tree or tab order.
        <div ref={measureRef} aria-hidden="true" className="invisible absolute left-0 top-0 -z-10">
          <ol className="flex items-center gap-2">
            <CrumbItems
              displayItems={fullDisplayItems}
              lastIndex={lastIndex}
              variant={variant}
              onCrumbClick={() => {}}
              interactive={false}
            />
          </ol>
        </div>
      )}
      <ol ref={listRef} className="flex min-w-0 items-center gap-2 overflow-hidden">
        <CrumbItems
          displayItems={displayItems}
          lastIndex={lastIndex}
          variant={variant}
          onCrumbClick={onCrumbClick}
          interactive
        />
      </ol>
    </nav>
  )
}

export default Breadcrumb
