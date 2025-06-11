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
            skillPoints: 0,
            statPoints: 0,
            gold: 0,
            fullness: 0,
            skills: [],
            skillLevels: {},
            assignedSkills: { '1': null, '2': null },
            equipped: {
                weapon: null,
                armor: null,
                accessory1: null,
                accessory2: null,
                tile: null // <<< 수정됨: 플레이어 타일 슬롯 추가
            },
            inventory: [],
            tileInventory: [], // <<< 수정됨: 플레이어 타일 보관 인벤토리 추가
            teleportSavedX: null,
            teleportSavedY: null,
            teleportReturnX: null,
            teleportReturnY: null,
            statusResistances: {poison:0.1, bleed:0.1, burn:0.1, freeze:0.1, paralysis:0.1, nightmare:0.1, silence:0.1, petrify:0.1, debuff:0.1},
        },
        activeMercenaries: [],
        standbyMercenaries: [],
        get mercenaries(){ return this.activeMercenaries; },
        monsters: [],
        corpses: [],
        treasures: [],
        items: [],
        mapTiles: [], // <<< 수정됨: 맵에 생성된 타일 위치 정보 추가
        projectiles: [],
        exitLocation: { x: 0, y: 0 },
        altarLocation: { x: 0, y: 0 },
        shopLocation: { x: 0, y: 0 },
        shopItems: [],
        materials: { herb: 5, wood: 3, iron: 100, bone: 100, bread: 0, meat: 0, lettuce: 0 },
        knownRecipes: ['healthPotion', 'sandwich', 'salad'],
        activeRecipes: ['healthPotion', 'sandwich', 'salad'],
        craftingQueue: [],
        floor: 1,
        dungeonSize: 80,
        viewportSize: 25,
        camera: { x: 0, y: 0 },
        autoMovePath: null,
        autoMoveActive: false,
        inventoryFilter: 'all',
        turn: 0,
        incubators: [null, null, null],
        hatchedSuperiors: [],
        pendingMap: null,
        currentMapModifiers: {},
        gameRunning: true
    };
    global.gameState = gameState;
    global.MONSTER_VISION = MONSTER_VISION;
    global.FOG_RADIUS = FOG_RADIUS;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { gameState, MONSTER_VISION, FOG_RADIUS };
    }
})(typeof globalThis !== 'undefined' ? globalThis : this);
