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

  const win = dom.window;
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.updateSkillDisplay = () => {};
  win.requestAnimationFrame = fn => fn();

  const { createChampion, gameState, killMonster, createItem } = win;

  const champ = createChampion('WARRIOR', 0, 0, 3);
  if (!champ.isChampion || champ.level !== 3) {
    console.error('champion creation failed');
    process.exit(1);
  }


  const scaled = createChampion('ARCHER', 0, 0, 5);
  if (scaled.level !== 5) {
    console.error('level scaling failed');
    process.exit(1);
  }

  const dropChamp = createChampion('ARCHER', 1, 1, 1);
  dropChamp.equipped.weapon = createItem('shortSword', 0, 0);
  gameState.monsters = [dropChamp];
  gameState.items = [];
  gameState.dungeon = Array.from({ length: 3 }, () => Array(3).fill('empty'));
  gameState.dungeon[1][1] = 'monster';
  killMonster(dropChamp);
  if (gameState.items.length !== 1) {
    console.error('champion drop not guaranteed');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
