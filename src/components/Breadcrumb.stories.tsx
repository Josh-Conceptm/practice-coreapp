import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import HomeIcon from '../icons/HomeIcon'
import Breadcrumb, { type Crumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['desktop', 'mobile'] },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

const twoCrumbs: Crumb[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'banks', label: 'Banks & Accts' },
]

const longTrail: Crumb[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'banks', label: 'Banks & Accts' },
  { id: 'chase', label: 'Chase' },
  { id: 'checking', label: 'Checking ••1234' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'august', label: 'August 2026' },
  { id: 'details', label: 'Transaction Details' },
]

export const TwoCrumbs: Story = {
  args: {
    crumbs: twoCrumbs,
    onCrumbClick: (id, index) => alert(`clicked ${id} (index ${index})`),
  },
}

export const LongTrailOverflow: Story = {
  name: 'Long trail (overflow ellipsis)',
  args: {
    crumbs: longTrail,
    onCrumbClick: (id, index) => alert(`clicked ${id} (index ${index})`),
  },
  decorators: [
    (StoryComponent) => (
      // Constrained width so the 7-crumb trail can't fit — demonstrates the
      // component collapsing the middle into "…" in response to container
      // width, not crumb count.
      <div className="w-[480px]">
        <StoryComponent />
      </div>
    ),
  ],
}

export const Mobile: Story = {
  args: {
    crumbs: longTrail,
    variant: 'mobile',
    onCrumbClick: (id, index) => alert(`clicked ${id} (index ${index})`),
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-[360px]">
        <StoryComponent />
      </div>
    ),
  ],
}

/** Parent-owned state: clicking a past crumb truncates the array back to
 *  that crumb (making it the new current/last one) and would normally kick
 *  off navigation. The component itself never mutates `crumbs`. */
function InteractiveExample() {
  const [crumbs, setCrumbs] = useState<Crumb[]>(longTrail)

  const handleCrumbClick = (_id: string, index: number) => {
    setCrumbs((prev) => prev.slice(0, index + 1))
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb crumbs={crumbs} onCrumbClick={handleCrumbClick} />
      <p className="text-body-small font-sans font-normal text-content-secondary">
        Trail length: {crumbs.length}
      </p>
    </div>
  )
}

export const InteractiveTruncation: Story = {
  name: 'Click a past crumb to truncate (interactive)',
  render: () => <InteractiveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByText('Trail length: 7')).toBeInTheDocument()

    await userEvent.click(canvas.getByRole('button', { name: 'Chase' }))
    expect(canvas.getByText('Trail length: 3')).toBeInTheDocument()
    expect(canvas.getByText('Chase')).toHaveAttribute('aria-current', 'page')

    await userEvent.click(canvas.getByRole('button', { name: 'Home' }))
    expect(canvas.getByText('Trail length: 1')).toBeInTheDocument()
  },
}
