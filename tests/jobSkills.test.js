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

  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.updateSkillDisplay = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const { gameState } = dom.window;

  if (gameState.player.job !== 'Warrior') {
    console.error('default job not Warrior');
    process.exit(1);
  }

  if (gameState.player.assignedSkills[1] !== 'DoubleStrike' || gameState.player.assignedSkills[2] !== 'ChargeAttack') {
    console.error('job skills not assigned');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
