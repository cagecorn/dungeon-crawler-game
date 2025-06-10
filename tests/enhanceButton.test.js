const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createItem, addToInventory } = win;

  const sword = createItem('shortSword', 0, 0);
  const potion = createItem('healthPotion', 0, 0);
  win.gameState.player.inventory = [];
  addToInventory(sword);
  addToInventory(potion);

  const container = win.document.getElementById('inventory-items');
  const items = container.querySelectorAll('.inventory-item');
  if (items.length !== 2) {
    console.error('unexpected item count');
    process.exit(1);
  }

  const weaponEnhance = items[0].querySelector('.enhance-button');
  const potionEnhance = items[1].querySelector('.enhance-button');
  if (!weaponEnhance) {
    console.error('enhance button missing for weapon');
    process.exit(1);
  }
  if (potionEnhance) {
    console.error('enhance button shown for potion');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
