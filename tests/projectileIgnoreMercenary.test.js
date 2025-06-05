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

  const { gameState, createMonster, createMercenary, processProjectiles, attackAction } = dom.window;

  gameState.player.job = 'Archer';

  const merc = createMercenary('WARRIOR', gameState.player.x + 1, gameState.player.y);
  gameState.activeMercenaries.push(merc);
  gameState.dungeon[merc.y][merc.x] = 'empty';

  const monster = createMonster('ZOMBIE', gameState.player.x + 3, gameState.player.y);
  monster.range = 0;
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';
  gameState.dungeon[monster.y][monster.x - 1] = 'empty';
  gameState.dungeon[monster.y][monster.x - 2] = 'empty';

  attackAction();
  const proj = gameState.projectiles[0];
  if (proj.x !== gameState.player.x + 1) {
    console.error('projectile did not move onto mercenary');
    process.exit(1);
  }
  if (merc.health !== merc.maxHealth) {
    console.error('projectile affected mercenary');
    process.exit(1);
  }
  processProjectiles();
  if (proj.x !== gameState.player.x + 2) {
    console.error('projectile did not pass through mercenary');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
