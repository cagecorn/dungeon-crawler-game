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

  const { gameState, showMercenaryDetails, sacrificeMercenary, useItemOnTarget } = win;

  const zombie = gameState.activeMercenaries.find(m => m.name.includes('좀비'));
  if (!zombie || zombie.affinity !== 195) {
    console.error('zombie mercenary not initialized');
    process.exit(1);
  }
  const meals = gameState.player.inventory.filter(i => i.key === 'meal');
  if (meals.length !== 5) {
    console.error('starting meals incorrect');
    process.exit(1);
  }

  zombie.affinity = 200;
  showMercenaryDetails(zombie);
  const html = win.document.getElementById('mercenary-detail-content').innerHTML;
  if (!html.includes('희생')) {
    console.error('sacrifice button missing');
    process.exit(1);
  }

  sacrificeMercenary(zombie);
  if (gameState.activeMercenaries.includes(zombie)) {
    console.error('mercenary not removed after sacrifice');
    process.exit(1);
  }
  const essences = gameState.player.inventory.filter(i => i.key === 'strengthEssence');
  if (essences.length !== 1) {
    console.error('essence not granted');
    process.exit(1);
  }

  const before = gameState.player.strength;
  useItemOnTarget(essences[0], gameState.player);
  if (gameState.player.strength !== before + 1) {
    console.error('essence not used correctly');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
