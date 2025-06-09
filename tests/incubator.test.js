const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.updateIncubatorDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const {
    createItem,
    placeEggInIncubator,
    advanceIncubators,
    gameState
  } = win;

  // reset incubators and inventory
  gameState.incubators = [null, null];
  gameState.hatchedSuperiors = [];
  gameState.player.inventory = [];

  const egg = createItem('superiorEgg', 0, 0);
  gameState.player.inventory.push(egg);
  placeEggInIncubator(egg, 1);

  if (!gameState.incubators[0]) {
    console.error('egg not placed');
    process.exit(1);
  }

  let safety = 10;
  while (gameState.incubators[0] && safety-- > 0) {
    advanceIncubators();
  }

  if (gameState.incubators[0] !== null) {
    console.error('incubator slot not cleared');
    process.exit(1);
  }
  if (gameState.hatchedSuperiors.length !== 1) {
    console.error('hatched monster missing');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
