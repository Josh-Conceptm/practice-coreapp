import americanExpressLogo from '../assets/american-express-logo.svg'
import wellsFargoLogo from '../assets/wells-fargo-logo.svg'

export interface BankLogoEntry {
  logoUrl: string
  brandColor: string
}

/** Placeholder local lookup, keyed by `Bank.logoKey` — stands in for the real
 *  aggregator (Plaid or similar) that will eventually supply `logoUrl` and
 *  `brandColor` per connected bank. `Bank.logoUrl`/`Bank.brandColor` still
 *  win when set directly, so this whole module can be deleted later without
 *  touching BankCard's own logic.
 *
 *  Only banks whose logo assets have actually been supplied belong here —
 *  don't add entries pointing at placeholder or borrowed artwork. */
export const bankLogos: Record<string, BankLogoEntry> = {
  'wells-fargo': { logoUrl: wellsFargoLogo, brandColor: '#dd1e25' },
  'american-express': { logoUrl: americanExpressLogo, brandColor: '#016fd0' },
}
