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

  // stub ui functions
  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.updateSkillDisplay = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const { gameState, createMonster, attackAction } = dom.window;

  gameState.player.job = 'Archer';

  const monster = createMonster('ZOMBIE', gameState.player.x + 2, gameState.player.y);
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  attackAction();

  const proj = gameState.projectiles[0];
  if (!proj || !proj.homing) {
    console.error('archer attack should create homing projectile');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
