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
      } catch (e) {
        ctx = null;
      }
    }
  }
  function initialize(size){
    if (!canvas || !ctx) return;
    canvas.width = size * CELL_WIDTH;
    canvas.height = size * CELL_WIDTH;
  }
  function drawDungeon(dungeon){
    if (!ctx) return;
    for(let y=0;y<dungeon.length;y++){
      for(let x=0;x<dungeon[y].length;x++){
        const cell = dungeon[y][x];
        if (cell === 'wall') ctx.fillStyle = '#222';
        else ctx.fillStyle = '#444';
        ctx.fillRect(x*CELL_WIDTH, y*CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
      }
    }
  }
  function drawPlayer(player){
    if (!ctx) return;
    ctx.fillStyle = '#f00';
    ctx.fillRect(player.x*CELL_WIDTH, player.y*CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
  }
  function render(state){
    if (!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawDungeon(state.dungeon);
    drawPlayer(state.player);
  }
  global.CanvasRenderer = { initialize, render };
})(typeof globalThis !== 'undefined' ? globalThis : this);
