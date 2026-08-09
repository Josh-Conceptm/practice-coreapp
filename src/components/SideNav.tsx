import { useState, type ReactNode } from 'react'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import PanelCollapseIcon from '../icons/PanelCollapseIcon'
import PanelExpandIcon from '../icons/PanelExpandIcon'
import { BUTTON_VARIANT_STYLES, IconSlot, PRESSED_RADIUS_SHAPE, cx } from './shared'
import bsLogo from '../assets/bs-logo.svg'

export interface NavItem {
  id: string
  label: string
  href?: string
  /** Inactive-state icon. */
  strokeIcon: ReactNode
  /** Active-state icon, if this item has one. Falls back to strokeIcon when absent. */
  filledIcon?: ReactNode
}

export interface NavSection {
  id: string
  title: string
  items: NavItem[]
  /** When true, the section header chevron toggles item visibility. */
  collapsible?: boolean
}

export interface SideNavProps {
  sections: NavSection[]
  /** Rendered separately, above the sections, always visible. */
  homeItem: NavItem
  /** Pinned to the bottom of the nav. An item with id "logout" calls onLogout instead of navigating. */
  bottomItems: NavItem[]
  activeItemId: string
  onLogout: () => void
  /** Component manages its own open/collapsed state internally — no router involved. */
  defaultOpen?: boolean
}

function NavItemRow({
  item,
  active,
  open,
  onClick,
}: {
  item: NavItem
  active: boolean
  open: boolean
  onClick: () => void
}) {
  const icon = active && item.filledIcon ? item.filledIcon : item.strokeIcon
  const Tag = item.href ? 'a' : 'button'

  return (
    <Tag
      {...(item.href ? { href: item.href } : { type: 'button' })}
      onClick={onClick}
      className={cx('inline-flex items-center', open ? 'w-full gap-2' : 'gap-0')}
    >
      <span
        className={cx(
          'inline-flex size-9 shrink-0 items-center justify-center',
          active ? BUTTON_VARIANT_STYLES.primary : BUTTON_VARIANT_STYLES.borderless,
          PRESSED_RADIUS_SHAPE,
        )}
      >
        <IconSlot icon={icon} size="medium" />
      </span>
      <span
        className={cx(
          'min-w-0 overflow-hidden whitespace-nowrap text-button-medium font-sans font-semibold text-content-primary transition-opacity duration-200',
          open ? 'opacity-100' : 'w-0 opacity-0',
        )}
      >
        {item.label}
      </span>
    </Tag>
  )
}

function NavSectionBlock({
  section,
  open,
  activeItemId,
  collapsed,
  onToggleSection,
  onItemClick,
}: {
  section: NavSection
  open: boolean
  activeItemId: string
  collapsed: boolean
  onToggleSection: (id: string) => void
  onItemClick: (item: NavItem) => void
}) {
  // With the sidenav itself collapsed there's no chevron to toggle with, so
  // every section's items always show regardless of its own collapsed state.
  const showItems = !open || !section.collapsible || !collapsed

  return (
    <div className={cx('flex flex-col gap-4', open ? 'w-full items-start' : 'items-center')}>
      {!open && <div aria-hidden="true" className="h-px w-9 bg-border-tertiary" />}
      {open && (
        <div className="flex w-full items-center justify-between">
          {/* min-w-0 lets this flex item actually shrink below its text's
              natural width during the nav's own width transition; combined
              with whitespace-nowrap + overflow-hidden the title is clipped
              (revealed as the rail grows) instead of wrapping to two lines
              mid-transition. */}
          <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-label-overline font-sans font-medium text-content-tertiary">
            {section.title}
          </span>
          {section.collapsible && (
            <button
              type="button"
              onClick={() => onToggleSection(section.id)}
              aria-expanded={!collapsed}
              aria-label={`Toggle ${section.title} section`}
              className="inline-flex size-4 shrink-0 items-center justify-center text-content-tertiary"
            >
              <ChevronDownIcon
                className={cx('size-4 transition-transform duration-200', collapsed && '-rotate-90')}
              />
            </button>
          )}
        </div>
      )}
      {showItems && (
        <div className={cx('flex flex-col gap-4', open ? 'w-full items-start' : 'items-center')}>
          {section.items.map((item) => (
            <NavItemRow
              key={item.id}
              item={item}
              active={item.id === activeItemId}
              open={open}
              onClick={() => onItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SideNav({
  sections,
  homeItem,
  bottomItems,
  activeItemId,
  onLogout,
  defaultOpen = true,
}: SideNavProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleItemClick = (item: NavItem) => {
    if (item.id === 'logout') {
      onLogout()
    }
  }

  return (
    <nav
      className={cx(
        // relative + z-10 are load-bearing, not decorative: the collapsed-state
        // toggle button (see the logo-row comment below) deliberately overflows
        // past this rail's own right edge into whatever sits next to it in the
        // app shell (main content, typically). z-index has no effect on a
        // statically-positioned element, so `relative` is required just to make
        // `z-10` participate in stacking against nav's siblings — without both,
        // the button's paint order vs. adjacent content is left to DOM-order
        // luck. Do not remove either half assuming it's unused, and do not
        // "fix" the overflow itself — see the logo-row comment for why it's
        // intentional and matches the Figma spec (node 3850:6201).
        'relative z-10 flex h-full flex-col justify-between overflow-visible bg-background-unique pt-4 pb-6 transition-[width] duration-200 ease-in-out',
        open ? 'w-50' : 'w-17',
      )}
    >
      <div
        className={cx(
          // overflow-visible here (and on <nav> above) is required, not
          // incidental — it's what lets the collapsed-state toggle button
          // paint past this div's and nav's own boxes instead of being
          // clipped. See the comment on the logo row below for why that
          // overflow is intentional, and the comment on <nav> for how its
          // paint order above adjacent content is guaranteed.
          'flex min-h-0 flex-1 flex-col gap-8 overflow-visible',
          open ? 'items-start pb-6 pl-4 pr-6' : 'items-center px-4',
        )}
      >
        {/* Logo row uses the actual Figma fixed widths per state — 160px
            open, 88px collapsed — confirmed against the Figma node
            coordinates (frame 3850:6201): the collapsed rail is 68px
            wide, the logo row sits at x=16 with width=88, so it spans
            x=16 to x=104 — 36px past the rail's true right edge at
            x=68. The toggle button (self-start's last flex child) sits
            at x=68 to x=104: its LEFT edge is flush with the rail's edge
            (zero gap there) and its full 36px body protrudes past it —
            a deliberate floating-handle pattern in the source design,
            not a bug. This is a side effect of the row's own fixed
            width, not a custom position override. */}
        <div
          className={cx(
            'flex shrink-0 items-center justify-between self-start pb-1',
            open ? 'w-40' : 'w-22',
          )}
        >
          <img src={bsLogo} alt="GetBankSheets" className="h-7 w-[35px] shrink-0" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            className={cx(
              'inline-flex size-9 shrink-0 items-center justify-center',
              BUTTON_VARIANT_STYLES.borderless,
              PRESSED_RADIUS_SHAPE,
            )}
          >
            <IconSlot icon={open ? <PanelCollapseIcon /> : <PanelExpandIcon />} size="medium" />
          </button>
        </div>

        <NavItemRow
          item={homeItem}
          active={homeItem.id === activeItemId}
          open={open}
          onClick={() => handleItemClick(homeItem)}
        />

        {sections.map((section) => (
          <NavSectionBlock
            key={section.id}
            section={section}
            open={open}
            activeItemId={activeItemId}
            collapsed={Boolean(collapsedSections[section.id])}
            onToggleSection={toggleSection}
            onItemClick={handleItemClick}
          />
        ))}
      </div>

      <div
        className={cx(
          'flex w-full shrink-0 flex-col gap-6',
          open ? 'items-start pl-4 pr-6' : 'items-center px-4',
        )}
      >
        {bottomItems.map((item) => (
          <NavItemRow
            key={item.id}
            item={item}
            active={item.id === activeItemId}
            open={open}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </nav>
  )
}

export default SideNav
