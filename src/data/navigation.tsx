import AccountBalanceIcon from '../icons/AccountBalanceIcon'
import AddIcon from '../icons/AddIcon'
import AddSheetIcon from '../icons/AddSheetIcon'
import HomeIcon from '../icons/HomeIcon'
import LinkIcon from '../icons/LinkIcon'
import LogoutIcon from '../icons/LogoutIcon'
import SheetIcon from '../icons/SheetIcon'
import SupportAgentIcon from '../icons/SupportAgentIcon'
import type { NavItem, NavSection } from '../components/SideNav'

/** The app's global nav structure — same for every page (only
 *  `activeItemId` varies), so it lives here rather than being threaded
 *  through AppLayout's props. */
export const homeItem: NavItem = { id: 'home', label: 'Home', strokeIcon: <HomeIcon /> }

export const navSections: NavSection[] = [
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

export const navBottomItems: NavItem[] = [
  { id: 'help-support', label: 'Help & Support', strokeIcon: <SupportAgentIcon /> },
  { id: 'logout', label: 'Logout', strokeIcon: <LogoutIcon /> },
]
