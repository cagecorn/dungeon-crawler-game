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

  const { gameState, createMonster, createItem, performAttack } = win;

  const size = 7;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.player.x = 3;
  gameState.player.y = 3;
  gameState.dungeon[3][3] = 'empty';

  const inRange = createMonster('ZOMBIE', 4, 3);
  const outRange = createMonster('ZOMBIE', 7, 3);
  gameState.monsters.push(inRange, outRange);
  gameState.dungeon[inRange.y][inRange.x] = 'monster';
  gameState.dungeon[outRange.y][outRange.x] = 'monster';

  const weapon = createItem('shortSword', 0, 0);
  weapon.tier = 'unique';
  weapon.procs = [{ trigger: 'onAttack', skill: 'FireNova', chance: 1 }];
  gameState.player.equipped.weapon = weapon;

  win.rollDice = spec => {
    if (spec === '1d20') return 20;
    const m = /^1d(\d+)/.exec(spec);
    if (m) return parseInt(m[1]);
    return 1;
  };
  win.Math.random = () => 0;

  performAttack(gameState.player, inRange);

  if (inRange.health === inRange.maxHealth) {
    console.error('in-range enemy not damaged');
    process.exit(1);
  }
  if (outRange.health !== outRange.maxHealth) {
    console.error('out-of-range enemy damaged');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
