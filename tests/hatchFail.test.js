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

  const { gameState, createMonster, updateIncubatorDisplay } = win;

  const mon = createMonster('ZOMBIE', 0, 0);
  gameState.hatchedSuperiors.push(mon);

  // simulate bug: detail panel not shown
  win.showMonsterDetails = () => {};

  updateIncubatorDisplay();

  const waiting = win.document.getElementById('hatched-list');
  const entry = waiting.firstElementChild;
  if (!entry) {
    console.error('hatched entry missing');
    process.exit(1);
  }

  const nameSpan = entry.querySelector('span');
  nameSpan.click();

  if (gameState.hatchedSuperiors.length !== 0) {
    console.error('failed hatch not removed');
    process.exit(1);
  }
  const log = win.document.getElementById('message-log');
  const msg = log.lastElementChild;
  if (!msg || msg.textContent.trim() !== '알의 부화에 실패했습니다.') {
    console.error('failure message missing');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
