const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateIncubatorDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createItem, placeEggInIncubator, advanceIncubators, gameState } = win;

  const initialEggs = gameState.incubators.filter(Boolean).length;

  const egg = createItem('superiorEgg', 0, 0);
  placeEggInIncubator(egg, 1);

  if (gameState.incubators.filter(Boolean).length !== initialEggs + 1) {
    console.error('egg not placed in incubator');
    process.exit(1);
  }

  for (let i = 0; i < 2; i++) {
    advanceIncubators();
  }

  if (gameState.hatchedSuperiors.length < initialEggs + 1) {
    console.error('egg did not hatch');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
