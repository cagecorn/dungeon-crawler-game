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

  const { gameState, assignSkill, skill1Action, movePlayer, createMonster } = dom.window;

  gameState.player.skills.push('Fireball');
  assignSkill(1, 'Fireball');

  const monster = createMonster('ZOMBIE', gameState.player.x + 1, gameState.player.y);
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  gameState.player.mana = 3;
  skill1Action();
  if (gameState.player.mana !== 0.5) {
    console.error('mana not used or regenerated correctly');
    process.exit(1);
  }

  movePlayer(1, 0);
  if (gameState.player.mana !== 1.0) {
    console.error('mana did not regenerate on turn');
    process.exit(1);
  }

  const before = gameState.projectiles.length;
  gameState.player.mana = 0;
  skill1Action();
  if (gameState.projectiles.length !== before) {
    console.error('skill should not fire without mana');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
