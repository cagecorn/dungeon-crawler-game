const { rollDice } = require('../dice');
const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

async function loadGame(options = {}) {
  const { confirmReturn = true } = options;
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    beforeParse(window) {
      window.rollDice = rollDice;
      window.confirm = () => confirmReturn;
    }
  });

  await new Promise(resolve => {
    if (dom.window.document.readyState === 'complete') resolve();
    else dom.window.addEventListener('load', resolve);
  });

  const ctx = dom.getInternalVMContext();
  const modules = ['src/state.js', 'src/ui.js', 'src/mechanics.js'];
  for (const file of modules) {
    const code = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const script = new vm.Script(code, { filename: file });
    script.runInContext(ctx);
  }

  return dom.window;
}

module.exports = { loadGame };
