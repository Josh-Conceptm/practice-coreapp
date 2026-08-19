import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { placeholderPreviewImageUrl } from '../data/previewCards'
import TemplateCard from './TemplateCard'

const meta: Meta<typeof TemplateCard> = {
  title: 'Components/TemplateCard',
  component: TemplateCard,
  parameters: { layout: 'padded' },
  args: {
    name: 'XYZ Power template',
    previewImageUrl: placeholderPreviewImageUrl,
    onPreview: () => alert('Preview clicked'),
    onUseTemplate: () => alert('Use template clicked'),
  },
}

export default meta
type Story = StoryObj<typeof TemplateCard>

export const Default: Story = {}

export const UseTemplateInteraction: Story = {
  name: 'Interactive (use template)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Use template' }))
    expect(canvas.getByRole('button', { name: 'Preview' })).toBeInTheDocument()
  },
}
