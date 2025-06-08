const { rollDice } = require('../dice');
const { JSDOM } = require('jsdom');
const path = require('path');

async function loadGame(options = {}) {
  const { confirmReturn = true } = options;
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
    beforeParse(window) {
      window.rollDice = rollDice;
      window.confirm = () => confirmReturn;
    }
  });

  await new Promise(resolve => {
    if (dom.window.document.readyState === 'complete') resolve();
    else dom.window.addEventListener('load', resolve);
  });

  return dom.window;
}

module.exports = { loadGame };
