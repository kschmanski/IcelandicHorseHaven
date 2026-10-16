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

No CRM is connected yet. As a placeholder, every form (contact, adoption, rehoming, sponsorship, volunteer, newsletter signup and the donate widget) posts to [FormSubmit](https://formsubmit.co) at `CONFIG.formEndpoint`, which emails the submission to `CONFIG.email`. The subject is the form's `data-subject` (or its `data-form` name) followed by the sender's name, for example "Contact form: Jane Smith" or "New subscriber: Jane Smith", and replies go straight to the sender. If the request fails, the visitor is offered a "Send by email" button that opens their email app with everything they entered.

- **Activation:** FormSubmit already has the form activated for `icelandichorsehaven.org`. If the address or domain changes, the first submission triggers an "Activate Form" email to `CONFIG.email`; until it's clicked, submissions fail and visitors see the email fallback.
- **Address:** `formEndpoint` uses FormSubmit's random alias instead of the email address, so the address isn't in the page source.
- **Spam:** each form has a hidden `_honey` field. If it's filled in, the page shows a thank-you without sending anything. Fields whose names start with `_` are never included in the email.
- **Per-form text:** `data-subject`, `data-thanks` and `data-success` on a `<form>` override the email subject and the thank-you message (see the newsletter form in `index.html`).
- **Moving to a CRM or newsletter service:** point `formEndpoint` at it and adjust the request body in `sendForm` in `js/site.js`.

## Preview locally

Any static server works, for example:

```bash
npx serve .
```
