((global) => {
    const MONSTER_VISION = 7; // 몬스터가 플레이어를 인지하는 최대 거리
    const FOG_RADIUS = 5;     // 플레이어 주변의 시야 반경

    let gameState = {
        turn: 0,
        gameRunning: true,
        dungeon: [],
        dungeonSize: 80,
        fogOfWar: [],
        cellElements: [],
        player: {
            x: 1,
            y: 1,
            health: 20,
            mana: 10,
            exp: 0,
            expNeeded: 20,
            level: 1,
            strength: 5,
            agility: 5,
            endurance: 10,
            focus: 5,
            intelligence: 0,
            manaRegen: 0.5,
            skillPoints: 0,
            statPoints: 0,
            gold: 1000,
            fullness: 0,
            skills: [],
            skillLevels: {},
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
    global.gameState = gameState;
    global.MONSTER_VISION = MONSTER_VISION;
    global.FOG_RADIUS = FOG_RADIUS;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { gameState, MONSTER_VISION, FOG_RADIUS };
    }
})(typeof globalThis !== 'undefined' ? globalThis : this);
