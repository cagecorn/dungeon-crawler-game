const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createMonster, killMonster, ignoreCorpse, gameState } = win;

  const size = 3;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.monsters = [];
  gameState.corpses = [];
  gameState.items = [];

  gameState.player.x = 0;
  gameState.player.y = 1;

  const monster = createMonster('GOBLIN', 1, 1, 1);
  gameState.monsters.push(monster);
  gameState.dungeon[1][1] = 'monster';
  killMonster(monster);

  // ensure corpse recorded
  if (!gameState.corpses.includes(monster) || gameState.dungeon[1][1] !== 'corpse') {
    console.error('corpse not created');
    process.exit(1);
  }

  ignoreCorpse(monster);

  if (gameState.player.x !== 2 || gameState.player.y !== 1) {
    console.error('player did not move past corpse');
    process.exit(1);
  }
  if (gameState.dungeon[1][1] !== 'corpse') {
    console.error('corpse removed after ignore');
    process.exit(1);
  }
  if (gameState.turn !== 2) {
    console.error('turn count not advanced twice');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
