const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const { spawnStartingTiles, gameState } = win;

  const size = 3;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.mapTiles = [];
  gameState.player.x = 1;
  gameState.player.y = 1;

  spawnStartingTiles();

  const expected = ['flower', 'volcano', 'metal'];
  for (const type of expected) {
    if (!gameState.mapTiles.some(t => t.key === type)) {
      console.error('missing tile ' + type);
      process.exit(1);
    }
  }

  if (gameState.mapTiles.length !== expected.length) {
    console.error('tile count mismatch');
    process.exit(1);
  }

  for (const tile of gameState.mapTiles) {
    if (gameState.dungeon[tile.y][tile.x] !== 'tile') {
      console.error('tile not placed on map');
      process.exit(1);
    }
  }
}

run().catch(e => { console.error(e); process.exit(1); });
