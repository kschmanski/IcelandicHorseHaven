/* Icelandic Horse Haven — shared header, footer, navigation and form handling.
 *
 * The header and footer are rendered here so every page stays in sync.
 * Update CONFIG and NAV below; the pages pick up the changes automatically.
 */

const CONFIG = {
  name: "Icelandic Horse Haven",
  tagline: "Horse Sanctuary",
  // TODO: confirm the public contact address before launch.
  email: "info@icelandichorsehaven.org",
  // Where every form sends submissions. FormSubmit emails each one to CONFIG.email;
  // the random alias stands in for the address so it isn't in the page source.
  // Replace with a CRM or newsletter service's endpoint once one is chosen.
  formEndpoint: "https://formsubmit.co/ajax/76ba71c27e8972196b11ecc1a732a516",
  phone: "",
  location: "United States",
  // Leave a URL empty to hide that icon.
  social: {
    facebook: "",
    instagram: "",
    youtube: ""
  },
  announcement: 'We’re just getting started. <a href="./#subscribe">Sign up for updates</a> to follow along.'
};

const NAV = [
  {
    label: "About",
    children: [
      { label: "Our Mission", href: "about" },
      { label: "Our Approach", href: "about#approach" },
      { label: "Leadership", href: "about#leadership" },
      { label: "Contact Us", href: "contact" }
    ]
  },
  {
    label: "Our Horses",
    children: [
      { label: "Meet Our Horses", href: "horses" },
      { label: "Adoption Process", href: "adopt" },
      { label: "Sponsor a Horse", href: "sponsor" }
    ]
  },
  { label: "Request Support", href: "request-support" },
  { label: "When Is a Horse in Need?", href: "horse-in-need" },
  {
    label: "How to Help",
    children: [
      { label: "Donate", href: "donate" },
      { label: "Sponsor a Horse", href: "sponsor" },
      { label: "Volunteer", href: "volunteer" },
      { label: "Events", href: "events" }
    ]
  },
  {
    label: "Learn",
    children: [
      { label: "The Icelandic Horse", href: "learn" },
      { label: "Planning for Your Horse", href: "learn#planning" }
    ]
  },
  { label: "Volunteer", href: "volunteer" },
  { label: "Events", href: "events" }
];

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6 1-.6z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15.2V8.8l5.2 3.2z"/></svg>'
};

const HILLS = '<svg class="hills" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true"><path class="back" d="M0,140 C180,80 320,60 520,110 C700,155 860,70 1040,60 C1200,52 1330,100 1440,120 L1440,220 L0,220 Z"/><path class="front" d="M0,180 C220,130 420,150 640,170 C860,190 1080,120 1280,140 C1360,148 1410,160 1440,165 L1440,220 L0,220 Z"/></svg>';

// Links use short URLs ("contact", not "contact.html"), but older .html
// addresses still load, so compare without the extension either way.
function currentPage() {
  const file = location.pathname.split("/").pop().replace(/\.html$/, "");
  return file === "" || file === "index" ? "./" : file;
}

function isCurrent(href) {
  return !href.includes("#") && href === currentPage();
}

function navLink(item) {
  const current = isCurrent(item.href) ? ' aria-current="page"' : "";
  return `<a href="${item.href}"${current}>${item.label}</a>`;
}

function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;

  const items = NAV.map((item, i) => {
    if (!item.children) return `<li>${navLink(item)}</li>`;
    const subs = item.children.map(child => `<li>${navLink(child)}</li>`).join("");
    return `<li class="has-sub">
      <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="submenu-${i}">${item.label}</button>
      <ul class="submenu" id="submenu-${i}">${subs}</ul>
    </li>`;
  }).join("");

  slot.outerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    ${CONFIG.announcement ? `<div class="announce">${CONFIG.announcement}</div>` : ""}
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="./">
          <img src="images/logo-emblem.png" alt="" width="52" height="52">
          <span class="brand-name">${CONFIG.name}<small>${CONFIG.tagline}</small></span>
        </a>
        <div class="header-actions">
          <a class="btn btn-outline" href="request-support">Request Help for a Horse</a>
          <a class="btn" href="donate">Donate</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menu">${ICONS.menu}</button>
        </div>
      </div>
      <nav class="main-nav" id="main-nav" aria-label="Main">
        <div class="container"><ul>${items}</ul></div>
      </nav>
    </header>`;
}

function socialLinks() {
  return Object.entries(CONFIG.social)
    .filter(([, url]) => url)
    .map(([name, url]) => `<a href="${url}" aria-label="${name}" rel="noopener" target="_blank">${ICONS[name]}</a>`)
    .join("");
}

function renderFooter() {
  const slot = document.getElementById("site-footer");
  if (!slot) return;
  const socials = socialLinks();
  const year = new Date().getFullYear();

  slot.outerHTML = `
    <footer class="site-footer">
      ${HILLS}
      <div class="footer-body">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="footer-brand">
                <img src="images/logo-emblem.png" alt="" width="64" height="64" loading="lazy">
                <h4>${CONFIG.name}</h4>
              </div>
              <p>A lifelong safe haven for Icelandic horses in need.</p>
              <p class="mt-1"><a href="mailto:${CONFIG.email}">${CONFIG.email}</a>${CONFIG.phone ? `<br>${CONFIG.phone}` : ""}</p>
              ${socials ? `<div class="socials">${socials}</div>` : ""}
            </div>
            <div>
              <h4>Our Horses</h4>
              <ul>
                <li><a href="horses">Meet Our Horses</a></li>
                <li><a href="adopt">Adoption Process</a></li>
                <li><a href="request-support">Request Support</a></li>
                <li><a href="horse-in-need">When Is a Horse in Need?</a></li>
              </ul>
            </div>
            <div>
              <h4>Get Involved</h4>
              <ul>
                <li><a href="donate">Donate</a></li>
                <li><a href="sponsor">Sponsor a Horse</a></li>
                <li><a href="volunteer">Volunteer</a></li>
                <li><a href="events">Events</a></li>
              </ul>
            </div>
            <div>
              <h4>About</h4>
              <ul>
                <li><a href="about">Our Mission</a></li>
                <li><a href="learn">The Icelandic Horse</a></li>
                <li><a href="contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-legal">
            <span>&copy; ${year} ${CONFIG.name}</span>
            <span><a href="./#subscribe">Subscribe to updates</a></span>
          </div>
        </div>
      </div>
    </footer>`;
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll(".sub-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const li = button.parentElement;
      const open = !li.classList.contains("open");
      nav.querySelectorAll(".has-sub.open").forEach(other => {
        other.classList.remove("open");
        other.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
      });
      li.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", event => {
    if (!nav.contains(event.target)) {
      nav.querySelectorAll(".has-sub.open").forEach(li => {
        li.classList.remove("open");
        li.querySelector(".sub-toggle").setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      nav.querySelectorAll(".has-sub.open").forEach(li => li.classList.remove("open"));
    }
  });
}

/* ---------- Forms ----------
 * No CRM is connected yet. As a placeholder, every form posts to
 * CONFIG.formEndpoint (FormSubmit), which emails the submission to CONFIG.email.
 * If the request fails, the visitor is offered a "Send by email" button that
 * opens their email app with everything they entered, so nothing is lost.
 */

function mailtoLink(subject, body) {
  return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Fields whose names start with "_" (like the _honey spam trap) are left out.
function formFields(form) {
  const fields = {};
  const seen = new Set();
  form.querySelectorAll("input, select, textarea").forEach(el => {
    if (!el.name || el.name.startsWith("_") || seen.has(el.name) || el.type === "submit") return;
    const values = [...form.querySelectorAll(`[name="${el.name}"]`)]
      .filter(f => !["checkbox", "radio"].includes(f.type) || f.checked)
      .map(f => f.value.trim())
      .filter(Boolean);
    seen.add(el.name);
    if (values.length) fields[el.dataset.label || el.name] = values.join(", ");
  });
  return fields;
}

function formToText(form) {
  return Object.entries(formFields(form)).map(([label, value]) => `${label}: ${value}`).join("\n");
}

function showStatus(form, html) {
  let status = form.querySelector(".form-status");
  if (!status) {
    status = document.createElement("div");
    status.className = "form-status";
    status.setAttribute("role", "status");
    form.appendChild(status);
  }
  status.innerHTML = html;
  status.classList.add("show");
  status.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function labelFields(form) {
  form.querySelectorAll("[name]").forEach(el => {
    if (!el.dataset.label) {
      const label = (el.id && form.querySelector(`label[for="${el.id}"]`)) || el.closest("fieldset")?.querySelector("legend");
      if (label) el.dataset.label = label.textContent.replace("*", "").trim();
    }
  });
}

function senderName(form) {
  const value = name => form.elements[name]?.value.trim() || "";
  return value("name") || [value("first"), value("last")].filter(Boolean).join(" ") || value("email");
}

// Sends a submission to CONFIG.formEndpoint, then shows `success` or, if the
// request fails, a "Send by email" fallback built from `fallbackSubject` and
// `fallbackBody`.
async function sendForm(form, { subject, fields, success, fallbackSubject, fallbackBody }) {
  const button = form.querySelector('button[type="submit"]');
  const buttonText = button.textContent;

  // Bots tend to fill every field, including the hidden one.
  if (form.elements._honey?.value) {
    showStatus(form, "<p><strong>Thank you!</strong> We’ve received your message.</p>");
    return;
  }

  button.disabled = true;
  button.textContent = "Sending…";

  try {
    if (!CONFIG.formEndpoint) throw new Error("No form endpoint configured");
    const response = await fetch(CONFIG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _replyto: form.elements.email?.value.trim() || "",
        _template: "table",
        _captcha: "false",
        ...fields
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || String(result.success) === "false") {
      throw new Error(result.message || `Request failed (${response.status})`);
    }

    form.reset();
    showStatus(form, success);
  } catch (error) {
    console.warn(`${form.dataset.form || "Form"} failed:`, error);
    showStatus(form, `
      <p><strong>Sorry, that didn’t go through.</strong> You can send it by email instead,
      or write to us at <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.</p>
      <a class="btn" href="${mailtoLink(fallbackSubject, fallbackBody)}">Send by email</a>`);
  } finally {
    button.disabled = false;
    button.textContent = buttonText;
  }
}

// Extra rules the browser can't express on its own:
// - fieldset[data-require-one]: at least one checkbox in the group must be checked.
// - [data-required-unless="role=Owner"]: required unless that radio choice is picked.
function setupValidation(form) {
  const rules = [];

  form.querySelectorAll("fieldset[data-require-one]").forEach(group => {
    const boxes = [...group.querySelectorAll('input[type="checkbox"]')];
    rules.push(() => boxes[0].setCustomValidity(boxes.some(b => b.checked) ? "" : "Please choose at least one option."));
  });

  form.querySelectorAll("[data-required-unless]").forEach(el => {
    const [name, value] = el.dataset.requiredUnless.split("=");
    rules.push(() => { el.required = form.elements[name]?.value !== value; });
  });

  if (!rules.length) return;
  const check = () => rules.forEach(rule => rule());
  form.addEventListener("change", check);
  form.addEventListener("reset", () => setTimeout(check));
  check();
}

function setupForms() {
  document.querySelectorAll("form[data-form]").forEach(form => {
    labelFields(form);
    setupValidation(form);

    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const thanks = form.dataset.thanks || "Thank you!";
      const message = form.dataset.success || "We’ve received your message and will be in touch soon.";
      sendForm(form, {
        subject: `${form.dataset.subject || form.dataset.form}: ${senderName(form)}`,
        fields: formFields(form),
        success: `<p><strong>${thanks}</strong> ${message}</p>`,
        fallbackSubject: `${form.dataset.form} — ${CONFIG.name}`,
        fallbackBody: formToText(form)
      });
    });
  });
}

/* ---------- Donation widget ---------- */

function setupDonate() {
  const widget = document.querySelector("[data-donate]");
  if (!widget) return;
  labelFields(widget);
  // The button marked aria-pressed="true" in the page is the default gift.
  const defaultChoice = widget.querySelector('.choice[aria-pressed="true"]');
  let amount = Number(defaultChoice.dataset.amount);
  let frequency = "one-time";
  const custom = widget.querySelector("#custom-amount");
  const summary = widget.querySelector("[data-summary]");

  function update() {
    summary.textContent = amount ? `$${amount.toLocaleString()} ${frequency === "monthly" ? "per month" : "one-time gift"}` : "Choose an amount";
  }

  function press(group, button) {
    widget.querySelectorAll(group).forEach(b => b.setAttribute("aria-pressed", String(b === button)));
  }

  widget.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
      amount = Number(button.dataset.amount);
      custom.value = "";
      press(".choice", button);
      update();
    });
  });

  widget.querySelectorAll(".segmented button").forEach(button => {
    button.addEventListener("click", () => {
      frequency = button.dataset.frequency;
      press(".segmented button", button);
      update();
    });
  });

  custom.addEventListener("input", () => {
    amount = Math.max(0, Math.round(Number(custom.value) || 0));
    press(".choice", null);
    update();
  });

  // After a successful pledge, go back to the default gift.
  widget.addEventListener("reset", () => {
    amount = Number(defaultChoice.dataset.amount);
    frequency = "one-time";
    press(".choice", defaultChoice);
    press(".segmented button", widget.querySelector('[data-frequency="one-time"]'));
    update();
  });

  widget.addEventListener("submit", event => {
    event.preventDefault();
    if (!amount) { custom.focus(); return; }
    if (!widget.reportValidity()) return;
    const gift = summary.textContent;
    sendForm(widget, {
      subject: `Donation pledge (${gift}): ${senderName(widget)}`,
      fields: { Gift: gift, ...formFields(widget) },
      success: `<p><strong>Thank you for your generosity!</strong> Secure online giving is coming soon.
        We’ve received your pledge and will email you with ways to complete your gift.</p>`,
      fallbackSubject: `Donation — ${CONFIG.name}`,
      fallbackBody: `I'd like to give ${gift} to ${CONFIG.name}. Please let me know how to complete my gift.\n\n${formToText(widget)}`
    });
  });

  update();
}

function fillContactDetails() {
  document.querySelectorAll("[data-email]").forEach(link => {
    link.href = `mailto:${CONFIG.email}`;
    link.textContent = CONFIG.email;
  });
}

renderHeader();
renderFooter();
fillContactDetails();
setupNav();
setupForms();
setupDonate();
