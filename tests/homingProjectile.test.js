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

  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.updateSkillDisplay = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const { gameState, createMonster, createHomingProjectile, processProjectiles, getDistance } = dom.window;

  const monster = createMonster('ZOMBIE', gameState.player.x + 3, gameState.player.y);
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';
  gameState.dungeon[monster.y][monster.x - 1] = 'empty';
  gameState.dungeon[monster.y][monster.x - 2] = 'empty';

  const proj = createHomingProjectile(gameState.player.x, gameState.player.y, monster);

  let prevDist = getDistance(proj.x, proj.y, monster.x, monster.y);
  processProjectiles();
  let newDist = getDistance(proj.x, proj.y, monster.x, monster.y);
  if (newDist >= prevDist) {
    console.error('projectile did not move toward target');
    process.exit(1);
  }

  prevDist = newDist;
  processProjectiles();
  newDist = getDistance(proj.x, proj.y, monster.x, monster.y);
  if (newDist >= prevDist) {
    console.error('projectile did not continue homing');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
