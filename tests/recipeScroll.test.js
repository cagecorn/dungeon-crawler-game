const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createItem, pickUpAction, gameState } = win;

  gameState.dungeonSize = 3;
  gameState.dungeon = Array.from({ length: 3 }, () => Array(3).fill('empty'));
  gameState.items = [];
  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.player.knownRecipes = [];

  const scroll = createItem('recipeScroll_magicSword', 1, 1);
  gameState.items.push(scroll);
  gameState.dungeon[1][1] = 'item';

  pickUpAction();

  if (!gameState.player.knownRecipes.includes('magicSword')) {
    console.error('recipe not learned');
    process.exit(1);
  }
  if (gameState.player.inventory.some(i => i.id === scroll.id)) {
    console.error('scroll added to inventory');
    process.exit(1);
  }

  const scroll2 = createItem('recipeScroll_magicSword', 1, 1);
  gameState.items.push(scroll2);
  gameState.dungeon[1][1] = 'item';

  pickUpAction();

  if (gameState.player.inventory.some(i => i.id === scroll2.id)) {
    console.error('duplicate scroll added to inventory');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
