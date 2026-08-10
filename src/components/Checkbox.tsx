import type { ChangeEvent, InputHTMLAttributes } from 'react'
import CheckIcon from '../icons/CheckIcon'
import { cx } from './shared'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'type' | 'size'> {
  checked: boolean
  onChange: (checked: boolean) => void
}

// Standard accessible-checkbox pattern: a real <input type="checkbox"> sits on
// top, fully sized but visually transparent, so it keeps native keyboard/
// click/focus/label behavior; the decorative box under it is what's actually
// seen and is purely aria-hidden.
function Checkbox({ checked, onChange, className, ...props }: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <span className={cx('relative inline-flex size-[18px] shrink-0', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cx(
          'pointer-events-none inline-flex size-[18px] shrink-0 items-center justify-center rounded border transition-colors',
          'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus',
          checked
            ? 'border-content-primary bg-content-primary text-content-primary-inverse'
            : 'border-border-disabled bg-background-primary',
        )}
      >
        {checked && <CheckIcon className="size-3" />}
      </span>
    </span>
  )
}

export default Checkbox
