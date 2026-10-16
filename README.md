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

The **Subscribe for Updates** form on the home page is the exception. As a placeholder until a newsletter service is chosen, `setupSubscribe` posts each signup to [FormSubmit](https://formsubmit.co) at `CONFIG.subscribeEndpoint`, which emails it to `CONFIG.email` with the subject "New subscriber: <name>". If the request fails, the visitor gets the "Send by email" fallback instead.

- **Activation:** the first signup triggers an "Activate Form" email from FormSubmit to `CONFIG.email`. Click it once; signups before that are held and delivered after activation.
- **Hiding the address:** after activating, FormSubmit offers a random alias. Put it in place of the email in `subscribeEndpoint` (`https://formsubmit.co/ajax/<alias>`).
- **Spam:** a hidden `_honey` field catches most bots; FormSubmit drops any submission that fills it.
- **Moving to a newsletter service:** point `subscribeEndpoint` at the service and adjust the request body in `setupSubscribe`.

## Preview locally

Any static server works, for example:

```bash
npx serve .
```
