/* Icelandic Horse Haven — horse profiles and events.
 *
 * Until a CRM is chosen, horses and events live here. Edit these lists and
 * every page that shows them (home, Meet Our Horses, Sponsor, Events) updates.
 *
 * Horse status values:
 *   "available"  — looking for an adoptive home
 *   "pending"    — adoption in progress
 *   "resident"   — staying with us long-term; can be sponsored
 *   "adopted"    — found a home (shown under "Happy Tails")
 *
 * Entries marked `sample: true` are placeholders that show how a profile
 * looks. Replace or delete them before launch. Put photos in images/horses/
 * and set `photo: "images/horses/name.jpg"`.
 */

const HORSES = [
  {
    name: "Stjarna",
    status: "available",
    sex: "Mare",
    age: 14,
    color: "Chestnut with a star",
    height: "13.2 hh",
    gaits: "Four-gaited",
    summary: "A kind, steady mare who loves grooming time. Best suited to a confident rider or a companion home.",
    sample: true
  },
  {
    name: "Hrafn",
    status: "available",
    sex: "Gelding",
    age: 9,
    color: "Black",
    height: "14 hh",
    gaits: "Five-gaited",
    summary: "Forward and willing with a big tölt. Looking for an experienced Icelandic rider to continue his training.",
    sample: true
  },
  {
    name: "Sóley",
    status: "pending",
    sex: "Mare",
    age: 21,
    color: "Palomino",
    height: "13.1 hh",
    gaits: "Four-gaited",
    summary: "A gentle senior who would thrive as a companion and light trail horse.",
    sample: true
  },
  {
    name: "Vindur",
    status: "resident",
    sex: "Gelding",
    age: 27,
    color: "Silver dapple",
    height: "13.3 hh",
    gaits: "Four-gaited",
    summary: "Our wise elder. Vindur manages sweet itch and needs special care, so he will stay with us for life.",
    sample: true
  },
  {
    name: "Perla",
    status: "resident",
    sex: "Mare",
    age: 18,
    color: "Grey",
    height: "13 hh",
    gaits: "Four-gaited",
    summary: "A herd favorite who keeps everyone in line. Sponsors help cover her ongoing hoof care.",
    sample: true
  },
  {
    name: "Fengur",
    status: "adopted",
    sex: "Gelding",
    age: 12,
    color: "Bay",
    height: "13.3 hh",
    gaits: "Five-gaited",
    summary: "Now enjoying trail rides with his new family.",
    sample: true
  }
];

/* Events: date is YYYY-MM-DD. Past events are hidden automatically.
 * Example:
 *   { date: "2027-05-15", title: "Spring Open Barn", time: "10am – 2pm",
 *     location: "Location TBA", description: "Meet the herd and our volunteers." }
 */
const EVENTS = [];

const STATUS_LABELS = {
  available: "Available for adoption",
  pending: "Adoption pending",
  resident: "Sanctuary resident",
  adopted: "Adopted"
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function horseCard(horse) {
  const name = escapeHtml(horse.name);
  const photo = horse.photo
    ? `<img src="${escapeHtml(horse.photo)}" alt="${name}" loading="lazy">`
    : `<span class="initial" aria-hidden="true">${name.charAt(0)}</span>`;
  const meta = [horse.sex, horse.age && `${horse.age} yrs`, horse.color, horse.height, horse.gaits]
    .filter(Boolean).map(escapeHtml).join(" · ");
  const action = {
    available: `<a class="btn" href="adopt.html?horse=${encodeURIComponent(horse.name)}#apply">Apply to adopt</a>`,
    pending: `<a class="btn btn-outline" href="horses.html">See other horses</a>`,
    resident: `<a class="btn" href="sponsor.html?horse=${encodeURIComponent(horse.name)}#sponsor-form">Sponsor ${name}</a>`,
    adopted: ""
  }[horse.status];

  return `
    <article class="card horse-card" data-status="${horse.status}">
      <div class="horse-photo">
        ${photo}
        <span class="tag">${STATUS_LABELS[horse.status]}</span>
        ${horse.sample ? '<span class="tag sample">Sample profile</span>' : ""}
      </div>
      <div class="body">
        <h3>${name}</h3>
        <div class="horse-meta">${meta}</div>
        <p>${escapeHtml(horse.summary)}</p>
        ${action}
      </div>
    </article>`;
}

function renderHorses(container, horses, emptyText) {
  container.innerHTML = horses.length
    ? horses.map(horseCard).join("")
    : `<div class="empty-state">${emptyText}</div>`;
}

function setupHorseLists() {
  document.querySelectorAll("[data-horses]").forEach(container => {
    const statuses = container.dataset.horses.split(",");
    const limit = Number(container.dataset.limit) || Infinity;
    const horses = HORSES.filter(h => statuses.includes(h.status)).slice(0, limit);
    renderHorses(container, horses, container.dataset.empty || "No horses to show right now. Check back soon!");
  });

  const filterBar = document.querySelector("[data-horse-filter]");
  if (!filterBar) return;
  const grid = document.getElementById(filterBar.dataset.horseFilter);
  const buttons = filterBar.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
      const statuses = button.dataset.status.split(",");
      renderHorses(grid, HORSES.filter(h => statuses.includes(h.status)), "No horses in this group right now. Check back soon!");
    });
  });
}

function upcomingEvents() {
  const today = new Date().toISOString().slice(0, 10);
  return EVENTS.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

function eventItem(event) {
  const date = new Date(`${event.date}T12:00:00`);
  const month = date.toLocaleString("en-US", { month: "short" });
  const details = [event.time, event.location].filter(Boolean).map(escapeHtml).join(" · ");
  return `
    <li class="event">
      <div class="event-date"><span class="m">${month}</span><span class="d">${date.getDate()}</span></div>
      <div>
        <h3>${escapeHtml(event.title)}</h3>
        ${details ? `<p>${details}</p>` : ""}
        ${event.description ? `<p>${escapeHtml(event.description)}</p>` : ""}
      </div>
    </li>`;
}

function setupEvents() {
  document.querySelectorAll("[data-events]").forEach(container => {
    const limit = Number(container.dataset.limit) || Infinity;
    const events = upcomingEvents().slice(0, limit);
    container.innerHTML = events.length
      ? `<ul class="event-list">${events.map(eventItem).join("")}</ul>`
      : `<p class="muted">${container.dataset.empty || "No events are scheduled yet."}</p>`;
  });
}

function prefillFromQuery() {
  const horse = new URLSearchParams(location.search).get("horse");
  if (!horse) return;
  document.querySelectorAll("[data-prefill-horse]").forEach(field => { field.value = horse; });
}

setupHorseLists();
setupEvents();
prefillFromQuery();
