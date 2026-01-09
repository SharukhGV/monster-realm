// Helper to parse symbols into actionable data
const getAbilityEffects = (symbolString) => {
  const effects = {
    physicalDamage: 0,
    reflect: false,
    preventHealing: false,
    poison: false,
    healSelfHalf: false,
    healTeam: false,
    protect: false,
    selfWound: false,
    isGlobal: false,
  };

  // Check for modifier symbols first
  if (symbolString.includes('☀')) effects.isGlobal = true;
  if (symbolString.includes('⚠')) effects.selfWound = true;

  // Extract physical damage (numeric values)
  const damageMatch = symbolString.match(/\d+/);
  if (damageMatch) effects.physicalDamage = parseInt(damageMatch[0], 10);

  // Map remaining symbols
  if (symbolString.includes('⌮')) effects.reflect = true;
  if (symbolString.includes('❦')) effects.preventHealing = true;
  if (symbolString.includes('⌾')) effects.poison = true;
  if (symbolString.includes('✿')) effects.healSelfHalf = true;
  if (symbolString.includes('❅')) effects.healTeam = true;
  if (symbolString.includes('⌬')) effects.protect = true;

  return effects;
};