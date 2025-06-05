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

  const { gameState, movePlayer, assignSkill, skill1Action, createItem } = dom.window;

  const sb = createItem('healingBook', gameState.player.x + 1, gameState.player.y);
  gameState.items.push(sb);
  gameState.dungeon[sb.y][sb.x] = 'item';

  movePlayer(1, 0);
  if (!gameState.player.skills.includes('Healing')) {
    console.error('healing skill not learned');
    process.exit(1);
  }

  assignSkill(1, 'Healing');
  gameState.player.health = 5;
  const beforeMana = gameState.player.mana;
  skill1Action();
  if (gameState.player.health <= 5) {
    console.error('healing skill did not heal');
    process.exit(1);
  }
  if (gameState.player.mana !== beforeMana - 3) {
    console.error('healing skill did not use mana');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
