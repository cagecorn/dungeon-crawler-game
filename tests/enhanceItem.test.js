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

  const {
    createItem,
    addToInventory,
    enhanceItem,
    formatItem,
    gameState
  } = win;

  const sword = createItem('shortSword', 0, 0);
  addToInventory(sword);
  gameState.materials.iron = 2;

  const ironBefore = gameState.materials.iron;
  const attackBefore = sword.attack;
  const success = enhanceItem(sword);
  assert.strictEqual(success, true, 'enhanceItem did not return true');
  assert.strictEqual(gameState.materials.iron, ironBefore - 1, 'materials not deducted');
  assert.strictEqual(sword.upgradeLevel, 1, 'upgrade level not incremented');
  const expectedAttack = Math.round(attackBefore * 1.5);
  assert.strictEqual(sword.attack, expectedAttack, 'stats not increased');
  const desc = formatItem(sword);
  assert.ok(desc.includes('+1'), 'upgrade level missing in formatItem');
  assert.ok(desc.includes(`공격+${expectedAttack}`), 'upgraded stats missing in formatItem');
}

run().catch(e => { console.error(e); process.exit(1); });
