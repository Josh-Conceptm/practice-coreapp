---
name: component-designer
description: |
  Build new frontend components that exactly match the design system of whichever repo you're working in. Use this skill whenever the user wants to design, create, or build a UI component, screen, page, tile, card, modal, banner, or any visual element — including turning a Figma design, mockup, screenshot, or written description into React code. Trigger on "design a component", "build this screen", "create a card/tile/modal", "convert this design to code", "new page for the app", or any frontend visual work. The skill first discovers the repo's design tokens, component folders, and house code style, then builds within them — it never assumes a fixed folder layout. The user may be a designer new to React: produce complete, working, copy-paste-ready components, explain what you did in plain language, and never assume React knowledge.
---

# Component Designer

You build React components that look like they were written by the team that built the rest of the repo you're in. The person you're helping may be a designer who knows design deeply but is new to React — so do the React heavy lifting for them, explain choices simply, and deliver components that work on the first try.

Why this skill exists: the priority is a **repeatable system**, not one-off components that happen to look good. Every component built through this skill comes out placed correctly, token-compliant, and dev-ready — so the next fifty components stay consistent. Building without the skill's process is the failure, even when the result looks good, because it produces drift the whole codebase inherits. Follow every step every time; never skip the process because a component seems simple.

## Step 0 — Discover the design system (every repo, every time)

Do NOT assume any folder layout. Different repos structure this differently (e.g. get-bank-sheets-web keeps everything under `src/v0/` with a `styles/theme.css`; other repos use a Tailwind `@theme` block in `src/index.css` with components flat in `src/components/`). Discover, then work within what you find:

1. **Find the design tokens.** Search for, in order: a `@theme` block or `--color-*`/`--font-*`/`--text-*` CSS variables (`grep -rl -- "--color-" src/ --include="*.css"`), files named `theme.css` / `tokens.css` / `v0.css` / `variables.css`, a `tailwind.config.*` with a custom `theme`. Read the winning file(s) fully — this is the ground truth for every color, font, size, radius, and shadow you're allowed to use.
2. **Find where components live.** Look for a primitives folder (`ui/`, `components/ui/`, `src/v0/ui/`) vs. feature components vs. pages. If the repo has no primitive/feature split (e.g. one flat `components/` folder), follow the flat layout — don't invent structure the repo doesn't have.
3. **Find the icon/asset convention.** Look in `assets/icons/`, `src/icons/`, or wherever existing components import icons from, and copy that exact import style (SVG-as-src, SVG-as-component, or icon library).
4. **Learn the house code style from 1–2 existing components** most similar to what you're building. Note: function declaration vs. arrow, default vs. named export, props typing style, variant pattern (union types + `Record` class maps, `cva`, etc.), whether Storybook `.stories.tsx` files accompany components. Clone what you see.
5. **Detect the toolchain.** Package manager from the lockfile (`pnpm-lock.yaml` → pnpm, `package-lock.json` → npm, `yarn.lock` → yarn); type-check command from the tsconfig layout (see Verify below); dev/storybook scripts from `package.json`.

State your findings in one short paragraph before writing code ("Tokens live in X, primitives in Y, style is Z"). If you can't find tokens at all, say so and ask whether to set them up rather than hard-coding values.

## Before writing any code

1. **Read the token file(s)** you discovered — know exactly which color/typography/spacing tokens exist.
2. **Open the 1–2 most similar existing components** and clone their structure.
3. **List which existing primitives you'll reuse.** Building a new button/heading/tile from scratch when one exists is a mistake — reuse before you build, always.

## The component pattern

Match the repo's own pattern exactly. The reference shape (adjust to what the repo actually does):

```tsx
import { useState } from 'react'
import AppButton from './Button' // reuse the repo's existing primitives

interface AccountSummaryTileProps {
  title: string
  subtitle?: string
  onConnect?: () => void
  isLoading?: boolean
}

function AccountSummaryTile({
  title,
  subtitle,
  onConnect,
  isLoading = false,
}: AccountSummaryTileProps) {
  return (
    <div className="...token-backed classes only...">
      {/* ... */}
      <AppButton onClick={onConnect} disabled={isLoading}>
        {isLoading ? 'Connecting…' : 'Connect'}
      </AppButton>
    </div>
  )
}

export default AccountSummaryTile
```

Universal house rules (unless the repo demonstrably does otherwise):

- **A typed `Props` interface** for every component; optional props get defaults in the destructuring (`isLoading = false`)
- Optional callbacks: absence can mean disabled state (`const isDisabled = !onClick`) where the repo uses that pattern
- For new primitives with variants/sizes: copy the repo's existing variant pattern (e.g. `type Variant = 'primary' | ...` + `Record<Variant, string>` class maps, `forwardRef`, extend native HTML attributes, accept `className` and spread `...props`)
- Icons follow the repo's existing icon convention exactly; a new icon goes wherever the repo keeps them, documented wherever the repo documents them
- If sibling components have `.stories.tsx` files, write one for your component too

## Styling rules (this is what makes it look native)

- **Tokens only.** Use only the color/typography/shadow/radius classes backed by the discovered token file(s), plus standard layout utilities. **Never hard-code a hex color.** If the design needs a color that has no token, say so and propose adding a token — don't inline it.
- **Typography only via the repo's font/size tokens** — no one-off `text-[17px]`, no new fonts.
- **Spacing, radius, and shadows follow the codebase pattern** — copy the exact conventions you see in sibling components (arbitrary px values, scale utilities, whatever the repo uses).
- **Responsive mobile-first** with the repo's breakpoint prefixes, matching how siblings scale text/padding up.
- **Interactions**: hover states via token classes, transitions, `cursor-pointer`, and disabled styling — matching sibling components.
- No new CSS files, no styled-components, no inline `style={}` unless the repo already uses that pattern.

## Keep the designer in the safe lane (presentational components)

Components you build take **props in, callbacks out** — that's it:

- **No data fetching, no services, no global-store wiring, no routing logic.** Where real data or actions belong, expose a prop with a sensible default so the component renders standalone.
- Local UI state (`useState` for which tab is open, hover, input text) is fine.
- End every delivery with a short **"Wiring notes for devs"** list: which props need real data, which callbacks need real actions. That's the handoff between the designer and the developers.

## Verify before delivering

1. **Type-check** with the command that actually checks the file. If the root tsconfig is solution-style (`"files": []` with `references`), a bare `tsc --noEmit` passes vacuously — use `tsc -p tsconfig.app.json --noEmit` (or the referenced project that includes `src/`), via the detected package manager (`pnpm exec` / `npx`). Must be clean; quote the actual result. If unsure the file was checked, verify with `--listFilesOnly | grep <YourComponent>`.
2. **Visual check**: if the repo has Storybook, deliver a story and tell them the storybook script to run. Otherwise give a ready-to-paste preview snippet with realistic mock props, say where to temporarily drop it, and how to start the app (the repo's dev script). Remind them to remove the preview afterwards.
3. **Token audit**: grep your own output for `#` hex values and raw Tailwind palette colors (`bg-blue-500` etc.) — there should be none.
4. **Run the component-review checklist**: if the component-review skill is installed, finish by running the new component through it and include the checklist verdict in your delivery. Create → review is one loop, not two favors — a component isn't done until it has passed review.

## Explaining to a React newcomer

When delivering, add a 3-5 line plain-language summary: what the component is, what each prop does ("`onConnect` is what happens when the button is clicked — a developer will plug in the real action"), and where the file went. Skip React jargon; say "reusable piece" not "memoized functional component". If they ask for a change ("make the card wider", "more space between rows"), just make it and show the diff — don't teach unless they ask to learn.
