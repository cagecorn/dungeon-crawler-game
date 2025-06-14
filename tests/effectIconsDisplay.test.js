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

  const { gameState, updateUnitEffectIcons } = win;

  // give player two aura skills and two statuses
  gameState.player.skill = 'MightAura';
  gameState.player.skill2 = 'ProtectAura';
  gameState.player.skillLevels['MightAura'] = 1;
  gameState.player.skillLevels['ProtectAura'] = 1;
  gameState.player.poison = true; gameState.player.poisonTurns = 1;
  gameState.player.burn = true; gameState.player.burnTurns = 1;

  const div = win.document.createElement('div');
  div.style.width = '32px';
  div.style.height = '32px';
  div.style.position = 'relative';
  win.document.body.appendChild(div);

  updateUnitEffectIcons(gameState.player, div);

  const buffContainer = div.querySelector('.buff-container');
  const debuffContainer = div.querySelector('.status-container');

  if (!buffContainer || !debuffContainer) {
    console.error('setup failed');
    process.exit(1);
  }

  if (buffContainer.children.length < 2 || debuffContainer.children.length < 2) {
    console.error('icons not displayed correctly');
    process.exit(1);
  }

  console.log('icon display ok');
}

run().catch(e => { console.error(e); process.exit(1); });

