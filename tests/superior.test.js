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

  const { createSuperiorMonster, convertMonsterToMercenary } = win;

  const seq = [0];
  const origRandom = win.Math.random;
  win.Math.random = () => seq.shift() ?? origRandom();

  const monster = createSuperiorMonster('GOBLIN', 1, 1, 1);
  win.Math.random = origRandom;

  if (!monster.isSuperior) {
    console.error('superior flag missing');
    process.exit(1);
  }
  if (!monster.skill || !monster.auraSkill) {
    console.error('skills not assigned');
    process.exit(1);
  }
  if (!monster.stars || Object.values(monster.stars).reduce((a,b)=>a+b,0) > 9) {
    console.error('invalid star values');
    process.exit(1);
  }

  const merc = convertMonsterToMercenary(monster);
  if (merc.skill !== monster.skill || merc.skill2 !== monster.auraSkill) {
    console.error('skills not kept after conversion');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
