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
  dom.window.processTurn = () => {};
  dom.window.processProjectiles = () => {};

  const { gameState, movePlayer, assignSkill, skill1Action, createMonster, createItem } = dom.window;

  const sb = createItem('fireballBook', gameState.player.x + 1, gameState.player.y);
  gameState.items.push(sb);
  gameState.dungeon[sb.y][sb.x] = 'item';

  const monster = createMonster('ZOMBIE', gameState.player.x + 2, gameState.player.y);
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  movePlayer(1, 0);
  if (!gameState.player.skills.includes('Fireball')) {
    console.error('skill not learned');
    process.exit(1);
  }

  assignSkill(1, 'Fireball');
  const manaBefore = gameState.player.mana;
  skill1Action();

  const expectedMana = manaBefore - dom.window.SKILL_DEFS.Fireball.manaCost;

  const proj = gameState.projectiles[0];
  if (!proj || proj.skill !== 'Fireball' || proj.icon !== '🔥') {
    console.error('skill projectile not created correctly');
    process.exit(1);
  }
  if (gameState.player.mana !== expectedMana) {
    console.error('mana not deducted');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
