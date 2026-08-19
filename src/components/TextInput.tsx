import type { InputHTMLAttributes } from 'react'
import { cx } from './shared'

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

// Figma node 5186:20912 ("Text input", rename-account-types card): 44px-tall
// field, 12px/8px padding, 12px radius. Idle border is background-unique —
// the same token as the field's own fill, so it reads as an almost-
// invisible edge rather than a hard outline. Focus reuses Checkbox's
// outline treatment (outline-2 outline-offset-2 outline-border-focus)
// instead of a border swap, so every form control in the system focuses
// the same way.
//
// The Figma design carries no separate <label> element for this field —
// only placeholder text ("Personal" / "Work") — so consumers MUST supply
// either an `aria-label` or wrap the input in a visible <label> (see
// Checkbox's usage for that pattern). Placeholder text alone is not an
// accessible name once the field has a value.
function TextInput({ className, disabled, ...props }: TextInputProps) {
  return (
    <input
      type="text"
      disabled={disabled}
      className={cx(
        'h-11 w-full rounded-xl border px-3 py-2 text-body-medium font-sans font-normal outline-none transition-colors',
        disabled
          ? 'cursor-not-allowed border-border-disabled bg-background-subtle text-content-disabled placeholder:text-content-disabled'
          : 'border-background-unique bg-background-primary text-content-primary placeholder:text-content-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus',
        className,
      )}
      {...props}
    />
  )
}

export default TextInput
