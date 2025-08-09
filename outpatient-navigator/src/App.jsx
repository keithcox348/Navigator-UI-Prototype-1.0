import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Globe, CalendarDays, Star, Filter, ChevronRight } from "lucide-react";

const PROVIDERS = [
  {
    id: "prov_derm_1",
    name: "Santa Monica Dermatology Group",
    specialties: ["dermatology"],
    clinic: "Wilshire/Montana",
    address: "201 Santa Monica Blvd, Santa Monica, CA",
    phone: "310-555-0148",
    website: "https://example-derm.com",
    booking_url: "",
    lat: 34.0159, lng: -118.4960,
    insurance: ["Blue Shield PPO", "Anthem PPO", "Medicare"],
    languages: ["English", "Spanish"],
    satisfaction: { composite: 4.6, sources: { google: 4.6, n: 182 } },
    next_slots: [new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_derm_2", name: "UCLA Health Dermatology – Santa Monica", specialties: ["dermatology"], clinic: "Mid-City",
    address: "1245 16th St, Santa Monica, CA", phone: "310-555-0167",
    website: "https://www.uclahealth.org/medical-services/dermatology", booking_url: "https://www.uclahealth.org/",
    lat: 34.0273, lng: -118.4849, insurance: ["Blue Shield PPO", "Anthem PPO", "HMO (UCLA)"],
    languages: ["English", "Spanish", "Korean"], satisfaction: { composite: 4.5, sources: { google: 4.5, n: 240 } },
    next_slots: [new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_ortho_1", name: "Saint John's Orthopedics & Sports Medicine", specialties: ["orthopedics","sports_medicine"],
    clinic: "Mid-City", address: "2121 Santa Monica Blvd, Santa Monica, CA", phone: "310-555-0193", website: "https://www.providence.org/",
    booking_url: "", lat: 34.0327, lng: -118.4752, insurance: ["Blue Shield PPO","Anthem PPO","Medicare"], languages: ["English"],
    satisfaction: { composite: 4.4, sources: { google: 4.4, n: 120 } },
    next_slots: [new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_cards_1", name: "Westside Cardiology Clinic", specialties: ["cardiology"], clinic: "Brentwood",
    address: "11980 San Vicente Blvd, Los Angeles, CA", phone: "310-555-0110", website: "https://example-cardiology.com",
    booking_url: "", lat: 34.0533, lng: -118.4723, insurance: ["Blue Shield PPO","Anthem PPO"], languages: ["English","Spanish"],
    satisfaction: { composite: 4.7, sources: { google: 4.7, n: 98 } },
    next_slots: [new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_gi_1", name: "Pacific GI & Endoscopy Center", specialties: ["gastroenterology"], clinic: "West LA",
    address: "2020 Santa Monica Blvd, Santa Monica, CA", phone: "310-555-0188", website: "https://example-gi.com", booking_url: "",
    lat: 34.0335, lng: -118.4742, insurance: ["Blue Shield PPO","Medicare"], languages: ["English","Farsi"],
    satisfaction: { composite: 4.3, sources: { google: 4.3, n: 74 } },
    next_slots: [new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_ophto_1", name: "Ocean Park Ophthalmology", specialties: ["ophthalmology"], clinic: "Ocean Park",
    address: "2825 Pico Blvd, Santa Monica, CA", phone: "310-555-0122", website: "https://example-eye.com", booking_url: "",
    lat: 34.0213, lng: -118.4617, insurance: ["Blue Shield PPO","Anthem PPO"], languages: ["English","Spanish"],
    satisfaction: { composite: 4.6, sources: { google: 4.6, n: 156 } },
    next_slots: [new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_urology_1", name: "West LA Urology Associates", specialties: ["urology"], clinic: "West LA",
    address: "11645 Wilshire Blvd, Los Angeles, CA", phone: "310-555-0155", website: "https://example-urology.com", booking_url: "",
    lat: 34.0495, lng: -118.4561, insurance: ["Blue Shield PPO","Anthem PPO","Medicare"], languages: ["English"],
    satisfaction: { composite: 4.2, sources: { google: 4.2, n: 63 } },
    next_slots: [new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_ent_1", name: "Santa Monica ENT & Allergy", specialties: ["otolaryngology"], clinic: "Downtown",
    address: "520 Broadway, Santa Monica, CA", phone: "310-555-0190", website: "https://example-ent.com", booking_url: "",
    lat: 34.0139, lng: -118.4899, insurance: ["Blue Shield PPO","Anthem PPO"], languages: ["English"],
    satisfaction: { composite: 4.5, sources: { google: 4.5, n: 110 } },
    next_slots: [new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()],
  },
  { id: "prov_im_1", name: "Santa Monica Primary Care", specialties: ["primary_care"], clinic: "Wilshire/Montana",
    address: "1450 10th St, Santa Monica, CA", phone: "310-555-0101", website: "https://example-pcp.com", booking_url: "",
    lat: 34.0255, lng: -118.4900, insurance: ["Blue Shield PPO","Anthem PPO","Medicare"], languages: ["English","Spanish"],
    satisfaction: { composite: 4.4, sources: { google: 4.4, n: 210 } },
    next_slots: [new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()],
  },
];

const BODY_MAP = {
  "Skin & Hair": ["dermatology"],
  "Bones & Joints": ["orthopedics", "sports_medicine"],
  "Eyes": ["ophthalmology"],
  "Ears / Nose / Throat": ["otolaryngology"],
  "Abdomen / Digestion": ["gastroenterology"],
  "Urinary / Kidneys": ["urology"],
  "General Checkup": ["primary_care"],
};

const BODY_ICONS = {
  "Skin & Hair": "🧴",
  "Bones & Joints": "🦴",
  "Eyes": "👁️",
  "Ears / Nose / Throat": "👂",
  "Abdomen / Digestion": "🫃",
  "Urinary / Kidneys": "🚻",
  "General Checkup": "🩺",
};

const URGENCY_OPTS = ["Today", "Next 3 days", "Next 7 days", "Flexible"];

const DEFAULT_CENTER = { lat: 34.0195, lng: -118.4912 };

function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const aCalc = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  return R * c;
}

function soonestScore(nextSlots, urgency) {
  if (!nextSlots?.length) return 0;
  const soonest = Math.min(...nextSlots.map((s) => new Date(s).getTime()));
  const hours = (soonest - Date.now()) / (1000 * 60 * 60);
  const base = Math.max(0, 48 - hours);
  const urgencyBoost = urgency === "Today" ? 1.4 : urgency === "Next 3 days" ? 1.2 : urgency === "Next 7 days" ? 1.0 : 0.8;
  return base * urgencyBoost;
}

function satisfactionScore(sat) {
  if (!sat?.composite) return 0;
  const rating = sat.composite;
  const n = sat.sources?.n ?? 0;
  const countWeight = Math.min(1, n / 150);
  return rating * 12 * (0.6 + 0.4 * countWeight);
}

function distanceScore(km) {
  if (km <= 1) return 15;
  if (km <= 3) return 12;
  if (km <= 5) return 9;
  if (km <= 8) return 6;
  return 3;
}

function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export default function App() {
  const [bodyArea, setBodyArea] = useState(null);
  const [urgency, setUrgency] = useState("Today");
  const [insurance, setInsurance] = useState("");
  const [prefLang, setPrefLang] = useState("");
  const [userLoc, setUserLoc] = useState(null);

  const specialties = useMemo(() => (bodyArea ? BODY_MAP[bodyArea] ?? [] : []), [bodyArea]);

  const results = useMemo(() => {
    if (!specialties.length) return [];
    const loc = userLoc ?? DEFAULT_CENTER;
    const filtered = PROVIDERS.filter((p) => p.specialties.some((s) => specialties.includes(s)))
      .filter((p) => (insurance ? p.insurance.includes(insurance) : true))
      .filter((p) => (prefLang ? p.languages.includes(prefLang) : true));

    const scored = filtered.map((p) => {
      const km = haversineKm(loc, { lat: p.lat, lng: p.lng });
      const score = soonestScore(p.next_slots, urgency) + satisfactionScore(p.satisfaction) + distanceScore(km);
      return { ...p, km, score, soonest: p.next_slots?.length ? new Date(p.next_slots[0]) : null };
    });

    return scored.sort((a, b) => b.score - a.score);
  }, [specialties, urgency, insurance, prefLang, userLoc]);

  const bodyAreas = Object.keys(BODY_MAP);

  function trySetUserLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Find outpatient care in Santa Monica</h1>
            <p className="text-slate-600">Pick a general area—we'll show specialists with the soonest openings.</p>
          </div>
          <button onClick={trySetUserLocation} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm hover:bg-slate-50" title="Use my location">
            <MapPin className="h-4 w-4" /> Use my location
          </button>
        </header>

        <section className="mt-6">
          <h2 className="mb-3 text-lg font-medium">Where do you need help?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {bodyAreas.map((ba) => (
              <button key={ba} onClick={() => setBodyArea(ba)} className={`group rounded-2xl border p-4 text-left transition shadow-sm hover:shadow ${bodyArea === ba ? "border-sky-400 ring-2 ring-sky-200" : "border-slate-200"}`}>
                <div className="text-2xl">{({ "Skin & Hair": "🧴", "Bones & Joints": "🦴", "Eyes": "👁️", "Ears / Nose / Throat": "👂", "Abdomen / Digestion": "🫃", "Urinary / Kidneys": "🚻", "General Checkup": "🩺" })[ba] || "🩺"}</div>
                <div className="mt-2 font-medium">{ba}</div>
                <div className="text-xs text-slate-500">Tap to select</div>
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {bodyArea && (
            <motion.section key="filters" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-8 rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm text-slate-600">Filters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <div className="flex gap-2 flex-wrap">
                    {["Today","Next 3 days","Next 7 days","Flexible"].map((u) => (
                      <button key={u} onClick={() => setUrgency(u)} className={`rounded-full border px-3 py-1 text-sm ${u === urgency ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:bg-slate-50"}`}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Insurance:</span>
                  <select value={insurance} onChange={(e) => setInsurance(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-sm">
                    <option value="">Any</option>
                    <option>Blue Shield PPO</option>
                    <option>Anthem PPO</option>
                    <option>Medicare</option>
                    <option>HMO (UCLA)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Language:</span>
                  <select value={prefLang} onChange={(e) => setPrefLang(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-1 text-sm">
                    <option value="">Any</option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>Korean</option>
                    <option>Farsi</option>
                  </select>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {bodyArea && (
            <motion.section key="results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, delay: 0.05 }} className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-medium">{results.length}</span> matches for <span className="font-medium">{bodyArea}</span>
                </div>
                <button onClick={() => setBodyArea(null)} className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">
                  Change area <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-6 text-center text-slate-600">No exact matches. Try widening your filters or choosing "Flexible" for time.</div>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((p) => (
                    <li key={p.id} className="rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">{p.name}</h3>
                          <div className="text-sm text-slate-600">{p.specialties.join(", ")}</div>
                          <div className="mt-1 text-sm text-slate-600 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> {p.address}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            {p.languages?.length ? `Languages: ${p.languages.join(", ")}` : null}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-700 text-sm">
                            <Star className="h-4 w-4" /> {p.satisfaction?.composite?.toFixed(1)}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">{(function(){const km=p.km; if (km<1) return Math.round(km*1000)+' m'; return km.toFixed(1)+' km';})()}</div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                        <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">
                          Soonest: {p.soonest ? p.soonest.toLocaleString() : "—"}
                        </span>
                        {insurance && <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Prefers {insurance}</span>}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <a href={`tel:${p.phone}`} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
                          <Phone className="h-4 w-4" /> Call
                        </a>
                        {p.website && (
                          <a href={p.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
                            <Globe className="h-4 w-4" /> Website
                          </a>
                        )}
                        {p.booking_url && (
                          <a href={p.booking_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 text-white px-3 py-2 text-sm hover:bg-sky-700">
                            <CalendarDays className="h-4 w-4" /> Book now
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        <footer className="mt-10 text-xs text-slate-500">
          This is a prototype for evaluation purposes only. Not medical advice. Always confirm insurance coverage and availability with the clinic.
        </footer>
      </div>
    </div>
  );
}
