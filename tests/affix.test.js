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

  const prefixesLen = dom.window.eval('PREFIXES.length');
  const suffixesLen = dom.window.eval('SUFFIXES.length');
  const prefixIndex = dom.window.eval('PREFIXES.findIndex(p => p.modifiers.healthRegen)');
  const suffixIndex = dom.window.eval('SUFFIXES.findIndex(s => s.modifiers.manaRegen)');

  const seq = [
    0.5, // id
    0.1, // apply prefix
    (prefixIndex + 0.1) / prefixesLen, // select restorative prefix
    0.1, // apply suffix
    (suffixIndex + 0.1) / suffixesLen // select clarity suffix
  ];
  const originalRandom = dom.window.Math.random;
  dom.window.Math.random = () => seq.shift();

  const { createItem } = dom.window;
  const item = createItem('shortSword', 0, 0);

  dom.window.Math.random = originalRandom;

  if (item.prefix !== dom.window.eval(`PREFIXES[${prefixIndex}].name`) ||
      item.suffix !== dom.window.eval(`SUFFIXES[${suffixIndex}].name`) ||
      item.healthRegen !== 1 || item.manaRegen !== 1) {
    console.error('affixes not applied correctly');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
