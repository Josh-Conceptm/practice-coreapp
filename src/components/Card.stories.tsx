import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  decorators: [
    (StoryComponent) => (
      <div className="w-[480px]">
        <StoryComponent />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Card>

// Placeholder content only — this shell carries no opinion about what goes
// in each slot. Real consumers (e.g. BankCard) supply their own markup.
const placeholderHeader = (
  <div className="p-6 text-body-medium font-sans font-medium text-content-primary">Header slot</div>
)
const placeholderBody = (
  <div className="p-6 text-body-small font-sans font-normal text-content-secondary">Body slot</div>
)
const placeholderFooter = (
  <div className="p-6 text-body-small font-sans font-normal text-content-tertiary">Footer slot</div>
)

export const AllSlots: Story = {
  args: {
    header: placeholderHeader,
    body: placeholderBody,
    footer: placeholderFooter,
  },
}

export const FooterOmitted: Story = {
  name: 'Slot omitted (no footer)',
  args: {
    header: placeholderHeader,
    body: placeholderBody,
  },
}
