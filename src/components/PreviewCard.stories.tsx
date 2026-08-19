import type { Meta, StoryObj } from '@storybook/react-vite'
import { placeholderPreviewImageUrl } from '../data/previewCards'
import Button from './Button'
import PreviewCard from './PreviewCard'

const meta: Meta<typeof PreviewCard> = {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  parameters: { layout: 'padded' },
  args: {
    previewImageUrl: placeholderPreviewImageUrl,
  },
}

export default meta
type Story = StoryObj<typeof PreviewCard>

// Placeholder slot content only — this shell carries no opinion about what
// goes in `meta`/`actions`. Real consumers (SpreadsheetCard, TemplateCard)
// supply their own markup.
const placeholderMeta = (
  <div className="flex flex-col items-start gap-2">
    <span className="text-label-overline font-sans font-medium text-content-tertiary">Name:</span>
    <span className="text-body-medium font-sans font-normal text-content-primary">Card name</span>
  </div>
)
const placeholderActions = (
  <>
    <Button variant="outline" size="small">
      Secondary
    </Button>
    <Button variant="tertiary" size="small">
      Primary
    </Button>
  </>
)

export const Default: Story = {
  args: {
    meta: placeholderMeta,
    actions: placeholderActions,
  },
}
