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

  const { startGame, gameState } = win;
  const SKILL_DEFS = win.eval('SKILL_DEFS');
  const keys = Object.keys(SKILL_DEFS);

  startGame();
  if (gameState.player.skills.length !== keys.length || !keys.every(k => gameState.player.skills.includes(k))) {
    console.error('startGame did not grant all skills');
    process.exit(1);
  }
  if (gameState.player.assignedSkills[1] !== keys[0] || gameState.player.assignedSkills[2] !== keys[1]) {
    console.error('skill slots not assigned correctly');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
