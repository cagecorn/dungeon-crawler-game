const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.updateMaterialsDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createItem, addToInventory, enhanceItem, formatItem, gameState } = win;

  const origRandom = win.Math.random;
  win.Math.random = () => 1;
  const weapon = createItem('shortSword', 0, 0);
  win.Math.random = origRandom;
  addToInventory(weapon);

  gameState.materials.iron = 10;
  gameState.materials.bone = 10;

  const baseAtk = weapon.baseStats.attack;
  const expectedCost = Math.pow(2, (weapon.enhanceLevel || 0));

  enhanceItem(weapon);

  if (gameState.materials.iron !== 10 - expectedCost ||
      gameState.materials.bone !== 10 - expectedCost) {
    console.error('materials not consumed correctly');
    process.exit(1);
  }

  if (weapon.enhanceLevel !== 1) {
    console.error('enhance level not incremented');
    process.exit(1);
  }

  if (weapon.attack !== baseAtk * 1.5) {
    console.error('stats not scaled by enhancement');
    process.exit(1);
  }

  const desc = formatItem(weapon);
  if (!desc.includes('+Lv.1')) {
    console.error('formatItem missing enhance level');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
