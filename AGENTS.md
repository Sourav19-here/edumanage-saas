# AGENTS — EduManage SaaS

## Quick facts
- **What**: Coaching center management system with auth (dashboard, students, attendance, fees, reminders, receipts, settings)
- **Two versions**: Vanilla JS SPA (`index.html`) and Next.js 16 app (`edumanage-next/`) with Supabase auth
- **Supabase project**: `upfbgiymsydadnhahyrx` (URL in `edumanage-next/.env.local`; vanilla `app.js` hardcodes public anon key)

## Files
- **Vanilla JS (legacy)**: `index.html`, `styles.css`, `app.js` — SPA with localStorage persistence, Supabase auth
- **Next.js (current)**: `edumanage-next/` — App Router, no middleware, client-side auth guards in `useEffect`

## Commands
```bash
cd edumanage-next
npm run dev      # Dev server on :3000
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint (eslint-config-next)
```
No test framework configured.

## Architecture notes
- **Next.js App Router**: Protected routes check auth client-side in `useEffect`. No middleware — avoids SSR complexity. Entry: `src/app/page.tsx` redirects to `/auth/login`.
- **Next.js 16**: Breaking changes vs older versions. Read `node_modules/next/dist/docs/` before writing code.
- **Path alias**: `@/*` → `./src/*` (tsconfig.json). TypeScript strict mode on.
- **Supabase Auth**: Email/password signup, magic link for password reset. Session in localStorage. Client in `src/lib/supabase.ts`.
- **Vanilla JS SPA**: No framework. Views rendered as template strings into `#viewRoot`. Event delegation via `document` click listener. i18n English/Bengali via `data-i18n` attributes. Supabase CDN loaded in `index.html`.

## Data model (vanilla `state`)
```
state = {
  institute: { name, owner, phone, address, plan, locale },
  students: [{ id, name, klass, subjects[], batch, guardian, phone, fee, dueDay, status, joined }],
  attendance: [{ id, studentId, date, status }],
  payments: [{ id, studentId, amount, month, date, method, receiptNo }],
  reminders: [{ id, studentId, month, channel, status, createdAt, sentAt }]
}
```

## Gotchas
- **Vanilla demo reset**: `state = createDemoState()` wipes all data. Settings → "Reset demo".
- **Due day**: Clamped to 1–28 in `saveStudent()` (avoids month-end edge cases).
- **Receipt numbers**: Format `EDU-YYYYMMDD-NNNN`, sequential per day.
- **Paused students**: Excluded from active queries (`activeStudents()` filters `status !== "paused"`).
- **Vanilla = client-only**: No backend. Do not add `fetch`/HTTP calls without explicit instruction.
- **Next.js auth**: Client-side redirect in `useEffect`, no middleware. Session checked via `supabase.auth.getUser()`.
