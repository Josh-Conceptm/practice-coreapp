import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import Tabs, { type Tab } from './Tabs'

const tabs: Tab[] = [
  { id: 'added', label: 'Added Banks & Accounts' },
  { id: 'types', label: 'Account Types' },
  { id: 'settings', label: 'Template Settings' },
]

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  args: { tabs },
}

export default meta
type Story = StoryObj<typeof Tabs>

function SwitchingExample() {
  const [activeTabId, setActiveTabId] = useState('added')
  const active = tabs.find((tab) => tab.id === activeTabId)

  return (
    <div className="flex w-[500px] flex-col gap-4">
      <Tabs tabs={tabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
      <p className="text-body-small font-sans font-normal text-content-secondary">
        Active tab: {active?.label}
      </p>
    </div>
  )
}

export const Switching: Story = {
  render: () => <SwitchingExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByRole('tab', { name: 'Added Banks & Accounts' })).toHaveAttribute(
      'aria-selected',
      'true',
    )

    await userEvent.click(canvas.getByRole('tab', { name: 'Account Types' }))
    expect(canvas.getByRole('tab', { name: 'Account Types' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(canvas.getByText('Active tab: Account Types')).toBeInTheDocument()

    // Keyboard arrow navigation
    await userEvent.keyboard('{ArrowRight}')
    expect(canvas.getByRole('tab', { name: 'Template Settings' })).toHaveAttribute(
      'aria-selected',
      'true',
    )

    await userEvent.keyboard('{ArrowRight}')
    expect(canvas.getByRole('tab', { name: 'Added Banks & Accounts' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  },
}
