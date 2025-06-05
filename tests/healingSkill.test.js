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

  gameState.player.health = Math.max(1, gameState.player.maxHealth - 5);

  const book = createItem('healingBook', gameState.player.x + 1, gameState.player.y);
  gameState.items.push(book);
  gameState.dungeon[book.y][book.x] = 'item';

  movePlayer(1, 0);
  if (!gameState.player.skills.includes('Healing')) {
    console.error('healing skill not learned');
    process.exit(1);
  }

  gameState.player.health -= 5;
  assignSkill(1, 'Healing');
  skill1Action();

  if (gameState.player.health <= gameState.player.maxHealth - 5) {
    console.error('healing skill did not heal');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
