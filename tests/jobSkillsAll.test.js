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
  const PLAYER_JOB_SKILLS = win.eval('PLAYER_JOB_SKILLS');

  for (const [job, skills] of Object.entries(PLAYER_JOB_SKILLS)) {
    startGame(job);
    if (gameState.player.job !== job ||
        gameState.player.assignedSkills[1] !== skills[0] ||
        gameState.player.assignedSkills[2] !== skills[1]) {
      console.error(`skills mismatch for ${job}`);
      process.exit(1);
    }
  }
}

run().catch(e => { console.error(e); process.exit(1); });
