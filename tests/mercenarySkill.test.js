const assert = require('assert');
const { JSDOM } = require('jsdom');
const path = require('path');

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

  // stub out visual functions
  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.updateSkillDisplay = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const {
    hireMercenary,
    createMonster,
    processMercenaryTurn,
    gameState
  } = dom.window;

  const MERCENARY_SKILLS = dom.window.eval('MERCENARY_SKILLS');

  // create a simple empty dungeon
  const size = 5;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.monsters = [];
  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.dungeon[1][1] = 'empty';

  hireMercenary('WIZARD');
  const merc = gameState.activeMercenaries[0];

  assert.ok(MERCENARY_SKILLS[merc.skill], 'invalid mercenary skill');

  const monsterX = merc.x + 1 < size ? merc.x + 1 : merc.x - 1;
  const monsterY = merc.y;
  const monster = createMonster('ZOMBIE', monsterX, monsterY);
  monster.health = monster.maxHealth = 999; // prevent death side-effects
  gameState.monsters.push(monster);
  gameState.dungeon[monsterY][monsterX] = 'monster';

  const skillCost = MERCENARY_SKILLS[merc.skill].manaCost;
  merc.mana = merc.maxMana;
  const initialMana = merc.mana;
  const origRandom = dom.window.Math.random;
  dom.window.Math.random = () => 0;

  processMercenaryTurn(merc);

  dom.window.Math.random = origRandom;

  const expected = initialMana - skillCost;
  assert.strictEqual(merc.mana, expected, 'mana should decrease by skill cost');
}

run().catch(e => { console.error(e); process.exit(1); });
