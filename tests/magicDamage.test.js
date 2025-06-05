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

  const { performAttack } = dom.window;

  const attacker = {
    attack: 0,
    magicPower: 0,
    accuracy: 1,
    critChance: 0,
    fireDamage: 5,
    equipped: {}
  };

  const defender = {
    defense: 0,
    magicResist: 0,
    evasion: 0,
    elementResistances: {},
    health: 20
  };

  const res = performAttack(attacker, defender, {
    attackValue: 10,
    magic: true,
    element: 'fire'
  });

  if (res.damage !== 15) {
    console.error(`expected 15 damage, got ${res.damage}`);
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
