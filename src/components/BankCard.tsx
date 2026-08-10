import { Fragment, useState, type ReactNode } from 'react'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import { bankLogos } from '../data/bankLogos'
import Button from './Button'
import Card from './Card'
import Checkbox from './Checkbox'
import { cx } from './shared'

export interface BankAccount {
  id: string
  name: string
  detail: string
  checked: boolean
}

export interface Bank {
  id: string
  name: string
  /** Looks up logoUrl/brandColor in the local `bankLogos` placeholder map
   *  (see src/data/bankLogos.ts) when those aren't given directly. Stand-in
   *  for a future real-aggregator lookup — ignored once logoUrl is set. */
  logoKey?: string
  /** Third-party bank brand color — arrives as data, applied via inline
   *  style. Never tokenized; the component itself has no hardcoded hex.
   *  Overrides the `logoKey` lookup when set. */
  logoUrl?: string
  brandColor?: string
  addedDate: string
  accounts: BankAccount[]
}

export interface BankCardProps {
  /** e.g. "Personal Accounts" */
  title: string
  /** 20px icon rendered inside the type badge. Consumer's concern. */
  badgeIcon: ReactNode
  /** Tinted background for the 32px badge circle — same data-not-token
   *  treatment as brandColor. */
  badgeTint: string
  infoText?: string
  showNewTag?: boolean
  banks: Bank[]
  onAccountToggle: (bankId: string, accountId: string) => void
  onRemoveBank: () => void
  defaultExpanded?: boolean
}

/** 24px brand-colored circle for a bank's logo. Resolves logoUrl/brandColor
 *  from the bank itself, falling back to the local `bankLogos` lookup by
 *  `logoKey`. If neither resolves — or the image fails to load — falls back
 *  to an initials circle rather than a broken image. */
function BankLogo({ bank }: { bank: Bank }) {
  const [imageFailed, setImageFailed] = useState(false)
  const local = bank.logoKey ? bankLogos[bank.logoKey] : undefined
  const logoUrl = bank.logoUrl ?? local?.logoUrl
  const brandColor = bank.brandColor ?? local?.brandColor
  const showImage = Boolean(logoUrl) && !imageFailed

  return (
    <span
      className={cx(
        'inline-flex size-6 shrink-0 items-center justify-center rounded-full p-1',
        !brandColor && 'bg-background-subtle-2',
      )}
      style={brandColor ? { backgroundColor: brandColor } : undefined}
    >
      {showImage ? (
        <img
          src={logoUrl}
          alt=""
          className="size-4 shrink-0 rounded-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cx(
            'flex size-4 shrink-0 items-center justify-center text-[8px] leading-none font-sans font-semibold',
            brandColor ? 'text-content-primary-inverse' : 'text-content-secondary',
          )}
        >
          {bank.name.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  )
}

function BankCard({
  title,
  badgeIcon,
  badgeTint,
  infoText,
  showNewTag = false,
  banks,
  onAccountToggle,
  onRemoveBank,
  defaultExpanded = true,
}: BankCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const totalAccounts = banks.reduce((sum, bank) => sum + bank.accounts.length, 0)

  const header = (
    <div className="flex items-center justify-between gap-4 p-4 md:px-6 md:py-[22px]">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: badgeTint }}
        >
          <span className="inline-flex size-5 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
            {badgeIcon}
          </span>
        </span>
        <div className="flex min-w-0 flex-col items-start">
          <div className="flex min-w-0 flex-col items-start">
            <span className="truncate text-label-small font-sans font-medium text-content-primary">
              {title}
            </span>
            {infoText && (
              <span className="truncate text-label-caption font-sans font-normal text-content-tertiary">
                {infoText}
              </span>
            )}
          </div>
          {showNewTag && (
            <span className="whitespace-nowrap text-label-caption font-sans font-normal text-feedback-error">
              New
            </span>
          )}
        </div>
      </div>

      {/* This button is the card's only expand/collapse control — toggling
          it shows/hides the body+footer by simply omitting those Card
          slots below. Chevron direction mirrors expanded state. Figma now
          draws this with real button chrome (12px/8px padding, pill) —
          borderless Button/medium matches exactly. `!` modifier required,
          same reasoning as Remove Bank below. */}
      <Button
        variant="borderless"
        size="medium"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="!text-background-secondary"
        rightIcon={
          <ChevronDownIcon
            className={cx('transition-transform duration-200', expanded && 'rotate-180')}
          />
        }
      >
        <span className="md:hidden">Edit {totalAccounts} Connected</span>
        <span className="hidden md:inline">Edit {totalAccounts} Connected Accounts</span>
      </Button>
    </div>
  )

  const body = (
    <div className="flex w-full flex-col items-start gap-4 p-4 md:gap-6 md:p-6">
      {banks.map((bank) => (
        <Fragment key={bank.id}>
          <div className="flex shrink-0 items-center gap-3">
            <BankLogo bank={bank} />
            <span className="whitespace-nowrap text-label-small font-sans font-medium text-content-primary">
              {bank.name}
            </span>
            <span className="whitespace-nowrap text-label-caption font-sans font-normal text-content-disabled md:text-body-small">
              Added {bank.addedDate}
            </span>
          </div>

          {bank.accounts.map((account) => (
            <div key={account.id} className="flex w-full shrink-0 items-center gap-2 px-[38px]">
              <Checkbox
                checked={account.checked}
                onChange={() => onAccountToggle(bank.id, account.id)}
                aria-label={account.name}
              />
              {/* Desktop: name + detail inline. Mobile: stacked. */}
              <div className="flex min-w-0 flex-col items-start md:flex-row md:items-center md:gap-2">
                <span className="whitespace-nowrap text-body-small font-sans font-normal text-content-primary">
                  {account.name}
                </span>
                <span className="whitespace-nowrap text-label-caption font-sans font-normal text-content-disabled md:text-body-small">
                  {account.detail}
                </span>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )

  const footer = (
    <div className="flex w-full justify-end p-4 md:px-6 md:py-4">
      {/* variant="borderless" defaults to text-content-primary; the `!`
          modifier is required, not decorative — Tailwind generates one
          shared stylesheet, and two same-specificity single-class color
          utilities resolve by internal generation order, not by where
          they appear in this className string. Verified empirically:
          plain className overrides silently lose for some color pairs
          (e.g. text-background-secondary) while appearing to work for
          others — not something to rely on without `!important`. */}
      <Button variant="borderless" size="medium" onClick={onRemoveBank} className="!text-feedback-error">
        Remove Bank
      </Button>
    </div>
  )

  return <Card header={header} body={expanded ? body : undefined} footer={expanded ? footer : undefined} />
}

export default BankCard
