((global) => {
    const MONSTER_VISION = 7; // 몬스터가 플레이어를 인지하는 최대 거리
    const FOG_RADIUS = 5;     // 플레이어 주변의 시야 반경
    const CELL_SIZE = 33;     // 셀 크기(갭 포함)
    const CELL_WIDTH = CELL_SIZE - 1; // 실제 셀 너비

    let gameState = {
        turn: 0,
        gameRunning: true,
        dungeon: [],
        dungeonSize: 80,
        fogOfWar: [],
        cellElements: [],
        dirtyCells: new Set(),
        player: {
            id: 'player',
            x: 1,
            y: 1,
            health: 20,
            shield: 0,
            shieldTurns: 0,
            attackBuff: 0,
            attackBuffTurns: 0,
            mana: 10,
            exp: 0,
            expNeeded: 20,
            level: 1,
            strength: 5,
            agility: 5,
            endurance: 10,
            focus: 5,
            intelligence: 5,
            manaRegen: 0.5,
            skillPoints: 0,
            statPoints: 0,
            gold: 1000,
            fullness: 0,
            buffs: [],
            skills: [],
            skillLevels: {},
            skillCooldowns: {},
            assignedSkills: { '1': null, '2': null },
            equipped: {
                weapon: null,
                armor: null,
                accessory1: null,
                accessory2: null,
                tile: null
            },
            inventory: [],
            tileInventory: [],
            teleportSavedX: null,
            teleportSavedY: null,
            teleportReturnX: null,
            teleportReturnY: null,
            elementResistances: { fire: 0, ice: 0, wind: 0, earth: 0, light: 0, dark: 0 },
            statusResistances: {poison:0, bleed:0, burn:0, freeze:0, paralysis:0, nightmare:0, silence:0, petrify:0, debuff:0},
        },
        activeMercenaries: [],
        standbyMercenaries: [],
        supporters: [null, null],
        get mercenaries(){ return this.activeMercenaries; },
        monsters: [],
        corpses: [],
        treasures: [],
        items: [],
        mapTiles: [],
        projectiles: [],
        exitLocation: { x: 0, y: 0 },
        exitLocations: [],
        altarLocation: { x: 0, y: 0 },
        shopLocation: { x: 0, y: 0 },
        shopItems: [],
        paladinSpawns: [],
        materials: { herb: 5, wood: 3, iron: 100, bone: 100, bread: 0, meat: 0, lettuce: 0 },
        knownRecipes: ['healthPotion', 'sandwich', 'salad'],
        activeRecipes: ['healthPotion', 'sandwich', 'salad'],
        craftingQueue: [],
        floor: 1,
        viewportSize: 25,
        camera: { x: 0, y: 0 },
        autoMovePath: null,
        autoMoveActive: false,
        inventoryFilter: 'all',
        incubators: [null, null, null],
        hatchedSuperiors: [],
        pendingMap: null,
        currentMapModifiers: {}
    };

    /**
     * \uC9C0\uC815\uB41C \uC88C\uD45C\uC758 \uC140\uC744 \uB2E4\uC74C \uB80C\uB354\uB9C1 \uB300\uC0C1\uC73C\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4.
     * @param {number} x
     * @param {number} y
     */
    function markDirty(x, y) {
        if (x >= 0 && x < gameState.dungeonSize && y >= 0 && y < gameState.dungeonSize) {
            gameState.dirtyCells.add(`${x},${y}`); // Set\uC5D0 "x,y" \uD615\uD0DC\uC758 \uBB38\uC790\uC5F4\uB85C \uC800\uC7A5
        }
    }
    global.gameState = gameState;
    global.MONSTER_VISION = MONSTER_VISION;
    global.FOG_RADIUS = FOG_RADIUS;
    global.CELL_SIZE = CELL_SIZE;
    global.CELL_WIDTH = CELL_WIDTH;
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--cell-width', `${CELL_WIDTH}px`);
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { gameState, markDirty, MONSTER_VISION, FOG_RADIUS, CELL_SIZE, CELL_WIDTH };
    }
})(typeof globalThis !== 'undefined' ? globalThis : this);
