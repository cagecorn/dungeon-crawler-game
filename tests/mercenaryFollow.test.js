const { JSDOM } = require('jsdom');
const path = require('path');

async function run() {
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost'
  });

  await new Promise(resolve => {
    if (dom.window.document.readyState === 'complete') resolve();
    else dom.window.addEventListener('load', resolve);
  });

  // override visual methods
  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const { hireMercenary, movePlayer, saveGame, localStorage, gameState } = dom.window;

  // ensure enough gold for hiring
  gameState.player.gold = 200;

  hireMercenary('WARRIOR');
  hireMercenary('ARCHER');

  saveGame();
  let state = JSON.parse(localStorage.getItem('dungeonCrawlerSave'));
  if (state.mercenaries.length !== 2) {
    console.error('expected 2 mercenaries');
    process.exit(1);
  }

  for (let i = 0; i < 3; i++) {
    movePlayer(1, 0);
  }

  saveGame();
  state = JSON.parse(localStorage.getItem('dungeonCrawlerSave'));
  const distances = state.mercenaries.map(m =>
    Math.abs(m.x - state.player.x) + Math.abs(m.y - state.player.y)
  );
  console.log('distances from player:', distances.join(','));
  if (distances.some(d => d > 3)) {
    console.error('mercenary too far from player');
    process.exit(1);
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
