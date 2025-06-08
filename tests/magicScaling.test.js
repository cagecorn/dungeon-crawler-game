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

  const win = dom.window;
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const {
    hireMercenary,
    createMonster,
    processMercenaryTurn,
    gameState
  } = win;
  const healTarget = win.healTarget;
  const MERCENARY_SKILLS = win.eval('MERCENARY_SKILLS');

  // simple dungeon setup
  const size = 5;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.monsters = [];
  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.dungeon[1][1] = 'empty';

  // Healing scaling
  hireMercenary('HEALER');
  const healer = gameState.activeMercenaries[0];
  const target = gameState.player;
  target.health = target.maxHealth - 10;

  healer.magicPower = 0;
  const before1 = target.health;
  healTarget(healer, target);
  const heal1 = target.health - before1;

  target.health = before1;
  healer.magicPower = 5;
  healTarget(healer, target);
  const heal2 = target.health - before1;

  if (heal2 <= heal1) {
    console.error('healing not increased with magic power');
    process.exit(1);
  }

  // Fireball damage scaling
  hireMercenary('WIZARD');
  const wizard = gameState.activeMercenaries[1];
  wizard.magicPower = 4;
  wizard.mana = wizard.maxMana;
  wizard.skill = 'Fireball';
  const skill = MERCENARY_SKILLS[wizard.skill];

  const monsterX = wizard.x + 1 < size ? wizard.x + 1 : wizard.x - 1;
  const monsterY = wizard.y;
  const monster = createMonster('ZOMBIE', monsterX, monsterY);
  monster.defense = 0;
  monster.magicResist = 0;
  monster.health = 999;
  monster.maxHealth = 999;
  gameState.monsters.push(monster);
  gameState.dungeon[monsterY][monsterX] = 'monster';

  const origRandom = win.Math.random;
  win.Math.random = () => 0;
  const start = monster.health;
  processMercenaryTurn(wizard);
  win.Math.random = origRandom;

  const damage = start - monster.health;
  const expected = skill.damage + wizard.magicPower;
  assert.strictEqual(damage, expected, 'fireball damage not scaled by magic power');
}

run().catch(e => { console.error(e); process.exit(1); });
