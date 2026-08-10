import type { ReactNode } from 'react'
import { homeItem, navBottomItems, navSections } from '../data/navigation'
import Breadcrumb, { type Crumb } from './Breadcrumb'
import SideNav from './SideNav'
import TopNav from './TopNav'

export interface AppLayoutProps {
  crumbs: Crumb[]
  onCrumbClick: (id: string, index: number) => void
  /** The scrollable page content — everything below the breadcrumb. */
  children: ReactNode
}

// Reusable page shell every page plugs into. Fills the viewport with no
// page-level scroll: SideNav, TopNav, and the breadcrumb bar stay fixed;
// only the content area below the breadcrumb scrolls (overflow-y-auto),
// inside the white panel (Figma node 4078:50035 "page").
//
// Judgment call: `activeItemId` is hardcoded to "home" below since
// AppLayout's spec'd prop list is only {crumbs, onCrumbClick, children} —
// no way to vary which nav item is active. Every page built so far lives
// under Home, so this holds for now, but it'll need to become a real prop
// once a second top-level nav destination exists. `onLogout` is a stub
// for the same reason TopNav's own notification/settings are dead — no
// real behavior to wire up yet.
function AppLayout({ crumbs, onCrumbClick, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-unique">
      <SideNav
        sections={navSections}
        homeItem={homeItem}
        bottomItems={navBottomItems}
        activeItemId="home"
        onLogout={() => console.log('logout clicked')}
      />
      <div className="flex min-w-0 flex-1 flex-col pr-3">
        <TopNav />
        <div className="mb-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border-[0.8px] border-border-disabled bg-background-primary">
          <Breadcrumb crumbs={crumbs} onCrumbClick={onCrumbClick} />
          {/* Scrollbar hidden — scroll behavior stays, a custom scrollbar
              is coming later. scrollbar-width is the standard property;
              the [&::-webkit-scrollbar] arbitrary variant covers
              Chrome/Safari, which ignore it. */}
          <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-8 px-8 py-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
