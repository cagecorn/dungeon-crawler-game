const { rollDice } = require('../dice');
const { JSDOM } = require('jsdom');
const path = require('path');

async function run() {
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
    beforeParse(window) { window.rollDice = rollDice; }
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
  win.requestAnimationFrame = fn => fn();

  const { createMonster, hireMercenary, monsterAttack, gameState } = win;

  const size = 5;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.player.x = 2;
  gameState.player.y = 2;

  gameState.player.gold = 1000;
  hireMercenary('WARRIOR');
  const merc = gameState.activeMercenaries[0];
  merc.x = 3;
  merc.y = 2;
  merc.health = 1;
  merc.level = 2;

  const monster = createMonster('GOBLIN', 4, 2, 1);
  gameState.monsters = [monster];
  gameState.dungeon[monster.y][monster.x] = 'monster';

  const origRandom = win.Math.random;
  win.Math.random = () => 0; // ensure hit
  monsterAttack(monster);
  win.Math.random = origRandom;

  if (monster.level < 2) {
    console.error('monster did not gain experience from kill');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
