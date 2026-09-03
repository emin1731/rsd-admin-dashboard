# RSD Admin Dashboard

Azerbaijani-language government administrative panel ("RSD admin | Hesabatlar"). Currently a static UI mockup — no backend, no auth, no data fetching. All records rendered on the reports screen are hardcoded arrays in [components/dashboard-shell.tsx](components/dashboard-shell.tsx).

## Stack

- **Framework**: Next.js 16.3.3 (App Router) with React 19
- **Language**: TypeScript 5.7.3 (`strict: true`, but `next.config.mjs` sets `typescript.ignoreBuildErrors: true`)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`) + `tw-animate-css`
- **UI primitives**: shadcn/ui (`base-nova` style) on top of `@base-ui/react` — see [components.json](components.json)
- **Icons**: `lucide-react`
- **Utilities**: `clsx` + `tailwind-merge` exposed as `cn()` in [lib/utils.ts](lib/utils.ts)
- **Analytics**: `@vercel/analytics` (mounted only in production in [app/layout.tsx](app/layout.tsx))
- **Package manager**: pnpm (see [pnpm-workspace.yaml](pnpm-workspace.yaml), [pnpm-lock.yaml](pnpm-lock.yaml))

## Scripts

```
pnpm dev     # next dev
pnpm build   # next build
pnpm start   # next start
```

No lint, test, or typecheck scripts are wired up.

## Structure

- [app/layout.tsx](app/layout.tsx) — Root layout. Sets metadata (title/description in Azerbaijani), icons (light/dark PNG + SVG), and light/dark viewport theme colors. Mounts Vercel Analytics only in production.
- [app/page.tsx](app/page.tsx) — Renders `<DashboardShell />` and nothing else.
- [app/globals.css](app/globals.css) — Tailwind v4 imports, shadcn theme tokens, and a broad set of OKLCH CSS variables for light/dark/system (`.dark`, `prefers-color-scheme: dark`). Sets `html { background: #f7f8fa }`.
- [components/dashboard-shell.tsx](components/dashboard-shell.tsx) — **The entire visible app.** A single `'use client'` component containing:
  - Header (brand: "RSD" + red "admin" pill using brand color `#d7194b`, user chip)
  - Collapsible left sidebar (`menuOpen` state) with nav items and an expandable "Hesabatlar" (Reports) group (`reportsOpen` state)
  - Main pane rendering the "Qurumlar üzrə hesabat" (Institution report) table with hardcoded `records`, `filters`, `reportLinks`, and inline `Filter` / `NavItem` helpers
  - Tiny, dense typography (base text size `text-[11px]`)
- [components/ui/button.tsx](components/ui/button.tsx) — Shadcn-style `Button` built on `@base-ui/react/button` with `cva` variants (default/outline/secondary/ghost/destructive/link) and sizes (default/xs/sm/lg/icon/icon-*). **Currently unused by `DashboardShell`** — the dashboard uses raw `<button>` elements with Tailwind classes.
- [lib/utils.ts](lib/utils.ts) — `cn()` (`twMerge(clsx(...))`).
- [public/](public/) — Placeholder assets and favicon variants (`icon-light-32x32.png`, `icon-dark-32x32.png`, `icon.svg`, `apple-icon.png`, plus `placeholder-*` images).

## Path aliases

- `@/*` → project root (see [tsconfig.json](tsconfig.json))
- shadcn aliases in [components.json](components.json): `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks` (no `hooks/` dir exists yet)

## Conventions observed in this codebase

- Component authoring style is unusually **dense**: multi-attribute JSX on one line, inline sub-components at the bottom of the file (see `Filter` and `NavItem` in [dashboard-shell.tsx](components/dashboard-shell.tsx)).
- Colors are hardcoded hex values (`#f7f8fa`, `#d7194b`, `#dfe2e6`, etc.) inside Tailwind arbitrary values, **not** driven from the CSS variables defined in [globals.css](app/globals.css). The theme tokens exist but are not yet used by the dashboard.
- All user-facing copy is Azerbaijani. Preserve language and diacritics when editing labels.
- Icons are named imports from `lucide-react`.
- `next.config.mjs` disables TS build errors and image optimization — treat these as intentional but flag any regressions in a task's scope.

## Notes for future tasks

- There is no data layer. Anything dynamic (filters, sorting, pagination, Excel export button) is currently non-functional visual scaffolding.
- Dark mode CSS variables are defined but there is no theme switcher; the shell hardcodes light colors.
- The `Button` component in [components/ui/button.tsx](components/ui/button.tsx) is available if new work needs consistent buttons — prefer it over ad-hoc `<button className="...">` for anything new.
