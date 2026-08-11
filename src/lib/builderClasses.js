/**
 * Curated Builder Classes — HH Goa 2026
 * Tone: clever, hacker culture, Goa references, dev in-jokes.
 */
export const BUILDER_CLASSES = [
  // Ship culture
  'THE SHIPPER',
  'THE MERGE SURVIVOR',
  'THE DEPLOYMENT ORACLE',
  'THE HOTFIX APOSTLE',
  'THE ROLLBACK PROPHET',
  'THE LATE NIGHT PUSHER',
  // Terminal / dev identity
  'THE TERMINAL HERMIT',
  'THE SYSTEMS GOBLIN',
  'THE PROMPT ALCHEMIST',
  'THE BUG FARMER',
  'THE NIGHT OWL',
  'THE SLEEP-DEPRIVED ARCHITECT',
  'THE RUBBER DUCK THERAPIST',
  'THE CLIPBOARD WARLOCK',
  'THE GREP WHISPERER',
  'THE SEGFAULT SURVIVOR',
  'THE BRANCH HOARDER',
  'THE COMMENT DELETER',
  'THE TYPE ANARCHIST',
  'THE UNDEFINED NAVIGATOR',
  // Build culture
  'THE BUILD ALCHEMIST',
  'THE PIXEL WIZARD',
  'THE PROTOTYPE PILGRIM',
  'THE SCOPE CREEPER',
  'THE DEMO WIZARD',
  'THE WEEKEND DEPLOYER',
  'THE ABSTRACTION MONK',
  'THE SPAGHETTI ARCHITECT',
  'THE 2AM FOUNDER',
  'THE LOCALHOST LEGEND',
  // Goa / beach references
  'THE COCONUT CODER',
  'THE BEACHSIDE DEPLOYER',
  'THE SUNSET SCALER',
  'THE PALM TREE PROGRAMMER',
  'THE GOA GHOST',
  'THE MONSOON MERGER',
  'THE CHAI-FUELLED BUILDER',
  // AI era
  'THE CONTEXT FARMER',
  'THE TOKEN COUNTER',
  'THE HALLUCINATION HERDER',
  'THE VIBE ENGINEER',
  'THE PROMPT PIRATE',
  // Meta / existential
  'THE IDEA GRAVEYARD',
  'THE DOCUMENTATION AVOIDER',
  'THE MEETING ESCAPEE',
  'THE TECH DEBT ARCHAEOLOGIST',
];

const USED_KEY = 'hh_goa_used_classes';

function getShuffledPool() {
  const used = JSON.parse(sessionStorage.getItem(USED_KEY) || '[]');
  const available = BUILDER_CLASSES.filter(c => !used.includes(c));
  const pool = available.length > 0 ? available : BUILDER_CLASSES;
  // Fisher-Yates
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickBuilderClass() {
  const pool = getShuffledPool();
  const pick = pool[0];
  const used = JSON.parse(sessionStorage.getItem(USED_KEY) || '[]');
  sessionStorage.setItem(USED_KEY, JSON.stringify([...used, pick].slice(-20)));
  return pick;
}

export function rerollBuilderClass(current) {
  const others = BUILDER_CLASSES.filter(c => c !== current);
  return others[Math.floor(Math.random() * others.length)];
}
