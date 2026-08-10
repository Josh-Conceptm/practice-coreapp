import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import { personalBanks as banks } from '../data/demoBanks'
import PersonIcon from '../icons/PersonIcon'
import BankCard, { type Bank } from './BankCard'

const meta: Meta<typeof BankCard> = {
  title: 'Components/BankCard',
  component: BankCard,
  parameters: { layout: 'padded' },
  args: {
    title: 'Personal Accounts',
    badgeIcon: <PersonIcon />,
    badgeTint: 'rgba(60, 131, 246, 0.2)',
    banks,
    onAccountToggle: () => {},
    onRemoveBank: () => alert('Remove bank clicked'),
  },
  decorators: [
    (StoryComponent) => (
      <div className="w-[1164px] max-w-full">
        <StoryComponent />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BankCard>

/** Parent owns the account data — toggling a checkbox flips that one
 *  account's `checked` field immutably; the card never mutates it itself. */
function InteractiveExample() {
  const [bankState, setBankState] = useState<Bank[]>(banks)

  const handleToggle = (bankId: string, accountId: string) => {
    setBankState((prev) =>
      prev.map((bank) =>
        bank.id !== bankId
          ? bank
          : {
              ...bank,
              accounts: bank.accounts.map((account) =>
                account.id !== accountId ? account : { ...account, checked: !account.checked },
              ),
            },
      ),
    )
  }

  return (
    <BankCard
      title="Personal Accounts"
      badgeIcon={<PersonIcon />}
      badgeTint="rgba(60, 131, 246, 0.2)"
      banks={bankState}
      onAccountToggle={handleToggle}
      onRemoveBank={() => alert('Remove bank clicked')}
    />
  )
}

export const Interactive: Story = {
  name: 'Interactive (expand/collapse + toggle)',
  render: () => <InteractiveExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(canvas.getByText('Main Checking')).toBeVisible()

    const editButton = canvas.getByRole('button', { name: /Edit 4 Connected Accounts/ })
    expect(editButton).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(editButton)
    expect(editButton).toHaveAttribute('aria-expanded', 'false')
    expect(canvas.queryByText('Main Checking')).not.toBeInTheDocument()

    await userEvent.click(editButton)
    expect(editButton).toHaveAttribute('aria-expanded', 'true')

    const travelCheckbox = canvas.getByRole('checkbox', { name: 'Business Travel Card' })
    expect(travelCheckbox).not.toBeChecked()

    await userEvent.click(travelCheckbox)
    expect(travelCheckbox).toBeChecked()
  },
}

export const CollapsedByDefault: Story = {
  args: {
    defaultExpanded: false,
  },
}

export const MobileViewport: Story = {
  // No viewport addon is installed in this project, so the mobile width is
  // simulated with a fixed-width wrapper instead of a real device frame.
  decorators: [
    (StoryComponent) => (
      <div className="w-[375px]">
        <StoryComponent />
      </div>
    ),
  ],
}
