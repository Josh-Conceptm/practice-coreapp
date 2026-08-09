import IconButton from './IconButton'
import { cx } from './shared'
import NotificationIcon from '../icons/NotificationIcon'
import SettingsIcon from '../icons/SettingsIcon'
import profilePlaceholder from '../assets/profile-placeholder.png'

export interface TopNavProps {
  className?: string
  /** Rendered profile photo. Defaults to a placeholder avatar until real user data exists. */
  profileSrc?: string
  profileAlt?: string
  onSettingsClick?: () => void
  onNotificationsClick?: () => void
}

// Figma node 4078:50034 ("V1 Top Nav. Bar (Desktop)"): 68px total height,
// made up of py-8 (16px space-l) top/bottom + the 36px icon row — never
// set explicitly, it just falls out of the padding + content sizing.
function TopNav({
  className,
  profileSrc = profilePlaceholder,
  profileAlt = 'Profile',
  onSettingsClick,
  onNotificationsClick,
}: TopNavProps) {
  return (
    <div className={cx('flex items-center bg-background-unique px-8 py-4', className)}>
      {/* Reserved for future content (nav links, search, breadcrumbs, etc.)
          per Figma's "logo container" slot, which is present but
          opacity-0 in this node. min-w-0 lets it shrink away entirely
          before the icon group is ever affected. */}
      <div className="min-w-0 flex-1" aria-hidden="true" />

      {/* Fixed gap-4 (space-l, 16px), shrink-0, no wrap — this group
          never re-flows: it stays pinned to the right edge and shifts
          as a single unit as the bar narrows, only ever giving up space
          to the empty left spacer above. Order matches the Figma
          layout exactly (bell, then gear, then profile flush against
          the true right edge) — not the reverse. */}
      <div className="flex shrink-0 items-center gap-4">
        {/* IconButton's "outline" variant has no explicit box size — its
            ~36px comes from padding + icon + border summed, and since
            IconButton doesn't reserve space for the border, it adds on
            top, rendering 38px instead of Figma's exact 36px. Pinning
            size-9 here (not editing IconButton itself, which has other
            consumers) forces the border-box back to 36px, matching spec. */}
        <IconButton
          variant="outline"
          icon={<NotificationIcon />}
          aria-label="Notifications"
          onClick={onNotificationsClick}
          className="size-9"
        />
        <IconButton
          variant="outline"
          icon={<SettingsIcon />}
          aria-label="Settings"
          onClick={onSettingsClick}
          className="size-9"
        />
        <img
          src={profileSrc}
          alt={profileAlt}
          className="size-9 shrink-0 rounded-full object-cover"
        />
      </div>
    </div>
  )
}

export default TopNav
