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
  const ABILITY_TRAITS = dom.window.eval('ABILITY_TRAITS');
  const REACTIVE_TRAITS = dom.window.eval('REACTIVE_TRAITS');
  const STATUS_TRAITS = dom.window.eval('STATUS_TRAITS');
  const FIELD_TRAITS = dom.window.eval('FIELD_TRAITS');
  const SPECIAL_ACTION_TRAITS = dom.window.eval('SPECIAL_ACTION_TRAITS');

  const allTraits = [
    ...ABILITY_TRAITS,
    ...REACTIVE_TRAITS,
    ...STATUS_TRAITS,
    ...FIELD_TRAITS,
    ...SPECIAL_ACTION_TRAITS
  ];
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
