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

  let alerted = null;
  win.alert = msg => { alerted = msg; };

  win.addMessage('test', 'info', 'some detail');
  const log = win.document.getElementById('message-log');
  const msg = log.lastElementChild;
  if (!msg.dataset.detail || msg.dataset.detail !== 'some detail') {
    console.error('detail attribute missing');
    process.exit(1);
  }
  msg.click();
  if (alerted !== 'some detail') {
    console.error('detail click did not trigger alert');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
