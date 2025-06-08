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

  const { gameState, createMonster, processProjectiles, getStat } = win;

  // boost player's magic power via intelligence
  gameState.player.intelligence = 5;

  const monster = createMonster('ZOMBIE', gameState.player.x + 1, gameState.player.y);
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  const proj = { x: gameState.player.x, y: gameState.player.y, dx: 1, dy: 0, rangeLeft: 1, damageDice: '1d10', magic: true };
  gameState.projectiles.push(proj);

  win.rollDice = () => 10;

  let captured;
  win.performAttack = (attacker, defender, opts) => {
    captured = opts;
    return { hit: true, crit: false, baseDamage: 0, elementDamage: 0 };
  };

  processProjectiles();

  const expected = 10 + getStat(gameState.player, 'magicPower');
  if (!captured || captured.attackValue !== expected || captured.magic !== true) {
    console.error('magic projectile not scaled properly');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
