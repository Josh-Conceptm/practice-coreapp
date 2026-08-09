import { useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { ICON_GAP, IconSlot, SIZE_STYLES, cx, type ButtonSize } from './shared'

export type ToggleButtonVariant = 'outline' | 'secondary'

export interface ToggleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: ToggleButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  /** Controlled pressed state. Omit to let the button manage its own state. */
  pressed?: boolean
  /** Initial state when uncontrolled. Ignored if `pressed` is provided. */
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

// Off state is identical between variants: only the "on" look differs.
const OFF_STYLES =
  'bg-background-primary text-content-primary border border-border-tertiary hover:bg-background-subtle rounded-full'

// On state has no specified hover treatment for either variant, so none is applied.
const ON_STYLES: Record<ToggleButtonVariant, string> = {
  outline: 'bg-background-subtle text-content-primary border border-border-tertiary rounded-xl',
  secondary: 'bg-action-tertiary-default text-content-primary-inverse border border-transparent rounded-xl',
}

function ToggleButton({
  variant = 'outline',
  size = 'medium',
  leftIcon,
  rightIcon,
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  onClick,
  type = 'button',
  className,
  children,
  ...props
}: ToggleButtonProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed)
  const isControlled = pressedProp !== undefined
  const pressed = isControlled ? pressedProp : internalPressed

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const next = !pressed
    if (!isControlled) {
      setInternalPressed(next)
    }
    onPressedChange?.(next)
    onClick?.(event)
  }

  return (
    <button
      type={type}
      aria-pressed={pressed}
      onClick={handleClick}
      className={cx(
        'inline-flex items-center justify-center whitespace-nowrap font-sans font-semibold transition-colors',
        ICON_GAP,
        SIZE_STYLES[size],
        pressed ? ON_STYLES[variant] : OFF_STYLES,
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

export default ToggleButton
