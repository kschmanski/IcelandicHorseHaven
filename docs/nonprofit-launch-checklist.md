# Nonprofit launch checklist

What to do once the IRS 501(c)(3) determination letter arrives. Researched October 2026; programs and terms change, so confirm each one when you apply.

## While you wait

- [ ] Keep a record of every gift (donor, amount, date). If Form 1023 is filed within 27 months of incorporating, approval normally applies back to the incorporation date, so these gifts may become tax-deductible.
- [ ] Ask whoever is handling the filing whether your state requires charitable solicitation registration before asking the public for donations.
- [ ] Don't describe gifts as tax-deductible anywhere on the site yet. (As of October 2026, the site doesn't.)
- [ ] Keep the donate page's pledge form, or add a simple payment link labelled: "We've applied for 501(c)(3) status. Gifts aren't tax-deductible yet, but may become deductible once our status is approved."

## The day the letter arrives

1. [ ] **Verification service:** register with [TechSoup](https://www.techsoup.org). Google reportedly uses [Goodstack](https://goodstack.io) for new applicants. Many programs below use one of these to confirm your status, sometimes for a small admin fee.
2. [ ] **Google for Nonprofits:** sign up at [google.com/nonprofits](https://www.google.com/nonprofits/), then:
   - [ ] Turn on **Google Workspace** (free): real `info@` / `leah@` mailboxes on the domain, plus shared Drive and Calendar. Today `info@` only forwards through Porkbun.
   - [ ] Apply for **Google Ad Grants**: up to $10,000/month in free search ads, for example aimed at people searching to rehome or get help for an Icelandic horse.
3. [ ] **DreamHost free nonprofit hosting:** one free shared hosting plan with PHP, MySQL and email. Send DreamHost the IRS determination letter. This is the planned home for a future PHP/MySQL backend. Managed WordPress, virtual servers and dedicated servers aren't included.
4. [ ] **Donations:** move the donate page to [Zeffy](https://www.zeffy.com) (100% free, requires 501(c)(3)) or [Givebutter](https://givebutter.com/pricing) (0% platform fee with donor tips on; card fees apply unless donors cover them).
5. [ ] **Site wording:** once donations are actually deductible, say so on the donate page and in thank-you messages, and add the EIN.
6. [ ] **Canva for Nonprofits:** free Canva Pro for flyers, social posts and horse profile graphics.

## Optional, later

- **Microsoft 365 Business Basic:** free for nonprofits, up to 300 users. Only needed if you choose Microsoft instead of Google Workspace.
- **Cloudflare Project Galileo:** free security protection for at-risk public-interest organizations. Not needed at the current size.
- **AWS or Azure nonprofit credits:** a few thousand dollars a year. Not needed if hosting on DreamHost.

## Moving to DreamHost (when the backend is ready)

- The domain stays at Porkbun. Change the four GitHub `A` records to DreamHost's, and remove the `www` CNAME to `kschmanski.github.io` if DreamHost serves `www` too.
- Leave the `MX`, SPF, DKIM and DMARC records alone, unless email moves to Google Workspace. Google gives its own records for that.
- After the move, FormSubmit may ask for activation again. Click the "Activate Form" email at `info@`.
