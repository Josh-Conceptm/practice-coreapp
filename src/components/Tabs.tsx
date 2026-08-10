import { useRef, type KeyboardEvent } from 'react'
import { cx } from './shared'

export interface Tab {
  id: string
  label: string
}

export interface TabsProps {
  tabs: Tab[]
  activeTabId: string
  onTabChange: (id: string) => void
}

// Figma node 4078:50043 ("tabs"): 24px gap between tabs, 8px padding per
// tab. The active-state underline is built with matching border-b-2
// widths — a full-width 2px border-disabled baseline on the container,
// and a 2px action-primary border on just the active tab pulled up
// (-mb-0.5 = -2px) to sit exactly on top of it — rather than measuring
// and absolutely-positioning a separate underline segment.
function Tabs({ tabs, activeTabId, onTabChange }: TabsProps) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const focusAndSelect = (index: number) => {
    const tab = tabs[index]
    if (!tab) return
    onTabChange(tab.id)
    tabRefs.current[tab.id]?.focus()
  }

  // Standard tabs pattern (WAI-ARIA APG): arrow keys move focus and
  // activate (automatic activation) with wraparound; roving tabindex
  // below keeps only the active tab in the normal Tab-key order.
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusAndSelect((index + 1) % tabs.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusAndSelect((index - 1 + tabs.length) % tabs.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusAndSelect(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusAndSelect(tabs.length - 1)
    }
  }

  return (
    <div role="tablist" className="flex items-center gap-6 border-b-2 border-border-disabled">
      {tabs.map((tab, index) => {
        const active = tab.id === activeTabId
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cx(
              '-mb-0.5 shrink-0 cursor-pointer whitespace-nowrap border-b-2 p-2 text-label-small font-sans font-medium text-content-primary transition-colors',
              active ? 'border-action-primary' : 'border-transparent',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
