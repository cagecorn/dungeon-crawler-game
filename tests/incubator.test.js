const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.addMessage = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createItem, placeEggInIncubator, advanceIncubators, gameState } = win;

  gameState.incubators = [null, null];
  gameState.hatchedSuperiors = [];

  const egg = createItem('superiorEgg', 0, 0);
  if (!placeEggInIncubator(egg, 2)) {
    console.error('failed to place egg');
    process.exit(1);
  }

  if (!gameState.incubators[0] || gameState.incubators[0].remainingTurns !== 2) {
    console.error('egg not placed correctly');
    process.exit(1);
  }

  advanceIncubators();
  if (!gameState.incubators[0] || gameState.incubators[0].remainingTurns !== 1) {
    console.error('countdown did not decrease');
    process.exit(1);
  }

  advanceIncubators();
  if (gameState.hatchedSuperiors.length !== 1) {
    console.error('egg did not hatch');
    process.exit(1);
  }
  if (gameState.incubators[0] !== null) {
    console.error('incubator not empty after hatching');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
