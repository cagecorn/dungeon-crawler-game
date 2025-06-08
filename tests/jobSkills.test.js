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

  dom.window.updateStats = () => {};
  dom.window.updateMercenaryDisplay = () => {};
  dom.window.updateInventoryDisplay = () => {};
  dom.window.renderDungeon = () => {};
  dom.window.updateCamera = () => {};
  dom.window.updateSkillDisplay = () => {};
  dom.window.requestAnimationFrame = fn => fn();

  const { gameState } = dom.window;
  const SKILL_DEFS = dom.window.eval('SKILL_DEFS');

  const keys = Object.keys(SKILL_DEFS);
  if (gameState.player.skills.length !== keys.length || !keys.every(k => gameState.player.skills.includes(k))) {
    console.error('player does not start with all skills');
    process.exit(1);
  }

  if (gameState.player.assignedSkills[1] !== keys[0] || gameState.player.assignedSkills[2] !== keys[1]) {
    console.error('default skill slots not assigned');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
