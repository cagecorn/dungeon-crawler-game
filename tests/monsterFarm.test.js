const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateFarmDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const {
    createMonster,
    convertMonsterToMercenary,
    plantMonster,
    advanceFarms,
    harvestMonster,
    gameState
  } = win;

  const ITEM_TYPES = win.eval('ITEM_TYPES');

  // deterministic results
  win.Math.random = () => 0;

  // give fertilizer to player inventory
  gameState.player.inventory.push({ key: 'fertilizer', name: 'fert', type: ITEM_TYPES.FERTILIZER });

  const monster = createMonster('GOBLIN', 1, 1, 1);
  const merc = convertMonsterToMercenary(monster);

  plantMonster(merc, 0);
  if (!gameState.farms[0] || !gameState.farms[0].fertilizer) {
    console.error('farm slot not planted with fertilizer');
    process.exit(1);
  }

  // advance turns until harvest
  for (let i = 0; i < 5; i++) {
    advanceFarms();
  }
  harvestMonster(0);

  if (gameState.farms[0] !== null) {
    console.error('farm slot not cleared after harvest');
    process.exit(1);
  }
  const essence = gameState.player.inventory.find(i => String(i.name).includes('정수'));
  if (!essence) {
    console.error('harvested item not added');
    process.exit(1);
  }

  const expectedAtk = Math.floor(merc.attack * 0.6); // 0.5 * 1.2 multiplier
  if (essence.attack !== expectedAtk) {
    console.error('fertilizer effect on stats missing');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
