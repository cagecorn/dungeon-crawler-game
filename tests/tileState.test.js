const { loadGame } = require('./helpers');
const assert = require('assert');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const { gameState, hireMercenary, createMonster, convertMonsterToMercenary } = win;

  assert.strictEqual(gameState.player.equipped.tile, null, 'player tile slot not initialized');
  assert.ok(Array.isArray(gameState.player.tileInventory), 'tileInventory not array');
  assert.ok(Array.isArray(gameState.mapTiles), 'mapTiles not array');

  gameState.player.gold = 500;
  hireMercenary('WARRIOR');
  const merc = gameState.activeMercenaries[0];
  assert.ok(merc.equipped && 'tile' in merc.equipped && merc.equipped.tile === null, 'mercenary tile slot missing');

  const monster = createMonster('GOBLIN', 0, 0, 1);
  const merc2 = convertMonsterToMercenary(monster);
  assert.ok('tile' in merc2.equipped && merc2.equipped.tile === null, 'converted mercenary tile slot missing');
}

run().catch(e => { console.error(e); process.exit(1); });
