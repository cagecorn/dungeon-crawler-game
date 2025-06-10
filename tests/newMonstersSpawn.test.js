const { loadGame } = require('./helpers');

async function run() {
  const win = await loadGame();
  win.updateStats = () => {};
  win.updateMercenaryDisplay = () => {};
  win.updateInventoryDisplay = () => {};
  win.renderDungeon = () => {};
  win.updateCamera = () => {};
  win.requestAnimationFrame = fn => fn();

  const getMonsterPoolForFloor = win.getMonsterPoolForFloor;
  const MONSTER_SKILL_SETS = win.eval('MONSTER_SKILL_SETS');
  const MONSTER_TRAIT_SETS = win.eval('MONSTER_TRAIT_SETS');

  const expectations = [
    { floor: 1, pool: ['GOBLIN', 'GOBLIN_ARCHER', 'GOBLIN_WIZARD', 'ZOMBIE'] },
    { floor: 3, pool: ['SKELETON', 'SKELETON_MAGE', 'ORC', 'ORC_ARCHER'] },
    { floor: 5, pool: ['TROLL', 'ORC', 'ORC_ARCHER', 'SKELETON_MAGE'] },
    { floor: 7, pool: ['DARK_MAGE', 'TROLL', 'ORC', 'ORC_ARCHER'] },
    { floor: 9, pool: ['DEMON_WARRIOR', 'DARK_MAGE', 'TROLL', 'ORC'] }
  ];

  for (const { floor, pool } of expectations) {
    const result = getMonsterPoolForFloor(floor);
    if (JSON.stringify(result) !== JSON.stringify(pool)) {
      console.error('unexpected monster pool for floor', floor);
      process.exit(1);
    }
  }

  const newMonsters = ['GOBLIN_ARCHER','GOBLIN_WIZARD','ORC_ARCHER','SKELETON','SKELETON_MAGE','TROLL','DARK_MAGE','DEMON_WARRIOR'];
  for (const key of newMonsters) {
    if (!MONSTER_SKILL_SETS[key]) {
      console.error('missing skill set for', key);
      process.exit(1);
    }
    if (!MONSTER_TRAIT_SETS[key]) {
      console.error('missing trait set for', key);
      process.exit(1);
    }
  }
}

run().catch(e => { console.error(e); process.exit(1); });
