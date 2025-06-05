const { JSDOM } = require('jsdom');
const path = require('path');
const assert = require('assert');

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

  const hireMercenary = dom.window.hireMercenary;
  const gameState = dom.window.gameState;
  const POSITIVE_TRAITS = dom.window.eval('POSITIVE_TRAITS');
  const NEGATIVE_TRAITS = dom.window.eval('NEGATIVE_TRAITS');
  const TRADEOFF_TRAITS = dom.window.eval('TRADEOFF_TRAITS');

  const allTraits = [...POSITIVE_TRAITS, ...NEGATIVE_TRAITS, ...TRADEOFF_TRAITS];
  // hire a mercenary and verify its traits
  gameState.player.gold = 1000; // ensure enough gold
  hireMercenary('WARRIOR');
  const merc = gameState.activeMercenaries[0];
  assert.ok(merc, 'mercenary not created');
  assert.strictEqual(merc.traits.length, 2, 'two traits expected');
  merc.traits.forEach(t => {
    assert.ok(allTraits.includes(t), `invalid trait: ${t}`);
  });
}

run().catch(e => { console.error(e); process.exit(1); });
