import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  BUTTON_VARIANT_STYLES,
  ICON_GAP,
  IconSlot,
  PRESSED_RADIUS_SHAPE,
  SIZE_STYLES,
  cx,
  type ButtonSize,
} from './shared'

export type ButtonVariant = 'primary' | 'tertiary' | 'outline' | 'borderless' | 'link'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: BUTTON_VARIANT_STYLES.primary,
  tertiary: BUTTON_VARIANT_STYLES.tertiary,
  outline: BUTTON_VARIANT_STYLES.outline,
  borderless: BUTTON_VARIANT_STYLES.borderless,
  // Transparent always, no pressed treatment — underline only shows on hover.
  link: 'bg-transparent text-content-primary hover:underline',
}

function Button({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold transition-colors',
        ICON_GAP,
        SIZE_STYLES[size],
        variantStyles[variant],
        variant !== 'link' && PRESSED_RADIUS_SHAPE,
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {leftIcon && <IconSlot icon={leftIcon} size={size} />}
      {children}
      {rightIcon && <IconSlot icon={rightIcon} size={size} />}
    </button>
  )
}

export default Button
