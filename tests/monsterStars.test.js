const { rollDice } = require('../dice');
const { JSDOM } = require('jsdom');
const path = require('path');

async function run() {
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
    beforeParse(window) { window.rollDice = rollDice; }
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
  win.requestAnimationFrame = fn => fn();

  const { createMonster, showMonsterDetails, convertMonsterToMercenary, gameState, checkMonsterLevelUp } = win;

  const monster = createMonster('ZOMBIE', gameState.player.x + 1, gameState.player.y);
  const total = Object.values(monster.stars).reduce((a,b)=>a+b,0);
  if (total > 9) {
    console.error('star total exceeds 9');
    process.exit(1);
  }

  showMonsterDetails(monster);
  const html = win.document.getElementById('monster-detail-content').innerHTML;
  if (!html.includes('★'.repeat(monster.stars.strength))) {
    console.error('stars not shown in monster details');
    process.exit(1);
  }

  monster.stars = { strength: 2, agility: 0, endurance: 0, focus: 0, intelligence: 0 };
  const prev = monster.strength;
  monster.exp = monster.expNeeded;
  checkMonsterLevelUp(monster);
  const expected = prev + 1 + monster.stars.strength * 0.5;
  if (monster.strength !== expected) {
    console.error('star growth not applied for monster');
    process.exit(1);
  }

  delete monster.stars;
  const merc = convertMonsterToMercenary(monster);
  const loadSum = Object.values(merc.stars).reduce((a,b)=>a+b,0);
  if (loadSum > 9) {
    console.error('stars invalid after conversion');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
