const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createMonster, killMonster, gameState } = win;

  gameState.dungeonSize = 3;
  gameState.dungeon = Array.from({ length: 3 }, () => Array(3).fill('empty'));
  gameState.fogOfWar = Array.from({ length: 3 }, () => Array(3).fill(false));
  gameState.monsters = [];
  gameState.items = [];
  gameState.corpses = [];

  const monster = createMonster('GOBLIN', 1, 1, 1);
  monster.lootChance = 1;
  gameState.monsters.push(monster);
  gameState.dungeon[1][1] = 'monster';

  const seq = [0, 0, 1, 0, 0];
  const origRandom = win.Math.random;
  win.Math.random = () => seq.shift() ?? origRandom();

  killMonster(monster);

  win.Math.random = origRandom;

  if (gameState.items.length !== 1) {
    console.error('no drop');
    process.exit(1);
  }
  const drop = gameState.items[0];
  if (drop.type !== win.eval('ITEM_TYPES').RECIPE_SCROLL) {
    console.error('drop not recipe scroll');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
