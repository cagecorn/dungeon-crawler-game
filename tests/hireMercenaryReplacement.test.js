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

  const { hireMercenary, gameState } = dom.window;

  gameState.player.gold = 999;

  let promptCount = 0;
  dom.window.prompt = () => {
    promptCount++;
    return '1';
  };

  hireMercenary('WARRIOR');
  hireMercenary('ARCHER');
  hireMercenary('WIZARD');
  hireMercenary('HEALER');

  if (promptCount !== 1) {
    console.error('expected prompt when hiring 4th mercenary');
    process.exit(1);
  }

  if (gameState.mercenaries.length !== 3) {
    console.error('mercenary count should remain 3 after replacement');
    process.exit(1);
  }
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
