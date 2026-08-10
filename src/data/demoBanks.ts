import type { Bank } from '../components/BankCard'

/** Shared demo data for BankCard consumers — Storybook stories and the
 *  Added Banks & Accounts page draw from the same source so they can
 *  never drift apart. logoKey values resolve through
 *  src/data/bankLogos.ts. */
export const personalBanks: Bank[] = [
  {
    id: 'wells-fargo',
    name: 'Wells Fargo',
    logoKey: 'wells-fargo',
    addedDate: '12-05-26',
    accounts: [
      { id: 'wf-checking', name: 'Main Checking', detail: 'Credit card - 8122', checked: true },
      { id: 'wf-savings', name: 'Savings Account', detail: 'Credit card - 4567', checked: true },
    ],
  },
  {
    id: 'amex',
    name: 'American Express',
    logoKey: 'american-express',
    addedDate: '12-05-26',
    accounts: [
      { id: 'amex-shopping', name: 'Walmart Shopping', detail: 'Money Market - 4567', checked: true },
      { id: 'amex-travel', name: 'Business Travel Card', detail: 'Credit card - 9981', checked: false },
    ],
  },
]

// No logo asset was supplied for a business-purpose bank, so this entry
// deliberately has no logoKey/logoUrl — BankCard's initials-circle
// fallback renders in its place. Swap in a real bank + logoKey once one's
// available.
export const businessBanks: Bank[] = [
  {
    id: 'chase-business',
    name: 'Chase',
    addedDate: '01-10-26',
    accounts: [
      { id: 'chase-checking', name: 'Business Checking', detail: 'Checking - 2210', checked: true },
      { id: 'chase-savings', name: 'Business Savings', detail: 'Savings - 7734', checked: true },
    ],
  },
]
