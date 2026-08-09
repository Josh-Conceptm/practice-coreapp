import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import AddIcon from '../icons/AddIcon'
import ToggleButton, { type ToggleButtonVariant } from './ToggleButton'
import type { ButtonSize } from './shared'

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: { layout: 'centered' },
  args: {
    children: 'Toggle',
  },
  argTypes: {
    variant: { control: 'select', options: ['outline', 'secondary'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

const VARIANTS: ToggleButtonVariant[] = ['outline', 'secondary']
const SIZES: ButtonSize[] = ['small', 'medium', 'large']

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-label-small font-sans font-medium text-content-secondary">
            {variant}
          </span>
          {SIZES.map((size) => (
            <ToggleButton key={size} variant={variant} size={size} leftIcon={<AddIcon />}>
              {size}
            </ToggleButton>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const UncontrolledToggle: Story = {
  name: 'Uncontrolled (click to toggle)',
  args: {
    variant: 'outline',
    size: 'medium',
    children: 'Favorite',
    leftIcon: <AddIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    expect(button).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  },
}

function ControlledExample() {
  const [pressed, setPressed] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <ToggleButton variant="secondary" pressed={pressed} onPressedChange={setPressed}>
        {pressed ? 'On' : 'Off'}
      </ToggleButton>
      <span className="text-label-small font-sans font-normal text-content-secondary">
        parent state: {String(pressed)}
      </span>
    </div>
  )
}

export const ControlledToggle: Story = {
  name: 'Controlled (parent owns state)',
  render: () => <ControlledExample />,
}
