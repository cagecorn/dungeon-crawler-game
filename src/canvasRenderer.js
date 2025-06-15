((global)=>{
  if (typeof document === 'undefined') {
    global.CanvasRenderer = {
      render(){},
      initialize(){},
    };
    return;
  }
  const canvas = document.getElementById('game-canvas');
  let ctx = null;
  if (canvas && canvas.getContext) {
    const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (!isJsdom) {
      try {
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.textBaseline = 'top';
        ctx.font = `${CELL_WIDTH}px sans-serif`;
      } catch (e) {
        ctx = null;
      }
    }
  }
  let camera = { x: 0, y: 0 };
  let latestState = null;
  let scheduled = false;
  function initialize(size){
    if (!canvas || !ctx) return;
    canvas.width = size * CELL_WIDTH;
    canvas.height = size * CELL_WIDTH;
  }
  function drawDungeon(dungeon, viewSize){
    if (!ctx) return;
    for(let y=0;y<viewSize;y++){
      for(let x=0;x<viewSize;x++){
        const cell = dungeon[camera.y + y][camera.x + x];
        if (cell === 'wall') ctx.fillStyle = '#222';
        else ctx.fillStyle = '#444';
        ctx.fillRect(x*CELL_WIDTH, y*CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
      }
    }
  }
  function drawIcon(icon, x, y, color){
    if (!ctx) return;
    ctx.fillStyle = color || '#fff';
    ctx.fillText(icon, x*CELL_WIDTH + CELL_WIDTH*0.1, y*CELL_WIDTH + CELL_WIDTH*0.1);
  }
  function drawPlayer(player){
    if (!ctx) return;
    drawIcon('🙂', player.x - camera.x, player.y - camera.y, '#f00');
  }
  function drawMonsters(monsters){
    if (!ctx || !Array.isArray(monsters)) return;
    for(const m of monsters){
      if (m.alive === false) continue;
      drawIcon(m.icon || 'M', m.x - camera.x, m.y - camera.y, m.color);
    }
  }
  function drawItems(items){
    if (!ctx || !Array.isArray(items)) return;
    for(const item of items){
      drawIcon(item.icon || '?', item.x - camera.x, item.y - camera.y);
    }
  }
  function renderInternal(state){
    if (!ctx) return;
    camera = state.camera || {x:0,y:0};
    const viewSize = state.viewportSize || state.dungeon.length;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawDungeon(state.dungeon, viewSize);
    drawItems(state.items);
    drawMonsters(state.monsters);
    drawPlayer(state.player);
  }
  function render(state){
    if (!ctx) return;
    latestState = state;
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      if (latestState) renderInternal(latestState);
    });
  }
  global.CanvasRenderer = { initialize, render };
})(typeof globalThis !== 'undefined' ? globalThis : this);
