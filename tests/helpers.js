const { rollDice } = require('../dice');
const { JSDOM } = require('jsdom');
const path = require('path');
const { pathToFileURL } = require('url');

async function loadGame(options = {}) {
  const { confirmReturn = true } = options;
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const dom = await JSDOM.fromFile(htmlPath, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: pathToFileURL(htmlPath).href,
    beforeParse(window) {
      window.rollDice = rollDice;
      window.confirm = () => confirmReturn;
    }
  });

  await new Promise(resolve => {
    if (dom.window.document.readyState === 'complete') resolve();
    else dom.window.addEventListener('load', resolve);
  });

  await new Promise(r => dom.window.setTimeout(r, 0));

  return dom.window;
}

module.exports = { loadGame };
