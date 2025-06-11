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

  const {
    gameState,
    createMercenary,
    assignSkill,
    skill1Action,
    tryApplyStatus,
    getStat
  } = win;

  const size = 5;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.monsters = [];
  gameState.activeMercenaries = [];
  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.dungeon[1][1] = 'empty';

  const merc = createMercenary('WARRIOR', 2, 1);
  gameState.activeMercenaries.push(merc);

  // Heal
  gameState.player.skills.push('Heal');
  assignSkill(1, 'Heal');
  merc.health = getStat(merc, 'maxHealth') - 5;
  gameState.player.mana = 10;
  skill1Action();
  const expectedHealMana = 10 - 3 + 0.5;
  if (merc.health <= getStat(merc, 'maxHealth') - 5 || gameState.player.mana !== expectedHealMana) {
    console.error('heal did not heal ally or mana wrong');
    process.exit(1);
  }

  // Purify
  gameState.player.skills.push('Purify');
  assignSkill(1, 'Purify');
  const originalRoll = win.rollDice;
  win.rollDice = () => 20;
  tryApplyStatus(merc, 'poison', 2);
  win.rollDice = originalRoll;
  gameState.player.mana = 10;
  skill1Action();
  const expectedPurifyMana = 10 - 2 + 0.5;
  if (merc.poison || gameState.player.mana !== expectedPurifyMana) {
    console.error('purify did not remove status or mana wrong');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
