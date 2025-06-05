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
  dom.window.requestAnimationFrame = fn => fn();

  const { createItem, formatItem, PREFIXES, SUFFIXES } = dom.window;

  const seq = [0, 0, 0.79, 0, 0.79];
  const origRandom = dom.window.Math.random;
  dom.window.Math.random = () => seq.shift() ?? origRandom();

  const item = createItem('shortSword', 0, 0);

  dom.window.Math.random = origRandom;

  if (item.prefix !== 'Refreshing' || item.suffix !== 'of Wisdom') {
    console.error('prefix or suffix not applied');
    process.exit(1);
  }
  if (item.healthRegen !== 1 || item.manaRegen !== 1) {
    console.error('modifiers not applied');
    process.exit(1);
  }
  const desc = formatItem(item);
  if (!desc.includes('HP회복+') || !desc.includes('MP회복+')) {
    console.error('formatItem missing regen info');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
