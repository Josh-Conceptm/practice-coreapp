import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import HomeIcon from '../icons/HomeIcon'
import SheetIcon from '../icons/SheetIcon'
import AddSheetIcon from '../icons/AddSheetIcon'
import LinkIcon from '../icons/LinkIcon'
import AccountBalanceIcon from '../icons/AccountBalanceIcon'
import AddIcon from '../icons/AddIcon'
import SupportAgentIcon from '../icons/SupportAgentIcon'
import LogoutIcon from '../icons/LogoutIcon'
import SideNav, { type NavItem, type NavSection } from './SideNav'

const homeItem: NavItem = { id: 'home', label: 'Home', strokeIcon: <HomeIcon /> }

const sections: NavSection[] = [
  {
    id: 'sheets',
    title: 'Sheets',
    collapsible: true,
    items: [
      { id: 'my-sheets', label: 'My Sheets', strokeIcon: <SheetIcon /> },
      { id: 'create-new', label: 'Create New', strokeIcon: <AddSheetIcon /> },
      { id: 'link-existing', label: 'Link Existing', strokeIcon: <LinkIcon /> },
    ],
  },
  {
    id: 'financial-institutions',
    title: 'Financial Institutions',
    collapsible: true,
    items: [
      { id: 'banks-accts', label: 'Banks & Accts', strokeIcon: <AccountBalanceIcon /> },
      { id: 'add-new-bank', label: 'Add New Bank', strokeIcon: <AddIcon /> },
    ],
  },
]

const bottomItems: NavItem[] = [
  { id: 'help-support', label: 'Help & Support', strokeIcon: <SupportAgentIcon /> },
  { id: 'logout', label: 'Logout', strokeIcon: <LogoutIcon /> },
]

const meta: Meta<typeof SideNav> = {
  title: 'Components/SideNav',
  component: SideNav,
  parameters: { layout: 'fullscreen' },
  args: {
    sections,
    homeItem,
    bottomItems,
    activeItemId: 'home',
    onLogout: () => alert('logout clicked'),
  },
  decorators: [
    (StoryComponent) => (
      <div className="h-screen">
        <StoryComponent />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SideNav>

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
}

export const Collapsed: Story = {
  args: {
    defaultOpen: false,
  },
}

export const ToggleInteraction: Story = {
  name: 'Toggle open/collapsed (click to demo)',
  args: {
    defaultOpen: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Collapse sidebar' })

    expect(canvas.getByText('My Sheets')).toBeInTheDocument()

    await userEvent.click(toggle)
    expect(canvas.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()

    await userEvent.click(canvas.getByRole('button', { name: 'Expand sidebar' }))
    expect(canvas.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  },
}
