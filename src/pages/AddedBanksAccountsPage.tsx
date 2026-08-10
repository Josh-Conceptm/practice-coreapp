import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import BankCard, { type Bank } from '../components/BankCard'
import Button from '../components/Button'
import Tabs, { type Tab } from '../components/Tabs'
import Tooltip from '../components/Tooltip'
import { businessBanks, personalBanks } from '../data/demoBanks'
import AddIcon from '../icons/AddIcon'
import HomeIcon from '../icons/HomeIcon'
import InfoIcon from '../icons/InfoIcon'
import PersonIcon from '../icons/PersonIcon'
import WorkIcon from '../icons/WorkIcon'
import sheetIconColored from '../assets/sheet-icon-colored.svg'

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1IL6G8waFu05A0HJu9cnoDpBeCikFZG_vNSyS26vFaZ8/edit?usp=sharing'

const TABS: Tab[] = [
  { id: 'added-banks-accounts', label: 'Added Banks & Accounts' },
  { id: 'account-types', label: 'Account Types' },
  { id: 'template-settings', label: 'Template Settings' },
]

// Account-type badges pair a tint (passed as badgeTint, per BankCard's
// data-not-token contract) with a solid accent color for the icon itself
// — Figma draws the icon in the tint's own base hue at full opacity, not
// inherited text color. Same data-not-token treatment; derived here at
// the page level rather than adding a color prop to BankCard.
const PERSONAL_TINT = 'rgba(60, 131, 246, 0.2)'
const PERSONAL_ACCENT = '#3c83f6'
const BUSINESS_TINT = 'rgba(115, 79, 201, 0.2)'
const BUSINESS_ACCENT = '#734fc9'

function toggleAccount(banks: Bank[], bankId: string, accountId: string): Bank[] {
  return banks.map((bank) =>
    bank.id !== bankId
      ? bank
      : {
          ...bank,
          accounts: bank.accounts.map((account) =>
            account.id !== accountId ? account : { ...account, checked: !account.checked },
          ),
        },
  )
}

function AddedBanksAccountsPage() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id)
  const [personal, setPersonal] = useState<Bank[]>(personalBanks)
  const [business, setBusiness] = useState<Bank[]>(businessBanks)

  const activeTab = TABS.find((tab) => tab.id === activeTabId) ?? TABS[0]

  const crumbs = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'template', label: 'BankSheets Template' },
    { id: activeTab.id, label: activeTab.label },
  ]

  return (
    <AppLayout
      crumbs={crumbs}
      onCrumbClick={(id, index) => console.log('breadcrumb click (stub):', id, index)}
    >
      <div className="flex flex-col gap-2 pb-2">
        <div className="flex items-center gap-4">
          {/* role="heading" on a <p>, not a literal <h1>: index.css carries
              legacy unlayered `h1 { font-size: 56px; ... }` rules from the
              original Vite scaffold (predating the token system) that beat
              any Tailwind utility class regardless of specificity, because
              Tailwind's utilities are layered and unlayered CSS always wins
              over layered CSS in the cascade — TypographyPreview's own
              <h2> label has the same latent collision. Worth cleaning up
              those global rules separately; sidestepping here rather than
              touching shared global CSS as a side effect of this page. */}
          <p
            role="heading"
            aria-level={1}
            className="text-heading-md font-display font-bold text-content-primary"
          >
            BankSheets Template
          </p>
          <Button
            variant="outline"
            size="small"
            rightIcon={<img src={sheetIconColored} alt="" className="size-4" />}
            onClick={() => window.open(SHEET_URL, '_blank', 'noopener')}
          >
            Go to Sheet
          </Button>
        </div>
        <Tabs tabs={TABS} activeTabId={activeTabId} onTabChange={setActiveTabId} />
      </div>

      {activeTabId === 'added-banks-accounts' ? (
        <>
          {/* gap-6 (24px) + justify-between: gap is a floor CSS reserves
              before distributing any remaining free space, so the two
              groups can never end up closer than 24px apart regardless of
              container width — justify-between only ever adds MORE space
              beyond that. min-w-0 + flex-1 on the text group is what lets
              it actually shrink below its own content width once space
              runs out, so the <p> wraps to a second line instead of the
              icon/button being squeezed; text-left on the <p> keeps it
              left-aligned in both the single- and two-line states (not
              relying on inheritance for this one, unlike elsewhere). The
              icon and button are shrink-0 so neither is ever compressed
              itself — text-wrapping is the only escape valve. */}
          <div className="flex w-full items-start justify-between gap-6">
            <div className="flex min-w-0 flex-1 items-start gap-2">
              <p className="text-left text-body-small font-sans font-normal text-content-primary">
                On this page are banks and accounts that you have added to this spreadsheet
              </p>
              <Tooltip
                title="Note"
                body="Don't worry, edits you make here are just for this Spreadsheet. Your bank info everywhere else stays the same"
                actionLabel="Okay!"
              >
                <InfoIcon className="size-5 text-content-primary" />
              </Tooltip>
            </div>
            {/* Dead for now — no add-account flow exists yet. */}
            <Button variant="outline" size="small" rightIcon={<AddIcon />} className="shrink-0">
              Add an Account
            </Button>
          </div>

          <BankCard
            title="Personal Accounts"
            badgeIcon={
              <span style={{ color: PERSONAL_ACCENT }}>
                <PersonIcon />
              </span>
            }
            badgeTint={PERSONAL_TINT}
            banks={personal}
            defaultExpanded
            onAccountToggle={(bankId, accountId) =>
              setPersonal((prev) => toggleAccount(prev, bankId, accountId))
            }
            onRemoveBank={() => console.log('remove bank (stub): personal')}
          />

          <BankCard
            title="Business Accounts"
            badgeIcon={
              <span style={{ color: BUSINESS_ACCENT }}>
                <WorkIcon />
              </span>
            }
            badgeTint={BUSINESS_TINT}
            banks={business}
            defaultExpanded={false}
            onAccountToggle={(bankId, accountId) =>
              setBusiness((prev) => toggleAccount(prev, bankId, accountId))
            }
            onRemoveBank={() => console.log('remove bank (stub): business')}
          />
        </>
      ) : (
        <div className="flex w-full items-center justify-center py-16 text-body-medium font-sans font-normal text-content-tertiary">
          Coming soon
        </div>
      )}
    </AppLayout>
  )
}

export default AddedBanksAccountsPage
