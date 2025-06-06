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
  const ABILITY_TRAITS = Array.from(dom.window.eval('ABILITY_TRAITS'));
  const REACTIVE_TRAITS = Array.from(dom.window.eval('REACTIVE_TRAITS'));
  const STATUS_TRAITS = Array.from(dom.window.eval('STATUS_TRAITS'));
  const FIELD_TRAITS = Array.from(dom.window.eval('FIELD_TRAITS'));
  const SPECIAL_ACTION_TRAITS = Array.from(dom.window.eval('SPECIAL_ACTION_TRAITS'));

  assert.deepStrictEqual(ABILITY_TRAITS, [
    '철벽',
    '의지의 불꽃',
    '마력 조율자',
    '오크의 피',
    '돌주먹',
    '거산',
    '장신',
    '재빠름'
  ]);
  assert.deepStrictEqual(REACTIVE_TRAITS, [
    '복수의 피',
    '도망자 감각',
    '조용함'
  ]);
  assert.deepStrictEqual(STATUS_TRAITS, [
    '은밀한 칼날',
    '구호의 손길',
    '불꽃의 혼',
    '빙결의 혼'
  ]);
  assert.deepStrictEqual(FIELD_TRAITS, [
    '재산 관리인',
    '책벌레'
  ]);
  assert.deepStrictEqual(SPECIAL_ACTION_TRAITS, []);

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
