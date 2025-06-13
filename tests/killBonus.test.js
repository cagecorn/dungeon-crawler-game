const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();
  win.Math.random = () => 0.99;

  const { gameState, createMonster, killMonster } = win;

  const weapon = win.createItem('shortSword', 0, 0);
  weapon.killHealth = 2;
  weapon.killMana = 1;
  gameState.player.equipped.weapon = weapon;
  gameState.player.health = 5;
  gameState.player.mana = 0;

  const monster = createMonster('ZOMBIE', gameState.player.x + 1, gameState.player.y);
  monster.health = 1;
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  monster.health = 0;
  killMonster(monster, gameState.player);
  if (gameState.player.health !== 7 || gameState.player.mana !== 1) {
    console.error('kill bonuses not applied');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
