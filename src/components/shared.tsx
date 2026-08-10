import type { ReactNode } from 'react'

export type ButtonSize = 'small' | 'medium' | 'large'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Horizontal/vertical padding + typography token per size tier.
 *  Shared verbatim by Button and ToggleButton — the spec calls for
 *  identical padding/text tokens between the two. */
export const SIZE_STYLES: Record<ButtonSize, string> = {
  large: 'px-4 py-3 text-button-large',
  medium: 'px-3 py-2 text-button-medium',
  small: 'px-2 py-1.5 text-button-small',
}

/** Icon box size per tier — 24/20/16px. Shared by Button, ToggleButton, IconButton. */
export const ICON_SIZE: Record<ButtonSize, string> = {
  large: 'size-6',
  medium: 'size-5',
  small: 'size-4',
}

/** Icon-to-text gap — 8px, constant across all size tiers. */
export const ICON_GAP = 'gap-2'

/** Pill by default and on hover; radius reduces to 12px (rounded-xl) on
 *  the pressed/active state. Shared shape mechanic across Button and
 *  IconButton (ToggleButton uses its own on/off variant of this, since
 *  its "pressed" look is a held state, not a momentary :active). */
export const PRESSED_RADIUS_SHAPE = 'rounded-full active:rounded-xl'

/** Background/border/text token classes for the four color-state variants
 *  shared between Button and IconButton ("ghost" in IconButton maps to
 *  "borderless" here) — kept in one place so their state colors can never
 *  drift apart. */
export const BUTTON_VARIANT_STYLES = {
  primary:
    'bg-action-primary text-content-primary-inverse hover:bg-action-primary-hover active:bg-action-primary-pressed',
  tertiary:
    'bg-action-tertiary-default text-content-primary-inverse hover:bg-action-tertiary-hover active:bg-action-tertiary-pressed',
  // Inset box-shadow, not a real `border` — a layout border adds its width
  // on top of padding+content regardless of box-sizing (border-box only
  // reshapes an *explicitly set* width/height; these buttons are
  // auto-height, so box-sizing has no effect on them at all). That was
  // confirmed measured: small outline buttons rendered 30px instead of
  // the spec'd 28px (6px padding x2 + 16px line-height) purely because a
  // real 1px border added 2px on top of that formula. An inset shadow
  // paints the same 1px ring inside the box without adding to its size —
  // visually identical, but the box stays exactly padding+content tall.
  outline:
    'bg-background-primary text-content-secondary shadow-[inset_0_0_0_1px_var(--color-border-tertiary)] hover:bg-background-subtle active:bg-background-subtle-2 active:shadow-[inset_0_0_0_1px_var(--color-border-disabled)]',
  borderless:
    'bg-transparent text-content-primary hover:bg-background-subtle active:bg-background-subtle-2',
} as const

interface IconSlotProps {
  icon: ReactNode
  size: ButtonSize
}

/** Fixed-size wrapper that sizes any nested <svg> to the button's icon
 *  tier via CSS, so it works for whatever ReactNode a consumer passes in
 *  without the button needing to clone/inspect the icon element. Color is
 *  inherited for free as long as the icon's own fill/stroke is currentColor. */
export function IconSlot({ icon, size }: IconSlotProps) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full',
        ICON_SIZE[size],
      )}
    >
      {icon}
    </span>
  )
}
