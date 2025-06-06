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

  // Stone Fist increases attack damage
  attacker = { attack: 10, critChance: 0, accuracy: 1, traits: ['돌주먹'] };
  defender = {
    defense: 0,
    evasion: 0,
    traits: [],
    health: 20,
    statusResistances: { poison:0, bleed:0, burn:0, freeze:0 },
    elementResistances: { fire:0, ice:0, lightning:0, earth:0, light:0, dark:0 }
  };
  result = performAttack(attacker, defender);
  assert.strictEqual(result.damage, 12);

  // Stealth Blade inflicts bleed
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
  assert.ok(result.statusApplied && defender.bleedTurns === 3);

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
