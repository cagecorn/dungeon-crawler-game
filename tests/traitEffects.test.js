const { JSDOM } = require('jsdom');
const path = require('path');
const assert = require('assert');

async function run() {
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost'
  });

  await new Promise(resolve => {
    if (dom.window.document.readyState === 'complete') resolve();
    else dom.window.addEventListener('load', resolve);
  });

  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.requestAnimationFrame = fn => fn();
  dom.window.addMessage = () => {};
  dom.window.showShop = () => {};

  const { performAttack, createMercenary, createTreasure, movePlayer, nextFloor,
          healTarget, getStat, tryApplyStatus, gameState } = dom.window;

  let attacker = { attack: 10, critChance: 0, accuracy: 1, traits: [] };
  let defender = {
    defense: 0,
    evasion: 0,
    traits: ['철벽'],
    health: 20,
    statusResistances: { poison:0, bleed:0, burn:0, freeze:0 },
    elementResistances: { fire:0, ice:0, lightning:0, earth:0, light:0, dark:0 }
  };
  let result = performAttack(attacker, defender);
  assert.strictEqual(result.damage, 8, 'Iron Wall should reduce damage');

  attacker = { attack: 10, critChance: 0, accuracy: 1, traits: ['집요한 사냥꾼'] };
  defender = {
    defense: 0,
    evasion: 0,
    traits: [],
    bleedTurns: 2,
    health: 20,
    statusResistances: { poison:0, bleed:0, burn:0, freeze:0 },
    elementResistances: { fire:0, ice:0, lightning:0, earth:0, light:0, dark:0 }
  };
  result = performAttack(attacker, defender);
  assert.strictEqual(result.damage, 12, 'Relentless Hunter bonus damage');

  attacker = { attack: 5, critChance: 0, accuracy: 1, traits: ['은밀한 칼날'] };
  defender = {
    defense: 0,
    evasion: 0,
    traits: [],
    health: 20,
    statusResistances: { poison:0, bleed:0, burn:0, freeze:0 },
    elementResistances: { fire:0, ice:0, lightning:0, earth:0, light:0, dark:0 }
  };
  const origRandom = dom.window.Math.random;
  dom.window.Math.random = () => 0;
  result = performAttack(attacker, defender);
  dom.window.Math.random = origRandom;
  assert.ok(result.statusApplied && defender.bleedTurns === 3, 'Bleed not applied');

  attacker = { attack: 5, critChance: 0, accuracy: 1, traits: [] };
  defender = {
    defense: 0,
    evasion: 0,
    traits: [],
    health: 20,
    statusResistances: { poison:0, bleed:0, burn:0, freeze:0 },
    elementResistances: { fire:0, ice:0, lightning:0, earth:0, light:0, dark:0 }
  };
  dom.window.Math.random = () => 0.1;
  performAttack(attacker, defender, { status: 'burn' });
  performAttack(attacker, defender, { status: 'freeze' });
  performAttack(attacker, defender, { status: 'poison' });
  dom.window.Math.random = origRandom;
  assert.ok(defender.burn && defender.freeze && defender.poison, 'status effects');

  let merc = { maxHealth: 50, health: 25, alive: true, traits: [] };
  gameState.activeMercenaries = [merc];
  if (merc.alive) {
    merc.health = Math.min(merc.maxHealth, merc.health + Math.floor(merc.maxHealth * 0.2));
  }
  assert.ok(merc.health > 25, 'mercenary should heal after floor');

  let gold = 10;
  const hunter = { traits: ['보물 감별사'], alive: true };
  gameState.activeMercenaries = [hunter];
  if (gameState.activeMercenaries.some(m => m.alive && dom.window.hasTrait(m, '보물 감별사'))) {
    gold = Math.floor(gold * 1.5);
  }
  assert.ok(gold > 10, 'treasure hunter should boost gold');

  // Rush Charge increases first attack damage only once
  attacker = { attack: 10, critChance: 0, accuracy: 1, traits: ['맹공 돌진'], rushReady: true };
  defender = {
    defense: 0,
    evasion: 0,
    traits: [],
    health: 20,
    statusResistances: { poison:0, bleed:0, burn:0, freeze:0 },
    elementResistances: { fire:0, ice:0, lightning:0, earth:0, light:0, dark:0 }
  };
  result = performAttack(attacker, defender);
  assert.strictEqual(result.damage, 15, 'Rush Charge bonus damage');
  result = performAttack(attacker, defender);
  assert.strictEqual(result.damage, 10, 'Rush Charge only once');

  // Healer's Touch improves healing amount
  const healer = { level: 10, traits: ['구호의 손길'] };
  let target = { maxHealth: 40, health: 10 };
  healTarget(healer, target);
  assert.strictEqual(target.health, 25, 'healing trait should boost amount');

  // Mana Attunement increases mana regeneration
  const mage = { manaRegen: 1, health:10, maxHealth:10, traits:['마력 조율자'] };
  const manaRegen = getStat(mage, 'manaRegen');
  assert.strictEqual(manaRegen, 1.5, 'mana regen trait bonus');

  // Escape Sense grants evasion when low health
  const rogue = { evasion: 0, health:2, maxHealth:10, traits:['도망자 감각'] };
  const eva = getStat(rogue, 'evasion');
  assert.strictEqual(eva, 0.2, 'evasion bonus when low HP');

  // Flame of Will increases status resistance
  target = { statusResistances:{ poison:0.3 }, traits:['의지의 불꽃'] };
  dom.window.Math.random = () => 0.4;
  const resisted = !tryApplyStatus(target, 'poison', 3);
  dom.window.Math.random = origRandom;
  assert.ok(resisted, 'status should be resisted');

  dom.window.close();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
