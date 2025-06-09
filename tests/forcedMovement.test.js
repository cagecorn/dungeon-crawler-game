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
  win.processTurn = () => {};

  const { assignSkill, skill1Action, createMonster, gameState } = win;

  const size = 5;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.player.x = 2;
  gameState.player.y = 2;
  gameState.monsters = [];
  gameState.dungeon[2][2] = 'empty';

  // knockback success
  const m1 = createMonster('ZOMBIE', 2, 3);
  m1.health = m1.maxHealth = 999;
  m1.statusResistances.force = 0;
  gameState.monsters.push(m1);
  gameState.dungeon[3][2] = 'monster';

  gameState.player.mana = 10;
  gameState.player.skills.push('KnockbackStrike');
  assignSkill(1, 'KnockbackStrike');

  win.rollDice = () => 20;
  skill1Action();

  if (m1.y !== 4) {
    console.error('monster not knocked back');
    process.exit(1);
  }

  // knockback resisted
  gameState.monsters = [];
  gameState.dungeon[3][2] = 'empty';
  const m2 = createMonster('ZOMBIE', 2, 1);
  m2.health = m2.maxHealth = 999;
  m2.statusResistances.force = 1;
  gameState.monsters.push(m2);
  gameState.dungeon[1][2] = 'monster';
  gameState.player.mana = 10;

  win.rollDice = () => 1;
  skill1Action();

  if (m2.y !== 1) {
    console.error('resisted knockback moved target');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
