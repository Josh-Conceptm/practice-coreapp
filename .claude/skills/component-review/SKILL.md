---
name: component-review
description: |
  Review a UI component against the design system of whichever repo you're working in, using a strict pass/fail checklist. Use this skill whenever the user asks to "review this component", "check my component", "does this match the design system", "audit this tile/card/screen", names a component .tsx file to check, or has just finished building a component (including one made with the component-designer skill) and wants it verified before handing it to the developers. Also trigger on casual phrasings like "is this component okay?" or "check if I did this right". The skill first discovers the repo's design tokens, component folders, and house conventions, then grades against them — it never assumes a fixed folder layout. The user may be a designer new to React: report results as a clear pass/fail checklist with plain-language fixes, and apply small fixes directly when asked. This reviews UI COMPONENTS; for backend/PR code review use pr-review or pre-push-review.
---

# Component Review

You review UI components against the repo's own design-system rules. The person asking may be a designer new to React — the review must come back as a scannable checklist with plain-language explanations, not a wall of jargon.

Why this exists: the priority is a **repeatable system**, not one-off components that happen to look good. A component that looks right but breaks the system's rules (hex colors, duplicated primitives, store wiring) creates drift that every future component inherits. Doing the work without the checklist is the failure, even when the result looks good. Every component — new or old, built by hand or with component-designer — goes through the same list, every time.

## Step 0 — Discover the design system (every repo, every time)

Do NOT assume any folder layout (get-bank-sheets-web uses `src/v0/` + `styles/theme.css`; other repos use a Tailwind `@theme` block in `src/index.css` with flat `src/components/`). Establish the ground truth first:

1. **Token file(s)**: search for `@theme` blocks / `--color-*` CSS variables (`grep -rl -- "--color-" src/ --include="*.css"`), `theme.css` / `tokens.css` / `v0.css`, or a customized `tailwind.config.*`. Read them — every color/font/size class the component uses must trace back here.
2. **Component layout**: where primitives, feature components, and pages live; whether the repo splits them at all; whether siblings have `.stories.tsx` files.
3. **House conventions**: read 1–2 sibling components and note export style, props typing, variant pattern, icon imports, responsive prefixes.
4. **Toolchain**: package manager from the lockfile; the type-check command from the tsconfig layout (see item 20).

## Inputs

The user names a component (file path, or component name you find via Glob). Read the full file, plus:

- The discovered token file(s) — the ground truth for token compliance
- A listing of the repo's primitives folder — to check for primitive duplication
- 1–2 sibling components — to compare conventions

## The Checklist

Grade every item PASS / FAIL / N/A with one line of evidence. Run the mechanical checks with real commands — never eyeball what a grep can prove. No claim without evidence: quote the command output for every mechanical item.

### A. Placement & reuse

1. File is in the right folder per this repo's layout (primitive vs. feature vs. page — or the flat layout, if that's what the repo uses)
2. Doesn't rebuild an existing primitive — compare against the repo's primitives (a new button/heading/tile that duplicates an existing one is a FAIL; it should import it)
3. Icons follow the repo's icon convention (location, import style); any new icon is added and documented the way the repo documents them

### B. House code style

4. Component declaration and export style match the siblings (e.g. `function Name(...)` + `export default` — whatever this repo does consistently)
5. Typed `Props` interface; optional props get defaults in the destructuring
6. Optional-callback = disabled pattern where the repo uses it (`const isDisabled = !onClick`)
7. Variant/size primitives follow the repo's established variant pattern (union types + `Record<Variant, string>` class maps, `forwardRef`, extends native HTML attributes, forwards `className`/`...props` — or the repo's equivalent)

### C. Token compliance (mechanical — run these)

8. No hex colors, no raw Tailwind palette:
   ```bash
   grep -nE "#[0-9a-fA-F]{3,6}|(bg|text|border)-(red|blue|green|gray|slate|zinc|orange|amber|stone|neutral)-[0-9]" <file>
   ```
   Zero hits = PASS. (Legacy files may have some — new/reviewed components get held to the rule.)
9. Every `bg-*` / `text-*` / `border-*` / `font-*` / `shadow-*` class traces to a token in the discovered token file(s) (grep the token file for the variable/class) or is a standard layout utility / arbitrary spacing value
10. Typography via the repo's font/size token classes — no one-off `text-[17px]`, no new fonts
11. Spacing/radius/shadow follow the codebase pattern seen in siblings (arbitrary px vs. scale utilities, pill vs. card radii — whichever this repo uses)

### D. Responsive & states

12. Mobile-first with the repo's breakpoint prefixes on text sizes and padding (compare with siblings)
13. Interactive elements have hover states via token classes, transitions, `cursor-pointer`, and `disabled:opacity-50 disabled:cursor-not-allowed` (or the repo's disabled pattern) where disabling is possible
14. All the component's real-world states exist and are reachable via props: loading, empty, error/expired — whichever apply. A card that only renders the happy path is incomplete

### E. Presentational purity

15. No global-store imports, no service/API imports, no routing hooks, no `fetch` — props in, callbacks out (`useState` for local UI state is fine). Existing legacy components may violate this; for NEW components it's a FAIL, for legacy ones report it as "wiring debt" without blocking
16. Every data prop has a sensible default so the component renders standalone with mock props

### F. Accessibility basics

17. Every `<img>` has meaningful `alt`; decorative icons get `alt=""` (or `aria-hidden` for inline SVGs)
18. Clickable things are `<button>` (or `<label>` for inputs) — not `onClick` on a bare `<div>`
19. Form inputs have an associated label; focus styles present (match the repo's focus convention, e.g. `focus:ring-2` or `focus-visible:*`)

### G. Verification

20. Type-check with the command that actually includes the file — quote the actual exit/output. If the root tsconfig is solution-style (`"files": []` with `references`), a bare `tsc --noEmit` passes vacuously; use `tsc -p tsconfig.app.json --noEmit` (or the referenced project covering `src/`) via the detected package manager, and if in doubt prove inclusion via `--listFilesOnly | grep <Component>`. Pre-existing errors elsewhere aren't the component's FAIL — establish a baseline without the component if needed. If the environment blocks the run, say exactly what you ran and what happened; never report "should pass"
21. A way to see it exists: a `.stories.tsx` story if the repo uses Storybook, otherwise a paste-ready preview snippet with mock props (write one if the component lacks it)

## Report format

```
# Component Review — {ComponentName}

**Verdict:** {APPROVE / FIX FIRST}
**File:** `{path}`
**Score:** {N passed / M applicable} ({K} N/A)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Right folder | PASS | in components/, composes Button |
| 8 | No hex / raw palette | FAIL | line 23: `bg-orange-500` |
...all 21 rows...

## Fixes needed
{For each FAIL: plain-language what + exact replacement, e.g. "Line 23: `bg-orange-500` → `bg-background-brand` (this repo's brand orange token)." Order: system violations first, cosmetics last.}

## Notes for devs (if any)
{Wiring debt, missing states worth a follow-up, reuse opportunities.}
```

Verdict rule: any FAIL in sections A, C, or E (placement, tokens, purity — the system-level rules) → FIX FIRST. Fails only in D/F (states, a11y polish) → judgment call, but say which items block and which don't.

If the user says "fix it", apply the fixes directly (smallest possible edits, re-run the mechanical checks and tsc after) and show the before/after per fix. If a fix requires rebuilding the component, use the component-designer skill's pattern rather than improvising.
