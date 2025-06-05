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

  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.updateSkillDisplay = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const {
    hireMercenary,
    createItem,
    equipItemToMercenary,
    createMonster,
    processMercenaryTurn,
    gameState
  } = dom.window;
  const MERCENARY_SKILLS = dom.window.eval('MERCENARY_SKILLS');

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
  merc.skill = 'Fireball';
  merc.mana = merc.maxMana;

  const staff = createItem('magicStaff', 0, 0);
  equipItemToMercenary(staff, merc);

  const monsterX = merc.x + 1 < size ? merc.x + 1 : merc.x - 1;
  const monsterY = merc.y;
  const monster = createMonster('ZOMBIE', monsterX, monsterY);
  monster.health = monster.maxHealth = 999;
  gameState.monsters.push(monster);
  gameState.dungeon[monsterY][monsterX] = 'monster';

  const origRandom = dom.window.Math.random;
  dom.window.Math.random = () => 0;

  processMercenaryTurn(merc);

  dom.window.Math.random = origRandom;

  assert.ok(monster.health < monster.maxHealth, 'staff skill dealt no damage');
}

run().catch(e => { console.error(e); process.exit(1); });
