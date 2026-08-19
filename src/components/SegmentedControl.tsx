import { useRef, type KeyboardEvent } from 'react'
import { cx } from './shared'

export interface SegmentedControlOption {
  value: string
  label: string
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

// Figma node 3463:7828 ("Label options", assign-accounts row): a pill track
// (background-unique, 4px padding, 14px radius) holding one option per
// value. The selected option sits in its own white pill (12px radius, drop
// shadow); unselected options are transparent buttons in the same row.
// Keyboard pattern mirrors Tabs' roving-tabindex arrow navigation, adapted
// to WAI-ARIA's radiogroup/radio roles since this is a single-choice
// selector rather than a set of panels.
function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const focusAndSelect = (index: number) => {
    const option = options[index]
    if (!option) return
    onChange(option.value)
    optionRefs.current[option.value]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusAndSelect((index + 1) % options.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusAndSelect((index - 1 + options.length) % options.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusAndSelect(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusAndSelect(options.length - 1)
    }
  }

  return (
    <div
      role="radiogroup"
      className={cx('inline-flex items-center rounded-[14px] bg-background-unique p-1', className)}
    >
      {options.map((option, index) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            ref={(el) => {
              optionRefs.current[option.value] = el
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cx(
              'cursor-pointer whitespace-nowrap rounded-xl px-4 py-1 text-button-medium font-sans font-semibold transition-colors',
              selected
                ? 'bg-background-primary text-content-primary drop-shadow-[0px_2px_5.6px_rgba(0,0,0,0.05)]'
                : 'bg-transparent text-content-tertiary hover:text-content-primary',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedControl
