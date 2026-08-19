import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import SegmentedControl, { type SegmentedControlOption } from './SegmentedControl'

const options: SegmentedControlOption[] = [
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Work' },
]

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  args: { options },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

export const PersonalSelected: Story = {
  args: { value: 'personal', onChange: () => {} },
}

export const WorkSelected: Story = {
  args: { value: 'work', onChange: () => {} },
}

function SwitchingExample() {
  const [value, setValue] = useState('personal')
  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl options={options} value={value} onChange={setValue} />
      <p className="text-body-small font-sans font-normal text-content-secondary">
        Selected: {options.find((option) => option.value === value)?.label}
      </p>
    </div>
  )
}

export const Switching: Story = {
  render: () => <SwitchingExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByRole('radio', { name: 'Personal' })).toHaveAttribute(
      'aria-checked',
      'true',
    )

    await userEvent.click(canvas.getByRole('radio', { name: 'Work' }))
    expect(canvas.getByRole('radio', { name: 'Work' })).toHaveAttribute('aria-checked', 'true')
    expect(canvas.getByText('Selected: Work')).toBeInTheDocument()

    // Keyboard arrow navigation
    await userEvent.keyboard('{ArrowLeft}')
    expect(canvas.getByRole('radio', { name: 'Personal' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
  },
}
