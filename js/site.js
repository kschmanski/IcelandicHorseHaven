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
  phone: "",
  location: "United States",
  // Leave a URL empty to hide that icon.
  social: {
    facebook: "",
    instagram: "",
    youtube: ""
  },
  announcement: 'We’re just getting started. <a href="index.html#subscribe">Sign up for updates</a> to follow along.'
};

const NAV = [
  {
    label: "About",
    children: [
      { label: "Our Mission", href: "about.html" },
      { label: "Our Approach", href: "about.html#approach" },
      { label: "Leadership", href: "about.html#leadership" },
      { label: "Contact Us", href: "contact.html" }
    ]
  },
  {
    label: "Our Horses",
    children: [
      { label: "Meet Our Horses", href: "horses.html" },
      { label: "Adoption Process", href: "adopt.html" },
      { label: "Sponsor a Horse", href: "sponsor.html" }
    ]
  },
  { label: "Rehome a Horse", href: "rehoming.html" },
  {
    label: "How to Help",
    children: [
      { label: "Donate", href: "donate.html" },
      { label: "Sponsor a Horse", href: "sponsor.html" },
      { label: "Volunteer", href: "volunteer.html" },
      { label: "Events", href: "events.html" }
    ]
  },
  {
    label: "Learn",
    children: [
      { label: "The Icelandic Horse", href: "learn.html" },
      { label: "Planning for Your Horse", href: "learn.html#planning" }
    ]
  },
  { label: "Volunteer", href: "volunteer.html" },
  { label: "Events", href: "events.html" }
];

const ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6 1-.6z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15.2V8.8l5.2 3.2z"/></svg>'
};

const HILLS = '<svg class="hills" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true"><path class="back" d="M0,140 C180,80 320,60 520,110 C700,155 860,70 1040,60 C1200,52 1330,100 1440,120 L1440,220 L0,220 Z"/><path class="front" d="M0,180 C220,130 420,150 640,170 C860,190 1080,120 1280,140 C1360,148 1410,160 1440,165 L1440,220 L0,220 Z"/></svg>';

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
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
        <a class="brand" href="index.html">
          <img src="images/logo-emblem.png" alt="" width="52" height="52">
          <span class="brand-name">${CONFIG.name}<small>${CONFIG.tagline}</small></span>
        </a>
        <div class="header-actions">
          <a class="btn btn-outline" href="rehoming.html">Request Help for a Horse</a>
          <a class="btn" href="donate.html">Donate</a>
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
              <p>A safety net for Icelandic horses across the United States.</p>
              <p class="mt-1"><a href="mailto:${CONFIG.email}">${CONFIG.email}</a>${CONFIG.phone ? `<br>${CONFIG.phone}` : ""}</p>
              ${socials ? `<div class="socials">${socials}</div>` : ""}
            </div>
            <div>
              <h4>Our Horses</h4>
              <ul>
                <li><a href="horses.html">Meet Our Horses</a></li>
                <li><a href="adopt.html">Adoption Process</a></li>
                <li><a href="rehoming.html">Rehome a Horse</a></li>
              </ul>
            </div>
            <div>
              <h4>Get Involved</h4>
              <ul>
                <li><a href="donate.html">Donate</a></li>
                <li><a href="sponsor.html">Sponsor a Horse</a></li>
                <li><a href="volunteer.html">Volunteer</a></li>
                <li><a href="events.html">Events</a></li>
              </ul>
            </div>
            <div>
              <h4>About</h4>
              <ul>
                <li><a href="about.html">Our Mission</a></li>
                <li><a href="learn.html">The Icelandic Horse</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-legal">
            <span>&copy; ${year} ${CONFIG.name}</span>
            <span><a href="index.html#subscribe">Subscribe to updates</a></span>
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
 * No CRM is connected yet, so forms don't submit anywhere. Instead, a valid
 * submission shows a message with a button that opens the visitor's email app
 * with everything they entered. Swap handleSubmit for a real endpoint later.
 */

function mailtoLink(subject, body) {
  return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function formToText(form) {
  const lines = [];
  const seen = new Set();
  form.querySelectorAll("input, select, textarea").forEach(el => {
    if (!el.name || seen.has(el.name) || el.type === "submit") return;
    const values = [...form.querySelectorAll(`[name="${el.name}"]`)]
      .filter(f => !["checkbox", "radio"].includes(f.type) || f.checked)
      .map(f => f.value.trim())
      .filter(Boolean);
    seen.add(el.name);
    if (values.length) lines.push(`${el.dataset.label || el.name}: ${values.join(", ")}`);
  });
  return lines.join("\n");
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

function setupForms() {
  document.querySelectorAll("form[data-form]").forEach(form => {
    form.querySelectorAll("[name]").forEach(el => {
      if (!el.dataset.label) {
        const label = (el.id && form.querySelector(`label[for="${el.id}"]`)) || el.closest("fieldset")?.querySelector("legend");
        if (label) el.dataset.label = label.textContent.replace("*", "").trim();
      }
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const subject = `${form.dataset.form} — ${CONFIG.name}`;
      const href = mailtoLink(subject, formToText(form));
      showStatus(form, `
        <p><strong>Thank you!</strong> Our online forms aren’t connected yet, so nothing has been sent.
        Use the button below to send this through your email app, or write to us at
        <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>.</p>
        <a class="btn" href="${href}">Send by email</a>`);
    });
  });
}

/* ---------- Donation widget ---------- */

function setupDonate() {
  const widget = document.querySelector("[data-donate]");
  if (!widget) return;
  let amount = 100;
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

  widget.querySelector("[data-give]").addEventListener("click", () => {
    if (!amount) { custom.focus(); return; }
    const body = `I'd like to give ${summary.textContent} to ${CONFIG.name}. Please let me know how to complete my gift.`;
    showStatus(widget, `
      <p><strong>Thank you for your generosity!</strong> Secure online giving is coming soon.
      Until then, send us a note and we’ll follow up with ways to complete your gift.</p>
      <a class="btn" href="${mailtoLink(`Donation — ${CONFIG.name}`, body)}">Email us about my gift</a>`);
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
