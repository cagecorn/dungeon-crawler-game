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

  const {
    hireMercenary,
    createMonster,
    processMercenaryTurn,
    gameState
  } = win;

  const size = 3;
  gameState.dungeonSize = size;
  gameState.dungeon = Array.from({ length: size }, () => Array(size).fill('empty'));
  gameState.fogOfWar = Array.from({ length: size }, () => Array(size).fill(false));
  gameState.monsters = [];
  gameState.activeMercenaries = [];
  gameState.player.x = 1;
  gameState.player.y = 1;
  gameState.dungeon[1][1] = 'empty';

  gameState.player.gold = 500;
  hireMercenary('WARRIOR');
  const merc = gameState.activeMercenaries[0];
  merc.attack = 50;
  const monster = createMonster('GOBLIN', merc.x + 1, merc.y, 1);
  monster.health = 1;
  gameState.monsters.push(monster);
  gameState.dungeon[monster.y][monster.x] = 'monster';

  const playerExpBefore = gameState.player.exp;
  const mercExpBefore = merc.exp;

  const origRand = win.Math.random;
  const origRoll = win.rollDice;
  win.Math.random = () => 0;
  win.rollDice = () => 20;
  processMercenaryTurn(merc, gameState.monsters);
  win.Math.random = origRand;
  win.rollDice = origRoll;

  const expectedMercGain = Math.floor(monster.exp * 0.6);
  const expectedPlayerGain = Math.floor(monster.exp * 0.4);

  if (merc.exp !== mercExpBefore + expectedMercGain ||
      gameState.player.exp !== playerExpBefore + expectedPlayerGain) {
    console.error('kill bonus not applied');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
