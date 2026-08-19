import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import TextInput from './TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: { layout: 'padded' },
  args: {
    placeholder: 'Personal',
    'aria-label': 'Account type name',
  },
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Empty: Story = {
  render: (args) => (
    <div className="w-[360px]">
      <TextInput {...args} />
    </div>
  ),
}

export const Filled: Story = {
  args: {
    defaultValue: 'Personal',
  },
  render: (args) => (
    <div className="w-[360px]">
      <TextInput {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Personal',
    disabled: true,
  },
  render: (args) => (
    <div className="w-[360px]">
      <TextInput {...args} />
    </div>
  ),
}

function TypingExample() {
  const [value, setValue] = useState('')
  return (
    <div className="flex w-[360px] flex-col gap-2">
      <TextInput
        placeholder="Personal"
        aria-label="Account type name"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <p className="text-body-small font-sans font-normal text-content-secondary">
        Value: {value || '(empty)'}
      </p>
    </div>
  )
}

export const TypingInteraction: Story = {
  name: 'Interactive (type to fill)',
  render: () => <TypingExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Personal')

    await userEvent.type(input, 'Work')
    expect(input).toHaveValue('Work')
    expect(canvas.getByText('Value: Work')).toBeInTheDocument()
  },
}
