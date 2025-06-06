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

  // stub side effect functions
  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.requestAnimationFrame = fn => fn();
  dom.window.addMessage = () => {};
  dom.window.generateDungeon = () => {
    const size = 3;
    dom.window.gameState.dungeonSize = size;
    dom.window.gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
    dom.window.gameState.monsters = [];
  };

  const { performAttack, nextFloor, gameState } = dom.window;

  // Iron Wall reduces incoming damage
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
  assert.strictEqual(result.damage, 8);

  // Mana Attunement boosts mana regeneration
  const getStat = dom.window.getStat;
  let character = { manaRegen: 1, traits: ['마력 조율자'], maxHealth: 10, health: 10 };
  let regen = getStat(character, 'manaRegen');
  assert.strictEqual(regen, 1.5);

  // Escapee's Sense raises evasion at low health
  character = { evasion: 0, traits: ['도망자 감각'], maxHealth: 10, health: 2 };
  let evasion = getStat(character, 'evasion');
  assert.strictEqual(evasion, 0.2);

  // Mercenaries heal after moving to the next floor
  const merc = { maxHealth: 50, health: 25, alive: true, traits: [] };
  gameState.activeMercenaries = [merc];
  gameState.floor = 1;
  gameState.player.x = 1;
  gameState.player.y = 1;
  nextFloor();
  assert.ok(merc.health > 25);

  dom.window.close();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
