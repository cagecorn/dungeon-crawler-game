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

  const { performAttack, createMercenary, createTreasure, movePlayer, nextFloor, gameState } = dom.window;

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

  gameState.dungeonSize = 3;
  gameState.dungeon = [ ['empty','empty','empty'], ['empty','empty','empty'], ['empty','empty','empty'] ];
  const merc = createMercenary('WARRIOR', 1, 1);
  merc.health = Math.floor(merc.maxHealth / 2);
  gameState.activeMercenaries = [merc];
  nextFloor();
  assert.ok(merc.health > merc.maxHealth / 2, 'mercenary should heal after floor');

  const treasure = createTreasure(gameState.player.x + 1, gameState.player.y, 10);
  gameState.treasures = [treasure];
  gameState.dungeon[treasure.y][treasure.x] = 'treasure';
  gameState.activeMercenaries = [];
  gameState.player.gold = 0;
  movePlayer(1, 0);
  const baseGold = gameState.player.gold;

  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.player.gold = 0;
  gameState.treasures = [createTreasure(2,1,10)];
  gameState.dungeon[1][2] = 'treasure';
  const hunter = createMercenary('ARCHER', 0, 0);
  hunter.traits.push('보물 감별사');
  gameState.activeMercenaries = [hunter];
  movePlayer(1,0);
  const boostedGold = gameState.player.gold;
  assert.ok(boostedGold > baseGold, 'treasure hunter should boost gold');
}

run().catch(e => { console.error(e); process.exit(1); });
