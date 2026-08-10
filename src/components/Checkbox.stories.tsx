import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  args: {
    'aria-label': 'Checkbox',
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
  },
}

function InteractiveExample() {
  const [checked, setChecked] = useState(false)
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <Checkbox checked={checked} onChange={setChecked} />
      <span className="text-body-small font-sans font-normal text-content-primary">
        {checked ? 'Checked' : 'Unchecked'}
      </span>
    </label>
  )
}

export const InteractiveToggle: Story = {
  name: 'Interactive (click to toggle)',
  render: () => <InteractiveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(canvas.getByText('Checked')).toBeInTheDocument()

    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  },
}
