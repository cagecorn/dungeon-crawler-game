const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame({ spawnPaladin: true });
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const { gameState, movePlayer } = win;
  const spawn = gameState.paladinSpawns[0];
  if (!spawn) {
    console.error('paladin spawn missing');
    process.exit(1);
  }
  gameState.player.gold = spawn.cost || 1;
  win.confirm = () => true;
  movePlayer(spawn.x - gameState.player.x, spawn.y - gameState.player.y);
  if (!gameState.activeMercenaries.some(m => m.type === 'PALADIN')) {
    console.error('paladin not hired');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
