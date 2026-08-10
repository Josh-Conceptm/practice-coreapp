import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import InfoIcon from '../icons/InfoIcon'
import Tooltip from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    title: 'Note',
    body: "Don't worry, edits you make here are just for this Spreadsheet. Your bank info everywhere else stays the same",
    actionLabel: 'Okay!',
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <InfoIcon className="size-5 text-content-primary" />
    </Tooltip>
  ),
}

export const HoverInteraction: Story = {
  name: 'Hover to open, click Okay to close (interactive)',
  render: (args) => (
    <Tooltip {...args}>
      <InfoIcon className="size-5 text-content-primary" />
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument()

    const anchor = canvasElement.querySelector('svg')
    if (!anchor) throw new Error('anchor icon not found')
    await userEvent.hover(anchor)
    await waitFor(() => expect(canvas.getByRole('tooltip')).toBeInTheDocument())
    expect(canvas.getByText('Note')).toBeInTheDocument()

    await userEvent.click(canvas.getByRole('button', { name: 'Okay!' }))
    await waitFor(() => expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument())
  },
}
