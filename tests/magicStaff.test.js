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

  dom.window.Math.random = () => 0.1;

  const { createItem } = dom.window;
  const item = createItem('magicStaff', 0, 0);

  if (item.prefix !== 'Flaming' || item.suffix !== 'of Protection') {
    console.error('prefix or suffix not applied');
    process.exit(1);
  }
  if (item.fireDamage !== 2 || item.defense !== 2) {
    console.error('modifiers not applied');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
