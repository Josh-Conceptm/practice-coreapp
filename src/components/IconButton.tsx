import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  BUTTON_VARIANT_STYLES,
  IconSlot,
  PRESSED_RADIUS_SHAPE,
  cx,
  type ButtonSize,
} from './shared'

export type IconButtonVariant = 'primary' | 'tertiary' | 'outline' | 'ghost'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactNode
  /** Required — the button has no visible text, so this is its only accessible name. */
  'aria-label': string
  variant?: IconButtonVariant
  size?: ButtonSize
}

// Same state color logic as the equivalent Button variants
// (primary/tertiary/outline reused verbatim; ghost === Button's borderless).
const variantStyles: Record<IconButtonVariant, string> = {
  primary: BUTTON_VARIANT_STYLES.primary,
  tertiary: BUTTON_VARIANT_STYLES.tertiary,
  outline: BUTTON_VARIANT_STYLES.outline,
  ghost: BUTTON_VARIANT_STYLES.borderless,
}

// Uniform (square) padding per tier so the button stays circular.
// Not given explicitly in spec — derived from Button's own vertical
// padding per size (12/8/6px), applied on all four sides. Flagged for review.
const PADDING: Record<ButtonSize, string> = {
  large: 'p-3',
  medium: 'p-2',
  small: 'p-1.5',
}

function IconButton({
  icon,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex shrink-0 items-center justify-center transition-colors',
        PADDING[size],
        variantStyles[variant],
        PRESSED_RADIUS_SHAPE,
        className,
      )}
      {...props}
    >
      <IconSlot icon={icon} size={size} />
    </button>
  )
}

export default IconButton
