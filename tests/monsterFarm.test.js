const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const { gameState, createMonster, plantMonsterInFarm, advanceMonsterFarms } = win;

  const size = 5;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.player.x = 2;
  gameState.player.y = 2;
  gameState.items = [];

  const monster = createMonster('GOBLIN', 3, 3, 1);
  gameState.monsters = [monster];
  gameState.dungeon[monster.y][monster.x] = 'monster';

  const skill = monster.monsterSkill || monster.auraSkill || null;

  plantMonsterInFarm(monster, 2);
  if (gameState.monsters.length !== 0 || !gameState.monsterFarms[0]) {
    console.error('monster not planted');
    process.exit(1);
  }

  advanceMonsterFarms();
  if (gameState.items.length !== 0) {
    console.error('harvested too early');
    process.exit(1);
  }

  advanceMonsterFarms();
  if (gameState.items.length !== 1 || gameState.monsterFarms[0]) {
    console.error('harvest did not occur');
    process.exit(1);
  }

  const item = gameState.items[0];
  if (item.attack !== monster.attack || item.defense !== monster.defense || item.skill !== skill) {
    console.error('harvest item does not reflect monster stats');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
