# AGENTS — EduManage SaaS

## Quick facts
- **What**: Single-page coaching center management MVP (dashboard, students, attendance, fees, reminders, receipts, settings)
- **Zero dependencies**: No build step, no npm, no bundler. Open `edumanage-saas/index.html` in a browser.
- **Persistence**: `localStorage` key `edumanage-saas-mvp-v1`. Data survives reloads but resets on demo reset or localStorage clear.

## Files (all in `edumanage-saas/`)
| File | Role |
|---|---|
| `index.html` | App shell, sidebar nav, `<viewRoot>` mount point |
| `styles.css` | Responsive SaaS UI, print styles for receipts |
| `app.js` | Everything else: data model, CRUD, i18n, rendering, localStorage |

## Architecture notes
- **Vanilla JS SPA**: No framework. Views rendered as template strings into `#viewRoot` via `render()` / per-view functions.
- **Event delegation**: A single `click` listener on `document` routes `[data-view]` and `[data-action]` buttons. Forms submit via separate `submit` listener.
- **Search optimization**: `#studentSearch` input triggers `renderStudentsListOnly()` (partial re-render) instead of full `render()`.
- **i18n**: English/Bengali toggle via `state.institute.locale`. Keys live in the `labels` object; DOM nodes use `data-i18n` attributes.
- **Receipt printing**: Uses `window.print()` — CSS has `@media print` styles scoped to `#receiptPreview`.

## Data model (in `state`)
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
- **Demo reset**: `state = createDemoState()` wipes everything and reloads seed data. Called from Settings → "Reset demo".
- **Due day clamp**: `dueDay` is clamped to 1–28 in `saveStudent()` (avoids month-end edge cases).
- **Receipt numbers**: Format `EDU-YYYYMMDD-NNNN`, sequential per day.
- **Paused students**: Excluded from all active queries (`activeStudents()` filters `status !== "paused"`).
- **No backend**: No API, no server. Everything is client-side. Do not add fetch/HTTP calls without explicit instruction.
