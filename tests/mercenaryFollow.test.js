const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();

  // override visual methods
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const { hireMercenary, movePlayer, saveGame, localStorage, gameState } = win;

  // ensure enough gold for hiring
  gameState.player.gold = 200;
  gameState.activeMercenaries = [];

  hireMercenary('WARRIOR');
  hireMercenary('ARCHER');

  saveGame();
  let state = JSON.parse(localStorage.getItem('dungeonCrawlerSave'));
  if (state.activeMercenaries.length !== 2) {
    console.error('expected 2 mercenaries');
    process.exit(1);
  }

  for (let i = 0; i < 3; i++) {
    movePlayer(1, 0);
  }

  saveGame();
  state = JSON.parse(localStorage.getItem('dungeonCrawlerSave'));
  const distances = state.activeMercenaries.map(m =>
    Math.abs(m.x - state.player.x) + Math.abs(m.y - state.player.y)
  );
  // console.log('distances from player:', distances.join(','));
  if (distances.some(d => d > 3)) {
    console.error('mercenary too far from player');
    process.exit(1);
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
