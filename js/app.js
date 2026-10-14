/**
 * ============================================================================
 * FILE: js/app.js
 * PURPOSE: Handles tab navigation, rendering data from `data.js`, lightbox
 * previews, and fetching the live registration count from Google Sheets CSV.
 * ============================================================================
 */

import {
  CONFERENCE_CONFIG,
  GALLERY_STORE_PHOTOS,
  AGENDA_DATA,
  SPEAKERS_DATA,
  ORGANIZERS_DATA
} from "./data.js";

// --- UI State ---
let selectedAgendaDay = 0;
let selectedGalleryCategory = "All";
let skyBrightness = "balanced"; // 'vivid' | 'balanced' | 'deep'

/**
 * Switches between Home, Agenda, Speakers, Organizer, and Gallery tabs
 */
export function navigateTo(tabId) {
  document.querySelectorAll(".tab-section").forEach((el) => {
    el.classList.remove("active");
  });
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add("active");

  // Update Desktop Nav pill active state
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    const isMatch = btn.getAttribute("data-nav") === tabId;
    btn.className = isMatch
      ? "nav-btn px-4 py-2 rounded-full text-sm font-medium transition-all bg-indigo-600 text-white shadow-md"
      : "nav-btn px-4 py-2 rounded-full text-sm font-medium transition-all text-zinc-300 hover:text-white hover:bg-zinc-900";
  });

  // Update Mobile Nav item active state
  document.querySelectorAll(".mobile-nav-btn").forEach((btn) => {
    const isMatch = btn.getAttribute("data-mobile-nav") === tabId;
    btn.className = isMatch
      ? "mobile-nav-btn w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between bg-indigo-600 text-white"
      : "mobile-nav-btn w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between text-zinc-200 hover:bg-zinc-900";
  });

  document.getElementById("mobile-menu").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Toggles the mobile navigation drawer
 */
export function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

/**
 * Cycles the Milky Way background brightness
 */
export function cycleSkyBrightness() {
  skyBrightness =
    skyBrightness === "vivid"
      ? "balanced"
      : skyBrightness === "balanced"
      ? "deep"
      : "vivid";

  const img = document.getElementById("milky-way-img");
  const label = document.getElementById("sky-mode-label");

  const modes = {
    vivid: { opacity: "0.92", text: "Sky: Vivid" },
    balanced: { opacity: "0.75", text: "Sky: Balanced" },
    deep: { opacity: "0.52", text: "Sky: Deep" }
  };

  img.style.opacity = modes[skyBrightness].opacity;
  if (label) label.textContent = modes[skyBrightness].text;
}

/**
 * Renders the Agenda Day Selector and Sessions
 */
export function selectAgendaDay(index) {
  selectedAgendaDay = index;
  renderAgenda();
}

function renderAgenda() {
  const tabsContainer = document.getElementById("agenda-day-tabs");
  const sessionsContainer = document.getElementById("agenda-sessions-box");

  tabsContainer.innerHTML = AGENDA_DATA.map(
    (d, idx) => `
    <button
      onclick="window.app.selectAgendaDay(${idx})"
      class="p-4 rounded-2xl text-left transition-all glass-box ${
        selectedAgendaDay === idx
          ? "border-indigo-400 ring-1 ring-indigo-400/50"
          : "hover:border-white/35"
      }"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-300">${d.day}</span>
        <span class="text-xs text-zinc-200">${d.date}</span>
      </div>
      <div class="font-bold text-white text-sm sm:text-base mt-1 line-clamp-1">${d.theme}</div>
    </button>
  `
  ).join("");

  const activeDay = AGENDA_DATA[selectedAgendaDay];
  sessionsContainer.innerHTML = `
    <div class="border-b border-white/15 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <h3 class="text-xl font-bold text-white">${activeDay.day}: ${activeDay.theme}</h3>
        <p class="text-xs text-zinc-300 mt-0.5">${activeDay.date} • Local Observatory Time (CLT / UTC-3)</p>
      </div>
      <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-black/10 border border-emerald-400/40 px-3 py-1 rounded-full self-start sm:self-auto">
        Hybrid Broadcast Enabled
      </span>
    </div>
    <div class="space-y-4">
      ${activeDay.sessions
        .map(
          (s) => `
        <div class="p-5 rounded-2xl hover:border-indigo-400/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 glass-box">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2.5">
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-200 bg-black/10 px-2.5 py-1 rounded-lg border border-indigo-400/40">
                ${s.time}
              </span>
              <span class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/10 text-zinc-100 border border-white/20">
                ${s.type}
              </span>
              <span class="text-xs text-zinc-200">${s.room}</span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-white pt-1">${s.title}</h4>
            <p class="text-sm text-zinc-200">Speaker / Lead: <span class="text-white font-medium">${s.speaker}</span></p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

/**
 * Renders Speakers & Organizing Committees
 */
function renderSpeakersAndOrganizers() {
  document.getElementById("speakers-grid").innerHTML = SPEAKERS_DATA.map(
    (sp) => `
    <div class="rounded-3xl overflow-hidden hover:border-indigo-400/50 transition-all flex flex-col glass-box">
      <div class="p-6 flex items-center gap-4 border-b border-white/15">
        <img src="${sp.image}" alt="${sp.name}" class="w-16 h-16 rounded-2xl object-cover border border-white/25 shrink-0" />
        <div>
          <h3 class="text-lg font-bold text-white">${sp.name}</h3>
          <p class="text-xs text-indigo-200 font-medium mt-0.5">${sp.role}</p>
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Featured Lecture Topic</div>
          <div class="text-sm font-semibold text-white mt-1">“${sp.topic}”</div>
          <p class="text-xs text-zinc-200 leading-relaxed mt-3">${sp.bio}</p>
        </div>
        <div class="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-zinc-300">
          <span>Plenary Session</span>
          <span class="text-indigo-200 font-medium">Sagan Auditorium</span>
        </div>
      </div>
    </div>
  `
  ).join("");

  document.getElementById("soc-list").innerHTML = ORGANIZERS_DATA.scientific
    .map(
      (m) => `
    <div class="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 glass-box">
      <div>
        <div class="font-bold text-white text-sm">${m.name}</div>
        <div class="text-xs text-zinc-200">${m.affiliation}</div>
      </div>
      <span class="text-xs font-medium text-indigo-200 bg-black/10 px-3 py-1 rounded-full border border-indigo-400/40 self-start sm:self-auto">
        ${m.role}
      </span>
    </div>
  `
    )
    .join("");

  document.getElementById("loc-list").innerHTML = ORGANIZERS_DATA.local
    .map(
      (m) => `
    <div class="p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 glass-box">
      <div>
        <div class="font-bold text-white text-sm">${m.name}</div>
        <div class="text-xs text-zinc-200">${m.affiliation}</div>
      </div>
      <span class="text-xs font-medium text-sky-200 bg-black/10 px-3 py-1 rounded-full border border-sky-400/40 self-start sm:self-auto">
        ${m.role}
      </span>
    </div>
  `
    )
    .join("");
}

/**
 * Renders the Gallery Store & Category Filters
 */
export function filterGallery(category) {
  selectedGalleryCategory = category;
  renderGallery();
}

function renderGallery() {
  document.getElementById("home-gallery-btn-label").textContent = `View Full Gallery (${GALLERY_STORE_PHOTOS.length} Photos)`;
  document.getElementById("gallery-count-badge").textContent = `Store Feed Active (${GALLERY_STORE_PHOTOS.length} Images)`;

  // Home Page Top 3 Featured Photos
  document.getElementById("home-featured-gallery").innerHTML = GALLERY_STORE_PHOTOS.slice(0, 3)
    .map(
      (photo) => `
    <div
      onclick="window.app.openLightbox('${photo.id}')"
      class="group cursor-pointer rounded-2xl overflow-hidden hover:border-indigo-400/60 transition-all flex flex-col glass-box"
    >
      <div class="aspect-[16/10] w-full overflow-hidden relative">
        <img src="${photo.url}" alt="${photo.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/50 backdrop-blur-md text-indigo-200 border border-white/20">
          ${photo.category}
        </span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <h4 class="font-semibold text-white text-sm group-hover:text-indigo-200 transition-colors">${photo.title}</h4>
        <p class="text-xs text-zinc-300 mt-2">Credit: ${photo.photographer}</p>
      </div>
    </div>
  `
    )
    .join("");

  // Category Filter Buttons
  const categories = ["All", ...new Set(GALLERY_STORE_PHOTOS.map((p) => p.category))];
  document.getElementById("gallery-category-pills").innerHTML = categories
    .map(
      (cat) => `
    <button
      onclick="window.app.filterGallery('${cat}')"
      class="px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 glass-box ${
        selectedGalleryCategory === cat
          ? "border-indigo-400 text-white bg-indigo-600/40"
          : "text-zinc-200 hover:text-white"
      }"
    >
      ${cat}
    </button>
  `
    )
    .join("");

  // Filtered Gallery Grid
  const filtered =
    selectedGalleryCategory === "All"
      ? GALLERY_STORE_PHOTOS
      : GALLERY_STORE_PHOTOS.filter((p) => p.category === selectedGalleryCategory);

  document.getElementById("gallery-grid").innerHTML = filtered
    .map(
      (photo) => `
    <div
      onclick="window.app.openLightbox('${photo.id}')"
      class="group rounded-2xl overflow-hidden hover:border-indigo-400/60 transition-all flex flex-col cursor-pointer glass-box"
    >
      <div class="aspect-[16/10] w-full overflow-hidden relative">
        <img src="${photo.url}" alt="${photo.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/50 backdrop-blur-md text-indigo-200 border border-white/20">
          ${photo.category}
        </span>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-white text-base leading-snug">${photo.title}</h3>
          <p class="text-xs text-zinc-300 mt-1.5">Credit: <span class="text-zinc-100">${photo.photographer}</span></p>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

/**
 * Lightbox Modal Controls
 */
export function openLightbox(photoId) {
  const photo = GALLERY_STORE_PHOTOS.find((p) => p.id === photoId);
  if (!photo) return;
  document.getElementById("lightbox-img").src = photo.url;
  document.getElementById("lightbox-img").alt = photo.title;
  document.getElementById("lightbox-category").textContent = photo.category;
  document.getElementById("lightbox-title").textContent = photo.title;
  document.getElementById("lightbox-credit").textContent = `Captured by ${photo.photographer}`;
  document.getElementById("lightbox-modal").classList.remove("hidden");
}

export function closeLightbox() {
  document.getElementById("lightbox-modal").classList.add("hidden");
}

/**
 * Fetches live registration count from a published Google Sheet CSV URL
 */
async function fetchLiveRegistrationCount() {
  const updateDisplays = (val) => {
    document.querySelectorAll(".reg-count-display").forEach((el) => {
      el.textContent = Number(val).toLocaleString();
    });
  };

  updateDisplays(CONFERENCE_CONFIG.fallbackRegistrationCount);

  if (!CONFERENCE_CONFIG.googleSheetCsvUrl?.trim()) return;

  try {
    const response = await fetch(CONFERENCE_CONFIG.googleSheetCsvUrl.trim(), { cache: "no-store" });
    if (!response.ok) throw new Error("CSV response not OK");
    const csvText = await response.text();
    const firstCell = csvText.split(/\r?\n/)[0].split(",")[0].replace(/[^0-9]/g, "");
    const parsedCount = parseInt(firstCell, 10);

    if (!isNaN(parsedCount)) {
      updateDisplays(parsedCount);
      const badge = document.getElementById("reg-sync-badge");
      if (badge) badge.textContent = "Live via Google Sheets CSV";
    }
  } catch (err) {
    console.warn("Using fallback registration count:", err);
  }
}

/**
 * Tracks website visits in the footer
 */
function initVisitCounter() {
  const storageKey = "sram_2026_gh_visits";
  let localIncrement = parseInt(localStorage.getItem(storageKey) || "0", 10);
  if (!sessionStorage.getItem("sram_session_counted")) {
    sessionStorage.setItem("sram_session_counted", "true");
    localIncrement += 1;
    localStorage.setItem(storageKey, localIncrement.toString());
  }
  const totalVisits = CONFERENCE_CONFIG.baseVisitCount + localIncrement;
  document.getElementById("visit-count-display").textContent = totalVisits.toLocaleString();
}

// Expose functions globally for inline `onclick="window.app.xyz()"` handlers
window.app = {
  navigateTo,
  toggleMobileMenu,
  cycleSkyBrightness,
  selectAgendaDay,
  filterGallery,
  openLightbox,
  closeLightbox
};

// Initialize Portal on Page Load
window.addEventListener("DOMContentLoaded", () => {
  // Set Milky Way Background Image
  document.getElementById("milky-way-img").src = CONFERENCE_CONFIG.milkyWayBgUrl;

  // Populate Dates, Venue, and Google Form URLs
  document.querySelectorAll(".conf-dates-text").forEach((el) => {
    el.textContent = CONFERENCE_CONFIG.dates;
  });
  document.getElementById("conf-venue-text").textContent = CONFERENCE_CONFIG.venue;
  document.querySelectorAll(".google-form-link").forEach((link) => {
    link.href = CONFERENCE_CONFIG.googleFormUrl;
  });

  // Populate Organizer Overview Paragraphs
  document.getElementById("overview-paragraph-container").innerHTML =
    CONFERENCE_CONFIG.overviewParagraphs.map((p) => `<p>${p}</p>`).join("");

  // Render All Sections
  renderAgenda();
  renderSpeakersAndOrganizers();
  renderGallery();
  fetchLiveRegistrationCount();
  initVisitCounter();

  // Render Lucide Icons
  if (window.lucide) window.lucide.createIcons();
});