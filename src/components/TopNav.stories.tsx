import type { Meta, StoryObj } from '@storybook/react-vite'
import TopNav from './TopNav'

const meta: Meta<typeof TopNav> = {
  title: 'Components/TopNav',
  component: TopNav,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof TopNav>

export const Default: Story = {}

// Demonstrates the right-hand icon group staying pinned to the edge,
// fixed-gap and non-wrapping, as the bar narrows.
export const Narrow: Story = {
  decorators: [
    (StoryComponent) => (
      <div className="w-[320px] border border-dashed border-border-tertiary">
        <StoryComponent />
      </div>
    ),
  ],
}
