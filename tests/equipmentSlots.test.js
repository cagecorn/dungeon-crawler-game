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

  const { gameState, createMercenary, createChampion, createMonster, convertMonsterToMercenary } = win;

  if (!('trophy' in gameState.player.equipped) || !('artifact' in gameState.player.equipped)) {
    console.error('player slots missing');
    process.exit(1);
  }

  const merc = createMercenary('WARRIOR', 0, 0);
  if (!('trophy' in merc.equipped) || !('artifact' in merc.equipped)) {
    console.error('mercenary slots missing');
    process.exit(1);
  }

  const champ = createChampion('WARRIOR', 0, 0, 1);
  if (!('trophy' in champ.equipped) || !('artifact' in champ.equipped)) {
    console.error('champion slots missing');
    process.exit(1);
  }

  const mon = createMonster('ZOMBIE', 0, 0, 1);
  const conv = convertMonsterToMercenary(mon);
  if (!('trophy' in conv.equipped) || !('artifact' in conv.equipped)) {
    console.error('converted monster slots missing');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
