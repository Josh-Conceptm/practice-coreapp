import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { placeholderPreviewImageUrl } from '../data/previewCards'
import SpreadsheetCard from './SpreadsheetCard'

const meta: Meta<typeof SpreadsheetCard> = {
  title: 'Components/SpreadsheetCard',
  component: SpreadsheetCard,
  parameters: { layout: 'padded' },
  args: {
    name: 'B.Sheets Power template',
    previewImageUrl: placeholderPreviewImageUrl,
    lastUpdated: 'Dec. 30th, 2025',
    onMakeChanges: () => alert('Make Changes clicked'),
    onViewSheet: () => alert('View Sheet clicked'),
  },
}

export default meta
type Story = StoryObj<typeof SpreadsheetCard>

export const Default: Story = {}

export const New: Story = {
  name: 'With "New" tag',
  args: { isNew: true },
}

export const HoverRevealsActions: Story = {
  name: 'Interactive (actions reachable while hidden)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // The actions row is opacity-0 by default (only visible on hover/focus)
    // but stays in the DOM and focusable — clickable here without first
    // simulating a real mouseover.
    const viewSheetButton = canvas.getByRole('button', { name: 'View Sheet' })
    await userEvent.click(viewSheetButton)
    expect(canvas.getByRole('button', { name: 'Make Changes' })).toBeInTheDocument()
  },
}
