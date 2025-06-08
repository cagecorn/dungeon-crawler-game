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

  const size = 5;
  const { assignSkill, skill1Action, createMonster, createItem, gameState, getStat } = win;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.monsters = [];
  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.dungeon[1][1] = 'empty';

  // Test Fire Nova
  gameState.player.skills.push('FireNova');
  assignSkill(1, 'FireNova');
  const fireWeapon = createItem('shortSword', 0, 0);
  fireWeapon.fireDamage = 2;
  gameState.player.equipped.weapon = fireWeapon;
  gameState.player.intelligence = 4;

  const m1 = createMonster('ZOMBIE', gameState.player.x + 1, gameState.player.y);
  const m2 = createMonster('ZOMBIE', gameState.player.x, gameState.player.y + 2);
  gameState.monsters.push(m1, m2);
  gameState.dungeon[m1.y][m1.x] = 'monster';
  gameState.dungeon[m2.y][m2.x] = 'monster';

  let captured = [];
  win.performAttack = (att, def, opts) => { captured.push(opts); return { hit: true, crit: false, baseDamage: 0, elementDamage: 0 }; };
  win.rollDice = () => 4;
  skill1Action();

  const expected = 4 + getStat(gameState.player, 'magicPower');
  const relevantFire = captured.filter(c => c.element);
  if (relevantFire.length !== 2 || relevantFire.some(c => c.attackValue !== expected || c.element !== 'fire')) {
    console.error('fire nova incorrect', JSON.stringify(captured));
    process.exit(1);
  }

  // Test Ice Nova
  captured = [];
  gameState.monsters = [];
  gameState.dungeon[m1.y][m1.x] = 'empty';
  gameState.dungeon[m2.y][m2.x] = 'empty';
  const i1 = createMonster('ZOMBIE', gameState.player.x + 1, gameState.player.y);
  const i2 = createMonster('ZOMBIE', gameState.player.x, gameState.player.y + 2);
  gameState.monsters.push(i1, i2);
  gameState.dungeon[i1.y][i1.x] = 'monster';
  gameState.dungeon[i2.y][i2.x] = 'monster';
  gameState.player.skills.push('IceNova');
  assignSkill(1, 'IceNova');
  const iceWeapon = createItem('shortSword', 0, 0);
  iceWeapon.iceDamage = 2;
  gameState.player.equipped.weapon = iceWeapon;
  win.rollDice = () => 5;
  skill1Action();

  const expectedIce = 5 + getStat(gameState.player, 'magicPower');
  const relevantIce = captured.filter(c => c.element);
  if (relevantIce.length !== 2 || relevantIce.some(c => c.attackValue !== expectedIce || c.element !== 'ice')) {
    console.error('ice nova incorrect', JSON.stringify(captured));
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
