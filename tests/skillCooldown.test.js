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

  const { gameState, assignSkill, skill1Action, createMonster, processTurn } = win;
  const SKILL_DEFS = win.eval('SKILL_DEFS');

  const size = 3;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.player.x = 1;
  gameState.player.y = 1;

  const monster = createMonster('ZOMBIE', 2, 1, 10);
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  gameState.player.manaRegen = 0;
  gameState.player.mana = 10;
  win.rollDice = () => 1;
  gameState.player.skills.push('Fireball');
  assignSkill(1, 'Fireball');

  skill1Action();
  const cdVal = gameState.player.skillCooldowns['Fireball'];
  if (cdVal !== SKILL_DEFS['Fireball'].cooldown) {
    console.error('cooldown not applied');
    process.exit(1);
  }
  const manaAfter = gameState.player.mana;
  skill1Action();
  if (gameState.player.mana !== manaAfter) {
    console.error('skill used while on cooldown');
    process.exit(1);
  }
  if (gameState.player.skillCooldowns['Fireball'] !== SKILL_DEFS['Fireball'].cooldown - 1) {
    console.error('cooldown did not tick after use attempt');
    process.exit(1);
  }
  processTurn();
  if (gameState.player.skillCooldowns['Fireball'] !== 0) {
    console.error('cooldown not reduced by processTurn');
    process.exit(1);
  }
  skill1Action();
  if (gameState.player.mana >= manaAfter) {
    console.error('skill did not cast after cooldown');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
