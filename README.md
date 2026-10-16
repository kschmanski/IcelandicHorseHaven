# Icelandic Horse Haven

Static site for [icelandichorsehaven.org](https://icelandichorsehaven.org), served by GitHub Pages. Plain HTML, CSS, and JavaScript with no build step.

## Editing

| What | Where |
| --- | --- |
| Contact email, social links, announcement bar | `CONFIG` at the top of `js/site.js` |
| Navigation menu | `NAV` in `js/site.js` |
| Header and footer | `renderHeader` / `renderFooter` in `js/site.js` (shared by every page) |
| Horse profiles | `HORSES` in `js/data.js` (the entries marked `sample: true` are placeholders) |
| Events | `EVENTS` in `js/data.js` (past events hide automatically) |
| Colors and fonts | Tokens at the top of `css/styles.css` |
| Logo files | `images/` |

## Forms

No CRM is connected yet. When someone submits a form, the site validates it, then offers a "Send by email" button that opens their email app with everything they entered, addressed to `CONFIG.email`. To connect a CRM later, replace the submit handler in `setupForms` (and the donate button in `setupDonate`) in `js/site.js`.

## Preview locally

Any static server works, for example:

```bash
npx serve .
```
