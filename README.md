# codexHW - Team Task Dashboard

## What is this?
A minimal **Team Task Dashboard** built with Next.js, TypeScript, and Tailwind CSS. It offers a progress overview and simple Kanban board to help students practice modern frontend workflow.

## MVP Scope
- Overview page with three KPI cards
- Board page with three static columns
- Mock data only – no auth, no backend

## Tech
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- pnpm

## Quickstart
```bash
pnpm i
pnpm dev
```
Visit http://localhost:3000

## Project Structure
```
/app
  /(dashboard)/layout.tsx   # Shell: header + sidebar nav
  /(dashboard)/page.tsx     # Overview with KPIs
  /(dashboard)/board/page.tsx # Kanban board
  /globals.css
/components
  KpiCard.tsx
  TaskCard.tsx
  KanbanColumn.tsx
/lib
  data.ts                   # load mock tasks/members
  types.ts
/data
  seed.json                 # mock data
```

## Conventions
- **Branches:** `main` (prod), `develop` (staging), `feature/<handle>-<slug>`
- **Commits:** `feat:`, `fix:`, `chore:`, `refactor:`, `ui:`
- **PRs:** keep small, add screenshots or a Loom for UI changes

## Deployment (Vercel)
1. Import repo in Vercel
2. Framework: Next.js
3. Install command: `pnpm i`
4. Build command: `pnpm build`
5. Output: `.next`
6. No env vars required
7. Set production branch = `main` (optional staging project on `develop`)

## Roadmap
1. Static board + KPIs (this MVP)
2. Client state + move tasks (no backend)
3. Drag & drop (DnD Kit)
4. Supabase persistence
5. Filters, assignees, priorities, search

## License
[MIT](LICENSE)
