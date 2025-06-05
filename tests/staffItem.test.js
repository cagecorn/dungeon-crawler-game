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

  // override randomness to always apply first prefix/suffix
  const realRandom = dom.window.Math.random;
  dom.window.Math.random = () => 0.1;

  const { createItem } = dom.window;
  const staff = createItem('staff', 0, 0);
  dom.window.Math.random = realRandom;

  if (staff.type !== 'weapon') {
    console.error('staff type incorrect');
    process.exit(1);
  }
  if (!staff.prefix || !staff.suffix) {
    console.error('prefix/suffix not applied');
    process.exit(1);
  }
  if (staff.magicPower === undefined) {
    console.error('magicPower missing');
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
