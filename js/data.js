/**
 * ============================================================================
 *FILE: js/data.js
 * PURPOSE: Central configuration and content store for RAM-XII.
 * Organizers only need to edit this file to update text, links, schedules,
 * speakers, or gallery photos on GitHub Pages.
 * ============================================================================
 */

export const CONFERENCE_CONFIG = {
  dates: "February 04 – 06, 2027",
  venue: "Department of Physics, University College Thiruvananthapuram",
  
  // Paste your Google Form registration link here:
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd_example_RAM_2027_registration/viewform",
  
  // Paste your published Google Sheet CSV URL here (leave "" to use fallbackRegistrationCount):
  googleSheetCsvUrl: "",
  fallbackRegistrationCount: 248,

  // Starting number for the footer website visit counter:
  baseVisitCount: 1842,

  // High-resolution Milky Way background image:
  milkyWayBgUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2400&q=90",

  // Organizer long paragraph(s) displayed on the Home Page:
  overviewParagraphs: [
    "Welcome to the 12th Southern Regional Astronomy Meeting (RAM-XII), hosted at the University College Thiruvananthapuram. This premier three-day gathering brings together observational astronomers, theoretical astrophysicists, instrumentation engineers, and graduate researchers from across the southern hemisphere and beyond.",
    "Our 2027 symposium focuses on next-generation wide-field spectroscopic surveys, time-domain multi-messenger astrophysics, exoplanet atmospheric characterization with JWST and ELT-class instruments, and high-redshift galaxy evolution. Built around collaborative workshops and dark-sky observing sessions, RAM-XII provides an intimate, high-impact forum for sharing early-stage discoveries and forging cross-institutional partnerships."
  ]
};

/**
 * GALLERY PHOTO STORE
 * Tip: Upload images to the `/photos` folder in your GitHub repo and reference
 * them like `url: "photos/carina.jpg"`, or use full `https://` image URLs.
 */
export const GALLERY_STORE_PHOTOS = [
  {
    id: "store-1",
    title: "Carina Nebula Star-Forming Pillars (Southern Sky Deep Field)",
    category: "Deep Sky",
    photographer: "RAM Deep Sky Archive",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "store-2",
    title: "Milky Way Galactic Core Above the 4-Meter Blanco Dome",
    category: "Observatory",
    photographer: "Dr. Mateo Silva",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "store-3",
    title: "Andromeda & Companion Galaxies Wide-Field Mosaic",
    category: "Astrophotography",
    photographer: "Prof. Elena Rostova",
    url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "store-4",
    title: "Laser Guide Star Adaptive Optics Calibration Run",
    category: "Instrumentation",
    photographer: "CTIO Optics Team",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "store-5",
    title: "Orion Molecular Cloud Complex in Hydrogen-Alpha",
    category: "Deep Sky",
    photographer: "Southern Sky Survey",
    url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "store-6",
    title: "High-Altitude Array Under Australis Dark Skies",
    category: "Observatory",
    photographer: "Dr. Aris Thorne",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85"
  }
];

/**
 * CONFERENCE SCHEDULE (AGENDA)
 */
export const AGENDA_DATA = [
  {
    day: "Day 1",
    date: "Feb 04, 2027",
    theme: "Cosmology, Dark Energy & Wide-Field Surveys",
    sessions: [
      { time: "08:30 - 09:30", title: "Registration, Badge Pickup & Welcome Espresso", speaker: "Organizing Committee", room: "Main Atrium", type: "Social" },
      { time: "09:30 - 10:45", title: "Opening Keynote: Early Universe Galaxies Seen Through JWST & ALMA", speaker: "Dr. Elena Rostova (ESO / Chile)", room: "Sagan Auditorium", type: "Keynote" },
      { time: "11:00 - 12:30", title: "Vera C. Rubin Observatory LSST: First Year Southern Sky Alerts", speaker: "Prof. Marcus Vance (NOIRLab)", room: "Sagan Auditorium", type: "Symposium" },
      { time: "14:00 - 15:45", title: "Baryon Acoustic Oscillations & Southern Spectroscopic Redshift Surveys", speaker: "Dr. Priya Nair (ANU Canberra)", room: "Room B - Kepler Hall", type: "Contributed" },
      { time: "19:30 - 22:30", title: "Desert Sky Star Party & 1.5m Telescope Live Demonstration", speaker: "Observatory Operations Staff", room: "Observation Deck Ridge", type: "Observing" }
    ]
  },
  {
    day: "Day 2",
    date: "Feb 05, 2027",
    theme: "Exoplanets, Stellar Physics & Time-Domain Astrophysics",
    sessions: [
      { time: "09:00 - 10:15", title: "Keynote: Biosignature Constraints in Terrestrial Exoplanet Atmospheres", speaker: "Dr. Tariq Al-Mansoor (STScI)", room: "Sagan Auditorium", type: "Keynote" },
      { time: "10:30 - 12:15", title: "Multi-Messenger Gravitational Wave Counterparts & Kilonova Lightcurves", speaker: "Dr. Sofia Lindqvist (Max Planck Institute)", room: "Sagan Auditorium", type: "Symposium" },
      { time: "13:45 - 15:30", title: "Hands-On Workshop: Cryogenic Infrared Spectrograph Pipeline Reduction", speaker: "RAM Instrumentation Working Group", room: "Lab 204 - Rubin Suite", type: "Workshop" },
      { time: "16:00 - 18:00", title: "Graduate & Postdoc Poster Blitz + Instrumentation Expo", speaker: "48 Participating Research Groups", room: "Exhibition Concourse", type: "Poster" }
    ]
  },
  {
    day: "Day 3",
    date: "Feb 06, 2027",
    theme: "Radio Astronomy, SKA-Mid & Future Southern Facilities",
    sessions: [
      { time: "09:15 - 10:30", title: "Keynote: Fast Radio Bursts & Millisecond Pulsars with MeerKAT & SKA", speaker: "Prof. Kwame Osei (SARAO South Africa)", room: "Sagan Auditorium", type: "Keynote" },
      { time: "10:45 - 12:15", title: "Extreme Adaptive Optics for the Giant Magellan Telescope (GMT)", speaker: "Dr. Mateo Silva (Las Campanas Observatory)", room: "Sagan Auditorium", type: "Symposium" },
      { time: "13:30 - 15:00", title: "Town Hall: Decadal Priorities for Southern Hemisphere Ground Facilities", speaker: "Panel of Observatory Directors", room: "Sagan Auditorium", type: "Panel" },
      { time: "15:15 - 16:30", title: "Best Student Paper Awards & Closing Remarks", speaker: "Dr. Clara Chen (RAM-XII Chair)", room: "Sagan Auditorium", type: "Ceremony" }
    ]
  }
];

/**
 * KEYNOTE SPEAKERS
 */
export const SPEAKERS_DATA = [
  {
    name: "Dr. Elena Rostova",
    role: "Senior Astrophysicist, European Southern Observatory (ESO)",
    topic: "High-Redshift Galaxy Assembly & Lyman-Alpha Emitters",
    bio: "Principal investigator of the Southern Deep Infrared Survey, specializing in sub-millimeter galaxy kinematics during the Epoch of Reionization.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Prof. Marcus Vance",
    role: "Director of Time-Domain Alert Systems, NOIRLab",
    topic: "Real-Time Transient Brokers for Rubin LSST",
    bio: "Architect of automated machine-learning classification pipelines processing millions of nightly transient alerts across the southern sky.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Tariq Al-Mansoor",
    role: "Lead Exoplanet Spectroscopist, Space Telescope Science Institute",
    topic: "Transmission Spectroscopy of Temperate M-Dwarf Worlds",
    bio: "Member of the JWST Transiting Exoplanet Community Early Release Science Team with over 90 peer-reviewed publications on planetary atmospheres.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Prof. Kwame Osei",
    role: "Chief Scientist for Pulsar Timing, SARAO",
    topic: "Nanohertz Gravitational Waves & SKA-Mid Pathfinder Results",
    bio: "Pioneered high-precision pulsar timing arrays across the southern hemisphere to probe supermassive black hole binary coalescences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Priya Nair",
    role: "Associate Professor of Cosmology, ANU Mt Stromlo",
    topic: "Dark Energy Equation of State from Southern Sky Redshifts",
    bio: "Co-lead of the Southern Spectroscopic Cosmology Collaboration mapping over 3 million galaxies out to z = 1.4.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dr. Mateo Silva",
    role: "Head of Adaptive Optics Instrumentation, Las Campanas",
    topic: "Wavefront Sensing for 30-Meter Class Telescopes",
    bio: "Designs extreme adaptive optics coronagraphs capable of directly imaging rocky planets in reflected starlight.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  }
];

/**
 * ORGANIZING COMMITTEES
 */
export const ORGANIZERS_DATA = {
  scientific: [
    { name: "Dr. Clara Chen (Chair)", affiliation: "Southern Skies Observatory", role: "SOC Chair & Cosmology Lead" },
    { name: "Prof. Hernan Morales", affiliation: "Universidad de Chile", role: "Observational Extragalactic Lead" },
    { name: "Dr. Hannah Lindstrom", affiliation: "Australian National University", role: "Time-Domain & Transients Co-Chair" },
    { name: "Dr. Lucas Ndlovu", affiliation: "South African Astronomical Observatory", role: "Radio & Multi-Wavelength Coordinator" }
  ],
  local: [
    { name: "Dr. Julian Vance", affiliation: "Southern Skies Research Center", role: "LOC Chair & Venue Operations" },
    { name: "Elena Gomez, M.Sc.", affiliation: "Cerro Pachón Science Operations", role: "Observatory Tour & Star Party Director" },
    { name: "Marcus Chen", affiliation: "Regional Astronomy Consortium", role: "Sponsor Relations & Registration Desk" },
    { name: "Dr. Mei-Ling Zhou", affiliation: "Southern Institute of Astrophysics", role: "Student Travel Grants & Accessibility" }
  ]
};