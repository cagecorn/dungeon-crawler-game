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

  const state = win.effectCycleState[gameState.player.id];
  const buffContainer = div.querySelector('.buff-container');
  const debuffContainer = div.querySelector('.status-container');

  if (!state || !buffContainer || !debuffContainer) {
    console.error('setup failed');
    process.exit(1);
  }
  if (state.buffs.length < 2 || state.debuffs.length < 2) {
    console.error('icons not stored correctly');
    process.exit(1);
  }

  const initialDebuff = debuffContainer.textContent;

  // change buff index only
  state.buffIndex = 1;
  updateUnitEffectIcons(gameState.player, div);

  if (buffContainer.textContent !== state.buffs[1] || debuffContainer.textContent !== initialDebuff) {
    console.error('buff rotation failed');
    process.exit(1);
  }

  // change debuff index only
  state.debuffIndex = 1;
  updateUnitEffectIcons(gameState.player, div);

  if (buffContainer.textContent !== state.buffs[1] || debuffContainer.textContent !== state.debuffs[1]) {
    console.error('debuff rotation failed');
    process.exit(1);
  }

  console.log('icon cycle ok');
}

run().catch(e => { console.error(e); process.exit(1); });
