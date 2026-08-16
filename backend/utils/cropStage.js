/**
 * cropStage.js — sowing date se crop ka current stage aur due actions nikalta hai.
 *
 * Sab pure functions hain — koi DB, koi API, koi LLM. Isliye test karna
 * aasan hai aur alerts predictable rehte hain.
 */

import CROP_CALENDAR from "../data/cropCalendar.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * User ne jo bhi likha ho ("Wheat", "gehu", "गेहूँ") usse calendar key nikalo.
 * @returns {string|null}
 */
export function normalizeCropType(input) {
  if (!input) return null;
  const q = String(input).trim().toLowerCase();

  for (const [key, crop] of Object.entries(CROP_CALENDAR)) {
    if (key === q) return key;
    if (crop.displayName.en.toLowerCase() === q) return key;
    if (crop.displayName.hi === input.trim()) return key;
    if (crop.aliases?.some((a) => a.toLowerCase() === q)) return key;
  }

  // partial match — "wheat crop", "aloo ki fasal" jaise inputs ke liye
  for (const [key, crop] of Object.entries(CROP_CALENDAR)) {
    const names = [key, crop.displayName.en.toLowerCase(), ...(crop.aliases || [])];
    if (names.some((n) => q.includes(String(n).toLowerCase()))) return key;
  }

  return null;
}

export function getCropCalendar(cropType) {
  const key = normalizeCropType(cropType);
  return key ? { key, ...CROP_CALENDAR[key] } : null;
}

/** Sowing se aaj tak kitne din. Future date pe negative aayega. */
export function getDaysSinceSowing(sowingDate, today = new Date()) {
  if (!sowingDate) return null;
  const sown = new Date(sowingDate);
  if (isNaN(sown.getTime())) return null;

  // dono ko midnight pe le jao, warna time-of-day se off-by-one hota hai
  const a = Date.UTC(sown.getFullYear(), sown.getMonth(), sown.getDate());
  const b = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.floor((b - a) / MS_PER_DAY);
}

/**
 * Aaj crop kis stage me hai.
 * @returns {{stage, dayssinceSowing, progressPercent, status}|null}
 */
export function getCurrentStage(cropType, sowingDate, today = new Date()) {
  const calendar = getCropCalendar(cropType);
  if (!calendar) return null;

  const days = getDaysSinceSowing(sowingDate, today);
  if (days === null) return null;

  if (days < 0) {
    return {
      stage: null,
      daysSinceSowing: days,
      progressPercent: 0,
      status: "not_sown",
      cropKey: calendar.key,
      cropName: calendar.displayName,
    };
  }

  const last = calendar.stages[calendar.stages.length - 1];
  if (days > last.endDay) {
    return {
      stage: last,
      daysSinceSowing: days,
      progressPercent: 100,
      status: "overdue_harvest",
      cropKey: calendar.key,
      cropName: calendar.displayName,
    };
  }

  // pehla stage jiska endDay abhi nikla nahi hai
  const stage =
    calendar.stages.find((s) => days >= s.startDay && days <= s.endDay) ||
    calendar.stages.find((s) => days < s.startDay) ||
    last;

  return {
    stage,
    daysSinceSowing: days,
    progressPercent: Math.min(100, Math.round((days / calendar.durationDays) * 100)),
    status: "growing",
    cropKey: calendar.key,
    cropName: calendar.displayName,
  };
}

/**
 * Kaunse actions ab due hain.
 *
 * @param {object} opts
 * @param {string[]} opts.completedActions  jo farmer pehle hi kar chuka
 * @param {number}   opts.lookAheadDays     itne din aage tak ke actions bhi lao
 * @param {number}   opts.overdueGraceDays  itne din purane overdue actions hi dikhao
 * @returns {{due: [], upcoming: [], overdue: []}}
 */
export function getDueActions(cropType, sowingDate, opts = {}) {
  const {
    completedActions = [],
    lookAheadDays = 3,
    overdueGraceDays = 10,
  } = opts;
  const today = opts.today || new Date();

  const calendar = getCropCalendar(cropType);
  const days = getDaysSinceSowing(sowingDate, today);
  if (!calendar || days === null || days < 0) {
    return { due: [], upcoming: [], overdue: [] };
  }

  const doneSet = new Set(completedActions);
  const due = [];
  const upcoming = [];
  const overdue = [];

  for (const stage of calendar.stages) {
    for (const action of stage.actions || []) {
      if (doneSet.has(action.key)) continue;

      const offset = days - action.day; // + = beet gaya, - = aana baaki

      const entry = {
        ...action,
        stageKey: stage.key,
        stageName: stage.name,
        dueOnDay: action.day,
        daysOffset: offset,
      };

      if (offset >= 0 && offset <= 2) {
        due.push(entry);
      } else if (offset < 0 && Math.abs(offset) <= lookAheadDays) {
        upcoming.push(entry);
      } else if (offset > 2 && offset <= overdueGraceDays) {
        overdue.push(entry);
      }
      // overdueGraceDays se purana — chhod do, ab alert bhejne ka fayda nahi
    }
  }

  // critical pehle, phir date ke hisaab se
  const sorter = (a, b) =>
    (b.critical ? 1 : 0) - (a.critical ? 1 : 0) || a.dueOnDay - b.dueOnDay;

  return {
    due: due.sort(sorter),
    upcoming: upcoming.sort(sorter),
    overdue: overdue.sort(sorter),
  };
}

/** Supported crops ki list — dropdowns ke liye. */
export function listSupportedCrops() {
  return Object.entries(CROP_CALENDAR).map(([key, c]) => ({
    key,
    displayName: c.displayName,
    durationDays: c.durationDays,
  }));
}