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

  const { createMercenary, createChampion, gameState } = win;

  const merc = createMercenary('WARRIOR', 0, 0);
  const champ = createChampion('WARRIOR', 0, 0, 1);

  const checkSlots = (unit, label) => {
    if (!unit.equipped || !('trophy' in unit.equipped) || !('artifact' in unit.equipped)) {
      console.error(`${label} missing equip slots`);
      process.exit(1);
    }
    if (unit.equipped.trophy !== null || unit.equipped.artifact !== null) {
      console.error(`${label} equip slots not null by default`);
      process.exit(1);
    }
  };

  checkSlots(gameState.player, 'player');
  checkSlots(merc, 'mercenary');
  checkSlots(champ, 'champion');
}

run().catch(e => { console.error(e); process.exit(1); });
