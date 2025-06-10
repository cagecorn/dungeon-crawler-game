        const ITEM_TYPES = {
            WEAPON: 'weapon',
            ARMOR: 'armor',
            ACCESSORY: 'accessory',
            POTION: 'potion',
            REVIVE: 'revive',
            EXP_SCROLL: 'expScroll',
            EGG: 'egg',
            FERTILIZER: 'fertilizer',
            ESSENCE: 'essence',
            FOOD: 'food'
        };

        const SHOP_PRICE_MULTIPLIER = 3;

const MERCENARY_NAMES = ['Aldo', 'Borin', 'Cara', 'Dain', 'Elin', 'Faris'];

        const MAX_FULLNESS = 100;
        const FULLNESS_LOSS_PER_TURN = 0.01;
        const CORRIDOR_WIDTH = 7; // width of dungeon corridors

        function carveWideCorridor(map, x1, y1, x2, y2) {
            const width = CORRIDOR_WIDTH;
            if (x1 === x2) {
                const minY = Math.min(y1, y2);
                const maxY = Math.max(y1, y2);
                for (let y = minY; y <= maxY; y++) {
                    for (let dx = -Math.floor(width / 2); dx <= Math.floor(width / 2); dx++) {
                        const nx = x1 + dx;
                        if (map[y] && map[y][nx] !== undefined) {
                            map[y][nx] = 'empty';
                        }
                    }
                }
            } else if (y1 === y2) {
                const minX = Math.min(x1, x2);
                const maxX = Math.max(x1, x2);
                for (let x = minX; x <= maxX; x++) {
                    for (let dy = -Math.floor(width / 2); dy <= Math.floor(width / 2); dy++) {
                        const ny = y1 + dy;
                        if (map[ny] && map[ny][x] !== undefined) {
                            map[ny][x] = 'empty';
                        }
                    }
                }
            }
        }

        // 용병 타입 정의
        const MERCENARY_TYPES = {
            WARRIOR: {
                name: '⚔️ 전사',
                icon: '🛡️',
                baseHealth: 15,
                baseAttack: 4,
                baseDefense: 2,
                baseAccuracy: 0.8,
                baseEvasion: 0.1,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseMaxMana: 5,
                baseHealthRegen: 0.2,
                baseManaRegen: 0.3,
                role: 'tank',
                description: '높은 체력과 방어력을 가진 근접 전투 용병',
                cost: 50
            },
            ARCHER: {
                name: '🏹 궁수',
                icon: '🎯',
                baseHealth: 10,
                baseAttack: 5,
                baseDefense: 1,
                baseAccuracy: 0.85,
                baseEvasion: 0.15,
                baseCritChance: 0.1,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseMaxMana: 5,
                baseHealthRegen: 0.2,
                baseManaRegen: 0.3,
                role: 'ranged',
                description: '원거리에서 적을 공격하는 용병',
                cost: 60
            },
            HEALER: {
                name: '✚ 힐러',
                icon: '💚',
                baseHealth: 8,
                baseAttack: 2,
                baseDefense: 1,
                baseAccuracy: 0.75,
                baseEvasion: 0.1,
                baseCritChance: 0.05,
                baseMagicPower: 2,
                baseMagicResist: 1,
                baseMaxMana: 10,
                baseHealthRegen: 0.3,
                baseManaRegen: 0.5,
                role: 'support',
                description: '아군을 치료하는 지원 용병',
                cost: 70
            },
            WIZARD: {
                name: '🔮 마법사',
                icon: '🧙',
                baseHealth: 7,
                baseAttack: 3,
                baseDefense: 1,
                baseAccuracy: 0.8,
                baseEvasion: 0.12,
                baseCritChance: 0.1,
                baseMagicPower: 5,
                baseMagicResist: 2,
                baseMaxMana: 12,
                baseHealthRegen: 0.2,
                baseManaRegen: 0.5,
                role: 'caster',
                description: '마법 공격에 특화된 용병',
                cost: 80
            }
        };

        // 챔피언 타입 (용병 타입과 동일)
        const CHAMPION_TYPES = JSON.parse(JSON.stringify(MERCENARY_TYPES));


        // 몬스터 타입 정의
        const MONSTER_TYPES = {
            ZOMBIE: {
                name: '🧟 좀비',
                icon: '🧟‍♂️',
                color: '#8B4513',
                baseHealth: 8,
                baseAttack: 3,
                baseDefense: 1,
                baseAccuracy: 0.6,
                baseEvasion: 0.05,
                baseCritChance: 0.02,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseExp: 6,
                damageDice: "1d4",
                baseGold: 3,
                range: 1,
                special: 'slow'
            },
            GOBLIN: {
                name: '👹 고블린',
                icon: '👹',
                color: '#32CD32',
                baseHealth: 4,
                baseAttack: 2,
                baseDefense: 0,
                baseAccuracy: 0.65,
                baseEvasion: 0.1,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseExp: 4,
                baseGold: 5,
                damageDice: "1d4",
                range: 1,
                special: 'fast'
            },
            ARCHER: {
                name: '🏹 궁수',
                icon: '🏹',
                color: '#DAA520',
                baseHealth: 5,
                baseAttack: 4,
                baseDefense: 1,
                baseAccuracy: 0.7,
                baseEvasion: 0.1,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseExp: 8,
                damageDice: "1d6",
                baseGold: 7,
                range: 3,
                special: 'ranged',
                statusEffect: 'poison'
            },
            WIZARD: {
                name: '🧙‍♂️ 마법사',
                icon: '🔮',
                color: '#9932CC',
                baseHealth: 3,
                baseAttack: 6,
                baseDefense: 0,
                baseAccuracy: 0.75,
                baseEvasion: 0.1,
                baseCritChance: 0.1,
                baseMagicPower: 5,
                baseMagicResist: 1,
                baseExp: 10,
                damageDice: "1d6",
                baseGold: 10,
                range: 4,
                special: 'magic',
                statusEffect: 'freeze'
            },
            GOBLIN_ARCHER: {
                name: '🏹 고블린 궁수',
                icon: '🏹',
                color: '#6B8E23',
                baseHealth: 4,
                baseAttack: 3,
                baseDefense: 0,
                baseAccuracy: 0.7,
                baseEvasion: 0.1,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseExp: 6,
                damageDice: "1d6",
                baseGold: 6,
                range: 3,
                special: 'ranged',
                statusEffect: 'poison'
            },
            GOBLIN_WIZARD: {
                name: '🧙‍♂️ 고블린 마법사',
                icon: '🔮',
                color: '#2E8B57',
                baseHealth: 3,
                baseAttack: 4,
                baseDefense: 0,
                baseAccuracy: 0.7,
                baseEvasion: 0.1,
                baseCritChance: 0.08,
                baseMagicPower: 4,
                baseMagicResist: 0,
                baseExp: 8,
                damageDice: "1d6",
                baseGold: 8,
                range: 4,
                special: 'magic',
                statusEffect: 'freeze'
            },
            ORC: {
                name: '💪 오크 전사',
                icon: '👹',
                color: '#B22222',
                baseHealth: 12,
                baseAttack: 5,
                baseDefense: 3,
                baseAccuracy: 0.7,
                baseEvasion: 0.05,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0.5,
                baseExp: 15,
                baseGold: 12,
                damageDice: "1d8",
                range: 1,
                special: 'strong',
                statusEffect: 'bleed'
            },
            ORC_ARCHER: {
                name: '🏹 오크 궁수',
                icon: '🏹',
                color: '#8B0000',
                baseHealth: 10,
                baseAttack: 5,
                baseDefense: 1,
                baseAccuracy: 0.75,
                baseEvasion: 0.08,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0.2,
                baseExp: 12,
                damageDice: "1d6",
                baseGold: 10,
                range: 3,
                special: 'ranged'
            },
            SKELETON: {
                name: '💀 스켈레톤',
                icon: '💀',
                color: '#AAAAAA',
                baseHealth: 6,
                baseAttack: 3,
                baseDefense: 1,
                baseAccuracy: 0.65,
                baseEvasion: 0.05,
                baseCritChance: 0.03,
                baseMagicPower: 0,
                baseMagicResist: 0,
                baseExp: 8,
                damageDice: "1d6",
                baseGold: 6,
                range: 1,
                special: 'undead'
            },
            SKELETON_MAGE: {
                name: '☠️ 스켈레톤 메이지',
                icon: '☠️',
                color: '#CCCCCC',
                baseHealth: 5,
                baseAttack: 4,
                baseDefense: 0,
                baseAccuracy: 0.7,
                baseEvasion: 0.05,
                baseCritChance: 0.07,
                baseMagicPower: 5,
                baseMagicResist: 1,
                baseExp: 12,
                damageDice: "1d6",
                baseGold: 9,
                range: 4,
                special: 'magic'
            },
            TROLL: {
                name: '👹 트롤',
                icon: '👺',
                color: '#556B2F',
                baseHealth: 18,
                baseAttack: 7,
                baseDefense: 3,
                baseAccuracy: 0.65,
                baseEvasion: 0.05,
                baseCritChance: 0.05,
                baseMagicPower: 0,
                baseMagicResist: 0.3,
                baseExp: 20,
                damageDice: "1d8",
                baseGold: 15,
                range: 1,
                special: 'regeneration'
            },
            DARK_MAGE: {
                name: '🧙‍♂️ 다크 메이지',
                icon: '🪄',
                color: '#4B0082',
                baseHealth: 8,
                baseAttack: 6,
                baseDefense: 1,
                baseAccuracy: 0.75,
                baseEvasion: 0.1,
                baseCritChance: 0.1,
                baseMagicPower: 7,
                baseMagicResist: 2,
                baseExp: 25,
                damageDice: "1d8",
                baseGold: 20,
                range: 4,
                special: 'curse'
            },
            DEMON_WARRIOR: {
                name: '😈 데몬 전사',
                icon: '😈',
                color: '#8B0000',
                baseHealth: 22,
                baseAttack: 9,
                baseDefense: 4,
                baseAccuracy: 0.8,
                baseEvasion: 0.1,
                baseCritChance: 0.1,
                baseMagicPower: 3,
                baseMagicResist: 3,
                baseExp: 35,
                damageDice: "1d10",
                baseGold: 25,
                range: 2,
                special: 'demonic'
            },
            BOSS: {
                name: '👑 던전 보스',
                icon: '💀',
                color: '#FF4500',
                baseHealth: 30,
                baseAttack: 8,
                baseDefense: 5,
                baseAccuracy: 0.8,
                baseEvasion: 0.1,
                baseCritChance: 0.1,
                baseMagicPower: 3,
                baseMagicResist: 2,
                baseExp: 50,
                damageDice: "1d10",
                baseGold: 50,
                range: 2,
                special: 'boss',
                statusEffect: 'burn'
            }
        };

        // 아이템 데이터베이스
        const ITEMS = {
            shortSword: {
                name: '🗡️ 단검',
                type: ITEM_TYPES.WEAPON,
                attack: 2,
                damageDice: "1d6",
                price: 10,
                level: 1,
                icon: '🗡️'
            },
            longSword: {
                name: '⚔️ 장검',
                type: ITEM_TYPES.WEAPON,
                attack: 4,
                price: 25,
                damageDice: "1d8",
                level: 2,
                icon: '⚔️'
            },
            magicSword: {
                name: '✨ 마법검',
                type: ITEM_TYPES.WEAPON,
                attack: 6,
                price: 50,
                level: 3,
                damageDice: "1d10",
                icon: '✨'
            },
            magicStaff: {
                name: '🔮 마법 지팡이',
                type: ITEM_TYPES.WEAPON,
                magicPower: 3,
                manaRegen: 1,
                price: 30,
                level: 2,
                damageDice: "1d4",
                icon: '🔮'
            },
            leatherArmor: {
                name: '🛡️ 가죽 갑옷',
                type: ITEM_TYPES.ARMOR,
                defense: 2,
                price: 15,
                level: 1,
                icon: '🛡️'
            },
            chainMail: {
                name: '🔗 사슬 갑옷',
                type: ITEM_TYPES.ARMOR,
                defense: 4,
                price: 35,
                level: 2,
                icon: '🔗'
            },
            plateArmor: {
                name: '🛡️ 판금 갑옷',
                type: ITEM_TYPES.ARMOR,
                defense: 6,
                price: 60,
                level: 3,
                icon: '🛡️'
            },
            critCharm: {
                name: '💎 치명 부적',
                type: ITEM_TYPES.ACCESSORY,
                critChance: 0.05,
                price: 20,
                level: 1,
                icon: '💎'
            },
            evasionCharm: {
                name: '🍀 회피 부적',
                type: ITEM_TYPES.ACCESSORY,
                evasion: 0.05,
                price: 20,
                level: 1,
                icon: '🍀'
            },
            aimRing: {
                name: '🎯 명중 반지',
                type: ITEM_TYPES.ACCESSORY,
                accuracy: 0.05,
                price: 25,
                level: 2,
                icon: '🎯'
            },
            healthPotion: {
                name: '🧪 체력 포션',
                type: ITEM_TYPES.POTION,
                healing: 10,
                price: 5,
                level: 1,
                icon: '🧪'
            },
            greaterHealthPotion: {
                name: '💊 대형 체력 포션',
                type: ITEM_TYPES.POTION,
                healing: 25,
                price: 15,
                level: 2,
                icon: '💊'
            },
            reviveScroll: {
                name: '✨ 부활 스크롤',
                type: ITEM_TYPES.REVIVE,
                price: 0,
                level: 2,
                icon: '✨'
            },
            smallExpScroll: {
                name: '📜 작은 경험치 스크롤',
                type: ITEM_TYPES.EXP_SCROLL,
                expGain: 5,
                price: 10,
                level: 1,
                icon: '📜'
            },
            superiorEgg: {
                name: '🥚 슈페리어 알',
                type: ITEM_TYPES.EGG,
                price: 50,
                level: 1,
                icon: '🥚',
                incubation: 3
            },
            fertilizer: {
                name: '🌱 비료',
                type: ITEM_TYPES.FERTILIZER,
                price: 5,
                level: 1,
                icon: '🌱'
            },
            strengthEssence: {
                name: '💪 힘의 정수',
                type: ITEM_TYPES.ESSENCE,
                strength: 1,
                price: 20,
                level: 1,
                icon: '💪'
            },
            agilityEssence: {
                name: '🤸 민첩의 정수',
                type: ITEM_TYPES.ESSENCE,
                agility: 1,
                price: 20,
                level: 1,
                icon: '🤸'
            },
            enduranceEssence: {
                name: '🛡️ 인내의 정수',
                type: ITEM_TYPES.ESSENCE,
                endurance: 1,
                price: 20,
                level: 1,
                icon: '🛡️'
            },
            focusEssence: {
                name: '🎯 집중의 정수',
                type: ITEM_TYPES.ESSENCE,
                focus: 1,
                price: 25,
                level: 1,
                icon: '🎯'
            },
            intelligenceEssence: {
                name: '🧠 지능의 정수',
                type: ITEM_TYPES.ESSENCE,
                intelligence: 1,
                price: 25,
                level: 1,
                icon: '🧠'
            },
            skillLevelEssence: {
                name: '⭐ 스킬 레벨 정수',
                type: ITEM_TYPES.ESSENCE,
                skillLevelEssence: 1,
                price: 30,
                level: 1,
                icon: '⭐'
            },
            cookedMeal: {
                name: '🍲 요리',
                type: ITEM_TYPES.FOOD,
                affinityGain: 5,
                fullnessGain: 5,
                price: 15,
                level: 1,
                icon: '🍲'
            },
            bread: {
                name: '🍞 빵',
                type: ITEM_TYPES.FOOD,
                affinityGain: 1,
                fullnessGain: 1,
                price: 3,
                level: 1,
                icon: '🍞'
            },
            meat: {
                name: '🍖 고기',
                type: ITEM_TYPES.FOOD,
                affinityGain: 1,
                fullnessGain: 2,
                price: 4,
                level: 1,
                icon: '🍖'
            },
            rawMeat: {
                name: '🥩 생고기',
                type: ITEM_TYPES.FOOD,
                affinityGain: 0,
                fullnessGain: 2,
                price: 2,
                level: 1,
                icon: '🥩'
            },
            lettuce: {
                name: '🥬 양상추',
                type: ITEM_TYPES.FOOD,
                affinityGain: 1,
                fullnessGain: 1,
                price: 2,
                level: 1,
                icon: '🥬'
            },
            salad: {
                name: '🥗 샐러드',
                type: ITEM_TYPES.FOOD,
                affinityGain: 2,
                fullnessGain: 2,
                price: 6,
                level: 1,
                icon: '🥗'
            },
            sandwich: {
                name: '🥪 샌드위치',
                type: ITEM_TYPES.FOOD,
                affinityGain: 3,
                fullnessGain: 3,
                price: 8,
                level: 1,
                icon: '🥪'
            }

        };

        const SKILL_DEFS = {
            Fireball: { name: 'Fireball', icon: '🔥', damageDice: '1d10', range: 5, magic: true, element: 'fire', manaCost: 3 },
            Iceball: { name: 'Iceball', icon: '❄️', damageDice: '1d8', range: 5, magic: true, element: 'ice', manaCost: 2 },
            FireNova: { name: 'Fire Nova', icon: '🔥', damageDice: '1d6', radius: 3, magic: true, element: 'fire', manaCost: 5 },
            IceNova: { name: 'Ice Nova', icon: '❄️', damageDice: '1d6', radius: 3, magic: true, element: 'ice', manaCost: 4 },
            Heal: { name: 'Heal', icon: '💖', heal: 10, range: 2, manaCost: 3 },
            Purify: { name: 'Purify', icon: '🌀', purify: true, range: 2, manaCost: 2 },
            Teleport: { name: 'Teleport', icon: '🌀', teleport: true, manaCost: 2 },
            DoubleStrike: { name: 'Double Strike', icon: '🔪', range: 1, manaCost: 3, melee: true, hits: 2 },
            ChargeAttack: { name: 'Charge Attack', icon: '⚡', range: 2, manaCost: 2, melee: true, multiplier: 1.5, dashRange: 4 },
            HawkEye: { name: 'Hawk Eye', icon: '🦅', range: 5, manaCost: 2, damageDice: '1d6' },
            MightAura: { name: 'Might Aura', icon: '💪', passive: true, radius: 6, aura: { attack: 1, magicPower: 1 } },
            ProtectAura: { name: 'Protect Aura', icon: '🛡️', passive: true, radius: 6, aura: { defense: 1, magicResist: 1 } },
            RegenerationAura: { name: 'Regeneration Aura', icon: '💚', passive: true, radius: 6, aura: { healthRegen: 1 } },
            MeditationAura: { name: 'Meditation Aura', icon: '🌀', passive: true, radius: 6, aura: { manaRegen: 1 } },
            HasteAura: { name: 'Haste Aura', icon: '💨', passive: true, radius: 6, aura: { evasion: 0.05 } },
            ConcentrationAura: { name: 'Concentration Aura', icon: '🎯', passive: true, radius: 6, aura: { accuracy: 0.05 } },
            CondemnAura: { name: 'Condemn Aura', icon: '⚔️', passive: true, radius: 6, aura: { critChance: 0.05 } },
            NaturalAura: { name: 'Natural Aura', icon: '🌿', passive: true, radius: 6, aura: { allResist: 0.05 } } // 레벨당 5% 저항
        };

        // 용병 전용 스킬 정의
        const MERCENARY_SKILLS = {
            ChargeAttack: { name: 'Charge Attack', icon: '⚡', range: 2, manaCost: 2, multiplier: 1.5, dashRange: 4 },
            DoubleStrike: { name: 'Double Strike', icon: '🔪', range: 1, manaCost: 3 },
            Heal: { name: 'Heal', icon: '✨', range: 2, manaCost: 2 },
            Purify: { name: 'Purify', icon: '🌀', range: 2, manaCost: 2 },
            Fireball: { name: 'Fireball', icon: '🔥', range: 4, manaCost: 3, damageDice: '1d8', magic: true, element: 'fire' },
            Iceball: { name: 'Iceball', icon: '❄️', range: 5, manaCost: 2, damageDice: '1d8', magic: true, element: 'ice' },
            HawkEye: { name: 'Hawk Eye', icon: '🦅', range: 5, manaCost: 2, damageDice: '1d6' },
            RegenerationAura: { name: 'Regeneration Aura', icon: '💚', passive: true, radius: 6, aura: { healthRegen: 1 } },
            MeditationAura: { name: 'Meditation Aura', icon: '🌀', passive: true, radius: 6, aura: { manaRegen: 1 } },
            HasteAura: { name: 'Haste Aura', icon: '💨', passive: true, radius: 6, aura: { evasion: 0.05 } },
            ConcentrationAura: { name: 'Concentration Aura', icon: '🎯', passive: true, radius: 6, aura: { accuracy: 0.05 } },
            CondemnAura: { name: 'Condemn Aura', icon: '⚔️', passive: true, radius: 6, aura: { critChance: 0.05 } },
            NaturalAura: { name: 'Natural Aura', icon: '🌿', passive: true, radius: 6, aura: { allResist: 0.05 } } // 레벨당 5% 저항
        };


        const MONSTER_SKILLS = {
            RottingBite: { name: 'Rotting Bite', icon: '🧟', range: 1, damageDice: '1d6', melee: true, status: 'poison' },
            PowerStrike: { name: 'Power Strike', icon: '💥', range: 1, damageDice: '1d8', melee: true },
            ShadowBolt: { name: 'Shadow Bolt', icon: '🌑', range: 3, damageDice: '1d6', magic: true, element: 'dark' },
            PoisonCloud: { name: 'Poison Cloud', icon: '☣️', radius: 2, damageDice: '1d4', magic: true, status: 'poison' },
            FireBreath: { name: 'Fire Breath', icon: '🔥', radius: 2, magic: true, element: 'fire', damageDice: '1d6', status: 'burn' }
        };


        const MERCENARY_SKILL_SETS = {
            WARRIOR: ['ChargeAttack', 'DoubleStrike'],
            ARCHER: ['DoubleStrike', 'HawkEye'],
            HEALER: ['Heal'],
            WIZARD: ['Fireball', 'Iceball']
        };

        const MONSTER_SKILL_SETS = {
            ZOMBIE: ['RottingBite', 'PoisonCloud', 'PoisonStrike'],
            GOBLIN: ['PowerStrike', 'WindStrike'],
            ARCHER: ['PowerStrike', 'PoisonShot'],
            GOBLIN_ARCHER: ['PowerStrike', 'PoisonShot'],
            GOBLIN_WIZARD: ['ShadowBolt', 'PoisonCloud', 'FreezeMagic'],
            WIZARD: ['ShadowBolt', 'FireBreath', 'FreezeMagic'],
            ORC: ['PowerStrike', 'BleedStrike'],
            ORC_ARCHER: ['PowerStrike', 'EarthShot'],
            SKELETON: ['PowerStrike', 'DarkStrike'],
            SKELETON_MAGE: ['ShadowBolt', 'DarkMagic'],
            TROLL: ['PowerStrike', 'FireBreath', 'EarthStrike'],
            DARK_MAGE: ['ShadowBolt', 'PoisonCloud', 'NightmareMagic'],
            DEMON_WARRIOR: ['ShadowBolt', 'FireBreath', 'FireStrike'],
            BOSS: ['ShadowBolt', 'FireBreath', 'BurnStrike']
        };

        const MONSTER_TRAIT_SETS = {
            ZOMBIE: ['PoisonMelee'],
            GOBLIN: ['WindMelee'],
            ARCHER: ['PoisonRanged'],
            GOBLIN_ARCHER: ['PoisonRanged'],
            GOBLIN_WIZARD: ['FreezeMagic'],
            WIZARD: ['FreezeMagic'],
            ORC: ['BleedMelee'],
            ORC_ARCHER: ['EarthRanged'],
            SKELETON: ['DarkMelee'],
            SKELETON_MAGE: ['DarkMagic'],
            TROLL: ['EarthMelee'],
            DARK_MAGE: ['NightmareMagic'],
            DEMON_WARRIOR: ['FireMelee'],
            BOSS: ['BurnMelee']
        };

        const RECIPES = {
            healthPotion: { name: 'Health Potion', output: 'healthPotion', materials: { herb: 2 }, turns: 3 },
            shortSword: { name: 'Short Sword', output: 'shortSword', materials: { wood: 1, iron: 2 }, turns: 5 },
            sandwich: { name: 'Sandwich', output: 'sandwich', materials: { bread: 1, meat: 1, lettuce: 1 }, turns: 2 },
            salad: { name: 'Salad', output: 'salad', materials: { lettuce: 2, herb: 1 }, turns: 2 }
        };



        const HEAL_MANA_COST = 2;

        const ELEMENT_EMOJI = {
            fire: '🔥',
            ice: '❄️',
            lightning: '⚡',
            wind: '💨',
            earth: '🌱',
            light: '✨',
            dark: '🌑'
        };

        const STATUS_NAMES = {
            poison: "독",
            burn: "화상",
            freeze: "빙결",
            bleed: "출혈",
            paralysis: "마비",
            nightmare: "악몽",
            silence: "침묵",
            petrify: "석화",
            debuff: "약화"
        };

        const STATUS_ICONS = {
            poison: '☠️',
            burn: '🔥',
            freeze: '❄️',
            bleed: '🩸',
            paralysis: '⚡',
            nightmare: '😱',
            silence: '🤐',
            petrify: '🪨',
            debuff: '⬇️'
        };

        const MONSTER_TRAITS = (() => {
            const obj = {};
            const elems = ['fire','ice','wind','earth','light','dark'];
            const statuses = ['poison','freeze','burn','bleed','paralysis','nightmare','silence','petrify','debuff'];
            const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
            elems.forEach(e => {
                ['Melee','Ranged','Magic'].forEach(t => {
                    obj[cap(e)+t] = { name: `${cap(e)} ${t}`, icon: ELEMENT_EMOJI[e], element: e };
                });
            });
            statuses.forEach(s => {
                ['Melee','Ranged','Magic'].forEach(t => {
                    obj[cap(s)+t] = { name: `${STATUS_NAMES[s]} ${t}`, icon: STATUS_ICONS[s], status: s };
                });
            });
            return obj;
        })();

        (() => {
            const elems = ['fire','ice','wind','earth','light','dark'];
            const statuses = ['poison','freeze','burn','bleed','paralysis','nightmare','silence','petrify','debuff'];
            const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
            elems.forEach(e => {
                MONSTER_SKILLS[cap(e)+'Strike'] = { name: `${cap(e)} Strike`, icon: ELEMENT_EMOJI[e], range: 1, damageDice: '1d6', melee: true, element: e, manaCost: 2 };
                MONSTER_SKILLS[cap(e)+'Shot'] = { name: `${cap(e)} Shot`, icon: ELEMENT_EMOJI[e], range: 3, damageDice: '1d6', element: e, manaCost: 2 };
                MONSTER_SKILLS[cap(e)+'Magic'] = { name: `${cap(e)} Magic`, icon: ELEMENT_EMOJI[e], range: 4, damageDice: '1d6', magic: true, element: e, manaCost: 2 };
            });
            statuses.forEach(s => {
                MONSTER_SKILLS[cap(s)+'Strike'] = { name: `${STATUS_NAMES[s]} Strike`, icon: STATUS_ICONS[s], range: 1, damageDice: '1d6', melee: true, status: s, manaCost: 2 };
                MONSTER_SKILLS[cap(s)+'Shot'] = { name: `${STATUS_NAMES[s]} Shot`, icon: STATUS_ICONS[s], range: 3, damageDice: '1d6', status: s, manaCost: 2 };
                MONSTER_SKILLS[cap(s)+'Magic'] = { name: `${STATUS_NAMES[s]} Magic`, icon: STATUS_ICONS[s], range: 4, damageDice: '1d6', magic: true, status: s, manaCost: 2 };
            });
        })();

        // 접두사/접미사 풀
        const PREFIXES = [
            { name: 'Flaming', modifiers: { fireDamage: 2 } },
            { name: 'Sharp', modifiers: { attack: 1 } },
            { name: 'Sturdy', modifiers: { defense: 1 } },
            { name: 'Refreshing', modifiers: { healthRegen: 1 } },
            { name: 'Mystic', modifiers: { manaRegen: 1 } },
            { name: 'Venomous', modifiers: { status: 'poison' } },
            { name: 'Serrated', modifiers: { status: 'bleed' } },
            { name: 'Smoldering', modifiers: { status: 'burn' } },
            { name: 'Frosted', modifiers: { status: 'freeze' } },
            { name: 'Poison Resistant', modifiers: { poisonResist: 0.3 } },
            { name: 'Bleed Resistant', modifiers: { bleedResist: 0.3 } },
            { name: 'Burn Resistant', modifiers: { burnResist: 0.3 } },
            { name: 'Freeze Resistant', modifiers: { freezeResist: 0.3 } }
        ];
        const SUFFIXES = [
            { name: 'of Protection', modifiers: { defense: 2 } },
            { name: 'of Fury', modifiers: { attack: 2 } },
            { name: 'of Vitality', modifiers: { maxHealth: 5 } },
            { name: 'of Wisdom', modifiers: { manaRegen: 1 } },
            { name: 'of Mending', modifiers: { healthRegen: 1 } },
            { name: 'of Venom', modifiers: { status: 'poison' } },
            { name: 'of Bleeding', modifiers: { status: 'bleed' } },
            { name: 'of Burning', modifiers: { status: 'burn' } },
            { name: 'of Frost', modifiers: { status: 'freeze' } },
            { name: 'of Poison Resistance', modifiers: { poisonResist: 0.3 } },
            { name: 'of Bleed Resistance', modifiers: { bleedResist: 0.3 } },
            { name: 'of Burn Resistance', modifiers: { burnResist: 0.3 } },
            { name: 'of Frost Resistance', modifiers: { freezeResist: 0.3 } }
        ];

        function getDistance(x1, y1, x2, y2) {
            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }

        // 직선 시야 확보 여부 간단 체크
        function hasLineOfSight(x1, y1, x2, y2) {
            let dx = Math.sign(x2 - x1);
            let dy = Math.sign(y2 - y1);
            let x = x1;
            let y = y1;
            while (x !== x2 || y !== y2) {
                if (x !== x1 || y !== y1) {
                    if (gameState.dungeon[y][x] === 'wall') return false;
                }
                if (x !== x2) x += dx;
                if (y !== y2) y += dy;
            }
            return true;
        }

        // BFS 경로 탐색
        function findPath(startX, startY, targetX, targetY) {
            const size = gameState.dungeonSize;
            const queue = [[startX, startY]];
            let head = 0;
            const visited = Array.from({ length: size }, () => Array(size).fill(false));
            const cameFrom = {};
            const key = (x, y) => `${x},${y}`;
            visited[startY][startX] = true;
            cameFrom[key(startX, startY)] = null;

            while (head < queue.length) {
                const [x, y] = queue[head++];
                if (x === targetX && y === targetY) {
                    const path = [];
                    let cur = [x, y];
                    while (cur) {
                        path.unshift({ x: cur[0], y: cur[1] });
                        cur = cameFrom[key(cur[0], cur[1])];
                    }
                    return path;
                }

                const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
                for (const [dx, dy] of dirs) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
                    if (visited[ny][nx]) continue;
                    const cell = gameState.dungeon[ny][nx];
                    if ((cell === 'wall' || cell === 'monster') && !(nx === targetX && ny === targetY)) continue;
                    visited[ny][nx] = true;
                    cameFrom[key(nx, ny)] = [x, y];
                    queue.push([nx, ny]);
                }
            }
            return null;
        }

        // 간단한 치유 로직
        function healTarget(healer, target, skillInfo, level = 1) {
            const base = skillInfo?.heal ?? (3 + healer.level);
            const power = getStat(healer, 'magicPower');
            let healAmount = Math.min((base + power) * level, getStat(target, 'maxHealth') - target.health);
            if (healAmount > 0) {
                target.health += healAmount;
                const name = target === gameState.player ? '플레이어' : target.name;
                const amountStr = formatNumber(healAmount);
                if (skillInfo) {
                    addMessage(`${skillInfo.icon} ${healer.name}의 ${skillInfo.name}이(가) ${name}을(를) ${amountStr} 회복했습니다.`, 'mercenary');
                } else {
                    addMessage(`💚 ${healer.name}이(가) ${name}을(를) ${amountStr} 회복했습니다.`, 'mercenary');
                }
                return true;
            }
            return false;
        }

        function purifyTarget(healer, target, skillInfo) {
            const statuses = ['poison','burn','freeze','bleed','paralysis','nightmare','silence','petrify','debuff'];
            let removed = false;
            statuses.forEach(s => {
                if (target[s]) {
                    target[s] = false;
                    const key = s + 'Turns';
                    if (target[key] !== undefined) target[key] = 0;
                    removed = true;
                }
            });
            if (removed) {
                const name = target === gameState.player ? '플레이어' : target.name;
                addMessage(`${skillInfo.icon} ${healer.name}의 ${skillInfo.name}이(가) ${name}의 상태이상을 해제했습니다.`, 'mercenary');
                return true;
            }
            return false;
        }
        function tryApplyStatus(target, status, turns) {
            if (!target.statusResistances || target.statusResistances[status] === undefined)
                return { applied: false, roll: null, dc: null };
            let resist = getStatusResist(target, status);
            const dc = Math.floor(resist * 20);
            const roll = rollDice("1d20");
            if (roll > dc) {
                target[status] = true;
                const key = status + "Turns";
                if (target[key] === undefined) target[key] = 0;
                target[key] = Math.max(target[key], turns);
                return { applied: true, roll, dc };
            }
            return { applied: false, roll, dc };
        }
        function getStatusResist(character, status) {
            let value = character.statusResistances && character.statusResistances[status] ? character.statusResistances[status] : 0;
            if (character.equipped) {
                ['weapon', 'armor', 'accessory1', 'accessory2'].forEach(slot => {
                    const it = character.equipped[slot];
                    if (it && it[status + 'Resist'] !== undefined) {
                        value += it[status + 'Resist'];
                    }
                });
            }
            function checkAura(source, target) {
                let bonus = 0;
                if (!source) return bonus;
                let keys = [];
                if (source === gameState.player) {
                    keys = [gameState.player.assignedSkills['1'], gameState.player.assignedSkills['2']];
                } else {
                    keys = [source.skill, source.skill2, source.auraSkill];
                }
                keys.filter(Boolean).forEach(key => {
                    if (key !== 'NaturalAura') return;
                    const skill = SKILL_DEFS[key];
                    if (!skill || !skill.passive || !skill.aura || skill.aura.allResist === undefined) return;
                    const dist = getDistance(source.x, source.y, target.x, target.y);
                    if (dist <= (skill.radius || 0)) {
                        const lvl = (source.skillLevels && source.skillLevels[key]) || 1;
                        bonus += skill.aura.allResist * lvl;
                    }
                });
                return bonus;
            }

            let auraBonus = 0;
            auraBonus += checkAura(gameState.player, character);
            gameState.activeMercenaries.filter(m => m.alive).forEach(m => {
                auraBonus += checkAura(m, character);
            });
            gameState.monsters.filter(m => m.isElite).forEach(elite => {
                auraBonus += checkAura(elite, character);
            });
            value += auraBonus;
            return value;
        }

        function getAuraBonus(character, stat) {
            let bonus = 0;
            ['1', '2'].forEach(slot => {
                const key = gameState.player.assignedSkills[slot];
                const skill = SKILL_DEFS[key];
                if (skill && skill.passive && skill.aura && skill.aura[stat] !== undefined) {
                    const dist = getDistance(gameState.player.x, gameState.player.y, character.x, character.y);
                    if (dist <= (skill.radius || 0)) {
                        bonus += skill.aura[stat];
                    }
                }
            });

            gameState.monsters.filter(m => m.isElite).forEach(elite => {
                const key = elite.auraSkill;
                const skill = SKILL_DEFS[key];
                if (skill && skill.passive && skill.aura && skill.aura[stat] !== undefined) {
                    const dist = getDistance(elite.x, elite.y, character.x, character.y);
                    if (dist <= (skill.radius || 0)) bonus += skill.aura[stat];
                }
            });

            gameState.activeMercenaries.filter(m => m.alive).forEach(merc => {
                const skills = [merc.skill, merc.skill2, merc.auraSkill];
                skills.filter(Boolean).forEach(key => {
                    const skill = SKILL_DEFS[key];
                    if (skill && skill.passive && skill.aura && skill.aura[stat] !== undefined) {
                        const dist = getDistance(merc.x, merc.y, character.x, character.y);
                        if (dist <= (skill.radius || 0)) bonus += skill.aura[stat];
                    }
                });
            });
            return bonus;
        }

        // 통합 공격 처리
        function performAttack(attacker, defender, options = {}) {
            const magic = options.magic || false;
            const element = options.element;
            const status = options.status;
            let attackStat = options.attackValue !== undefined ? options.attackValue : (magic ? getStat(attacker, 'magicPower') : getStat(attacker, 'attack'));
            let defenseStat = options.defenseValue !== undefined ? options.defenseValue : (magic ? getStat(defender, 'magicResist') : getStat(defender, 'defense'));


            const attackerAcc = getStat(attacker, 'accuracy');
            const defenderEva = getStat(defender, 'evasion');
            const attackBonus = Math.floor(attackerAcc * 5);
            const defenseTarget = 10 + Math.floor(defenderEva * 5);
            const hitRoll = rollDice('1d20') + attackBonus;
            if (hitRoll < defenseTarget) {
                return { hit: false, hitRoll, defenseTarget, attackBonus };
            }

            const damageRoll = rollDice(options.damageDice || attacker.damageDice || '1d4');
            let baseDamage = Math.max(1, damageRoll + attackStat - defenseStat);

            let crit = false;
            const critChance = getStat(attacker, 'critChance');
            if (Math.random() < critChance) {
                baseDamage = Math.floor(baseDamage * 1.5);
                crit = true;
            }

            let elementDamage = 0;
            let elementBaseDamage = 0;
            let elementResist = 0;
            if (element) {
                elementDamage = getStat(attacker, `${element}Damage`);
                elementBaseDamage = elementDamage;

                const naturalInfo = SKILL_DEFS['NaturalAura'];

                function checkAura(entity) {
                    if (!entity || !naturalInfo) return 0;
                    let lvl = 0;

                    if (entity === gameState.player) {
                        ['1', '2'].forEach(slot => {
                            const key = gameState.player.assignedSkills[slot];
                            if (key === 'NaturalAura') lvl += gameState.player.skillLevels[key] || 1;
                        });
                    }

                    const skills = [entity.skill, entity.skill2, entity.auraSkill];
                    skills.filter(Boolean).forEach(key => {
                        if (key === 'NaturalAura') lvl += (entity.skillLevels && entity.skillLevels[key]) || 1;
                    });

                    if (!lvl) return 0;
                    const dist = getDistance(entity.x, entity.y, defender.x, defender.y);
                    return dist <= (naturalInfo.radius || 0) ? lvl : 0;
                }

                let totalResist = defender.elementResistances[element] || 0;
                let auraBonus = 0;
                auraBonus += checkAura(gameState.player);
                gameState.activeMercenaries.filter(m => m.alive).forEach(m => {
                    auraBonus += checkAura(m);
                });
                gameState.monsters.filter(m => m.isElite || m.isSuperior).forEach(mon => {
                    auraBonus += checkAura(mon);
                });

                totalResist += auraBonus;
                elementResist = totalResist;
                elementDamage = Math.floor(elementDamage * (1 - totalResist));
            }


            let damage = baseDamage + elementDamage;
            defender.health -= damage;

            let statusApplied = false;
            const statusEffects = [];
            if (status) {
                const res = tryApplyStatus(defender, status, 3);
                if (res.applied) {
                    statusApplied = true;
                    statusEffects.push(status);
                    const defName = defender === gameState.player ? '플레이어' : defender.name;
                    addMessage(`⚠️ ${defName}이(가) ${STATUS_NAMES[status] || status} 상태가 되었습니다!`, 'combat', `resistance roll ${res.roll} vs DC ${res.dc} → failed`);
                }
            }
            if (crit && element === 'fire') {
                const res = tryApplyStatus(defender, 'burn', 2);
                if (res.applied) {
                    statusApplied = true;
                    statusEffects.push('burn');
                    const defName = defender === gameState.player ? '플레이어' : defender.name;
                    addMessage(`🔥 ${defName}이(가) 화상 상태가 되었습니다!`, 'combat', `resistance roll ${res.roll} vs DC ${res.dc} → failed`);
                }
            }
            if (crit && element === 'ice') {
                const res = tryApplyStatus(defender, 'freeze', 2);
                if (res.applied) {
                    statusApplied = true;
                    statusEffects.push('freeze');
                    const defName = defender === gameState.player ? '플레이어' : defender.name;
                    addMessage(`❄️ ${defName}이(가) 빙결 상태가 되었습니다!`, 'combat', `resistance roll ${res.roll} vs DC ${res.dc} → failed`);
                }
            }

            return { hit: true, crit, damage, baseDamage, elementDamage, element, elementBaseDamage, elementResist, statusApplied, statusEffects, hitRoll, damageRoll, defenseTarget, attackBonus, attackValue: attackStat, defenseStat };
        }

        function buildAttackDetail(type, skill, result) {
            let detail = `${type}${skill ? ' ' + skill : ''}: `;
            if (!result.hit) {
                return detail + `miss (hit roll ${result.hitRoll} vs ${result.defenseTarget})`;
            }
            detail += `damage roll ${result.damageRoll} + attack ${result.attackValue} - defense ${result.defenseStat} = ${result.baseDamage}`;
            if (result.element) {
                const emoji = ELEMENT_EMOJI[result.element] || result.element;
                if (result.elementBaseDamage) {
                    if (result.elementResist) {
                        detail += `; ${emoji} ${result.elementBaseDamage} x (1 - resist ${result.elementResist}) = ${result.elementDamage}`;
                    } else {
                        detail += `; ${emoji} ${result.elementBaseDamage}`;
                    }
                }
            }
            if (result.statusEffects && result.statusEffects.length) {
                const names = result.statusEffects.map(s => STATUS_NAMES[s] || s).join(', ');
                detail += `; status ${names}`;
            }
            return detail;
        }

        function formatNumber(value) {
            const num = Number(value);
            if (Number.isNaN(num)) return value;
            if (Number.isInteger(num)) return num.toString();
            return parseFloat(num.toFixed(2)).toString();
        }

        function formatItem(item) {
            const stats = [];
            if (item.attack !== undefined) stats.push(`공격+${formatNumber(item.attack)}`);
            if (item.defense !== undefined) stats.push(`방어+${formatNumber(item.defense)}`);
            if (item.healing !== undefined) stats.push(`회복+${formatNumber(item.healing)}`);
            if (item.fireDamage !== undefined) stats.push(`🔥+${formatNumber(item.fireDamage)}`);
            if (item.iceDamage !== undefined) stats.push(`❄️+${formatNumber(item.iceDamage)}`);
            if (item.lightningDamage !== undefined) stats.push(`⚡+${formatNumber(item.lightningDamage)}`);
            if (item.maxHealth !== undefined && item.type !== ITEM_TYPES.POTION && item.type !== ITEM_TYPES.REVIVE) stats.push(`HP+${formatNumber(item.maxHealth)}`);
            if (item.healthRegen !== undefined) stats.push(`HP회복+${formatNumber(item.healthRegen)}`);
            if (item.accuracy !== undefined) stats.push(`명중+${formatNumber(item.accuracy)}`);
            if (item.evasion !== undefined) stats.push(`회피+${formatNumber(item.evasion)}`);
            if (item.critChance !== undefined) stats.push(`치명+${formatNumber(item.critChance)}`);
            if (item.magicPower !== undefined) stats.push(`마공+${formatNumber(item.magicPower)}`);
            if (item.magicResist !== undefined) stats.push(`마방+${formatNumber(item.magicResist)}`);
            if (item.manaRegen !== undefined) stats.push(`MP회복+${formatNumber(item.manaRegen)}`);
            if (item.poisonResist !== undefined) stats.push(`독저항+${formatNumber(item.poisonResist * 100)}%`);
            if (item.bleedResist !== undefined) stats.push(`출혈저항+${formatNumber(item.bleedResist * 100)}%`);
            if (item.burnResist !== undefined) stats.push(`화상저항+${formatNumber(item.burnResist * 100)}%`);
            if (item.freezeResist !== undefined) stats.push(`동결저항+${formatNumber(item.freezeResist * 100)}%`);
            if (item.status) stats.push(`${item.status} 부여`);
            return `${item.name}${stats.length ? ' (' + stats.join(', ') + ')' : ''}`;
        }

        function getStat(character, stat) {
            const e = character.endurance || 0;
            const f = character.focus || 0;
            const s = character.strength || 0;
            const a = character.agility || 0;
            const i = character.intelligence || 0;
            let value = 0;
            switch (stat) {
                case 'maxHealth':
                    value = e * 2;
                    break;
                case 'maxMana':
                    value = f * 2;
                    break;
                case 'attack':
                    value = s;
                    break;
                case 'defense':
                    value = Math.floor(e * 0.1) + (character.baseDefense || 0);
                    break;
                case 'accuracy':
                    value = 0.7 + a * 0.02;
                    break;
                case 'evasion':
                    value = a * 0.02;
                    break;
                case 'critChance':
                    value = 0.03 + a * 0.005;
                    break;
                case 'magicPower':
                    value = i;
                    break;
                case 'magicResist':
                    value = i * 0.2;
                    break;
                default:
                    value = character[stat] || 0;
            }
            if (character.equipped) {
                ['weapon', 'armor', 'accessory1', 'accessory2'].forEach(slot => {
                    const it = character.equipped[slot];
                    if (it && it[stat] !== undefined) {
                        value += it[stat];
                    }
                });
            }
            value += getAuraBonus(character, stat);
            return value;
        }

        function averageDice(notation) {
            const m = notation.match(/(\d*)d(\d+)/);
            if (!m) return 0;
            const count = parseInt(m[1] || '1', 10);
            const sides = parseInt(m[2], 10);
            return count * (sides + 1) / 2;
        }

        function estimateSkillDamage(owner, key, defs) {
            const info = defs[key];
            if (!info) return 0;
            const lvl = owner.skillLevels && owner.skillLevels[key] || 1;
            if (info.heal) {
                return (info.heal * lvl) + getStat(owner, 'magicPower');
            }
            if (info.damageDice) {
                const base = averageDice(info.damageDice) * lvl;
                return base + (info.magic ? getStat(owner, 'magicPower') : getStat(owner, 'attack'));
            }
            if (info.melee) {
                const mult = info.multiplier || 1;
                return getStat(owner, 'attack') * mult * lvl;
            }
            return 0;
        }

        function showSkillDamage(owner, key, defs) {
            if (!key) return;
            const dmg = estimateSkillDamage(owner, key, defs);
            const name = defs[key].name;
            alert(`${name} 예상 피해: ${formatNumber(dmg)}`);
        }

        function showAuraDetails(key, lvl) {
            const info = SKILL_DEFS[key] || MERCENARY_SKILLS[key] || MONSTER_SKILLS[key];
            if (!info || !info.aura) return;
            const parts = Object.entries(info.aura)
                .map(([stat, val]) => `${stat} +${val * lvl}`);
            alert(`${info.name} : ${parts.join(', ')}`);
        }


        // 플레이어 체력 비율에 따른 표정 반환
        function getPlayerEmoji() {
            const ratio = gameState.player.health / getStat(gameState.player, 'maxHealth');
            if (ratio >= 0.7) return '😀';
            if (ratio >= 0.4) return '😐';
            if (ratio >= 0.1) return '😟';
            return '😢';
        }

        function processProjectiles() {
            const remaining = [];
            for (const proj of gameState.projectiles) {
                if (proj.homing && proj.target) {
                    proj.dx = Math.sign(proj.target.x - proj.x);
                    proj.dy = Math.sign(proj.target.y - proj.y);
                }
                let nx = proj.x + proj.dx;
                let ny = proj.y + proj.dy;

                if (nx < 0 || ny < 0 || nx >= gameState.dungeonSize || ny >= gameState.dungeonSize) {
                    continue;
                }

                const monster = gameState.monsters.find(m => m.x === nx && m.y === ny);
                if (monster) {
                    let attackValue;
                    let magic = !!proj.magic;
                    if (proj.damageDice !== undefined) {
                        attackValue = rollDice(proj.damageDice) * (proj.level || 1);
                        if (magic) {
                            attackValue += getStat(gameState.player, 'magicPower');
                        }
                    } else if (magic) {
                        attackValue = getStat(gameState.player, 'magicPower');
                    } else {
                        attackValue = getStat(gameState.player, 'attack');
                    }
                    const result = performAttack(gameState.player, monster, { attackValue, magic, element: proj.element, status: gameState.player.equipped.weapon && gameState.player.equipped.weapon.status, damageDice: proj.damageDice });
                    const icon = proj.icon || '➡️';
                    const name = proj.skill ? SKILL_DEFS[proj.skill].name : '원거리 공격';
                    const detail = buildAttackDetail('원거리 공격', name, result);
                    if (!result.hit) {
                        addMessage(`❌ ${monster.name}에게 ${name}이 빗나갔습니다!`, 'combat', detail);
                    } else {
                        const critMsg = result.crit ? ' (치명타!)' : '';
                        let dmgStr = formatNumber(result.baseDamage);
                        if (result.elementDamage) {
                            const emoji = ELEMENT_EMOJI[result.element] || '';
                            dmgStr = `${formatNumber(result.baseDamage)}+${emoji}${formatNumber(result.elementDamage)}`;
                        }
                        addMessage(`${icon} ${monster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, 'combat', detail);
                    }
                    if (monster.health <= 0) {
                        killMonster(monster);
                    }
                    continue;
                }

                if (gameState.dungeon[ny][nx] === 'wall') {
                    continue;
                }

                proj.x = nx;
                proj.y = ny;
                proj.rangeLeft--;
                if (proj.rangeLeft > 0) {
                    remaining.push(proj);
                }
            }
            gameState.projectiles = remaining;
        }
        // 인벤토리 UI 갱신
        function updateInventoryDisplay() {
            const container = document.getElementById('inventory-items');
            container.innerHTML = '';



            // group identical items together so they can be displayed as stacks
            const groups = new Map();
            for (const item of gameState.player.inventory) {
                const key = `${item.key}-${item.prefix || ''}-${item.suffix || ''}`;
                if (!groups.has(key)) {
                    groups.set(key, { item, count: 0 });
                }
                groups.get(key).count += 1;
            }

            for (const { item, count } of groups.values()) {
                const div = document.createElement('div');
                div.className = 'inventory-item';
                const span = document.createElement('span');
                const label = count > 1 ? `${formatItem(item)} x ${count}` : formatItem(item);
                span.textContent = label;
                div.appendChild(span);
                const sellBtn = document.createElement('button');
                sellBtn.textContent = '판매';
                sellBtn.className = 'sell-button';
                sellBtn.onclick = (e) => {
                    e.stopPropagation();
                    sellItem(item);
                };
                div.onclick = () => handleItemClick(item);
                div.appendChild(sellBtn);
                container.appendChild(div);
            }

            const weaponSlot = document.getElementById('equipped-weapon');
            if (gameState.player.equipped.weapon) {
                weaponSlot.textContent = `무기: ${formatItem(gameState.player.equipped.weapon)}`;
            } else {
                weaponSlot.textContent = '무기: 없음';
            }
            const armorSlot = document.getElementById('equipped-armor');
            if (gameState.player.equipped.armor) {
                armorSlot.textContent = `방어구: ${formatItem(gameState.player.equipped.armor)}`;
            } else {
                armorSlot.textContent = '방어구: 없음';
            }
            const acc1Slot = document.getElementById('equipped-accessory1');
            if (gameState.player.equipped.accessory1) {
                acc1Slot.textContent = `악세서리1: ${formatItem(gameState.player.equipped.accessory1)}`;
                acc1Slot.onclick = () => unequipAccessory('accessory1');
            } else {
                acc1Slot.textContent = '악세서리1: 없음';
                acc1Slot.onclick = null;
            }
            const acc2Slot = document.getElementById('equipped-accessory2');
            if (gameState.player.equipped.accessory2) {
                acc2Slot.textContent = `악세서리2: ${formatItem(gameState.player.equipped.accessory2)}`;
                acc2Slot.onclick = () => unequipAccessory('accessory2');
            } else {
                acc2Slot.textContent = '악세서리2: 없음';
                acc2Slot.onclick = null;
            }
        }

        function updateSkillDisplay() {
            const list = document.getElementById('skill-list');
            if (!list) return;
            list.innerHTML = '';
            gameState.player.skills.forEach(skill => {
                const div = document.createElement('div');
                div.className = 'skill-item';
                const info = SKILL_DEFS[skill];
                const level = gameState.player.skillLevels[skill] || 1;
                div.textContent = `${info.icon} ${info.name} (Lv ${level})`;
                div.onclick = () => {
                    if (gameState.player.skillPoints > 0 && skill !== 'Purify' && (typeof confirm === 'function' ? confirm(`${info.name} 레벨업?`) : false)) {
                        gameState.player.skillPoints -= 1;
                        gameState.player.skillLevels[skill] = level + 1;
                        updateStats();
                        updateSkillDisplay();
                        return;
                    }
                    const slot = prompt('Assign to slot (1 or 2)?');
                    if (slot === '1' || slot === '2') assignSkill(parseInt(slot,10), skill);
                };
                list.appendChild(div);
            });
            const s1 = document.getElementById('skill1-name');
            const s2 = document.getElementById('skill2-name');
            s1.textContent = gameState.player.assignedSkills[1] ? SKILL_DEFS[gameState.player.assignedSkills[1]].name : '없음';
            s2.textContent = gameState.player.assignedSkills[2] ? SKILL_DEFS[gameState.player.assignedSkills[2]].name : '없음';
            s1.onclick = () => showSkillDamage(gameState.player, gameState.player.assignedSkills[1], SKILL_DEFS);
            s2.onclick = () => showSkillDamage(gameState.player, gameState.player.assignedSkills[2], SKILL_DEFS);
        }

        function updateMaterialsDisplay() {
            const matList = document.getElementById('materials-list');
            if (!matList) return;
            matList.innerHTML = '';
            Object.entries(gameState.materials).forEach(([m, q]) => {
                const div = document.createElement('div');
                div.textContent = `${m}: ${formatNumber(q)}`;
                matList.appendChild(div);
            });

            const recipes = document.getElementById('recipe-list');
            recipes.innerHTML = '';
            gameState.knownRecipes.forEach(key => {
                const r = RECIPES[key];
                if (!r) return;
                const div = document.createElement('div');
                div.className = 'recipe-item';
                const req = Object.entries(r.materials).map(([m,q]) => `${m}:${q}`).join(', ');
                const span = document.createElement('span');
                span.textContent = `${r.name} (${req})`;
                div.appendChild(span);
                const btn = document.createElement('button');
                btn.textContent = 'Craft';
                btn.onclick = () => craftItem(key);
                div.appendChild(btn);
                recipes.appendChild(div);
            });

            const queueDiv = document.getElementById('crafting-queue');
            queueDiv.innerHTML = '';
            gameState.craftingQueue.forEach(entry => {
                const div = document.createElement('div');
                const r = RECIPES[entry.recipe];
                div.textContent = `${r.name} (${entry.turnsLeft}T)`;
                queueDiv.appendChild(div);
            });
        }

        function craftItem(key) {
            const recipe = RECIPES[key];
            if (!recipe) return;
            for (const [mat, qty] of Object.entries(recipe.materials)) {
                if ((gameState.materials[mat] || 0) < qty) {
                    addMessage('재료가 부족합니다.', 'info');
                    return;
                }
            }
            for (const [mat, qty] of Object.entries(recipe.materials)) {
                gameState.materials[mat] -= qty;
            }
            gameState.craftingQueue.push({ recipe: key, turnsLeft: recipe.turns });
            addMessage(`🛠️ ${recipe.name} 제작 시작`, 'info');
            updateMaterialsDisplay();
        }

        function assignSkill(slot, skill) {
            const other = slot === 1 ? 2 : 1;
            if (gameState.player.assignedSkills[other] === skill) {
                gameState.player.assignedSkills[other] = null;
            }
            gameState.player.assignedSkills[slot] = skill;
            updateSkillDisplay();
        }

        // 용병 목록 갱신
        function updateMercenaryDisplay() {
            const activeList = document.getElementById('active-mercenary-list');
            const standbyList = document.getElementById('standby-mercenary-list');
            activeList.innerHTML = '';
            standbyList.innerHTML = '';
            gameState.activeMercenaries.forEach((merc, i) => {
                const div = document.createElement('div');
                const statusClass = merc.alive ? 'alive' : 'dead';
                div.className = `mercenary-info ${statusClass}`;

            const hp = `${formatNumber(merc.health)}/${formatNumber(getStat(merc, 'maxHealth'))}`;
            const mp = `${formatNumber(merc.mana)}/${formatNumber(getStat(merc, 'maxMana'))}`;
                const weapon = merc.equipped && merc.equipped.weapon ? merc.equipped.weapon.name : '없음';
                const armor = merc.equipped && merc.equipped.armor ? merc.equipped.armor.name : '없음';
                const accessory1 = merc.equipped && merc.equipped.accessory1 ? merc.equipped.accessory1.name : '없음';
                const accessory2 = merc.equipped && merc.equipped.accessory2 ? merc.equipped.accessory2.name : '없음';
            const totalAttack = formatNumber(getStat(merc, 'attack'));
            const totalDefense = formatNumber(getStat(merc, 'defense'));
                const skillInfo = MERCENARY_SKILLS[merc.skill] || MONSTER_SKILLS[merc.skill];
                const skillInfo2 = MERCENARY_SKILLS[merc.skill2] || MONSTER_SKILLS[merc.skill2];
                let skillText = skillInfo ? `스킬:${skillInfo.name}(MP ${skillInfo.manaCost})` : '스킬: 없음';
                if (skillInfo2) skillText += ` / ${skillInfo2.name}(MP ${skillInfo2.manaCost})`;

                div.textContent = `${formatNumber(i + 1)}. ${merc.icon} ${merc.name} Lv.${formatNumber(merc.level)} (HP:${hp}, MP:${mp}) ` +
                    `[공격:${totalAttack}, 방어:${totalDefense}] ` +
                    `[무기:${weapon}, 방어구:${armor}, 악세1:${accessory1}, 악세2:${accessory2}] ` +
                    `[${skillText}]`;

                if (merc.alive) {
                    div.onclick = () => {
                        showMercenaryDetails(merc);
                    };
                } else {
                    const reviveBtn = document.createElement('button');
                    reviveBtn.textContent = '부활';
                    reviveBtn.style.marginLeft = '5px';
                    reviveBtn.onclick = (e) => {
                        e.stopPropagation();
                        reviveMercenary(merc);
                    };
                    div.appendChild(reviveBtn);
                }

                activeList.appendChild(div);
            });

            gameState.standbyMercenaries.forEach((merc, i) => {
                const div = document.createElement('div');
                div.className = 'mercenary-info alive';
                const skillInfo = MERCENARY_SKILLS[merc.skill] || MONSTER_SKILLS[merc.skill];
                const skillInfo2 = MERCENARY_SKILLS[merc.skill2] || MONSTER_SKILLS[merc.skill2];
                let skillText = skillInfo ? `스킬:${skillInfo.name}(MP ${skillInfo.manaCost})` : '스킬: 없음';
                if (skillInfo2) skillText += ` / ${skillInfo2.name}(MP ${skillInfo2.manaCost})`;
                div.textContent = `${merc.icon} ${merc.name} (대기) [${skillText}]`;

                const swapBtn = document.createElement('button');
                swapBtn.textContent = '배치';
                swapBtn.style.marginLeft = '5px';
                swapBtn.onclick = () => {
                    const options = gameState.activeMercenaries.map((m, idx) => `${idx + 1}: ${m.name}`);
                    const choice = prompt(`교체할 활동 용병을 선택하세요:\n${options.join('\n')}`);
                    if (choice === null) return;
                    const idx = parseInt(choice, 10) - 1;
                    if (idx >= 0 && idx < gameState.activeMercenaries.length) {
                        swapActiveAndStandby(idx, i);
                    }
                };
                div.appendChild(swapBtn);
            standbyList.appendChild(div);
        });
        }

        function updateIncubatorDisplay() {
            const list = document.getElementById('incubator-slots');
            const waiting = document.getElementById('hatched-list');
            if (!list || !waiting) return;
            list.innerHTML = '';
            gameState.incubators.forEach((slot, i) => {
                const div = document.createElement('div');
                div.className = 'incubator-slot';
                if (slot) {
                    div.textContent = `${slot.egg.name} (${slot.remainingTurns}T)`;
                    const btn = document.createElement('button');
                    btn.textContent = '회수';
                    btn.className = 'sell-button';
                    btn.onclick = () => removeEggFromIncubator(i);
                    div.appendChild(btn);
                } else {
                    div.textContent = '비어 있음';
                }
                list.appendChild(div);
            });
            waiting.innerHTML = '';
            gameState.hatchedSuperiors.forEach(mon => {
                const div = document.createElement('div');
                div.textContent = mon.name;
                div.className = 'incubator-slot clickable';
                div.addEventListener('click', () => showMonsterDetails(mon));

                const btn = document.createElement('button');
                btn.textContent = '영입';
                btn.className = 'sell-button';
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    recruitHatchedSuperior(mon);
                });
                div.appendChild(btn);

                // div.addEventListener('click', () => showMonsterDetails(mon));
                waiting.appendChild(div);
            });
        }



        // 용병 상세 정보 표시
        function showMercenaryDetails(merc) {
            const weapon = merc.equipped && merc.equipped.weapon ? merc.equipped.weapon.name : '없음';
            const armor = merc.equipped && merc.equipped.armor ? merc.equipped.armor.name : '없음';
            const accessory1 = merc.equipped && merc.equipped.accessory1 ? merc.equipped.accessory1.name : '없음';
            const accessory2 = merc.equipped && merc.equipped.accessory2 ? merc.equipped.accessory2.name : '없음';

            const weaponBtn = merc.equipped && merc.equipped.weapon
                ? `<button class="sell-button" onclick="unequipItemFromMercenary('${merc.id}','weapon')">해제</button>`
                : '';
            const armorBtn = merc.equipped && merc.equipped.armor
                ? `<button class="sell-button" onclick="unequipItemFromMercenary('${merc.id}','armor')">해제</button>`
                : '';
            const acc1Btn = merc.equipped && merc.equipped.accessory1
                ? `<button class="sell-button" onclick="unequipItemFromMercenary('${merc.id}','accessory1')">해제</button>`
                : '';
            const acc2Btn = merc.equipped && merc.equipped.accessory2
                ? `<button class="sell-button" onclick="unequipItemFromMercenary('${merc.id}','accessory2')">해제</button>`
                : '';
            const skills = [merc.skill, merc.skill2].filter(Boolean);
            const skillHtml = skills.map(key => {
                const info = MERCENARY_SKILLS[key] || MONSTER_SKILLS[key];
                const lvl = merc.skillLevels && merc.skillLevels[key] || 1;
                const cost = (info.manaCost || 0) + lvl - 1;
                const mpText = info.manaCost ? ` (MP ${cost})` : '';
                const defs = MERCENARY_SKILLS[key] ? 'MERCENARY_SKILLS' : 'MONSTER_SKILLS';
                const levelUp = (MERCENARY_SKILLS[key] || MONSTER_SKILLS[key])
                    ? ` <button onclick="upgradeMercenarySkill(window.currentDetailMercenary,'${key}')">레벨업</button>`
                    : '';
                return `<div><span class="merc-skill" onclick="showSkillDamage(window.currentDetailMercenary,'${key}',${defs})">${info.icon} ${info.name} Lv.${lvl}${mpText}</span>${levelUp}</div>`;
            }).join('');

            const actionBtn = merc.affinity >= 200
                ? `<button class="sell-button" onclick="sacrifice(window.currentDetailMercenary)">희생</button>`
                : `<button class="sell-button" onclick="dismiss(window.currentDetailMercenary)">해고</button>`;

            const html = `
                <h3>${merc.icon} ${merc.name} Lv.${formatNumber(merc.level)}</h3>
                <div>💪 힘: ${formatNumber(merc.strength)} ${'★'.repeat(merc.stars.strength)}</div>
                <div>🏃 민첩: ${formatNumber(merc.agility)} ${'★'.repeat(merc.stars.agility)}</div>
                <div>🛡 체력: ${formatNumber(merc.endurance)} ${'★'.repeat(merc.stars.endurance)}</div>
                <div>🔮 집중: ${formatNumber(merc.focus)} ${'★'.repeat(merc.stars.focus)}</div>
                <div>📖 지능: ${formatNumber(merc.intelligence)} ${'★'.repeat(merc.stars.intelligence)}</div>
                <div>💕 호감도: ${formatNumber(merc.affinity)}</div>
                <div>🍗 배부름: ${formatNumber(merc.fullness)}</div>
                <hr>
                <div>❤️ HP: ${formatNumber(merc.health)}/${formatNumber(getStat(merc, 'maxHealth'))}</div>
                <div>🔋 MP: ${formatNumber(merc.mana)}/${formatNumber(getStat(merc, 'maxMana'))}</div>
                <div>⚔️ 공격력: ${formatNumber(getStat(merc, 'attack'))}</div>
                <div>🛡️ 방어력: ${formatNumber(getStat(merc, 'defense'))}</div>
                <div>🎯 명중률: ${formatNumber(getStat(merc, 'accuracy'))}</div>
                <div>💨 회피율: ${formatNumber(getStat(merc, 'evasion'))}</div>
                <div>💥 치명타: ${formatNumber(getStat(merc, 'critChance'))}</div>
                <div>🔮 마법공격: ${formatNumber(getStat(merc, 'magicPower'))}</div>
                <div>✨ 마법방어: ${formatNumber(getStat(merc, 'magicResist'))}</div>
                <div>❤️‍🩹 회복력: ${formatNumber(getStat(merc, 'healthRegen'))}</div>
                <div>🔁 마나회복: ${formatNumber(getStat(merc, 'manaRegen'))}</div>
                <div>📚 스킬포인트: ${formatNumber(merc.skillPoints)}</div>
                <hr>
                <div>무기: ${weapon} ${weaponBtn}</div>
                <div>방어구: ${armor} ${armorBtn}</div>
                <div>악세1: ${accessory1} ${acc1Btn}</div>
                <div>악세2: ${accessory2} ${acc2Btn}</div>
                ${skillHtml || '<div>스킬: 없음</div>'}
                <div>${actionBtn}</div>
            `;

            document.getElementById('mercenary-detail-content').innerHTML = html;
            document.getElementById('mercenary-detail-panel').style.display = 'block';
            gameState.gameRunning = false;
            window.currentDetailMercenary = merc;
        }

        function hideMercenaryDetails() {
            document.getElementById('mercenary-detail-panel').style.display = 'none';
            gameState.gameRunning = true;
            window.currentDetailMercenary = null;
        }

        function upgradeMercenarySkill(merc, key) {
            const level = merc.skillLevels[key] || 1;
            const baseCost = 50;
            const cost = baseCost * level * level;
            if (merc.skillPoints <= 0) {
                addMessage('❌ 스킬포인트가 부족합니다.', 'mercenary');
                return;
            }
            if (gameState.player.gold < cost) {
                addMessage(`💸 골드가 부족합니다. 업그레이드에는 ${formatNumber(cost)} 골드가 필요합니다.`, 'info');
                return;
            }
            merc.skillPoints -= 1;
            gameState.player.gold -= cost;
            merc.skillLevels[key] = level + 1;
            updateStats();
            showMercenaryDetails(merc);
        }

        function showMonsterDetails(monster) {
            const auraInfo = monster.isElite && monster.auraSkill ? SKILL_DEFS[monster.auraSkill] : null;
            const auraLine = auraInfo ? `<div>오라 스킬: ${auraInfo.icon} ${auraInfo.name}</div>` : '';
            const traitInfo = monster.trait ? MONSTER_TRAITS[monster.trait] : null;
            const traitLine = traitInfo ? `<div>특성: ${traitInfo.icon} ${traitInfo.name}</div>` : '';
            const stars = monster.stars || {strength:0, agility:0, endurance:0, focus:0, intelligence:0};
            const skills = [];
            if (monster.monsterSkill && MONSTER_SKILLS[monster.monsterSkill]) {
                skills.push(MONSTER_SKILLS[monster.monsterSkill]);
            }
            if (monster.skill) {
                const def = MERCENARY_SKILLS[monster.skill] || SKILL_DEFS[monster.skill] || MONSTER_SKILLS[monster.skill];
                if (def) skills.push(def);
            }
            const skillLine = skills.map(s => `<div>스킬: ${s.icon} ${s.name}</div>`).join('');
            const actionBtn = monster.affinity !== undefined
                ? (monster.affinity >= 200
                    ? `<button class="sell-button" onclick="sacrifice(window.currentDetailMonster)">희생</button>`
                    : `<button class="sell-button" onclick="dismiss(window.currentDetailMonster)">해고</button>`)
                : '';
            const html = `
                <h3>${monster.icon} ${monster.name} (Lv.${monster.level})</h3>
                <div>❤️ HP: ${monster.health}/${formatNumber(getStat(monster,'maxHealth'))}</div>
                <div>🔋 MP: ${formatNumber(monster.mana)}/${formatNumber(getStat(monster,'maxMana'))}</div>
                <div>⚔️ 공격력: ${formatNumber(getStat(monster,'attack'))}</div>
                <div>🛡️ 방어력: ${formatNumber(getStat(monster,'defense'))}</div>
                <div>🎯 명중률: ${formatNumber(getStat(monster,'accuracy'))}</div>
                <div>💨 회피율: ${formatNumber(getStat(monster,'evasion'))}</div>
                <div>💥 치명타: ${formatNumber(getStat(monster,'critChance'))}</div>
                <div>🔮 마법공격: ${formatNumber(getStat(monster,'magicPower'))}</div>
                <div>✨ 마법방어: ${formatNumber(getStat(monster,'magicResist'))}</div>
                ${monster.affinity !== undefined ? `<div>💕 호감도: ${formatNumber(monster.affinity)}</div>` : ''}
                ${monster.fullness !== undefined ? `<div>🍗 배부름: ${formatNumber(monster.fullness)}</div>` : ''}
                <div>💪 힘: ${monster.strength}${monster.isSuperior ? ' ' + '★'.repeat(stars.strength) : ''}</div>
                <div>🏃 민첩: ${monster.agility}${monster.isSuperior ? ' ' + '★'.repeat(stars.agility) : ''}</div>
                <div>🛡 체력: ${monster.endurance}${monster.isSuperior ? ' ' + '★'.repeat(stars.endurance) : ''}</div>
                <div>🔮 집중: ${monster.focus}${monster.isSuperior ? ' ' + '★'.repeat(stars.focus) : ''}</div>
                <div>📖 지능: ${monster.intelligence}${monster.isSuperior ? ' ' + '★'.repeat(stars.intelligence) : ''}</div>
                <div>📏 사거리: ${monster.range}</div>
                <div>특수: ${monster.special || '없음'}</div>
                ${traitLine}
                ${skillLine}
                ${auraLine}
                ${actionBtn ? `<div>${actionBtn}</div>` : ''}
            `;
            document.getElementById('monster-detail-content').innerHTML = html;
            document.getElementById('monster-detail-panel').style.display = 'block';
            gameState.gameRunning = false;
            window.currentDetailMonster = monster;
        }

        function showChampionDetails(champion) {
            const eq = champion.equipped || {};
            const weapon = eq.weapon ? eq.weapon.name : '없음';
            const armor = eq.armor ? eq.armor.name : '없음';
            const acc1 = eq.accessory1 ? eq.accessory1.name : '없음';
            const acc2 = eq.accessory2 ? eq.accessory2.name : '없음';
            const skillInfo = champion.monsterSkill ? MONSTER_SKILLS[champion.monsterSkill] : null;
            const skillLine = skillInfo ? `<div>스킬: ${skillInfo.icon} ${skillInfo.name}</div>` : '<div>스킬: 없음</div>';
            const html = `
                <h3>${champion.icon} ${champion.name} (Lv.${champion.level})</h3>
                <div>💪 힘: ${formatNumber(champion.strength)} ${'★'.repeat(champion.stars.strength)}</div>
                <div>🏃 민첩: ${formatNumber(champion.agility)} ${'★'.repeat(champion.stars.agility)}</div>
                <div>🛡 체력: ${formatNumber(champion.endurance)} ${'★'.repeat(champion.stars.endurance)}</div>
                <div>🔮 집중: ${formatNumber(champion.focus)} ${'★'.repeat(champion.stars.focus)}</div>
                <div>📖 지능: ${formatNumber(champion.intelligence)} ${'★'.repeat(champion.stars.intelligence)}</div>
                ${champion.affinity !== undefined ? `<div>💕 호감도: ${formatNumber(champion.affinity)}</div>` : ''}
                <hr>
                <div>❤️ HP: ${formatNumber(champion.health)}/${formatNumber(getStat(champion,'maxHealth'))}</div>
                <div>🔋 MP: ${formatNumber(champion.mana)}/${formatNumber(getStat(champion,'maxMana'))}</div>
                <div>⚔️ 공격력: ${formatNumber(getStat(champion,'attack'))}</div>
                <div>🛡️ 방어력: ${formatNumber(getStat(champion,'defense'))}</div>
                <div>🎯 명중률: ${formatNumber(getStat(champion,'accuracy'))}</div>
                <div>💨 회피율: ${formatNumber(getStat(champion,'evasion'))}</div>
                <div>💥 치명타: ${formatNumber(getStat(champion,'critChance'))}</div>
                <div>🔮 마법공격: ${formatNumber(getStat(champion,'magicPower'))}</div>
                <div>✨ 마법방어: ${formatNumber(getStat(champion,'magicResist'))}</div>
                <div>📏 사거리: ${champion.range}</div>
                <div>무기: ${weapon}</div>
                <div>방어구: ${armor}</div>
                <div>악세1: ${acc1}</div>
                <div>악세2: ${acc2}</div>
                ${skillLine}
            `;
            document.getElementById('monster-detail-content').innerHTML = html;
            document.getElementById('monster-detail-panel').style.display = 'block';
            gameState.gameRunning = false;
        }

        function hideMonsterDetails() {
            document.getElementById('monster-detail-panel').style.display = 'none';
            gameState.gameRunning = true;
            window.currentDetailMonster = null;
        }

        function spawnMercenaryNearPlayer(mercenary) {
            if (!gameState.dungeon.length) generateDungeon();
            const positions = [
                {x: gameState.player.x + 1, y: gameState.player.y},
                {x: gameState.player.x - 1, y: gameState.player.y},
                {x: gameState.player.x, y: gameState.player.y + 1},
                {x: gameState.player.x, y: gameState.player.y - 1},
                {x: gameState.player.x + 1, y: gameState.player.y + 1},
                {x: gameState.player.x - 1, y: gameState.player.y - 1},
                {x: gameState.player.x + 1, y: gameState.player.y - 1},
                {x: gameState.player.x - 1, y: gameState.player.y + 1}
            ];
            for (const pos of positions) {
                if (pos.x >= 0 && pos.x < gameState.dungeonSize &&
                    pos.y >= 0 && pos.y < gameState.dungeonSize &&
                    gameState.dungeon[pos.y] && gameState.dungeon[pos.y][pos.x] === 'empty' &&
                    !gameState.activeMercenaries.some(m => m.x === pos.x && m.y === pos.y && m.alive) &&
                    !gameState.monsters.some(m => m.x === pos.x && m.y === pos.y)) {
                    mercenary.x = pos.x;
                    mercenary.y = pos.y;
                    return true;
                }
            }
            return false;
        }

        function swapActiveAndStandby(activeIndex, standbyIndex) {
            const active = gameState.activeMercenaries[activeIndex];
            const standby = gameState.standbyMercenaries[standbyIndex];
            if (!spawnMercenaryNearPlayer(standby)) {
                addMessage('❌ 용병을 배치할 공간이 없습니다.', 'info');
                return;
            }
            gameState.activeMercenaries[activeIndex] = standby;
            gameState.standbyMercenaries[standbyIndex] = active;
            active.x = -1;
            active.y = -1;
            addMessage(`🔄 ${standby.name}과 ${active.name}을 교체했습니다.`, 'mercenary');
            updateMercenaryDisplay();
            updateIncubatorDisplay();
            renderDungeon();
        }

        // 플레이어 능력치 표시 업데이트
        function updateStats() {
            document.getElementById('level').textContent = formatNumber(gameState.player.level);
            document.getElementById('skillPoints').textContent = formatNumber(gameState.player.skillPoints);
            document.getElementById('strengthStat').textContent = formatNumber(gameState.player.strength);
            document.getElementById('agilityStat').textContent = formatNumber(gameState.player.agility);
            document.getElementById('enduranceStat').textContent = formatNumber(gameState.player.endurance);
            document.getElementById('focusStat').textContent = formatNumber(gameState.player.focus);
            document.getElementById('intelligenceStat').textContent = formatNumber(gameState.player.intelligence);
            document.getElementById('health').textContent = formatNumber(gameState.player.health);
            document.getElementById('maxHealth').textContent = formatNumber(getStat(gameState.player, 'maxHealth'));
            document.getElementById('mana').textContent = formatNumber(gameState.player.mana);
            document.getElementById('maxMana').textContent = formatNumber(getStat(gameState.player, 'maxMana'));
            document.getElementById('fullness').textContent = formatNumber(gameState.player.fullness);
            document.getElementById('healthRegen').textContent = formatNumber(getStat(gameState.player, 'healthRegen'));
            document.getElementById('manaRegen').textContent = formatNumber(getStat(gameState.player, 'manaRegen'));
            document.getElementById('attackStat').textContent = formatNumber(getStat(gameState.player, 'attack'));
            document.getElementById('defense').textContent = formatNumber(getStat(gameState.player, 'defense'));
            document.getElementById('accuracy').textContent = formatNumber(getStat(gameState.player, 'accuracy'));
            document.getElementById('evasion').textContent = formatNumber(getStat(gameState.player, 'evasion'));
            document.getElementById('critChance').textContent = formatNumber(getStat(gameState.player, 'critChance'));
            document.getElementById('magicPower').textContent = formatNumber(getStat(gameState.player, 'magicPower'));
            document.getElementById('magicResist').textContent = formatNumber(getStat(gameState.player, 'magicResist'));
            document.getElementById('exp').textContent = formatNumber(gameState.player.exp);
            document.getElementById('expNeeded').textContent = formatNumber(gameState.player.expNeeded);
            document.getElementById('gold').textContent = formatNumber(gameState.player.gold);
            document.getElementById('floor').textContent = formatNumber(gameState.floor);
            document.getElementById('weaponBonus').textContent = gameState.player.equipped.weapon ? `(+${formatNumber(gameState.player.equipped.weapon.attack)})` : '';
            document.getElementById('armorBonus').textContent = gameState.player.equipped.armor ? `(+${formatNumber(gameState.player.equipped.armor.defense)})` : '';
            const hpRatio = gameState.player.health / getStat(gameState.player,'maxHealth');
            const hpEl = document.getElementById('hp-bar');
            if (hpEl) hpEl.style.width = (hpRatio*100) + '%';
            const mpRatio = gameState.player.mana / getStat(gameState.player,'maxMana');
            const mpEl = document.getElementById('mp-bar');
            if (mpEl) mpEl.style.width = (mpRatio*100) + '%';
            updateTurnEffects();
        }

        function updateTurnEffects() {
            const panel = document.getElementById('turn-effects');
            if (!panel) return;
            const auras = [];
            const addAura = (key, lvl) => {
                const info = SKILL_DEFS[key] || MERCENARY_SKILLS[key] || MONSTER_SKILLS[key];
                if (info && info.passive && info.aura) {
                    auras.push(
                        `<span class="buff-icon" onclick="showAuraDetails('${key}',${lvl})"` +
                        ` title="${info.name} Lv.${lvl}">${info.icon}</span>`
                    );
                }
            };
            ['1','2'].forEach(slot => {
                const k = gameState.player.assignedSkills[slot];
                if (k) addAura(k, gameState.player.skillLevels[k] || 1);
            });
            gameState.activeMercenaries.filter(m=>m.alive).forEach(m=>{
                const skills = new Set([m.skill, m.skill2, m.auraSkill].filter(Boolean));
                skills.forEach(k=>{
                    const info = SKILL_DEFS[k];
                    if (info && info.passive && info.aura) {
                        const dist = getDistance(m.x, m.y, gameState.player.x, gameState.player.y);
                        if (dist <= (info.radius || 0)) addAura(k, m.skillLevels[k] || 1);
                    }
                });
            });
            gameState.monsters.filter(m=>m.isElite).forEach(el=>{
                const k = el.auraSkill;
                const info = SKILL_DEFS[k];
                if (info && info.passive && info.aura) {
                    const dist = getDistance(el.x, el.y, gameState.player.x, gameState.player.y);
                    if (dist <= (info.radius || 0)) addAura(k, el.skillLevels[k] || 1);
                }
            });

            const statusParts = [];
            const statusKeys = ['poison','burn','freeze','bleed','paralysis','nightmare','silence','petrify','debuff'];
            statusKeys.forEach(s => {
                if (gameState.player[s]) {
                    const icon = STATUS_ICONS[s] || '';
                    const turns = gameState.player[s + 'Turns'] || 0;
                    const name = STATUS_NAMES[s] || s;
                    statusParts.push(`${icon} ${name}(${turns})`);
                }
            });

            const auraText = auras.length ? auras.join('') : '없음';
            const statusText = statusParts.length ? statusParts.join(', ') : '없음';
            panel.innerHTML = `<div>오라: ${auraText}</div><div>상태: ${statusText}</div>`;
        }

        // 안개 업데이트
        function updateFogOfWar() {
            for (let y = 0; y < gameState.dungeonSize; y++) {
                if (!gameState.fogOfWar[y]) gameState.fogOfWar[y] = [];
                for (let x = 0; x < gameState.dungeonSize; x++) {
                    if (getDistance(x, y, gameState.player.x, gameState.player.y) <= FOG_RADIUS) {
                        gameState.fogOfWar[y][x] = false;
                    } else if (gameState.fogOfWar[y][x] === undefined) {
                        gameState.fogOfWar[y][x] = true;
                    }
                }
            }
        }

        // 몬스터 생성
        function createMonster(type, x, y, level = 1) {
            const data = MONSTER_TYPES[type];
            const endurance = data.baseHealth / 2;
            const agility = Math.max(0, Math.round((data.baseAccuracy - 0.7) / 0.02));
            const monster = {
                id: Math.random().toString(36).substr(2, 9),
                type,
                name: data.name,
                icon: data.icon,
                x,
                y,
                level: 1,
                endurance: endurance,
                focus: 0,
                strength: data.baseAttack,
                agility: agility,
                intelligence: data.baseMagicPower,
                baseDefense: data.baseDefense - Math.floor(endurance * 0.1),
                maxHealth: data.baseHealth,
                health: data.baseHealth,
                maxMana: 0,
                mana: 0,
                attack: data.baseAttack,
                defense: data.baseDefense,
                accuracy: data.baseAccuracy,
                evasion: data.baseEvasion,
                critChance: data.baseCritChance,
                magicPower: data.baseMagicPower,
                magicResist: data.baseMagicResist,
                elementResistances: {fire:0, ice:0, lightning:0, earth:0, light:0, dark:0},
                statusResistances: {poison:0, bleed:0, burn:0, freeze:0, paralysis:0, nightmare:0, silence:0, petrify:0, debuff:0},
                poison: false,
                burn: false,
                freeze: false,
                bleed: false,
                paralysis: false,
                nightmare: false,
                silence: false,
                petrify: false,
                debuff: false,
                poisonTurns: 0,
                burnTurns: 0,
                freezeTurns: 0,
                bleedTurns: 0,
                paralysisTurns: 0,
                nightmareTurns: 0,
                silenceTurns: 0,
                petrifyTurns: 0,
                debuffTurns: 0,
                exp: data.baseExp,
                expNeeded: 15,
                gold: data.baseGold,
                range: data.range,
                special: data.special,
                statusEffect: data.statusEffect,
                lootChance: 0.3,
                fullness: 75,
                hasActed: false
            };
            setMonsterLevel(monster, level);
            monster.skillLevels = {};
            const pool = MONSTER_SKILL_SETS[type];
            if (pool && pool.length) {
                const sk = pool[Math.floor(Math.random() * pool.length)];
                monster.monsterSkill = sk;
                monster.skillLevels[sk] = Math.floor((level - 1) / 3) + 1;
            }
            const traitPool = MONSTER_TRAIT_SETS[type];
            if (traitPool && traitPool.length) {
                monster.trait = traitPool[Math.floor(Math.random() * traitPool.length)];
                const tinfo = MONSTER_TRAITS[monster.trait];
                if (tinfo && tinfo.status) monster.statusEffect = tinfo.status;
                if (tinfo && tinfo.element) monster[`${tinfo.element}Damage`] = 2;
            }
            return monster;
        }

        function createEliteMonster(type, x, y, level = 1) {
            const monster = createMonster(type, x, y, level + 1);
            const auraKeys = ['RegenerationAura', 'MeditationAura', 'HasteAura', 'ConcentrationAura', 'CondemnAura', 'NaturalAura'];
            const auraSkill = auraKeys[Math.floor(Math.random() * auraKeys.length)];
            monster.isElite = true;
            monster.auraSkill = auraSkill;
            monster.skillLevels[auraSkill] = Math.floor((level - 1) / 3) + 1;
            monster.name = `엘리트 ${monster.name}`;
            monster.attack = Math.floor(monster.attack * 1.5);
            monster.defense = Math.floor(monster.defense * 1.5);
            monster.health = Math.floor(monster.health * 1.5);
            monster.maxHealth = monster.health;
            monster.lootChance = 0.6;
            return monster;
        }

        function createSuperiorMonster(type, x, y, level = 1) {
            const monster = createMonster(type, x, y, level + 1);
            const auraKeys = ['MightAura','ProtectAura','RegenerationAura','MeditationAura','HasteAura','ConcentrationAura','CondemnAura','NaturalAura'];
            const skillKeys = Object.keys(MERCENARY_SKILLS).filter(k => !k.endsWith('Aura'));
            const skill = skillKeys[Math.floor(Math.random() * skillKeys.length)];
            const auraSkill = auraKeys[Math.floor(Math.random() * auraKeys.length)];
            monster.isElite = true;
            monster.isSuperior = true;
            monster.stars = generateStars();
            monster.skill = skill;
            monster.auraSkill = auraSkill;
            monster.skillLevels[skill] = Math.floor((level - 1) / 3) + 1;
            monster.skillLevels[auraSkill] = Math.floor((level - 1) / 3) + 1;
            monster.name = `상급 ${monster.name}`;
            monster.attack = Math.floor(monster.attack * 2);
            monster.defense = Math.floor(monster.defense * 2);
            monster.health = Math.floor(monster.health * 2);
            monster.maxHealth = monster.health;
            monster.focus = 5;
            monster.maxMana = getStat(monster, 'maxMana');
            monster.mana = monster.maxMana;
            monster.lootChance = 0.8;
            return monster;
        }

        function setMercenaryLevel(mercenary, level) {
            for (let i = 1; i < level; i++) {
                mercenary.level += 1;
                mercenary.endurance += 2;
                mercenary.strength += 1;
                mercenary.health = getStat(mercenary, 'maxHealth');
                mercenary.mana = getStat(mercenary, 'maxMana');
                mercenary.expNeeded = Math.floor(mercenary.expNeeded * 1.5);
            }
        }

        function setMonsterLevel(monster, level) {
            for (let i = 1; i < level; i++) {
                monster.level += 1;
                if ((monster.isSuperior || monster.isChampion) && monster.stars) {
                    monster.endurance += 2 + monster.stars.endurance * 0.5;
                    monster.strength += 1 + monster.stars.strength * 0.5;
                    monster.agility += 1 + monster.stars.agility * 0.5;
                    monster.focus += 1 + monster.stars.focus * 0.5;
                    monster.intelligence += 1 + monster.stars.intelligence * 0.5;
                } else {
                    monster.endurance += 2;
                    monster.strength += 1;
                    monster.agility += 1;
                    monster.focus += 1;
                    monster.intelligence += 1;
                }
                monster.maxHealth = getStat(monster, 'maxHealth');
                monster.health = monster.maxHealth;
                monster.maxMana = getStat(monster, 'maxMana');
                monster.mana = monster.maxMana;
                monster.attack = getStat(monster, 'attack');
                monster.defense = getStat(monster, 'defense');
                monster.accuracy = getStat(monster, 'accuracy');
                monster.evasion = getStat(monster, 'evasion');
                monster.critChance = getStat(monster, 'critChance');
                monster.magicPower = getStat(monster, 'magicPower');
                monster.magicResist = getStat(monster, 'magicResist');
                monster.expNeeded = Math.floor((monster.expNeeded || 15) * 1.5);
            }
        }

        function setChampionLevel(champion, level) {
            for (let i = 1; i < level; i++) {
                champion.level += 1;
                champion.endurance += 2 + champion.stars.endurance * 0.5;
                champion.strength += 1 + champion.stars.strength * 0.5;
                champion.agility += 1 + champion.stars.agility * 0.5;
                champion.focus += 1 + champion.stars.focus * 0.5;
                champion.intelligence += 1 + champion.stars.intelligence * 0.5;
                champion.maxHealth = getStat(champion, 'maxHealth');
                champion.health = champion.maxHealth;
                champion.maxMana = getStat(champion, 'maxMana');
                champion.mana = champion.maxMana;
                champion.attack = getStat(champion, 'attack');
                champion.defense = getStat(champion, 'defense');
                champion.accuracy = getStat(champion, 'accuracy');
                champion.evasion = getStat(champion, 'evasion');
                champion.critChance = getStat(champion, 'critChance');
                champion.magicPower = getStat(champion, 'magicPower');
                champion.magicResist = getStat(champion, 'magicResist');
                champion.expNeeded = Math.floor((champion.expNeeded || 15) * 1.5);
            }
        }

function createTreasure(x, y, gold) {
            const floorBonus = Math.max(0, gameState.floor - 1) * 2;
            return { x, y, gold: gold + floorBonus };
        }

function findAdjacentEmpty(x, y) {
            const dirs = [
                {dx:1, dy:0}, {dx:-1, dy:0}, {dx:0, dy:1}, {dx:0, dy:-1},
                {dx:1, dy:1}, {dx:-1, dy:-1}, {dx:1, dy:-1}, {dx:-1, dy:1}
            ];
            for (const d of dirs) {
                const nx = x + d.dx;
                const ny = y + d.dy;
                if (nx >= 0 && nx < gameState.dungeonSize &&
                    ny >= 0 && ny < gameState.dungeonSize &&
                    gameState.dungeon[ny][nx] === 'empty') {
                    return {x:nx, y:ny};
                }
            }
            return {x, y};
        }

function killMonster(monster) {
            addMessage(`💀 ${monster.name}을(를) 처치했습니다!`, 'combat');
            gameState.player.exp += monster.exp;
            let goldGain = monster.gold;
            gameState.player.gold += goldGain;
            checkLevelUp();
            updateStats();
            if (monster.isChampion) {
                const eq = Object.values(monster.equipped || {}).filter(i => i);
                if (eq.length) {
                    const drop = eq[Math.floor(Math.random() * eq.length)];
                    const pos = findAdjacentEmpty(monster.x, monster.y);
                    drop.x = pos.x;
                    drop.y = pos.y;
                    gameState.items.push(drop);
                    gameState.dungeon[pos.y][pos.x] = 'item';
                }
            } else if (monster.special === 'boss') {
                const bossItems = ['magicSword', 'magicStaff', 'plateArmor', 'greaterHealthPotion'];
                if (Math.random() < 0.2) bossItems.push('reviveScroll');
                const bossItemKey = bossItems[Math.floor(Math.random() * bossItems.length)];
                const pos = findAdjacentEmpty(monster.x, monster.y);
                const bossItem = createItem(bossItemKey, pos.x, pos.y);
                gameState.items.push(bossItem);
                gameState.dungeon[pos.y][pos.x] = 'item';
                addMessage(`🎁 ${monster.name}이(가) ${bossItem.name}을(를) 떨어뜨렸습니다!`, 'treasure');
            } else {
                let lootChance = monster.lootChance;
                if (Math.random() < lootChance) {
                    const itemKeys = Object.keys(ITEMS).filter(k => k !== 'reviveScroll');
                    const availableItems = itemKeys.filter(key =>
                        ITEMS[key].level <= Math.ceil(gameState.floor / 2 + 1) &&
                        ITEMS[key].type !== ITEM_TYPES.ESSENCE
                    );
                    let randomItemKey = availableItems[Math.floor(Math.random() * availableItems.length)];
                    if (Math.random() < 0.05) {
                        randomItemKey = 'superiorEgg';
                    } else if (Math.random() < 0.1 && ITEMS.reviveScroll.level <= Math.ceil(gameState.floor / 2 + 1)) {
                        randomItemKey = 'reviveScroll';
                    }
                    const pos = findAdjacentEmpty(monster.x, monster.y);
                    const droppedItem = createItem(randomItemKey, pos.x, pos.y);
                    gameState.items.push(droppedItem);
                    gameState.dungeon[pos.y][pos.x] = 'item';
                    addMessage(`📦 ${monster.name}이(가) ${droppedItem.name}을(를) 떨어뜨렸습니다!`, 'item');
                }
            }
            const idx = gameState.monsters.findIndex(m => m === monster);
            if (idx !== -1) gameState.monsters.splice(idx, 1);
            monster.health = 0;
            gameState.corpses.push(monster);
            gameState.dungeon[monster.y][monster.x] = 'corpse';
        }

        function convertMonsterToMercenary(monster) {
            return {
                id: monster.id,
                type: 'MONSTER',
                name: monster.name,
                icon: monster.icon,
                role: monster.special === 'ranged' ? 'ranged' : monster.special === 'magic' ? 'caster' : 'tank',
                x: -1,
                y: -1,
                level: monster.level,
                stars: (monster.isSuperior || monster.isChampion) ? Object.assign({}, monster.stars) : {strength:0, agility:0, endurance:0, focus:0, intelligence:0},
                endurance: monster.endurance,
                focus: monster.focus,
                strength: monster.strength,
                agility: monster.agility,
                intelligence: monster.intelligence,
                baseDefense: monster.baseDefense,
                maxHealth: monster.maxHealth,
                health: monster.maxHealth,
                maxMana: monster.maxMana,
                mana: monster.maxMana,
                healthRegen: monster.healthRegen || 0,
                manaRegen: monster.manaRegen || 1,
                auraSkill: monster.auraSkill || null,
                skill: (() => {
                    if (monster.isSuperior) return monster.skill;
                    if (monster.isElite) return monster.auraSkill;
                    return monster.monsterSkill || null;
                })(),
                skill2: (() => {
                    if (monster.isSuperior) return monster.auraSkill;
                    if (monster.isElite) return monster.monsterSkill || null;
                    return null;
                })(),
                attack: monster.attack,
                defense: monster.defense,
                accuracy: monster.accuracy,
                evasion: monster.evasion,
                critChance: monster.critChance,
                magicPower: monster.magicPower,
                magicResist: monster.magicResist,
                elementResistances: Object.assign({}, monster.elementResistances),
                statusResistances: Object.assign({paralysis:0,nightmare:0,silence:0,petrify:0,debuff:0}, monster.statusResistances),
                poison:false,burn:false,freeze:false,bleed:false,
                paralysis:false,nightmare:false,silence:false,petrify:false,debuff:false,
                poisonTurns:0,burnTurns:0,freezeTurns:0,bleedTurns:0,
                paralysisTurns:0,nightmareTurns:0,silenceTurns:0,petrifyTurns:0,debuffTurns:0,
                exp: 0,
                expNeeded: 15,
                skillPoints: 0,
                skillLevels: (() => {
                    const obj = {};
                    if (monster.monsterSkill) obj[monster.monsterSkill] = monster.skillLevels[monster.monsterSkill] || 1;
                    if (monster.isSuperior) {
                        obj[monster.skill] = monster.skillLevels[monster.skill] || 1;
                        obj[monster.auraSkill] = monster.skillLevels[monster.auraSkill] || 1;
                    } else if (monster.isElite && monster.auraSkill) {
                        obj[monster.auraSkill] = monster.skillLevels[monster.auraSkill] || 1;
                    }
                    return obj;
                })(),
                alive: true,
                affinity: 30,
                fullness: 75,
                hasActed: false,
                equipped: { weapon: null, armor: null, accessory1: null, accessory2: null },
                range: monster.range,
                special: monster.special,
                trait: monster.trait || null,
                statusEffect: monster.statusEffect,
                ...(monster.trait && MONSTER_TRAITS[monster.trait] && MONSTER_TRAITS[monster.trait].element ? { [MONSTER_TRAITS[monster.trait].element + 'Damage']: monster[MONSTER_TRAITS[monster.trait].element + 'Damage'] } : {})
            };
        }

        function reviveMonsterCorpse(corpse) {
            const cost = 200;
            if (gameState.player.gold < cost) {
                addMessage(`💸 골드가 부족합니다. 부활에는 ${formatNumber(cost)} 골드가 필요합니다.`, 'info');
                return;
            }
            const mercenary = convertMonsterToMercenary(corpse);
            const activeCount = gameState.activeMercenaries.filter(m => m.alive).length;
            if (activeCount < 5) {
                if (!spawnMercenaryNearPlayer(mercenary)) {
                    addMessage('❌ 용병을 배치할 공간이 없습니다.', 'info');
                    return;
                }
                gameState.player.gold -= cost;
                gameState.activeMercenaries.push(mercenary);
                addMessage(`🎉 ${corpse.name}을(를) 부활시켜 동료로 만들었습니다!`, 'mercenary');
            } else if (gameState.standbyMercenaries.length < 5) {
                gameState.player.gold -= cost;
                gameState.standbyMercenaries.push(mercenary);
                addMessage(`📋 부활한 ${corpse.name}을(를) 대기열에 추가했습니다.`, 'mercenary');
            } else {
                addMessage('❌ 용병이 가득 찼습니다.', 'info');
                return;
            }

            const idx = gameState.corpses.findIndex(c => c === corpse);
            if (idx !== -1) gameState.corpses.splice(idx, 1);
            const hasItem = gameState.items.some(i => i.x === corpse.x && i.y === corpse.y);
            gameState.dungeon[corpse.y][corpse.x] = hasItem ? 'item' : 'empty';
            updateStats();
            updateMercenaryDisplay();
            renderDungeon();
        }

        function dissectCorpse(corpse) {
            const materialsPool = ['뼈', '가죽', 'bread', 'meat', 'rawMeat', 'lettuce'];
            const gained = [];
            const count = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < count; i++) {
                const mat = materialsPool[Math.floor(Math.random() * materialsPool.length)];
                if (!gameState.materials[mat]) gameState.materials[mat] = 0;
                gameState.materials[mat] += 1;
                gained.push(mat);
            }
            const idx = gameState.corpses.findIndex(c => c === corpse);
            if (idx !== -1) gameState.corpses.splice(idx, 1);
            const hasItem = gameState.items.some(i => i.x === corpse.x && i.y === corpse.y);
            gameState.dungeon[corpse.y][corpse.x] = hasItem ? 'item' : 'empty';
            addMessage(`🔪 ${corpse.name}의 시체를 해체하여 ${gained.join(', ')}을(를) 얻었습니다.`, 'item');
            renderDungeon();
        }

        function placeEggInIncubator(eggItem, turns) {
            const idx = gameState.incubators.findIndex(s => s === null);
            if (idx === -1) {
                addMessage('❌ 인큐베이터가 가득 찼습니다.', 'info');
                return false;
            }
            gameState.incubators[idx] = { egg: eggItem, remainingTurns: turns };
            const invIdx = gameState.player.inventory.findIndex(i => i.id === eggItem.id);
            if (invIdx !== -1) gameState.player.inventory.splice(invIdx, 1);
            updateInventoryDisplay();
            updateIncubatorDisplay();
            return true;
        }

        function removeEggFromIncubator(index) {
            const slot = gameState.incubators[index];
            if (!slot) return;
            addToInventory(slot.egg);
            gameState.incubators[index] = null;
            updateIncubatorDisplay();
        }

        function advanceIncubators() {
            const monsterTypes = getMonsterPoolForFloor(gameState.floor);
            gameState.incubators.forEach((slot, i) => {
                if (!slot) return;
                slot.remainingTurns--;
                if (slot.remainingTurns <= 0) {
                    const t = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
                    const monster = createSuperiorMonster(t, 0, 0, gameState.floor);
                    gameState.hatchedSuperiors.push(monster);
                    addMessage(`🥚 ${monster.name}이(가) 부화했습니다!`, 'info');
                    gameState.incubators[i] = null;
                }
            });
        }


        function recruitHatchedSuperior(monster) {
            const mercenary = convertMonsterToMercenary(monster);
            const activeCount = gameState.activeMercenaries.filter(m => m.alive).length;
            if (activeCount < 5) {
                if (!spawnMercenaryNearPlayer(mercenary)) {
                    addMessage('❌ 용병을 배치할 공간이 없습니다.', 'info');
                    return;
                }
                gameState.activeMercenaries.push(mercenary);
                addMessage(`🎉 ${mercenary.name}이(가) 합류했습니다!`, 'mercenary');
            } else if (gameState.standbyMercenaries.length < 5) {
                gameState.standbyMercenaries.push(mercenary);
                addMessage(`📋 ${mercenary.name}을(를) 대기열에 추가했습니다.`, 'mercenary');
            } else {
                addMessage('❌ 용병이 가득 찼습니다.', 'info');
                return;
            }
            const idx = gameState.hatchedSuperiors.findIndex(m => m === monster);
            if (idx !== -1) gameState.hatchedSuperiors.splice(idx, 1);
            updateMercenaryDisplay();
            updateIncubatorDisplay();
            renderDungeon();
        }

        function getMonsterPoolForFloor(floor) {
            if (floor <= 2) return ['GOBLIN', 'GOBLIN_ARCHER', 'GOBLIN_WIZARD', 'ZOMBIE'];
            if (floor <= 4) return ['SKELETON', 'SKELETON_MAGE', 'ORC', 'ORC_ARCHER'];
            if (floor <= 6) return ['TROLL', 'ORC', 'ORC_ARCHER', 'SKELETON_MAGE'];
            if (floor <= 8) return ['DARK_MAGE', 'TROLL', 'ORC', 'ORC_ARCHER'];
            return ['DEMON_WARRIOR', 'DARK_MAGE', 'TROLL', 'ORC'];
        }

        function applyStatusEffects(entity) {
            const name = entity === gameState.player ? '플레이어' : entity.name;
            let died = false;
            if (entity.poison && entity.poisonTurns > 0) {
                entity.health -= 2;
                entity.poisonTurns--;
                addMessage(`☠️ ${name}이(가) 독으로 2의 피해를 입었습니다.`, 'combat');
                if (entity.poisonTurns <= 0) entity.poison = false;
            }
            if (entity.burn && entity.burnTurns > 0) {
                entity.health -= 3;
                entity.burnTurns--;
                addMessage(`🔥 ${name}이(가) 화상으로 3의 피해를 입었습니다.`, 'combat');
                if (entity.burnTurns <= 0) entity.burn = false;
            }
            if (entity.freeze && entity.freezeTurns > 0) {
                entity.health -= 1;
                entity.freezeTurns--;
                addMessage(`❄️ ${name}이(가) 빙결로 1의 피해를 입었습니다.`, 'combat');
                if (entity.freezeTurns <= 0) entity.freeze = false;
            }
            if (entity.bleed && entity.bleedTurns > 0) {
                entity.health -= 2;
                entity.bleedTurns--;
                addMessage(`🩸 ${name}이(가) 출혈로 2의 피해를 입었습니다.`, 'combat');
                if (entity.bleedTurns <= 0) entity.bleed = false;
            }
            if (entity.nightmare && entity.nightmareTurns > 0) {
                entity.health -= 2;
                entity.nightmareTurns--;
                addMessage(`😱 ${name}이(가) 악몽으로 2의 피해를 입었습니다.`, 'combat');
                if (entity.nightmareTurns <= 0) entity.nightmare = false;
            }
            if (entity.paralysis && entity.paralysisTurns > 0) {
                entity.paralysisTurns--;
                addMessage(`⚡ ${name}이(가) 마비되어 움직일 수 없습니다.`, 'combat');
                if (entity.paralysisTurns <= 0) entity.paralysis = false;
            }
            if (entity.silence && entity.silenceTurns > 0) {
                entity.silenceTurns--;
                addMessage(`🤐 ${name}이(가) 침묵 상태입니다.`, 'combat');
                if (entity.silenceTurns <= 0) entity.silence = false;
            }
            if (entity.petrify && entity.petrifyTurns > 0) {
                entity.petrifyTurns--;
                addMessage(`🪨 ${name}이(가) 석화되었습니다.`, 'combat');
                if (entity.petrifyTurns <= 0) entity.petrify = false;
            }
            if (entity.debuff && entity.debuffTurns > 0) {
                entity.debuffTurns--;
                addMessage(`⬇️ ${name}이(가) 약화 상태입니다.`, 'combat');
                if (entity.debuffTurns <= 0) entity.debuff = false;
            }
            if (entity.health <= 0) died = true;
            return died;
        }

        // 던전 렌더링
        function renderDungeon() {
            const dungeonEl = document.getElementById('dungeon');
            if (!dungeonEl || !gameState.cellElements.length) return;
            for (let y = 0; y < gameState.dungeonSize; y++) {
                for (let x = 0; x < gameState.dungeonSize; x++) {
                    const div = gameState.cellElements[y][x];
                    let cellType = gameState.dungeon[y][x];
                    div.textContent = '';

                    if (x === gameState.player.x && y === gameState.player.y) {
                        cellType = 'player';
                        div.textContent = getPlayerEmoji();
                    } else {
                        const proj = gameState.projectiles.find(p => p.x === x && p.y === y);
                        if (proj) {
                            cellType = 'projectile';
                            div.textContent = proj.icon;
                        } else {
                            const merc = gameState.activeMercenaries.find(m => m.x === x && m.y === y && m.alive);
                            if (merc) {
                                cellType = 'mercenary';
                                div.textContent = merc.icon;
                            } else if (cellType === 'monster') {
                                const m = gameState.monsters.find(mon => mon.x === x && mon.y === y);
                                if (m) {
                                    div.textContent = m.icon;
                                    if (m.isChampion) cellType = 'champion';
                                    else if (m.isElite) cellType = 'elite';
                                }
                            } else if (cellType === 'item') {
                                const it = gameState.items.find(it => it.x === x && it.y === y);
                                if (it) div.textContent = it.icon;
                            } else if (cellType === 'plant') {
                                div.textContent = '🌿';
                            } else if (cellType === 'corpse') {
                                div.textContent = '☠️';
                            } else if (cellType === 'treasure') {
                                div.textContent = '💰';
                            } else if (cellType === 'exit') {
                                div.textContent = '🚪';
                            } else if (cellType === 'shop') {
                                div.textContent = '🏪';
                            }
                        }
                    }

                    div.className = `cell ${cellType}`;
                    if (gameState.fogOfWar[y] && gameState.fogOfWar[y][x]) {
                        div.style.filter = 'brightness(0.2)';
                    } else {
                        div.style.filter = '';
                    }
                }
            }
        }

        function handleDungeonClick(e) {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            const x = parseInt(cell.dataset.x, 10);
            const y = parseInt(cell.dataset.y, 10);
            const monster = gameState.monsters.find(m => m.x === x && m.y === y);
            if (monster) {
                if (monster.isChampion) showChampionDetails(monster);
                else showMonsterDetails(monster);
                return;
            }
            const merc = gameState.activeMercenaries.find(m => m.x === x && m.y === y && m.alive);
            if (merc) {
                showMercenaryDetails(merc);
                return;
            }

            const path = findPath(gameState.player.x, gameState.player.y, x, y);
            if (path && path.length > 1) {
                gameState.autoMovePath = path.slice(1);
                autoMoveStep();
            }
        }



        function updateActionButtons() {
            const atk = document.getElementById('attack');
            const rng = document.getElementById('ranged');
            const heal = document.getElementById('heal');
            atk.style.display = 'inline-block';
            rng.style.display = 'inline-block';
            heal.style.display = 'inline-block';
        }

        // 플레이어 레벨업 체크
        function checkLevelUp() {
            while (gameState.player.exp >= gameState.player.expNeeded) {
                gameState.player.exp -= gameState.player.expNeeded;
                gameState.player.level += 1;

                gameState.player.skillPoints += 1;

                gameState.player.endurance += 2;
                gameState.player.strength += 1;
                gameState.player.agility += 1;

                gameState.player.health = getStat(gameState.player, 'maxHealth');
                gameState.player.mana = getStat(gameState.player, 'maxMana');
                gameState.player.expNeeded = Math.floor(gameState.player.expNeeded * 1.5);
                addMessage(`🎉 플레이어 레벨이 ${gameState.player.level}이(가) 되었습니다!`, 'level');

                updateStats();
                updateSkillDisplay();
            }
        }

        function checkMercenaryLevelUp(mercenary) {
            while (mercenary.exp >= mercenary.expNeeded) {
                mercenary.exp -= mercenary.expNeeded;
                mercenary.level += 1;
                mercenary.skillPoints += 1;
                mercenary.endurance += 2 + mercenary.stars.endurance * 0.5;
                mercenary.strength += 1 + mercenary.stars.strength * 0.5;
                mercenary.agility += 1 + mercenary.stars.agility * 0.5;
                mercenary.focus += 1 + mercenary.stars.focus * 0.5;
                mercenary.intelligence += 1 + mercenary.stars.intelligence * 0.5;
                mercenary.health = getStat(mercenary, 'maxHealth');
                mercenary.mana = getStat(mercenary, 'maxMana');
                mercenary.expNeeded = Math.floor(mercenary.expNeeded * 1.5);
                addMessage(`🎉 ${mercenary.name}의 레벨이 ${mercenary.level}이(가) 되었습니다!`, 'mercenary');
                updateMercenaryDisplay();
                if (window.currentDetailMercenary && window.currentDetailMercenary.id === mercenary.id) {
                    showMercenaryDetails(mercenary);
                }
            }
        }

        function checkMonsterLevelUp(monster) {
            while (monster.exp >= monster.expNeeded) {
                monster.exp -= monster.expNeeded;
                monster.level += 1;
                if ((monster.isSuperior || monster.isChampion) && monster.stars) {
                    monster.endurance += 2 + monster.stars.endurance * 0.5;
                    monster.strength += 1 + monster.stars.strength * 0.5;
                    monster.agility += 1 + monster.stars.agility * 0.5;
                    monster.focus += 1 + monster.stars.focus * 0.5;
                    monster.intelligence += 1 + monster.stars.intelligence * 0.5;
                } else {
                    monster.endurance += 2;
                    monster.strength += 1;
                    monster.agility += 1;
                    monster.focus += 1;
                    monster.intelligence += 1;
                }
                monster.health = getStat(monster, 'maxHealth');
                monster.mana = getStat(monster, 'maxMana');
                monster.attack = getStat(monster, 'attack');
                monster.defense = getStat(monster, 'defense');
                monster.accuracy = getStat(monster, 'accuracy');
                monster.evasion = getStat(monster, 'evasion');
                monster.critChance = getStat(monster, 'critChance');
                monster.magicPower = getStat(monster, 'magicPower');
                monster.magicResist = getStat(monster, 'magicResist');
                monster.expNeeded = Math.floor(monster.expNeeded * 1.5);
                addMessage(`📈 ${monster.name}의 레벨이 ${monster.level}이(가) 되었습니다!`, 'combat');
                if (window.currentDetailMonster && window.currentDetailMonster.id === monster.id) {
                    showMonsterDetails(monster);
                }
            }
        }

        // 던전 생성
        function generateDungeon() {
            const size = gameState.dungeonSize;
            const dungeonEl = document.getElementById('dungeon');
            if (dungeonEl) {
                dungeonEl.style.setProperty('--dungeon-size', size);
                dungeonEl.style.gridTemplateColumns = `repeat(${size}, 24px)`;
                dungeonEl.style.gridTemplateRows = `repeat(${size}, 24px)`;
            }
            gameState.dungeon = [];
            gameState.fogOfWar = [];
            gameState.cellElements = [];
            gameState.monsters = [];
            gameState.treasures = [];
            gameState.items = [];

            if (dungeonEl) dungeonEl.innerHTML = '';

            for (let y = 0; y < size; y++) {
                const row = [];
                const fogRow = [];
                const cellRow = [];
                for (let x = 0; x < size; x++) {
                    row.push('wall');
                    fogRow.push(true);

                    if (dungeonEl) {
                        const cellDiv = document.createElement('div');
                        cellDiv.dataset.x = x;
                        cellDiv.dataset.y = y;
                        cellDiv.className = 'cell';
                        dungeonEl.appendChild(cellDiv);
                        cellRow.push(cellDiv);
                    }
                }
                gameState.dungeon.push(row);
                gameState.fogOfWar.push(fogRow);
                gameState.cellElements.push(cellRow);
            }

            const shuffleArray = arr => {
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            };

            const visited = Array.from({ length: size }, () => Array(size).fill(false));
            const visitedCells = [];
            const stack = [{ x: 1, y: 1 }];
            visited[1][1] = true;
            gameState.dungeon[1][1] = 'empty';
            visitedCells.push({ x: 1, y: 1 });

            while (stack.length) {
                const { x, y } = stack[stack.length - 1];
                const dirs = [
                    { dx: 1, dy: 0 },
                    { dx: -1, dy: 0 },
                    { dx: 0, dy: 1 },
                    { dx: 0, dy: -1 }
                ];
                shuffleArray(dirs);
                let carved = false;
                for (const { dx, dy } of dirs) {
                    const nx = x + dx * 8; // 값을 2에서 8로 변경
                    const ny = y + dy * 8; // 값을 2에서 8로 변경
                    if (nx > 0 && ny > 0 && nx < size - 1 && ny < size - 1 && !visited[ny][nx]) {
                        visited[ny][nx] = true;
                        carveWideCorridor(gameState.dungeon, x, y, nx, ny);
                        stack.push({ x: nx, y: ny });
                        visitedCells.push({ x: nx, y: ny });
                        carved = true;
                        break;
                    }
                }
                if (!carved) stack.pop();
            }

            const extraCount = Math.floor(size * size * 0.05);
            for (let i = 0; i < extraCount; i++) {
                const base = visitedCells[Math.floor(Math.random() * visitedCells.length)];
                const dirs = [
                    { dx: 1, dy: 0 },
                    { dx: -1, dy: 0 },
                    { dx: 0, dy: 1 },
                    { dx: 0, dy: -1 }
                ];
                shuffleArray(dirs);
                for (const { dx, dy } of dirs) {
                    const nx = base.x + dx;
                    const ny = base.y + dy;
                    if (nx > 0 && ny > 0 && nx < size - 1 && ny < size - 1 && gameState.dungeon[ny][nx] === 'wall') {
                        carveWideCorridor(gameState.dungeon, base.x, base.y, nx, ny);
                        visitedCells.push({ x: nx, y: ny });
                        break;
                    }
                }
            }

            gameState.player.x = 1;
            gameState.player.y = 1;
            gameState.dungeon[1][1] = 'empty';

            if (gameState.floor === 1 && gameState.player.inventory.length === 0) {
                const starterPotion = createItem('healthPotion', 0, 0);
                gameState.player.inventory.push(starterPotion);

                const fireSword = createItem('shortSword', 0, 0, 'Flaming');
                gameState.player.equipped.weapon = fireSword;
                const leatherArmor = createItem('leatherArmor', 0, 0);
                gameState.player.equipped.armor = leatherArmor;
                const egg = createItem('superiorEgg', 0, 0);
                placeEggInIncubator(egg, 1);

                const essences = ['strengthEssence','agilityEssence','enduranceEssence','focusEssence','intelligenceEssence','skillLevelEssence'];
                essences.forEach(k => {
                    gameState.player.inventory.push(createItem(k, 0, 0));
                });
            }

            let exitX = 1, exitY = 1;
            if (visitedCells.length > 1) {
                let exitCell;
                do {
                    exitCell = visitedCells[Math.floor(Math.random() * visitedCells.length)];
                } while (exitCell.x === 1 && exitCell.y === 1);
                exitX = exitCell.x;
                exitY = exitCell.y;
            }

            gameState.exitLocation = { x: exitX, y: exitY };
            gameState.dungeon[exitY][exitX] = 'exit';

            const monsterTypes = getMonsterPoolForFloor(gameState.floor);
            // 몬스터는 던전 크기와 층수에 비례해 등장 수를 결정
            const monsterCount = Math.floor(size * 0.2) + gameState.floor;
            for (let i = 0; i < monsterCount; i++) {
                let x, y;
                do {
                    x = Math.floor(Math.random() * size);
                    y = Math.floor(Math.random() * size);
                } while (gameState.dungeon[y][x] !== 'empty' || (x === 1 && y === 1));
                const type = monsterTypes[Math.floor(Math.random() * (monsterTypes.length - 1))];
                const monster = createMonster(type, x, y, gameState.floor);
                gameState.monsters.push(monster);
                gameState.dungeon[y][x] = 'monster';
            }

            // 층마다 챔피언 한 명 배치
            const champTypes = Object.keys(CHAMPION_TYPES);
            let cx = Math.floor(size / 2);
            let cy = Math.floor(size / 2);
            let attempts = 0;
            while ((cx < 0 || cy < 0 || cx >= size || cy >= size || gameState.dungeon[cy][cx] !== 'empty') && attempts < 50) {
                cx = Math.floor(size / 2) + Math.floor(Math.random()*3) - 1;
                cy = Math.floor(size / 2) + Math.floor(Math.random()*3) - 1;
                attempts++;
            }
            if (gameState.dungeon[cy][cx] === 'empty') {
                const ct = champTypes[Math.floor(Math.random() * champTypes.length)];
                const champ = createChampion(ct, cx, cy, gameState.floor);
                gameState.monsters.push(champ);
                gameState.dungeon[cy][cx] = 'monster';
            }

            // 층마다 엘리트 몬스터 배치
            let ex, ey;
            do {
                ex = Math.floor(Math.random() * size);
                ey = Math.floor(Math.random() * size);
            } while (gameState.dungeon[ey][ex] !== 'empty');
            const eType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
            const elite = createEliteMonster(eType, ex, ey, gameState.floor);
            gameState.monsters.push(elite);
            gameState.dungeon[ey][ex] = 'monster';
            const around = 2 + Math.floor(Math.random() * 4);
            for (let i = 0; i < around; i++) {
                const pos = findAdjacentEmpty(ex, ey);
                if (gameState.dungeon[pos.y][pos.x] !== 'empty') continue;
                const t = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
                const m = createMonster(t, pos.x, pos.y, gameState.floor);
                gameState.monsters.push(m);
                gameState.dungeon[pos.y][pos.x] = 'monster';
            }

            // 보물은 던전 크기와 층수에 따라 적당히 배치
            const treasureCount = Math.floor(size * 0.1) + Math.floor(gameState.floor * 0.5);
            for (let i = 0; i < treasureCount; i++) {
                let x, y;
                do {
                    x = Math.floor(Math.random() * size);
                    y = Math.floor(Math.random() * size);
                } while (gameState.dungeon[y][x] !== 'empty');
                const treasure = createTreasure(x, y, 5 + Math.floor(Math.random() * 20));
                gameState.treasures.push(treasure);
                gameState.dungeon[y][x] = 'treasure';
            }

            const itemKeys = Object.keys(ITEMS);
            // 맵에 떨어지는 아이템 수를 줄임
            const itemCount = Math.floor(size * 0.05) + Math.floor(gameState.floor * 0.25);
            const spawnKeys = itemKeys.filter(k => k !== 'reviveScroll' && ITEMS[k].type !== ITEM_TYPES.ESSENCE);
            for (let i = 0; i < itemCount; i++) {
                let x, y;
                do {
                    x = Math.floor(Math.random() * size);
                    y = Math.floor(Math.random() * size);
                } while (gameState.dungeon[y][x] !== 'empty');
                const key = spawnKeys[Math.floor(Math.random() * spawnKeys.length)];
                const item = createItem(key, x, y);
                gameState.items.push(item);
                gameState.dungeon[y][x] = 'item';
            }

            const plantCount = Math.floor(size * 0.05);
            for (let i = 0; i < plantCount; i++) {
                let x, y;
                do {
                    x = Math.floor(Math.random() * size);
                    y = Math.floor(Math.random() * size);
                } while (gameState.dungeon[y][x] !== 'empty');
                gameState.dungeon[y][x] = 'plant';
            }


            // 상점 위치 및 아이템 설정
            let sx, sy;
            do {
                sx = Math.floor(Math.random() * size);
                sy = Math.floor(Math.random() * size);
            } while (gameState.dungeon[sy][sx] !== 'empty');
            gameState.shopLocation = { x: sx, y: sy };
            gameState.dungeon[sy][sx] = 'shop';

            gameState.shopItems = [];
            const availableItems = itemKeys.filter(k =>
                ITEMS[k].level <= Math.ceil(gameState.floor / 2 + 1) &&
                ITEMS[k].type !== ITEM_TYPES.ESSENCE
            );
            const basicFoodKeys = ['bread', 'meat', 'lettuce', 'sandwich', 'salad', 'cookedMeal'];
            basicFoodKeys.forEach(key => {
                if (ITEMS[key] && !availableItems.includes(key)) {
                    availableItems.push(key);
                }
            });
            const shopItemCount = 5 + Math.floor(Math.random() * 5); // 5-9 items
            for (let i = 0; i < shopItemCount; i++) {
                const k = availableItems[Math.floor(Math.random() * availableItems.length)];
                const shopItem = createItem(k, 0, 0);
                gameState.shopItems.push(shopItem);
            }

            // corridors are carved at the desired width during generation
            updateFogOfWar();
            updateStats();
            updateInventoryDisplay();
            updateSkillDisplay();
            updateMercenaryDisplay();
            renderDungeon();
            updateCamera();
        }

        // 카메라 업데이트 (최적화됨)
        function updateCamera() {
            const dungeonElement = document.getElementById('dungeon');
            if (!dungeonElement) return;
            
            const cellSize = 25; // 24px + 1px gap
            
            // 플레이어를 중심으로 카메라 위치 계산
            const centerX = Math.floor(gameState.viewportSize / 2);
            const centerY = Math.floor(gameState.viewportSize / 2);
            
            const newCameraX = gameState.player.x - centerX;
            const newCameraY = gameState.player.y - centerY;
            
            // 던전 경계 체크
            const clampedX = Math.max(0, Math.min(newCameraX, gameState.dungeonSize - gameState.viewportSize));
            const clampedY = Math.max(0, Math.min(newCameraY, gameState.dungeonSize - gameState.viewportSize));
            
            // 카메라 위치가 변경된 경우에만 업데이트
            if (gameState.camera.x !== clampedX || gameState.camera.y !== clampedY) {
                gameState.camera.x = clampedX;
                gameState.camera.y = clampedY;
                
                // 카메라 변환 적용
                const translateX = -gameState.camera.x * cellSize;
                const translateY = -gameState.camera.y * cellSize;
                dungeonElement.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            }
        }

        // 용병 고용 함수
        function hireMercenary(type) {
            const mercType = MERCENARY_TYPES[type];

            if (gameState.player.gold < mercType.cost) {
                addMessage(`💸 골드가 부족합니다. ${mercType.name} 고용에는 ${formatNumber(mercType.cost)} 골드가 필요합니다.`, 'info');
                return;
            }

            const mercenary = createMercenary(type, -1, -1);

            const activeCount = gameState.activeMercenaries.filter(m => m.alive).length;
            if (activeCount < 5) {
                if (!spawnMercenaryNearPlayer(mercenary)) {
                    addMessage('❌ 용병을 배치할 공간이 없습니다.', 'info');
                    return;
                }
                gameState.player.gold -= mercType.cost;
                gameState.activeMercenaries.push(mercenary);
                addMessage(`🎉 ${mercType.name}을(를) 고용했습니다!`, 'mercenary');
            } else if (gameState.standbyMercenaries.length < 5) {
                gameState.player.gold -= mercType.cost;
                gameState.standbyMercenaries.push(mercenary);
                addMessage(`📋 ${mercType.name}을(를) 대기열에 추가했습니다.`, 'mercenary');
            } else {
                const options = gameState.activeMercenaries.map((m, i) => `${i + 1}: ${m.name}`).join('\n');
                const choice = prompt(`👥 용병이 가득 찼습니다. 교체할 용병을 선택하세요:\n${options}`);
                if (choice === null) {
                    addMessage('❌ 고용이 취소되었습니다.', 'info');
                    return;
                }
                const index = parseInt(choice, 10) - 1;
                if (index < 0 || index >= gameState.activeMercenaries.length) {
                    addMessage('❌ 고용이 취소되었습니다.', 'info');
                    return;
                }
                const removed = gameState.activeMercenaries[index];
                if (!spawnMercenaryNearPlayer(mercenary)) {
                    addMessage('❌ 용병을 배치할 공간이 없습니다.', 'info');
                    return;
                }
                setMercenaryLevel(mercenary, removed.level);
                gameState.activeMercenaries[index] = mercenary;
                removed.x = -1;
                removed.y = -1;
                gameState.player.gold -= mercType.cost;
                addMessage(`🗑️ ${removed.name}을(를) 내보내고 ${mercType.name}을(를) 고용했습니다. 레벨 ${removed.level}을(를) 승계합니다.`, 'mercenary');
            }

            updateStats();
            updateMercenaryDisplay();
            renderDungeon();
        }

        function generateStars() {
            let stars;
            do {
                stars = {
                    strength: Math.floor(Math.random() * 4),
                    agility: Math.floor(Math.random() * 4),
                    endurance: Math.floor(Math.random() * 4),
                    focus: Math.floor(Math.random() * 4),
                    intelligence: Math.floor(Math.random() * 4)
                };
            } while (Object.values(stars).reduce((a,b)=>a+b,0) > 9);
            return stars;
        }

        // 용병 생성 함수
        function createMercenary(type, x, y) {
            const mercType = MERCENARY_TYPES[type];
            const skillPool = MERCENARY_SKILL_SETS[type] || [];
            const assignedSkill = skillPool[Math.floor(Math.random() * skillPool.length)] || null;
            const assignedSkill2 = type === 'HEALER' ? 'Purify' : null;
            const randomBaseName = MERCENARY_NAMES[Math.floor(Math.random() * MERCENARY_NAMES.length)];
            const jobLabel = mercType.name.split(' ')[1] || mercType.name;
            const name = `${randomBaseName} (${jobLabel})`;
            const endurance = mercType.baseHealth / 2;
            const focus = (mercType.baseMaxMana || 0) / 2;
            const agility = Math.max(0, Math.round((mercType.baseAccuracy - 0.7) / 0.02));
            return {
                id: Math.random().toString(36).substr(2, 9),
                type: type,
                name: name,
                icon: mercType.icon,
                role: mercType.role,
                x: x,
                y: y,
                level: 1,
                stars: generateStars(),
                endurance: endurance,
                focus: focus,
                strength: mercType.baseAttack,
                agility: agility,
                intelligence: mercType.baseMagicPower,
                baseDefense: mercType.baseDefense - Math.floor(endurance * 0.1),
                maxHealth: mercType.baseHealth,
                health: mercType.baseHealth,
                maxMana: mercType.baseMaxMana || 0,
                mana: mercType.baseMaxMana || 0,
                healthRegen: mercType.baseHealthRegen || 0,
                manaRegen: mercType.baseManaRegen || 1,
                skill: assignedSkill,
                skill2: assignedSkill2,
                attack: mercType.baseAttack,
                defense: mercType.baseDefense,
                accuracy: mercType.baseAccuracy,
                evasion: mercType.baseEvasion,
                critChance: mercType.baseCritChance,
                magicPower: mercType.baseMagicPower,
                magicResist: mercType.baseMagicResist,
                elementResistances: {fire:0, ice:0, lightning:0, earth:0, light:0, dark:0},
                statusResistances: {poison:0, bleed:0, burn:0, freeze:0, paralysis:0, nightmare:0, silence:0, petrify:0, debuff:0},
                poison: false,
                burn: false,
                freeze: false,
                bleed: false,
                paralysis: false,
                nightmare: false,
                silence: false,
                petrify: false,
                debuff: false,
                poisonTurns: 0,
                burnTurns: 0,
                freezeTurns: 0,
                bleedTurns: 0,
                paralysisTurns: 0,
                nightmareTurns: 0,
                silenceTurns: 0,
                petrifyTurns: 0,
                debuffTurns: 0,
                exp: 0,
                expNeeded: 15,
                skillPoints: 0,
                skillLevels: (() => {
                    const obj = {};
                    if (assignedSkill) obj[assignedSkill] = 1;
                    if (assignedSkill2) obj[assignedSkill2] = 1;
                    return obj;
                })(),
                alive: true,
                hasActed: false,
                affinity: 50,
                fullness: 75,
                equipped: {
                    weapon: null,
                    armor: null,
                    accessory1: null,
                    accessory2: null
                }
            };
        }

        // 아이템 생성 함수
        function createItem(itemKey, x, y, prefixName) {
            const itemData = ITEMS[itemKey];
            const item = {
                id: Math.random().toString(36).substr(2, 9),
                key: itemKey,
                baseName: itemData.name,
                name: itemData.name,
                type: itemData.type,
                x: x,
                y: y,
                ...itemData
            };

            if (item.type === ITEM_TYPES.WEAPON || item.type === ITEM_TYPES.ARMOR || item.type === ITEM_TYPES.ACCESSORY) {
                if (prefixName) {
                    const prefix = PREFIXES.find(p => p.name === prefixName);
                    if (prefix) {
                        item.prefix = prefix.name;
                        item.name = `${prefix.name} ${item.name}`;
                        for (const stat in prefix.modifiers) {
                            const val = prefix.modifiers[stat];
                            if (typeof val === 'number') {
                                item[stat] = (item[stat] || 0) + val;
                            } else {
                                item[stat] = val;
                            }
                        }
                    }
                } else if (Math.random() < 0.5) {
                    const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
                    item.prefix = prefix.name;
                    item.name = `${prefix.name} ${item.name}`;
                    for (const stat in prefix.modifiers) {
                        const val = prefix.modifiers[stat];
                        if (typeof val === 'number') {
                            item[stat] = (item[stat] || 0) + val;
                        } else {
                            item[stat] = val;
                        }
                    }
                }
                if (Math.random() < 0.5) {
                    const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
                    item.suffix = suffix.name;
                    item.name = `${item.name} ${suffix.name}`;
                    for (const stat in suffix.modifiers) {
                        const val = suffix.modifiers[stat];
                        if (typeof val === 'number') {
                            item[stat] = (item[stat] || 0) + val;
                        } else {
                            item[stat] = val;
                        }
                    }
                }
            }

            return item;
        }

        // 챔피언 생성 함수
        function createChampion(type, x, y, level) {
            const base = CHAMPION_TYPES[type];
            const randomBaseName = MERCENARY_NAMES[Math.floor(Math.random() * MERCENARY_NAMES.length)];
            const jobLabel = base.name.split(' ')[1] || base.name;
            const name = `${randomBaseName} (${jobLabel})`;
            const endurance = base.baseHealth / 2;
            const focus = (base.baseMaxMana || 0) / 2;
            const agility = Math.max(0, Math.round((base.baseAccuracy - 0.7) / 0.02));
            const champion = {
                id: Math.random().toString(36).substr(2, 9),
                type,
                name,
                icon: base.icon,
                x,
                y,
                level: 1,
                stars: generateStars(),
                endurance: endurance,
                focus: focus,
                strength: base.baseAttack,
                agility: agility,
                intelligence: base.baseMagicPower,
                baseDefense: base.baseDefense - Math.floor(endurance * 0.1),
                maxHealth: base.baseHealth,
                health: base.baseHealth,
                maxMana: base.baseMaxMana || 0,
                mana: base.baseMaxMana || 0,
                healthRegen: base.baseHealthRegen || 0,
                manaRegen: base.baseManaRegen || 1,
                attack: base.baseAttack,
                defense: base.baseDefense,
                accuracy: base.baseAccuracy,
                evasion: base.baseEvasion,
                critChance: base.baseCritChance,
                magicPower: base.baseMagicPower,
                magicResist: base.baseMagicResist,
                range: base.range || 1,
                exp: level * 10,
                gold: level * 10,
                lootChance: 1,
                hasActed: false,
                isChampion: true,
                equipped: { weapon: null, armor: null, accessory1: null, accessory2: null },
                elementResistances: {fire:0, ice:0, lightning:0, earth:0, light:0, dark:0},
                statusResistances: {poison:0, bleed:0, burn:0, freeze:0, paralysis:0, nightmare:0, silence:0, petrify:0, debuff:0},
                poison:false,burn:false,freeze:false,bleed:false,
                paralysis:false,nightmare:false,silence:false,petrify:false,debuff:false,
                poisonTurns:0,burnTurns:0,freezeTurns:0,bleedTurns:0,
                paralysisTurns:0,nightmareTurns:0,silenceTurns:0,petrifyTurns:0,debuffTurns:0,
                expNeeded: 15
            };
            const keys = Object.keys(ITEMS).filter(k =>
                [ITEM_TYPES.WEAPON, ITEM_TYPES.ARMOR, ITEM_TYPES.ACCESSORY].includes(ITEMS[k].type) &&
                ITEMS[k].level <= Math.ceil(level / 2 + 1)
            );
            const weaponChoices = keys.filter(k => ITEMS[k].type === ITEM_TYPES.WEAPON);
            const armorChoices = keys.filter(k => ITEMS[k].type === ITEM_TYPES.ARMOR);
            const accChoices = keys.filter(k => ITEMS[k].type === ITEM_TYPES.ACCESSORY);
            if (weaponChoices.length) champion.equipped.weapon = createItem(weaponChoices[Math.floor(Math.random()*weaponChoices.length)], 0, 0);
            if (armorChoices.length) champion.equipped.armor = createItem(armorChoices[Math.floor(Math.random()*armorChoices.length)], 0, 0);
            if (accChoices.length) champion.equipped.accessory1 = createItem(accChoices[Math.floor(Math.random()*accChoices.length)], 0, 0);

            const skillKeys = Object.keys(MONSTER_SKILLS);
            const sk = skillKeys[Math.floor(Math.random() * skillKeys.length)];
            champion.monsterSkill = sk;
            champion.skillLevels = {};
            champion.skillLevels[sk] = Math.floor((level - 1) / 3) + 1;

            setChampionLevel(champion, level);
            return champion;
        }

        function createHomingProjectile(x, y, target) {
            const dx = Math.sign(target.x - x);
            const dy = Math.sign(target.y - y);
            const dist = getDistance(x, y, target.x, target.y);
            const proj = { x, y, dx, dy, rangeLeft: dist, icon: '🔺', homing: true, target };
            gameState.projectiles.push(proj);
            return proj;
        }

        // 메시지 로그 추가
        function addMessage(text, type = 'info', detail = null) {
            const messageLog = document.getElementById('message-log');
            const message = document.createElement('div');
            message.className = `message ${type}`;
            message.textContent = text;
            if (detail) {
                message.dataset.detail = detail;
                message.classList.add('clickable');
                message.addEventListener('click', () => alert(detail));
            }
            messageLog.appendChild(message);
            messageLog.scrollTop = messageLog.scrollHeight;
        }

        // 인벤토리에 아이템 추가
        function addToInventory(item) {
            gameState.player.inventory.push(item);
            updateInventoryDisplay();
        }

        function sellItem(item) {
            const value = Math.floor((item.price || 0) * 0.5);
            const idx = gameState.player.inventory.findIndex(i => i.id === item.id);
            if (idx !== -1) {
                gameState.player.inventory.splice(idx, 1);
                gameState.player.gold += value;
                addMessage(`💰 ${item.name}을(를) ${formatNumber(value)}골드에 판매했습니다.`, 'item');
                updateInventoryDisplay();
                updateStats();
            }
        }

        // 아이템 클릭 시 대상 패널 표시
        function handleItemClick(item) {
            showItemTargetPanel(item);
        }

        // 아이템 장착 (플레이어)
        function equipItem(item) {
            if (item.type === ITEM_TYPES.WEAPON) {
                if (gameState.player.equipped.weapon) {
                    addToInventory(gameState.player.equipped.weapon);
                }
                gameState.player.equipped.weapon = item;
                addMessage(`⚔️ ${item.name}을(를) 장착했습니다. 공격력 +${item.attack}`, 'item');
            } else if (item.type === ITEM_TYPES.ARMOR) {
                if (gameState.player.equipped.armor) {
                    addToInventory(gameState.player.equipped.armor);
                }
                gameState.player.equipped.armor = item;
                addMessage(`🛡️ ${item.name}을(를) 장착했습니다. 방어력 +${item.defense}`, 'item');
            } else if (item.type === ITEM_TYPES.ACCESSORY) {
                let slot = null;
                if (!gameState.player.equipped.accessory1) slot = 'accessory1';
                else if (!gameState.player.equipped.accessory2) slot = 'accessory2';
                else {
                    const choice = prompt(`교체할 악세서리 슬롯을 선택하세요:\n0: ${formatItem(gameState.player.equipped.accessory1)}\n1: ${formatItem(gameState.player.equipped.accessory2)}`);
                    if (choice === null) return;
                    slot = choice === '1' ? 'accessory2' : 'accessory1';
                    addToInventory(gameState.player.equipped[slot]);
                }
                gameState.player.equipped[slot] = item;
                addMessage(`💍 ${item.name}을(를) 장착했습니다.`, 'item');
            }
            
            const index = gameState.player.inventory.findIndex(i => i.id === item.id);
            if (index !== -1) {
                gameState.player.inventory.splice(index, 1);
            }
            
            updateInventoryDisplay();
            updateStats();
        }

        function unequipAccessory(slot) {
            const item = gameState.player.equipped[slot];
            if (item) {
                addToInventory(item);
                gameState.player.equipped[slot] = null;
                addMessage(`📦 ${item.name}을(를) 해제했습니다.`, 'item');
                updateInventoryDisplay();
                updateStats();
            }
        }

        // 용병에게 아이템 장착
        function equipItemToMercenary(item, mercenary) {
            // 용병 장비 초기화 확인
            if (!mercenary.equipped) {
                mercenary.equipped = { weapon: null, armor: null, accessory1: null, accessory2: null };
            }
            
            if (item.type === ITEM_TYPES.WEAPON) {
                if (mercenary.equipped.weapon) {
                    addToInventory(mercenary.equipped.weapon);
                }
                mercenary.equipped.weapon = item;
                addMessage(`⚔️ ${mercenary.name}이(가) ${item.name}을(를) 장착했습니다.`, 'mercenary');
            } else if (item.type === ITEM_TYPES.ARMOR) {
                if (mercenary.equipped.armor) {
                    addToInventory(mercenary.equipped.armor);
                }
                mercenary.equipped.armor = item;
                addMessage(`🛡️ ${mercenary.name}이(가) ${item.name}을(를) 장착했습니다.`, 'mercenary');
            } else if (item.type === ITEM_TYPES.ACCESSORY) {
                let slot = null;
                if (!mercenary.equipped.accessory1) slot = 'accessory1';
                else if (!mercenary.equipped.accessory2) slot = 'accessory2';
                else {
                    const choice = prompt(`${mercenary.name}의 교체할 악세서리 슬롯을 선택하세요:\n0: ${formatItem(mercenary.equipped.accessory1)}\n1: ${formatItem(mercenary.equipped.accessory2)}`);
                    if (choice === null) return;
                    slot = choice === '1' ? 'accessory2' : 'accessory1';
                    addToInventory(mercenary.equipped[slot]);
                }
                mercenary.equipped[slot] = item;
                addMessage(`💍 ${mercenary.name}이(가) ${item.name}을(를) 장착했습니다.`, 'mercenary');
            }
            
            const index = gameState.player.inventory.findIndex(i => i.id === item.id);
            if (index !== -1) {
                gameState.player.inventory.splice(index, 1);
            }
            
            updateInventoryDisplay();
            updateMercenaryDisplay();
        }

        // 용병 장비 해제
        function unequipItemFromMercenary(mercenaryId, slotType) {
            const mercenary = gameState.activeMercenaries.find(m => m.id === mercenaryId);
            if (!mercenary || !mercenary.equipped) return;

            const item = mercenary.equipped[slotType];
            if (item) {
                addToInventory(item);
                mercenary.equipped[slotType] = null;
                addMessage(`📦 ${mercenary.name}의 ${item.name}을(를) 해제했습니다.`, 'mercenary');
                updateInventoryDisplay();
                updateMercenaryDisplay();
                showMercenaryDetails(mercenary);
            }
        }

        // 아이템 사용 (대상 지정)
        function useItemOnTarget(item, target) {
            if (item.type === ITEM_TYPES.POTION) {
                if (target.health < getStat(target, 'maxHealth')) {
                    const healAmount = Math.min(item.healing, getStat(target, 'maxHealth') - target.health);
                    target.health += healAmount;
                    const name = target === gameState.player ? '플레이어' : target.name;
                    addMessage(`🩹 ${item.name}을(를) 사용하여 ${name}의 체력을 ${formatNumber(healAmount)} 회복했습니다.`, 'item');

                    const index = gameState.player.inventory.findIndex(i => i.id === item.id);
                    if (index !== -1) {
                        gameState.player.inventory.splice(index, 1);
                    }

                    updateInventoryDisplay();
                    if (target === gameState.player) {
                        updateStats();
                    } else {
                        updateMercenaryDisplay();
                    }
                } else {
                    const name = target === gameState.player ? '플레이어' : target.name;
                    addMessage(`❤️ ${name}의 체력이 이미 가득 찼습니다.`, 'info');
                }
            } else if (item.type === ITEM_TYPES.EXP_SCROLL) {
                const expAmount = item.expGain || 0;
                target.exp += expAmount;
                const name = target === gameState.player ? '플레이어' : target.name;
                addMessage(`📜 ${item.name}을(를) 사용하여 ${name}의 경험치를 ${formatNumber(expAmount)} 획득했습니다.`, 'item');

                const index = gameState.player.inventory.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    gameState.player.inventory.splice(index, 1);
                }

                updateInventoryDisplay();
                if (target === gameState.player) {
                    checkLevelUp();
                    updateStats();
                } else {
                    checkMercenaryLevelUp(target);
                    updateMercenaryDisplay();
                }
            } else if (item.type === ITEM_TYPES.ESSENCE) {
                const stats = ['strength','agility','endurance','focus','intelligence','attack','defense','accuracy','evasion','critChance','magicPower','magicResist','maxHealth','maxMana','healthRegen','manaRegen'];
                stats.forEach(stat => {
                    if (item[stat] !== undefined) {
                        target[stat] = (target[stat] || 0) + item[stat];
                    }
                });
                if (item.skillLevelEssence) {
                    target.skillPoints = (target.skillPoints || 0) + item.skillLevelEssence;
                }

                const name = target === gameState.player ? '플레이어' : target.name;
                addMessage(`✨ ${item.name}을(를) 사용하여 ${name}의 능력치를 향상시켰습니다.`, 'item');

                const index = gameState.player.inventory.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    gameState.player.inventory.splice(index, 1);
                }

                updateInventoryDisplay();
                if (target === gameState.player) {
                    updateStats();
                } else {
                    updateMercenaryDisplay();
                }
            } else if (item.type === ITEM_TYPES.FOOD) {
                const gain = item.affinityGain || 0;
                const fullnessGain = item.fullnessGain || 0;
                target.affinity = Math.min(200, (target.affinity || 0) + gain);
                target.fullness = (target.fullness || 0) + fullnessGain;

                const name = target === gameState.player ? '플레이어' : target.name;
                addMessage(`🍖 ${item.name}을(를) 먹여 ${name}의 호감도를 ${formatNumber(gain)} 상승시켰습니다.`, 'item');

                const index = gameState.player.inventory.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    gameState.player.inventory.splice(index, 1);
                }

                updateInventoryDisplay();
                if (target !== gameState.player) {
                    updateMercenaryDisplay();
                }
            }
        }

        // 용병 부활
        function reviveMercenary(mercenary) {
            if (mercenary.alive) return;

            const scrollIndex = gameState.player.inventory.findIndex(i => i.key === 'reviveScroll');
            if (scrollIndex !== -1) {
                gameState.player.inventory.splice(scrollIndex, 1);
                mercenary.alive = true;
                mercenary.health = getStat(mercenary, 'maxHealth');
                addMessage(`✨ 부활 스크롤로 ${mercenary.name}을(를) 부활시켰습니다!`, 'mercenary');
                updateInventoryDisplay();
            } else {
                const cost = 100;
                if (gameState.player.gold < cost) {
                    addMessage(`💸 골드가 부족합니다. 부활에는 ${formatNumber(cost)} 골드가 필요합니다.`, 'info');
                    return;
                }
                gameState.player.gold -= cost;
                mercenary.alive = true;
                mercenary.health = getStat(mercenary, 'maxHealth');
                addMessage(`💰 ${formatNumber(cost)}골드를 사용해 ${mercenary.name}을(를) 부활시켰습니다.`, 'mercenary');
            }

            updateStats();
            updateMercenaryDisplay();
            renderDungeon();
        }

        function removeMercenary(mercenary) {
            let idx = gameState.activeMercenaries.indexOf(mercenary);
            if (idx !== -1) {
                gameState.activeMercenaries.splice(idx, 1);
            } else {
                idx = gameState.standbyMercenaries.indexOf(mercenary);
                if (idx !== -1) gameState.standbyMercenaries.splice(idx, 1);
            }
            updateMercenaryDisplay();
        }

        function dismiss(entity) {
            if (typeof confirm === 'function' && !confirm('정말 해고하시겠습니까?')) return;
            let idx = gameState.activeMercenaries.indexOf(entity);
            if (idx !== -1) {
                gameState.activeMercenaries.splice(idx, 1);
            } else {
                idx = gameState.standbyMercenaries.indexOf(entity);
                if (idx !== -1) {
                    gameState.standbyMercenaries.splice(idx, 1);
                } else {
                    idx = gameState.hatchedSuperiors.indexOf(entity);
                    if (idx !== -1) gameState.hatchedSuperiors.splice(idx, 1);
                }
            }
            updateMercenaryDisplay();
            updateIncubatorDisplay();
        }

        function sacrifice(entity) {
            if (typeof confirm === 'function' && !confirm('정말 희생하시겠습니까?')) return;
            dismiss(entity);
            const essenceKeys = ['strengthEssence','agilityEssence','enduranceEssence','focusEssence','intelligenceEssence','skillLevelEssence'];
            const key = essenceKeys[Math.floor(Math.random() * essenceKeys.length)];
            addToInventory(createItem(key, 0, 0));
            updateInventoryDisplay();
        }

        // 기본 플레이어 대상 아이템 사용 (호환성)
        function useItem(item) {
            useItemOnTarget(item, gameState.player);
        }

        // 몬스터 공격 (용병 방어력 보너스 적용, 안전성 체크 추가)
        function monsterAttack(monster) {
            let nearestTarget = null;
            let nearestDistance = Infinity;
            
            const playerDistance = getDistance(monster.x, monster.y, gameState.player.x, gameState.player.y);
            if (playerDistance <= monster.range && hasLineOfSight(monster.x, monster.y, gameState.player.x, gameState.player.y)) {
                nearestTarget = gameState.player;
                nearestDistance = playerDistance;
            }
            
            gameState.activeMercenaries.forEach(mercenary => {
                if (mercenary.alive) {
                    const distance = getDistance(monster.x, monster.y, mercenary.x, mercenary.y);
                    if (distance <= monster.range && distance < nearestDistance && 
                        hasLineOfSight(monster.x, monster.y, mercenary.x, mercenary.y)) {
                        nearestTarget = mercenary;
                        nearestDistance = distance;
                    }
                }
            });
            
            if (nearestTarget) {
                let totalDefense = getStat(nearestTarget, 'defense');

                const attackValue = monster.special === 'magic' ? monster.magicPower : monster.attack;
                const traitInfo = monster.trait ? MONSTER_TRAITS[monster.trait] : null;
                const result = performAttack(monster, nearestTarget, {
                    attackValue: attackValue,
                    magic: monster.special === 'magic',
                    defenseValue: totalDefense,
                    status: traitInfo && traitInfo.status,
                    element: traitInfo && traitInfo.element
                });

                let attackType = monster.special === 'magic' ? '🔮 마법 공격' :
                               monster.special === 'ranged' ? '🏹 원거리 공격' :
                               '⚔️ 공격';

                const targetName = nearestTarget === gameState.player ? "플레이어" : nearestTarget.name;
                const detail = buildAttackDetail(attackType, traitInfo && traitInfo.name ? traitInfo.name : '', result);
                if (!result.hit) {
                    addMessage(`${monster.name}의 공격이 빗나갔습니다!`, "combat", detail);
                } else {
                    const critMsg = result.crit ? ' (치명타!)' : '';
                    let dmgStr = result.baseDamage;
                    if (result.elementDamage) {
                        const emoji = ELEMENT_EMOJI[result.element] || '';
                        dmgStr = `${result.baseDamage}+${emoji}${result.elementDamage}`;
                    }
                    addMessage(`${monster.name}이(가) ${targetName}에게 ${attackType}으로 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, "combat", detail);
                }
                
                if (nearestTarget.health <= 0) {
                    if (nearestTarget === gameState.player) {
                        monster.exp += gameState.player.level * 10;
                        checkMonsterLevelUp(monster);
                        if (window.currentDetailMonster && window.currentDetailMonster.id === monster.id) {
                            showMonsterDetails(monster);
                        }
                        handlePlayerDeath();
                        return true;
                    } else {
                        nearestTarget.alive = false;
                        nearestTarget.health = 0;
                        nearestTarget.affinity = Math.max(0, (nearestTarget.affinity || 0) - 5);
                        addMessage(`💀 ${nearestTarget.name}이(가) 전사했습니다...`, "mercenary");
                        if (nearestTarget.affinity <= 0) {
                            removeMercenary(nearestTarget);
                        }
                        monster.exp += nearestTarget.level * 10;
                        checkMonsterLevelUp(monster);
                        if (window.currentDetailMonster && window.currentDetailMonster.id === monster.id) {
                            showMonsterDetails(monster);
                        }
                        updateMercenaryDisplay();
                    }
                }
            }
            return false;
        }

        // 플레이어 사망 처리
        function handlePlayerDeath() {
            gameState.gameRunning = false;
            addMessage("💀 플레이어가 사망했습니다...", "combat");
            
            const gameOverDiv = document.createElement('div');
            gameOverDiv.className = 'game-over';
            gameOverDiv.innerHTML = `
                <h2 style="color: #f44336;">⚰️ 게임 오버</h2>
                <p>🏰 던전 ${formatNumber(gameState.floor)}층에서 전사했습니다.</p>
                <p>👹 처치한 몬스터: ${formatNumber(gameState.floor * 3)}마리</p>
                <p>💰 획득한 골드: ${formatNumber(gameState.player.gold)}</p>
                <button onclick="location.reload()">🔄 다시 시작</button>
            `;
            document.body.appendChild(gameOverDiv);
        }

        // 플레이어 이동
        function movePlayer(dx, dy) {
            if (!gameState.gameRunning) return;
            if ((gameState.player.paralysis && gameState.player.paralysisTurns > 0) ||
                (gameState.player.petrify && gameState.player.petrifyTurns > 0)) {
                addMessage('⚠️ 플레이어는 움직일 수 없습니다.', 'info');
                processTurn();
                return;
            }
            if (!gameState.autoMoveActive) {
                gameState.autoMovePath = null;
            }
            
            const newX = gameState.player.x + dx;
            const newY = gameState.player.y + dy;
            
            if (newX < 0 || newX >= gameState.dungeonSize || 
                newY < 0 || newY >= gameState.dungeonSize) {
                return;
            }
            
            const cellType = gameState.dungeon[newY][newX];
            
            if (cellType === 'wall') {
                return;
            }
            
            const blockingMercenary = gameState.activeMercenaries.find(m => m.x === newX && m.y === newY && m.alive);
            if (blockingMercenary) {
                const oldX = gameState.player.x;
                const oldY = gameState.player.y;
                gameState.player.x = newX;
                gameState.player.y = newY;
                blockingMercenary.x = oldX;
                blockingMercenary.y = oldY;
                processTurn();
                return;
            }
            
            if (cellType === 'monster') {
                const monster = gameState.monsters.find(m => m.x === newX && m.y === newY);
                if (monster) {
                    const totalAttack = getStat(gameState.player, 'attack');

                    const result = performAttack(gameState.player, monster, { attackValue: totalAttack, status: gameState.player.equipped.weapon && gameState.player.equipped.weapon.status });
                    const detail = buildAttackDetail('근접 공격', '', result);
                    if (!result.hit) {
                        addMessage(`❌ ${monster.name}에게 공격이 빗나갔습니다!`, "combat", detail);
                    } else {
                        const critMsg = result.crit ? ' (치명타!)' : '';
                        let dmgStr = formatNumber(result.baseDamage);
                        if (result.elementDamage) {
                            const emoji = ELEMENT_EMOJI[result.element] || '';
                            dmgStr = `${formatNumber(result.baseDamage)}+${emoji}${formatNumber(result.elementDamage)}`;
                        }
                        addMessage(`⚔️ ${monster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, "combat", detail);
                    }
                    
                    if (monster.health <= 0) {
                        killMonster(monster);
                    }
                    
                    processTurn();
                    return;
                }
            }
            
            gameState.player.x = newX;
            gameState.player.y = newY;
            
            if (cellType === 'treasure') {
                const treasure = gameState.treasures.find(t => t.x === newX && t.y === newY);
                if (treasure) {
                    let gold = treasure.gold;
                    gameState.player.gold += gold;
                    addMessage(`💎 보물을 발견했습니다! ${formatNumber(gold)} 골드를 획득했습니다!`, "treasure");
                    
                    const treasureIndex = gameState.treasures.findIndex(t => t === treasure);
                    if (treasureIndex !== -1) {
                        gameState.treasures.splice(treasureIndex, 1);
                    }
                    gameState.dungeon[newY][newX] = 'empty';
                }
            }
            
            if (cellType === 'item') {
                const item = gameState.items.find(i => i.x === newX && i.y === newY);
                if (item) {
                    addToInventory(item);
                    addMessage(`📦 ${item.name}을(를) 획득했습니다!`, 'item');

                    const itemIndex = gameState.items.findIndex(i => i === item);
                    if (itemIndex !== -1) {
                        gameState.items.splice(itemIndex, 1);
                    }
                    gameState.dungeon[newY][newX] = 'empty';
                }
            }

            if (cellType === 'plant') {
                const materialsPool = ['herb', 'bread', 'meat', 'lettuce'];
                const gained = [];
                const count = Math.floor(Math.random() * 2) + 1;
                for (let i = 0; i < count; i++) {
                    const mat = materialsPool[Math.floor(Math.random() * materialsPool.length)];
                    if (!gameState.materials[mat]) gameState.materials[mat] = 0;
                    gameState.materials[mat] += 1;
                    gained.push(mat);
                }
                addMessage(`🌿 식물을 채집하여 ${gained.join(', ')}을(를) 얻었습니다.`, 'item');
                gameState.dungeon[newY][newX] = 'empty';
                updateMaterialsDisplay();
            }

            if (cellType === 'corpse') {
                const corpse = gameState.corpses.find(c => c.x === newX && c.y === newY);
                if (corpse) {
                    let choice = 'revive';
                    if (typeof prompt === 'function' && !String(prompt).includes('notImplemented')) {
                        const input = prompt('시체를 어떻게 처리하시겠습니까?\n1: 부활 (200골드)\n2: 해체\n기타: 아이템만 획득');
                        if (input === '2') choice = 'dissect';
                        else if (input === '1') choice = 'revive';
                        else choice = 'loot';
                    } else {
                        const confirmRevive = (typeof confirm === 'function' ? confirm('200골드를 사용해 이 몬스터를 부활시키겠습니까?\n취소를 누르면 아이템을 획득합니다.') : false);
                        choice = confirmRevive ? 'revive' : 'loot';
                    }
                    if (choice === 'revive') {
                        reviveMonsterCorpse(corpse);
                    } else if (choice === 'dissect') {
                        dissectCorpse(corpse);
                    } else {
                        const item = gameState.items.find(i => i.x === newX && i.y === newY);
                        if (item) {
                            addToInventory(item);
                            addMessage(`📦 ${item.name}을(를) 획득했습니다!`, 'item');

                            const itemIndex = gameState.items.findIndex(i => i === item);
                            if (itemIndex !== -1) {
                                gameState.items.splice(itemIndex, 1);
                            }
                        }
                        gameState.dungeon[newY][newX] = 'corpse';
                    }
                }
            }
            
            if (cellType === 'exit') {
                nextFloor();
                return;
            }

            if (cellType === 'shop') {
                showShop();
                return;
            }

            processTurn();
        }

        function autoMoveStep() {
            if (!gameState.autoMovePath || !gameState.autoMovePath.length) {
                gameState.autoMovePath = null;
                return;
            }
            const step = gameState.autoMovePath.shift();
            const dx = step.x - gameState.player.x;
            const dy = step.y - gameState.player.y;
            gameState.autoMoveActive = true;
            movePlayer(dx, dy);
            gameState.autoMoveActive = false;
            if (gameState.autoMovePath && gameState.autoMovePath.length && gameState.gameRunning) {
                setTimeout(autoMoveStep, 100);
            } else {
                gameState.autoMovePath = null;
            }
        }

        // 다음 층으로
        function nextFloor() {
            gameState.floor++;
            addMessage(`🌀 던전 ${gameState.floor}층으로 내려갑니다...`, "level");
            
            // 용병들 체력 약간 회복
            gameState.activeMercenaries.forEach(mercenary => {
                if (mercenary.alive) {
                    const maxHp = getStat(mercenary, 'maxHealth');
                    mercenary.health = Math.min(maxHp, mercenary.health + Math.floor(maxHp * 0.2));
                }
            });
            
            generateDungeon();

            // 새 층에서 살아있는 용병들을 플레이어 근처로 이동
            gameState.activeMercenaries.forEach(mercenary => {
                if (!mercenary.alive) return;

                const positions = [
                    {x: gameState.player.x + 1, y: gameState.player.y},
                    {x: gameState.player.x - 1, y: gameState.player.y},
                    {x: gameState.player.x, y: gameState.player.y + 1},
                    {x: gameState.player.x, y: gameState.player.y - 1},
                    {x: gameState.player.x + 1, y: gameState.player.y + 1},
                    {x: gameState.player.x - 1, y: gameState.player.y - 1},
                    {x: gameState.player.x + 1, y: gameState.player.y - 1},
                    {x: gameState.player.x - 1, y: gameState.player.y + 1}
                ];

                for (const pos of positions) {
                    if (pos.x >= 0 && pos.x < gameState.dungeonSize &&
                        pos.y >= 0 && pos.y < gameState.dungeonSize &&
                        gameState.dungeon[pos.y][pos.x] === 'empty' &&
                        !gameState.activeMercenaries.some(m => m !== mercenary && m.alive && m.x === pos.x && m.y === pos.y) &&
                        !gameState.monsters.some(m => m.x === pos.x && m.y === pos.y)) {
                        mercenary.x = pos.x;
                        mercenary.y = pos.y;
                        break;
                    }
                }
            });

            // 변경된 위치 반영
            renderDungeon();
        }

        // 턴 처리 (최적화됨)
function processTurn() {
    if (!gameState.gameRunning) return;
    gameState.turn++;

            const starvedMercs = [];
            const starvedMonsters = [];
            [...gameState.activeMercenaries, ...gameState.standbyMercenaries].forEach(m => {
                m.fullness = Math.max(0, (m.fullness || 0) - FULLNESS_LOSS_PER_TURN);
                if (m.fullness <= 0) {
                    starvedMercs.push(m);
                } else if (m.fullness <= 50) {
                    const food = gameState.player.inventory.find(i => i.type === ITEM_TYPES.FOOD);
                    if (food) {
                        useItemOnTarget(food, m);
                        addMessage(`🍽️ ${m.name}이(가) ${food.name}을(를) 먹었습니다.`, 'info');
                    }
                }
            });
            starvedMercs.forEach(m => {
                addMessage(`💀 ${m.name}이(가) 굶주림으로 사망했습니다.`, 'mercenary');
                removeMercenary(m);
            });

            gameState.monsters.forEach(monster => {
                if (monster.affinity !== undefined) {
                    monster.fullness = Math.max(0, (monster.fullness || 0) - FULLNESS_LOSS_PER_TURN);
                    if (monster.fullness <= 0) {
                        starvedMonsters.push(monster);
                    } else if (monster.fullness <= 50) {
                        const food = gameState.player.inventory.find(i => i.type === ITEM_TYPES.FOOD);
                        if (food) {
                            useItemOnTarget(food, monster);
                            addMessage(`🍽️ ${monster.name}이(가) ${food.name}을(를) 먹었습니다.`, 'info');
                        }
                    }
                }
            });
            starvedMonsters.forEach(monster => {
                addMessage(`💀 ${monster.name}이(가) 굶어 죽었습니다.`, 'info');
                const idx = gameState.monsters.indexOf(monster);
                if (idx !== -1) {
                    gameState.monsters.splice(idx, 1);
                    if (monster.y >= 0 && monster.x >= 0 && gameState.dungeon[monster.y]) {
                        gameState.dungeon[monster.y][monster.x] = 'empty';
                    }
                }
            });
            const AFFINITY_PER_TURN = 0.01;
            gameState.activeMercenaries.forEach(m => {
                if (m.alive) {
                    m.affinity = Math.min(200, (m.affinity || 0) + AFFINITY_PER_TURN);
                }
            });
            processProjectiles();

            if (applyStatusEffects(gameState.player)) {
                handlePlayerDeath();
                return;
            }
            gameState.activeMercenaries.forEach(mercenary => {
                if (!mercenary.alive) return;
                if (applyStatusEffects(mercenary)) {
                    mercenary.alive = false;
                    mercenary.health = 0;
                    mercenary.affinity = Math.max(0, (mercenary.affinity || 0) - 5);
                    addMessage(`💀 ${mercenary.name}이(가) 전사했습니다...`, 'mercenary');
                    if (mercenary.affinity <= 0) {
                        removeMercenary(mercenary);
                    }
                }
            });
            gameState.monsters.slice().forEach(monster => {
                if (applyStatusEffects(monster)) {
                    killMonster(monster);
                }
            });

            gameState.monsters.forEach(m => {
                if (m.bleedTurns && m.bleedTurns > 0) {
                    m.bleedTurns--;
                }
            });
            
            // 용병 턴 처리
            gameState.activeMercenaries.forEach(mercenary => {
                mercenary.hasActed = false;
                mercenary.nextX = mercenary.x;
                mercenary.nextY = mercenary.y;
            });

            const sortedMercenaries = [...gameState.activeMercenaries].sort((a, b) => {
                const da = getDistance(a.x, a.y, gameState.player.x, gameState.player.y);
                const db = getDistance(b.x, b.y, gameState.player.x, gameState.player.y);
                return db - da; // farthest first
            });

            sortedMercenaries.forEach(mercenary => {
                processMercenaryTurn(mercenary);
            });

            const occupied = new Set();
            sortedMercenaries.forEach(mercenary => {
                const key = `${mercenary.nextX},${mercenary.nextY}`;
                if (!occupied.has(key)) {
                    mercenary.x = mercenary.nextX;
                    mercenary.y = mercenary.nextY;
                    occupied.add(key);
                }
            });
            
            // 몬스터 턴 처리
            gameState.monsters.forEach(monster => {
                monster.hasActed = false;
            });
            
           for (const monster of [...gameState.monsters]) {
                if (monster.hasActed || !gameState.gameRunning) continue;
                if ((monster.paralysis && monster.paralysisTurns > 0) || (monster.petrify && monster.petrifyTurns > 0)) {
                    monster.paralysisTurns && monster.paralysisTurns--;
                    monster.petrifyTurns && monster.petrifyTurns--;
                    if (monster.paralysisTurns <= 0) monster.paralysis = false;
                    if (monster.petrifyTurns <= 0) monster.petrify = false;
                    monster.hasActed = true;
                    continue;
                }
                
                let nearestTarget = null;
                let nearestDistance = Infinity;
                
                // 가장 가까운 대상 찾기
                const playerDistance = getDistance(monster.x, monster.y, gameState.player.x, gameState.player.y);
                if (playerDistance <= MONSTER_VISION) { // 이동 + 공격 범위
                    nearestTarget = gameState.player;
                    nearestDistance = playerDistance;
                }
                
                gameState.activeMercenaries.forEach(mercenary => {
                    if (mercenary.alive) {
                        const distance = getDistance(monster.x, monster.y, mercenary.x, mercenary.y);
                        if (distance <= MONSTER_VISION && distance < nearestDistance) {
                            nearestTarget = mercenary;
                            nearestDistance = distance;
                        }
                    }
                });
                
                if (nearestTarget) {
                    // 공격 범위 내에 있으면 공격
                    if (nearestDistance <= monster.range && 
                        hasLineOfSight(monster.x, monster.y, nearestTarget.x, nearestTarget.y)) {
                        if (monsterAttack(monster)) {
                            return; // 플레이어가 죽으면 게임 종료
                        }
                    } else {
                        // 대상에게 접근
                        const dx = Math.sign(nearestTarget.x - monster.x);
                        const dy = Math.sign(nearestTarget.y - monster.y);
                        
                        let newX = monster.x;
                        let newY = monster.y;
                        
                        // 대각선 이동보다 직선 이동 우선
                        if (Math.random() < 0.5) {
                            if (dx !== 0) newX += dx;
                            else if (dy !== 0) newY += dy;
                        } else {
                            if (dy !== 0) newY += dy;
                            else if (dx !== 0) newX += dx;
                        }
                        
                        // 이동 가능한지 체크
                        if (newX >= 0 && newX < gameState.dungeonSize &&
                            newY >= 0 && newY < gameState.dungeonSize &&
                            gameState.dungeon[newY][newX] === 'empty' &&
                            !(newX === gameState.player.x && newY === gameState.player.y) &&
                            !gameState.monsters.some(m => m.x === newX && m.y === newY && m !== monster) &&
                            !gameState.activeMercenaries.some(m => m.x === newX && m.y === newY && m.alive)) {

                            // 몬스터 이동
                            gameState.dungeon[monster.y][monster.x] = 'empty';
                            monster.x = newX;
                            monster.y = newY;
                            gameState.dungeon[newY][newX] = 'monster';

                            // 이동 후 공격 가능한지 체크
                            const newDistance = getDistance(monster.x, monster.y, nearestTarget.x, nearestTarget.y);
                            if (newDistance <= monster.range &&
                                hasLineOfSight(monster.x, monster.y, nearestTarget.x, nearestTarget.y)) {
                                if (monsterAttack(monster)) {
                                    return;
                                }
                            }
                        } else {
                            const path = findPath(monster.x, monster.y, nearestTarget.x, nearestTarget.y);
                            if (path && path.length > 1) {
                                const step = path[1];
                                const valid = step.x >= 0 && step.x < gameState.dungeonSize &&
                                    step.y >= 0 && step.y < gameState.dungeonSize &&
                                    gameState.dungeon[step.y][step.x] === 'empty' &&
                                    !(step.x === gameState.player.x && step.y === gameState.player.y) &&
                                    !gameState.monsters.some(m => m.x === step.x && m.y === step.y && m !== monster) &&
                                    !gameState.activeMercenaries.some(m => m.x === step.x && m.y === step.y && m.alive);
                                if (valid) {
                                    gameState.dungeon[monster.y][monster.x] = 'empty';
                                    monster.x = step.x;
                                    monster.y = step.y;
                                    gameState.dungeon[step.y][step.x] = 'monster';

                                    const newDistance = getDistance(monster.x, monster.y, nearestTarget.x, nearestTarget.y);
                                    if (newDistance <= monster.range &&
                                        hasLineOfSight(monster.x, monster.y, nearestTarget.x, nearestTarget.y)) {
                                        if (monsterAttack(monster)) {
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
                monster.hasActed = true;
            }
            
            updateFogOfWar();
            // 렌더링과 카메라 업데이트를 한 번에 처리
            requestAnimationFrame(() => {
                updateCamera();
                renderDungeon();
            });
            const hpRegen = getStat(gameState.player, 'healthRegen');
            const mpRegen = getStat(gameState.player, 'manaRegen');
            gameState.player.health = Math.min(getStat(gameState.player, 'maxHealth'), gameState.player.health + hpRegen);
            gameState.player.mana = Math.min(getStat(gameState.player, 'maxMana'), gameState.player.mana + mpRegen);
            updateStats();
            updateMercenaryDisplay();
            gameState.craftingQueue.forEach(entry => entry.turnsLeft--);
            for (let i = 0; i < gameState.craftingQueue.length; i++) {
                const c = gameState.craftingQueue[i];
                if (c.turnsLeft <= 0) {
                    const item = createItem(RECIPES[c.recipe].output, 0, 0);
                    addToInventory(item);
                    addMessage(`🛠️ ${RECIPES[c.recipe].name} 제작 완료`, 'item');
                    gameState.craftingQueue.splice(i, 1);
                    i--;
                }
            }
            updateMaterialsDisplay();
            advanceIncubators();
            updateIncubatorDisplay();
        }

        // 용병 AI (개선됨 - 장비 보너스 적용, 안전성 체크 추가)
        function processMercenaryTurn(mercenary) {
            if (!mercenary.alive || mercenary.hasActed) return;
            if ((mercenary.paralysis && mercenary.paralysisTurns > 0) || (mercenary.petrify && mercenary.petrifyTurns > 0)) {
                mercenary.paralysisTurns && mercenary.paralysisTurns--;
                mercenary.petrifyTurns && mercenary.petrifyTurns--;
                if (mercenary.paralysisTurns <= 0) mercenary.paralysis = false;
                if (mercenary.petrifyTurns <= 0) mercenary.petrify = false;
                mercenary.hasActed = true;
                return;
            }
            mercenary.nextX = mercenary.x;
            mercenary.nextY = mercenary.y;
            const moveTiles = 1;

            if (mercenary.silence && mercenary.silenceTurns > 0) {
                mercenary.silenceTurns--;
                if (mercenary.silenceTurns <= 0) mercenary.silence = false;
            }

            if (mercenary.bleedTurns && mercenary.bleedTurns > 0) {
                mercenary.bleedTurns--;
            }

            const hpRegen = getStat(mercenary, 'healthRegen');
            const mpRegen = getStat(mercenary, 'manaRegen');
            mercenary.health = Math.min(getStat(mercenary, 'maxHealth'), mercenary.health + hpRegen);
            mercenary.mana = Math.min(getStat(mercenary, 'maxMana'), mercenary.mana + mpRegen);
            
            // 장비 초기화 확인
            if (!mercenary.equipped) {
                mercenary.equipped = { weapon: null, armor: null };
            }
            
            // 플레이어와의 거리 유지 (1~3칸 사이)
            const playerDistance = getDistance(mercenary.x, mercenary.y, gameState.player.x, gameState.player.y);
            const minDistanceFromPlayer = 1;
            const maxDistanceFromPlayer = 3;
            const skillInfo = MERCENARY_SKILLS[mercenary.skill] || MONSTER_SKILLS[mercenary.skill];
            const skillLevel = mercenary.skillLevels && mercenary.skillLevels[mercenary.skill] || 1;
            const skillManaCost = skillInfo ? skillInfo.manaCost + skillLevel - 1 : 0;
            const baseAttackRange = mercenary.role === 'ranged' ? 3 :
                                   mercenary.role === 'caster' ? 2 : 1;
            let attackRange = baseAttackRange;
            
            // 힐러는 치료 우선
            if (mercenary.role === 'support') {
                const knowsHeal = skillInfo && mercenary.skill === 'Heal';
                const manaCost = knowsHeal ? skillManaCost : HEAL_MANA_COST;
                const healLevel = knowsHeal ? skillLevel : 1;
                const healRange = knowsHeal ? skillInfo.range : 2;

                if (mercenary.mana >= manaCost && gameState.player.health < getStat(gameState.player, 'maxHealth') * 0.7) {
                    if (getDistance(mercenary.x, mercenary.y, gameState.player.x, gameState.player.y) <= healRange) {
                        const healed = knowsHeal
                            ? healTarget(mercenary, gameState.player, skillInfo, healLevel)
                            : healTarget(mercenary, gameState.player);
                        if (healed) {
                            mercenary.mana -= manaCost;
                            updateMercenaryDisplay();
                            mercenary.hasActed = true;
                            return;
                        }
                    }
                }

                for (const otherMerc of gameState.activeMercenaries) {
                    if (otherMerc !== mercenary && otherMerc.alive && otherMerc.health < getStat(otherMerc, 'maxHealth') * 0.5) {
                        if (mercenary.mana >= manaCost && getDistance(mercenary.x, mercenary.y, otherMerc.x, otherMerc.y) <= healRange) {
                            const healed = knowsHeal
                                ? healTarget(mercenary, otherMerc, skillInfo, healLevel)
                                : healTarget(mercenary, otherMerc);
                            if (healed) {
                                mercenary.mana -= manaCost;
                                updateMercenaryDisplay();
                                mercenary.hasActed = true;
                                return;
                            }
                        }
                    }
                }

                if (mercenary.health < getStat(mercenary, 'maxHealth') * 0.5 && mercenary.mana >= manaCost) {
                    const healed = knowsHeal
                        ? healTarget(mercenary, mercenary, skillInfo, healLevel)
                        : healTarget(mercenary, mercenary);
                    if (healed) {
                        mercenary.mana -= manaCost;
                        updateMercenaryDisplay();
                        mercenary.hasActed = true;
                        return;
                    }
                }

                const purifyInfo = MERCENARY_SKILLS[mercenary.skill2];
                const purifyLevel = mercenary.skillLevels && mercenary.skillLevels[mercenary.skill2] || 1;
                const purifyMana = purifyInfo ? purifyInfo.manaCost + purifyLevel - 1 : 0;
                if (purifyInfo && mercenary.skill2 === 'Purify' && mercenary.mana >= purifyMana) {
                    const inRange = target => getDistance(mercenary.x, mercenary.y, target.x, target.y) <= purifyInfo.range;
                    const hasStatus = t => t.poison || t.burn || t.freeze || t.bleed || t.paralysis || t.nightmare || t.silence || t.petrify || t.debuff;

                    if (hasStatus(gameState.player) && inRange(gameState.player)) {
                        if (purifyTarget(mercenary, gameState.player, purifyInfo)) {
                            mercenary.mana -= purifyMana;
                            updateMercenaryDisplay();
                            mercenary.hasActed = true;
                            return;
                        }
                    }

                    for (const m of gameState.activeMercenaries) {
                        if (m !== mercenary && m.alive && hasStatus(m) && inRange(m)) {
                            if (purifyTarget(mercenary, m, purifyInfo)) {
                                mercenary.mana -= purifyMana;
                                updateMercenaryDisplay();
                                mercenary.hasActed = true;
                                return;
                            }
                        }
                    }

                    if (hasStatus(mercenary)) {
                        if (purifyTarget(mercenary, mercenary, purifyInfo)) {
                            mercenary.mana -= purifyMana;
                            updateMercenaryDisplay();
                            mercenary.hasActed = true;
                            return;
                        }
                    }
                }
            }
            
            // 가장 가까운 시야 내 몬스터 찾기 (fog of war 고려)
            let nearestMonster = null;
            let nearestDistance = Infinity;
            
            gameState.monsters.forEach(monster => {
                // 몬스터가 시야 밖(fog of war)에 있으면 무시
                if (gameState.fogOfWar[monster.y] && gameState.fogOfWar[monster.y][monster.x]) {
                    return;
                }

                const distance = getDistance(mercenary.x, mercenary.y, monster.x, monster.y);
                if (distance < nearestDistance && hasLineOfSight(mercenary.x, mercenary.y, monster.x, monster.y)) {
                    nearestDistance = distance;
                    nearestMonster = monster;
                }
            });

            const skillKey = mercenary.skill;
            let forceSkill = false;
            if (skillKey === 'HawkEye' && nearestMonster && nearestDistance > attackRange && nearestDistance <= skillInfo.range) {
                forceSkill = true;
            }
            if (mercenary.silence && mercenary.silenceTurns > 0) {
                // silence just decrements in applyStatusEffects
            } else if (skillInfo && mercenary.mana >= skillManaCost && (forceSkill || Math.random() < 0.5)) {
                if (skillKey === 'Heal') {
                    let target = null;
                    if (gameState.player.health < getStat(gameState.player, 'maxHealth') && getDistance(mercenary.x, mercenary.y, gameState.player.x, gameState.player.y) <= skillInfo.range) {
                        target = gameState.player;
                    }
                    if (!target) {
                        for (const m of gameState.activeMercenaries) {
                            if (m !== mercenary && m.alive && m.health < getStat(m, 'maxHealth') && getDistance(mercenary.x, mercenary.y, m.x, m.y) <= skillInfo.range) {
                                target = m;
                                break;
                            }
                        }
                    }
                    if (!target && mercenary.health < getStat(mercenary, 'maxHealth')) {
                        target = mercenary;
                    }
                    if (target && healTarget(mercenary, target, skillInfo, skillLevel)) {
                        mercenary.mana -= skillManaCost;
                        updateMercenaryDisplay();
                        mercenary.hasActed = true;
                        return;
                    }
                } else if (skillKey === 'ChargeAttack' && nearestMonster && nearestDistance <= skillInfo.dashRange && hasLineOfSight(mercenary.x, mercenary.y, nearestMonster.x, nearestMonster.y)) {
                    let attackValue = getStat(mercenary, 'attack');
                    attackValue = Math.floor(attackValue * skillInfo.multiplier * skillLevel);

                    const path = findPath(mercenary.x, mercenary.y, nearestMonster.x, nearestMonster.y);
                    let destX = mercenary.x;
                    let destY = mercenary.y;
                    if (path && path.length > 1) {
                        const maxSteps = Math.min(skillInfo.dashRange, path.length - 2);
                        for (let i = 1; i <= maxSteps; i++) {
                            const step = path[i];
                            const blocked =
                                gameState.dungeon[step.y][step.x] === 'wall' ||
                                gameState.dungeon[step.y][step.x] === 'monster' ||
                                (step.x === gameState.player.x && step.y === gameState.player.y) ||
                                gameState.activeMercenaries.some(m => m !== mercenary && m.alive && m.x === step.x && m.y === step.y);
                            if (blocked) {
                                break;
                            }
                            destX = step.x;
                            destY = step.y;
                        }
                    }
                    // move first before attacking
                    mercenary.x = destX;
                    mercenary.y = destY;
                    mercenary.nextX = destX;
                    mercenary.nextY = destY;

                    const hits = 1;
                    const icon = skillInfo.icon;
                    const result = performAttack(mercenary, nearestMonster, { attackValue, status: mercenary.equipped.weapon && mercenary.equipped.weapon.status });
                    const detail = buildAttackDetail(skillInfo.icon, skillInfo.name, result);
                    if (!result.hit) {
                        addMessage(`❌ ${mercenary.name}의 ${skillInfo.name}이 빗나갔습니다!`, "mercenary", detail);
                    } else {
                        const critMsg = result.crit ? ' (치명타!)' : '';
                        let dmgStr = result.baseDamage;
                        if (result.elementDamage) {
                            const emoji = ELEMENT_EMOJI[result.element] || '';
                            dmgStr = `${result.baseDamage}+${emoji}${result.elementDamage}`;
                        }
                        addMessage(`${icon} ${mercenary.name}이(가) ${nearestMonster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, "mercenary", detail);
                    }

                    if (nearestMonster.health <= 0) {
                        addMessage(`💀 ${mercenary.name}이(가) ${nearestMonster.name}을(를) 처치했습니다!`, "mercenary");

                        const mercExp = Math.floor(nearestMonster.exp * 0.6);
                        const playerExp = Math.floor(nearestMonster.exp * 0.4);

                        mercenary.exp += mercExp;
                        gameState.player.exp += playerExp;
                        gameState.player.gold += nearestMonster.gold;

                        checkMercenaryLevelUp(mercenary);
                        checkLevelUp();
                        updateStats();

                        if (nearestMonster.special === 'boss') {
                            const bossItems = ['magicSword', 'plateArmor', 'greaterHealthPotion'];
                            if (Math.random() < 0.2) bossItems.push('reviveScroll');
                            const bossItemKey = bossItems[Math.floor(Math.random() * bossItems.length)];
                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const bossItem = createItem(bossItemKey, pos.x, pos.y);
                            gameState.items.push(bossItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`🎁 ${nearestMonster.name}이(가) ${bossItem.name}을(를) 떨어뜨렸습니다!`, "treasure");
                        } else if (Math.random() < nearestMonster.lootChance) {
                            const itemKeys = Object.keys(ITEMS).filter(k => k !== 'reviveScroll');
                            const availableItems = itemKeys.filter(key =>
                                ITEMS[key].level <= Math.ceil(gameState.floor / 2 + 1) &&
                                ITEMS[key].type !== ITEM_TYPES.ESSENCE
                            );
                            let randomItemKey = availableItems[Math.floor(Math.random() * availableItems.length)];
                            if (Math.random() < 0.1 && ITEMS.reviveScroll.level <= Math.ceil(gameState.floor / 2 + 1)) {
                                randomItemKey = 'reviveScroll';
                            }

                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const droppedItem = createItem(randomItemKey, pos.x, pos.y);
                            gameState.items.push(droppedItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`📦 ${nearestMonster.name}이(가) ${droppedItem.name}을(를) 떨어뜨렸습니다!`, "item");
                        } else {
                            gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'empty';
                        }

                        const monsterIndex = gameState.monsters.findIndex(m => m === nearestMonster);
                        if (monsterIndex !== -1) {
                            gameState.monsters.splice(monsterIndex, 1);
                        }
                        nearestMonster.health = 0;
                        gameState.corpses.push(nearestMonster);
                        gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'corpse';
                    }
                    mercenary.mana -= skillManaCost;
                    updateMercenaryDisplay();
                    mercenary.hasActed = true;
                    return;
                } else if (MONSTER_SKILLS[skillKey] && nearestMonster && nearestDistance <= skillInfo.range && hasLineOfSight(mercenary.x, mercenary.y, nearestMonster.x, nearestMonster.y)) {
                    const base = skillInfo.magic ? getStat(mercenary, 'magicPower') : getStat(mercenary, 'attack');
                    const attackValue = rollDice(skillInfo.damageDice) * skillLevel + base;
                    const hits = skillInfo.hits || 1;
                    const icon = skillInfo.icon;
                    for (let i = 0; i < hits; i++) {
                        const result = performAttack(mercenary, nearestMonster, { attackValue, magic: skillInfo.magic, element: skillInfo.element, status: skillInfo.status || (mercenary.equipped.weapon && mercenary.equipped.weapon.status), damageDice: skillInfo.damageDice });
                        const detail = buildAttackDetail(icon, skillInfo.name, result);
                        if (!result.hit) {
                            addMessage(`❌ ${mercenary.name}의 ${skillInfo.name}이 빗나갔습니다!`, "mercenary", detail);
                        } else {
                            const critMsg = result.crit ? ' (치명타!)' : '';
                            let dmgStr = result.baseDamage;
                            if (result.elementDamage) {
                                const emoji = ELEMENT_EMOJI[result.element] || '';
                                dmgStr = `${result.baseDamage}+${emoji}${result.elementDamage}`;
                            }
                            addMessage(`${icon} ${mercenary.name}이(가) ${nearestMonster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, "mercenary", detail);
                        }

                        if (nearestMonster.health <= 0) break;
                    }

                    if (nearestMonster.health <= 0) {
                        addMessage(`💀 ${mercenary.name}이(가) ${nearestMonster.name}을(를) 처치했습니다!`, "mercenary");

                        const mercExp = Math.floor(nearestMonster.exp * 0.6);
                        const playerExp = Math.floor(nearestMonster.exp * 0.4);

                        mercenary.exp += mercExp;
                        gameState.player.exp += playerExp;
                        gameState.player.gold += nearestMonster.gold;

                        checkMercenaryLevelUp(mercenary);
                        checkLevelUp();
                        updateStats();

                        if (nearestMonster.special === 'boss') {
                            const bossItems = ['magicSword', 'plateArmor', 'greaterHealthPotion'];
                            if (Math.random() < 0.2) bossItems.push('reviveScroll');
                            const bossItemKey = bossItems[Math.floor(Math.random() * bossItems.length)];
                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const bossItem = createItem(bossItemKey, pos.x, pos.y);
                            gameState.items.push(bossItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`🎁 ${nearestMonster.name}이(가) ${bossItem.name}을(를) 떨어뜨렸습니다!`, "treasure");
                        } else if (Math.random() < nearestMonster.lootChance) {
                            const itemKeys = Object.keys(ITEMS).filter(k => k !== 'reviveScroll');
                            const availableItems = itemKeys.filter(key =>
                                ITEMS[key].level <= Math.ceil(gameState.floor / 2 + 1) &&
                                ITEMS[key].type !== ITEM_TYPES.ESSENCE
                            );
                            let randomItemKey = availableItems[Math.floor(Math.random() * availableItems.length)];
                            if (Math.random() < 0.1 && ITEMS.reviveScroll.level <= Math.ceil(gameState.floor / 2 + 1)) {
                                randomItemKey = 'reviveScroll';
                            }

                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const droppedItem = createItem(randomItemKey, pos.x, pos.y);
                            gameState.items.push(droppedItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`📦 ${nearestMonster.name}이(가) ${droppedItem.name}을(를) 떨어뜨렸습니다!`, "item");
                        } else {
                            gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'empty';
                        }

                        const monsterIndex = gameState.monsters.findIndex(m => m === nearestMonster);
                        if (monsterIndex !== -1) {
                            gameState.monsters.splice(monsterIndex, 1);
                        }
                        nearestMonster.health = 0;
                        gameState.corpses.push(nearestMonster);
                        gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'corpse';
                    }
                    mercenary.mana -= skillManaCost;
                    updateMercenaryDisplay();
                    mercenary.hasActed = true;
                    return;
                } else if (nearestMonster && nearestDistance <= skillInfo.range && hasLineOfSight(mercenary.x, mercenary.y, nearestMonster.x, nearestMonster.y)) {
                    let attackValue = getStat(mercenary, 'attack');
                    if (skillKey === 'ChargeAttack') {
                        attackValue = Math.floor(attackValue * skillInfo.multiplier * skillLevel);
                    } else if (skillKey === 'Fireball' || skillKey === 'Iceball') {
                        attackValue = rollDice(skillInfo.damageDice) * skillLevel + getStat(mercenary, 'magicPower');
                    } else if (skillKey === 'HawkEye') {
                        attackValue = rollDice(skillInfo.damageDice) * skillLevel + getStat(mercenary, 'attack');
                    } else {
                        attackValue = Math.floor(attackValue * skillLevel);
                    }

                    const hits = skillKey === 'DoubleStrike' ? 2 : 1;
                    const icon = skillInfo.icon;
                    for (let i = 0; i < hits; i++) {
                        const result = performAttack(mercenary, nearestMonster, { attackValue, magic: skillInfo.magic, element: skillInfo.element, status: mercenary.equipped.weapon && mercenary.equipped.weapon.status, damageDice: skillInfo.damageDice });
                        const detail = buildAttackDetail(icon, skillInfo.name, result);
                        if (!result.hit) {
                            addMessage(`❌ ${mercenary.name}의 ${skillInfo.name}이 빗나갔습니다!`, "mercenary", detail);
                        } else {
                            const critMsg = result.crit ? ' (치명타!)' : '';
                            let dmgStr = result.baseDamage;
                            if (result.elementDamage) {
                                const emoji = ELEMENT_EMOJI[result.element] || '';
                                dmgStr = `${result.baseDamage}+${emoji}${result.elementDamage}`;
                            }
                            addMessage(`${icon} ${mercenary.name}이(가) ${nearestMonster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, "mercenary", detail);
                        }

                        if (nearestMonster.health <= 0) break;
                    }

                    if (nearestMonster.health <= 0) {
                        addMessage(`💀 ${mercenary.name}이(가) ${nearestMonster.name}을(를) 처치했습니다!`, "mercenary");

                        const mercExp = Math.floor(nearestMonster.exp * 0.6);
                        const playerExp = Math.floor(nearestMonster.exp * 0.4);

                        mercenary.exp += mercExp;
                        gameState.player.exp += playerExp;
                        gameState.player.gold += nearestMonster.gold;

                        checkMercenaryLevelUp(mercenary);
                        checkLevelUp();
                        updateStats();

                        if (nearestMonster.special === 'boss') {
                            const bossItems = ['magicSword', 'plateArmor', 'greaterHealthPotion'];
                            if (Math.random() < 0.2) bossItems.push('reviveScroll');
                            const bossItemKey = bossItems[Math.floor(Math.random() * bossItems.length)];
                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const bossItem = createItem(bossItemKey, pos.x, pos.y);
                            gameState.items.push(bossItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`🎁 ${nearestMonster.name}이(가) ${bossItem.name}을(를) 떨어뜨렸습니다!`, "treasure");
                        } else if (Math.random() < nearestMonster.lootChance) {
                            const itemKeys = Object.keys(ITEMS).filter(k => k !== 'reviveScroll');
                            const availableItems = itemKeys.filter(key =>
                                ITEMS[key].level <= Math.ceil(gameState.floor / 2 + 1) &&
                                ITEMS[key].type !== ITEM_TYPES.ESSENCE
                            );
                            let randomItemKey = availableItems[Math.floor(Math.random() * availableItems.length)];
                            if (Math.random() < 0.1 && ITEMS.reviveScroll.level <= Math.ceil(gameState.floor / 2 + 1)) {
                                randomItemKey = 'reviveScroll';
                            }

                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const droppedItem = createItem(randomItemKey, pos.x, pos.y);
                            gameState.items.push(droppedItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`📦 ${nearestMonster.name}이(가) ${droppedItem.name}을(를) 떨어뜨렸습니다!`, "item");
                        } else {
                            gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'empty';
                        }

                        const monsterIndex = gameState.monsters.findIndex(m => m === nearestMonster);
                        if (monsterIndex !== -1) {
                            gameState.monsters.splice(monsterIndex, 1);
                        }
                        nearestMonster.health = 0;
                        gameState.corpses.push(nearestMonster);
                        gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'corpse';
                    }
                    mercenary.mana -= skillManaCost;
                    updateMercenaryDisplay();
                    mercenary.hasActed = true;
                    return;
                }
            }
            
            if (nearestMonster) {
                if (nearestDistance <= attackRange) {
                    // 공격 (장비 보너스 적용)
                    const totalAttack = getStat(mercenary, 'attack');

                    const result = performAttack(mercenary, nearestMonster, { attackValue: totalAttack, status: mercenary.equipped.weapon && mercenary.equipped.weapon.status });
                    const detail = buildAttackDetail('근접 공격', '', result);
                    if (!result.hit) {
                        addMessage(`❌ ${mercenary.name}의 공격이 빗나갔습니다!`, "mercenary", detail);
                    } else {
                        const critMsg = result.crit ? ' (치명타!)' : '';
                        let dmgStr = result.baseDamage;
                        if (result.elementDamage) {
                            const emoji = ELEMENT_EMOJI[result.element] || '';
                            dmgStr = `${result.baseDamage}+${emoji}${result.elementDamage}`;
                        }
                        addMessage(`⚔️ ${mercenary.name}이(가) ${nearestMonster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, "mercenary", detail);
                    }
                    
                    if (nearestMonster.health <= 0) {
                        addMessage(`💀 ${mercenary.name}이(가) ${nearestMonster.name}을(를) 처치했습니다!`, "mercenary");
                        
                        const mercExp = Math.floor(nearestMonster.exp * 0.6);
                        const playerExp = Math.floor(nearestMonster.exp * 0.4);
                        
                        mercenary.exp += mercExp;
                        gameState.player.exp += playerExp;
                        gameState.player.gold += nearestMonster.gold;
                        
                        checkMercenaryLevelUp(mercenary);
                        checkLevelUp();
                        updateStats();
                        
                        if (nearestMonster.special === 'boss') {
                            const bossItems = ['magicSword', 'magicStaff', 'plateArmor', 'greaterHealthPotion'];
                            if (Math.random() < 0.2) bossItems.push('reviveScroll');
                            const bossItemKey = bossItems[Math.floor(Math.random() * bossItems.length)];
                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const bossItem = createItem(bossItemKey, pos.x, pos.y);
                            gameState.items.push(bossItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`🎁 ${nearestMonster.name}이(가) ${bossItem.name}을(를) 떨어뜨렸습니다!`, "treasure");
                        } else if (Math.random() < nearestMonster.lootChance) {
                            const itemKeys = Object.keys(ITEMS).filter(k => k !== 'reviveScroll');
                            const availableItems = itemKeys.filter(key =>
                                ITEMS[key].level <= Math.ceil(gameState.floor / 2 + 1) &&
                                ITEMS[key].type !== ITEM_TYPES.ESSENCE
                            );
                            let randomItemKey = availableItems[Math.floor(Math.random() * availableItems.length)];
                            if (Math.random() < 0.1 && ITEMS.reviveScroll.level <= Math.ceil(gameState.floor / 2 + 1)) {
                                randomItemKey = 'reviveScroll';
                            }

                            const pos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                            const droppedItem = createItem(randomItemKey, pos.x, pos.y);
                            gameState.items.push(droppedItem);
                            gameState.dungeon[pos.y][pos.x] = 'item';
                            addMessage(`📦 ${nearestMonster.name}이(가) ${droppedItem.name}을(를) 떨어뜨렸습니다!`, "item");
                        } else {
                            gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'empty';
                        }
                        
                        const monsterIndex = gameState.monsters.findIndex(m => m === nearestMonster);
                        if (monsterIndex !== -1) {
                            gameState.monsters.splice(monsterIndex, 1);
                        }
                        nearestMonster.health = 0;
                        gameState.corpses.push(nearestMonster);
                        gameState.dungeon[nearestMonster.y][nearestMonster.x] = 'corpse';
                    }
                    mercenary.hasActed = true;
                    return;
                } else {
                    const targetPos = findAdjacentEmpty(nearestMonster.x, nearestMonster.y);
                    const path = findPath(mercenary.x, mercenary.y, targetPos.x, targetPos.y);
                    if (path && path.length > 1) {
                        const step = path[Math.min(moveTiles, path.length - 1)];
                        const newDistanceFromPlayer = getDistance(step.x, step.y, gameState.player.x, gameState.player.y);
                        const stepMonsterDist = getDistance(step.x, step.y, nearestMonster.x, nearestMonster.y);
                        const stepValid = step.x >= 0 && step.x < gameState.dungeonSize &&
                            step.y >= 0 && step.y < gameState.dungeonSize &&
                            gameState.dungeon[step.y][step.x] !== 'wall' &&
                            gameState.dungeon[step.y][step.x] !== 'monster' &&
                            !(step.x === gameState.player.x && step.y === gameState.player.y);

                        if (stepValid) {
                            if (mercenary.role === 'tank') {
                                mercenary.nextX = step.x;
                                mercenary.nextY = step.y;
                                mercenary.hasActed = true;
                            } else if (newDistanceFromPlayer >= minDistanceFromPlayer && stepMonsterDist < nearestDistance) {
                                mercenary.nextX = step.x;
                                mercenary.nextY = step.y;
                                mercenary.hasActed = true;
                            } else if (playerDistance > maxDistanceFromPlayer) {
                                // too far from player, move toward player instead
                                const backPath = findPath(mercenary.x, mercenary.y, gameState.player.x, gameState.player.y);
                                if (backPath && backPath.length > 1) {
                                    const backStep = backPath[Math.min(moveTiles, backPath.length - 1)];
                                    const backDist = getDistance(backStep.x, backStep.y, gameState.player.x, gameState.player.y);
                                    const backValid = backStep.x >= 0 && backStep.x < gameState.dungeonSize &&
                                        backStep.y >= 0 && backStep.y < gameState.dungeonSize &&
                                        gameState.dungeon[backStep.y][backStep.x] !== 'wall' &&
                                        gameState.dungeon[backStep.y][backStep.x] !== 'monster' &&
                                        !(backStep.x === gameState.player.x && backStep.y === gameState.player.y) &&
                                        backDist >= minDistanceFromPlayer && backDist < playerDistance;
                                    if (backValid) {
                                        mercenary.nextX = backStep.x;
                                        mercenary.nextY = backStep.y;
                                        mercenary.hasActed = true;
                                    }
                                }
                            }
                        } else if (playerDistance > maxDistanceFromPlayer) {
                            const backPath = findPath(mercenary.x, mercenary.y, gameState.player.x, gameState.player.y);
                            if (backPath && backPath.length > 1) {
                                const backStep = backPath[Math.min(moveTiles, backPath.length - 1)];
                                const backDist = getDistance(backStep.x, backStep.y, gameState.player.x, gameState.player.y);
                                const backValid = backStep.x >= 0 && backStep.x < gameState.dungeonSize &&
                                    backStep.y >= 0 && backStep.y < gameState.dungeonSize &&
                                    gameState.dungeon[backStep.y][backStep.x] !== 'wall' &&
                                    gameState.dungeon[backStep.y][backStep.x] !== 'monster' &&
                                    !(backStep.x === gameState.player.x && backStep.y === gameState.player.y) &&
                                    backDist >= minDistanceFromPlayer && backDist < playerDistance;
                                if (backValid) {
                                    mercenary.nextX = backStep.x;
                                    mercenary.nextY = backStep.y;
                                    mercenary.hasActed = true;
                                }
                            }
                        }
                    }
                }
            } else {
                if (playerDistance > maxDistanceFromPlayer) {
                    const path = findPath(mercenary.x, mercenary.y, gameState.player.x, gameState.player.y);
                    if (path && path.length > 1) {
                        const step = path[Math.min(moveTiles, path.length - 1)];
                        const distAfter = getDistance(step.x, step.y, gameState.player.x, gameState.player.y);
                        const stepValid = step.x >= 0 && step.x < gameState.dungeonSize &&
                            step.y >= 0 && step.y < gameState.dungeonSize &&
                            gameState.dungeon[step.y][step.x] !== 'wall' &&
                            gameState.dungeon[step.y][step.x] !== 'monster' &&
                            !(step.x === gameState.player.x && step.y === gameState.player.y) &&
                            distAfter >= minDistanceFromPlayer && distAfter < playerDistance;

                        if (stepValid) {
                            mercenary.nextX = step.x;
                            mercenary.nextY = step.y;
                            mercenary.hasActed = true;
                        }
                    }
                }
            }
        }

        // 게임 저장
        function saveGame() {
            localStorage.setItem('dungeonCrawlerSave', JSON.stringify(gameState));
            addMessage('💾 게임이 저장되었습니다.', 'info');
        }

        // 게임 불러오기
        function loadGame() {
            const data = localStorage.getItem('dungeonCrawlerSave');
            if (!data) {
                addMessage('❌ 저장된 게임이 없습니다.', 'info');
                return;
            }
            const saved = JSON.parse(data);
            delete saved.mercenaries;
            Object.assign(gameState, saved);
            if (saved.activeMercenaries) gameState.activeMercenaries = saved.activeMercenaries;
            else if (saved.mercenaries) gameState.activeMercenaries = saved.mercenaries;
            if (saved.standbyMercenaries) gameState.standbyMercenaries = saved.standbyMercenaries;
            if (!saved.player.endurance) {
                const sp = saved.player;
                const endurance = sp.maxHealth / 2;
                gameState.player.endurance = endurance;
                gameState.player.focus = sp.maxMana / 2;
                gameState.player.strength = sp.attack;
                gameState.player.agility = Math.max(0, Math.round((sp.accuracy - 0.7) / 0.02));
                gameState.player.intelligence = sp.magicPower;
                gameState.player.baseDefense = sp.defense - Math.floor(endurance * 0.1);
            }

            const convertMercenary = m => {
                if (!m.endurance) {
                    const endurance = m.maxHealth / 2;
                    m.endurance = endurance;
                    m.focus = (m.maxMana || 0) / 2;
                    m.strength = m.attack;
                    m.agility = Math.max(0, Math.round((m.accuracy - 0.7) / 0.02));
                    m.intelligence = m.magicPower;
                    m.baseDefense = m.defense - Math.floor(endurance * 0.1);
                }
                if (!m.stars) {
                    m.stars = generateStars();
                }
                if (m.skillPoints === undefined) {
                    m.skillPoints = 0;
                }
                if (!m.skillLevels) {
                    m.skillLevels = {};
                    if (m.skill) m.skillLevels[m.skill] = 1;
                    if (m.skill2) m.skillLevels[m.skill2] = 1;
                }
            };

            gameState.activeMercenaries.forEach(convertMercenary);
            gameState.standbyMercenaries.forEach(convertMercenary);
            updateFogOfWar();
            updateStats();
            updateInventoryDisplay();
            updateMercenaryDisplay();
            renderDungeon();
            updateCamera();
            updateIncubatorDisplay();
            updateActionButtons();
            addMessage('📁 게임을 불러왔습니다.', 'info');
        }
       function rangedAction() {
            if ((gameState.player.paralysis && gameState.player.paralysisTurns > 0) ||
                (gameState.player.petrify && gameState.player.petrifyTurns > 0)) {
                addMessage('⚠️ 플레이어는 공격할 수 없습니다.', 'info');
                processTurn();
                return;
            }
            const range = 5;
            let target = null;
            let dist = Infinity;
            for (const monster of gameState.monsters) {
                const d = getDistance(gameState.player.x, gameState.player.y, monster.x, monster.y);
                if (d <= range && d < dist && hasLineOfSight(gameState.player.x, gameState.player.y, monster.x, monster.y)) {
                    target = monster;
                    dist = d;
                }
            }

            if (!target) {
                addMessage('🎯 사거리 내에 몬스터가 없습니다.', 'info');
                processTurn();
                return;
            }

            const dx = Math.sign(target.x - gameState.player.x);
            const dy = Math.sign(target.y - gameState.player.y);
            gameState.projectiles.push({ x: gameState.player.x, y: gameState.player.y, dx, dy, rangeLeft: dist, icon: '➡️', element: null });
            processTurn();
        }

       function meleeAttackAction() {
            if ((gameState.player.paralysis && gameState.player.paralysisTurns > 0) ||
                (gameState.player.petrify && gameState.player.petrifyTurns > 0)) {
                addMessage('⚠️ 플레이어는 공격할 수 없습니다.', 'info');
                processTurn();
                return;
            }
            let targetPos = null;
            const dirs = [
                {x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}
            ];
            for (const d of dirs) {
                const nx = gameState.player.x + d.x;
                const ny = gameState.player.y + d.y;
                if (gameState.dungeon[ny] && gameState.dungeon[ny][nx] === 'monster') {
                    targetPos = {x:nx, y:ny};
                    break;
                }
            }
            if (!targetPos) {
                addMessage('⚔️ 근처에 몬스터가 없습니다.', 'info');
                processTurn();
                return;
            }
            movePlayer(targetPos.x - gameState.player.x, targetPos.y - gameState.player.y);
        }

        function skill1Action() {
            const skill = gameState.player.assignedSkills[1];
            useSkill(skill);
        }

        function skill2Action() {
            const skill = gameState.player.assignedSkills[2];
            useSkill(skill);
        }

       function useSkill(skillKey) {
            if ((gameState.player.paralysis && gameState.player.paralysisTurns > 0) ||
                (gameState.player.petrify && gameState.player.petrifyTurns > 0)) {
                addMessage('⚠️ 플레이어는 행동할 수 없습니다.', 'info');
                processTurn();
                return;
            }
            if (gameState.player.silence && gameState.player.silenceTurns > 0) {
                addMessage('🤐 플레이어는 침묵 상태입니다.', 'info');
                processTurn();
                return;
            }
            if (!skillKey) {
                addMessage('스킬이 설정되어 있지 않습니다.', 'info');
                processTurn();
                return;
            }
            const skill = SKILL_DEFS[skillKey];
            const level = gameState.player.skillLevels[skillKey] || 1;
            const manaCost = skill.manaCost + level - 1;
            if (skill.passive) {
                addMessage('이 스킬은 항상 효과가 발동중입니다.', 'info');
                processTurn();
                return;
            }
            if (gameState.player.mana < manaCost) {
                addMessage('마나가 부족합니다.', 'info');
                processTurn();
                return;
            }
            if (skill.heal !== undefined) {
                const targets = [gameState.player, ...gameState.activeMercenaries.filter(m => m.alive)]
                    .filter(t => getDistance(gameState.player.x, gameState.player.y, t.x, t.y) <= skill.range && t.health < getStat(t, 'maxHealth'));
                if (targets.length === 0) {
                    addMessage('❤️ 회복할 대상이 없습니다.', 'info');
                    processTurn();
                    return;
                }
                const target = targets.sort((a,b) => (getStat(b,'maxHealth')-b.health)-(getStat(a,'maxHealth')-a.health))[0];
                gameState.player.mana -= manaCost;
                healTarget(gameState.player, target, skill, level);
                updateStats();
                updateMercenaryDisplay();
                processTurn();
                return;
            }
            if (skill.purify) {
                const hasStatus = t => t.poison || t.burn || t.freeze || t.bleed || t.paralysis || t.nightmare || t.silence || t.petrify || t.debuff;
                const targets = [gameState.player, ...gameState.activeMercenaries.filter(m => m.alive)]
                    .filter(t => getDistance(gameState.player.x, gameState.player.y, t.x, t.y) <= skill.range && hasStatus(t));
                if (targets.length === 0) {
                    addMessage('해제할 상태이상이 없습니다.', 'info');
                    processTurn();
                    return;
                }
                const target = targets[0];
                gameState.player.mana -= manaCost;
                purifyTarget(gameState.player, target, skill);
                updateStats();
                updateMercenaryDisplay();
                processTurn();
                return;
            }
            if (skill.teleport) {
                const p = gameState.player;
                if (p.teleportSavedX === null) {
                    p.teleportSavedX = p.x;
                    p.teleportSavedY = p.y;
                    addMessage('🌀 위치를 저장했습니다.', 'info');
                } else if (p.teleportReturnX === null) {
                    p.teleportReturnX = p.x;
                    p.teleportReturnY = p.y;
                    p.x = p.teleportSavedX;
                    p.y = p.teleportSavedY;
                    addMessage('🌀 저장된 위치로 이동했습니다.', 'info');
                } else {
                    const tx = p.teleportReturnX;
                    const ty = p.teleportReturnY;
                    p.teleportReturnX = null;
                    p.teleportReturnY = null;
                    p.x = tx;
                    p.y = ty;
                    addMessage('🌀 이전 위치로 돌아왔습니다.', 'info');
                }
                p.mana -= manaCost;
                renderDungeon();
                updateCamera();
                updateStats();
                processTurn();
                return;
            }
            if (skill.radius !== undefined) {
                const targets = gameState.monsters.filter(m => getDistance(gameState.player.x, gameState.player.y, m.x, m.y) <= skill.radius);
                if (targets.length === 0) {
                    addMessage('🎯 사거리 내에 몬스터가 없습니다.', 'info');
                    processTurn();
                    return;
                }
                gameState.player.mana -= manaCost;
                targets.slice().forEach(monster => {
                    const attackValue = rollDice(skill.damageDice) * level + getStat(gameState.player, 'magicPower');
                    const result = performAttack(gameState.player, monster, { attackValue, magic: skill.magic, element: skill.element, damageDice: skill.damageDice, status: gameState.player.equipped.weapon && gameState.player.equipped.weapon.status });
                    const detail = buildAttackDetail(skill.icon, skill.name, result);
                    if (!result.hit) {
                        addMessage(`❌ ${monster.name}에게 ${skill.name}이 빗나갔습니다!`, 'combat', detail);
                    } else {
                        const critMsg = result.crit ? ' (치명타!)' : '';
                        let dmgStr = formatNumber(result.baseDamage);
                        if (result.elementDamage) {
                            const emoji = ELEMENT_EMOJI[result.element] || '';
                            dmgStr = `${formatNumber(result.baseDamage)}+${emoji}${formatNumber(result.elementDamage)}`;
                        }
                        addMessage(`${skill.icon} ${monster.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, 'combat', detail);
                    }
                    if (monster.health <= 0) {
                        killMonster(monster);
                    }
                });
                processTurn();
                return;
            }
            let target = null;
            let dist = Infinity;
            const searchRange = (skill.melee && skill.dashRange) ? skill.dashRange : skill.range;
            for (const monster of gameState.monsters) {
                const d = getDistance(gameState.player.x, gameState.player.y, monster.x, monster.y);
                if (d <= searchRange && d < dist && hasLineOfSight(gameState.player.x, gameState.player.y, monster.x, monster.y)) {
                    target = monster;
                    dist = d;
                }
            }
            if (!target) {
                addMessage('🎯 사거리 내에 몬스터가 없습니다.', 'info');
                processTurn();
                return;
            }
            if (skill.melee) {
                if (skill.dashRange && dist <= skill.dashRange && hasLineOfSight(gameState.player.x, gameState.player.y, target.x, target.y)) {
                    const path = findPath(gameState.player.x, gameState.player.y, target.x, target.y);
                    let destX = gameState.player.x;
                    let destY = gameState.player.y;
                    if (path && path.length > 1) {
                        const maxSteps = Math.min(skill.dashRange, path.length - 2);
                        for (let i = 1; i <= maxSteps; i++) {
                            const step = path[i];
                            const blocked =
                                gameState.dungeon[step.y][step.x] === 'wall' ||
                                gameState.dungeon[step.y][step.x] === 'monster' ||
                                gameState.activeMercenaries.some(m => m.alive && m.x === step.x && m.y === step.y);
                            if (blocked) {
                                break;
                            }
                            destX = step.x;
                            destY = step.y;
                        }
                    }
                    gameState.player.x = destX;
                    gameState.player.y = destY;
                }
                const attackMult = skill.multiplier || 1;
                const hits = skill.hits || 1;
                gameState.player.mana -= manaCost;
                for (let i = 0; i < hits; i++) {
                    const attackValue = Math.floor(getStat(gameState.player, 'attack') * attackMult * level);
                    const result = performAttack(gameState.player, target, { attackValue, status: gameState.player.equipped.weapon && gameState.player.equipped.weapon.status });
                    const detail = buildAttackDetail(skill.icon, skill.name, result);
                    if (!result.hit) {
                        addMessage(`❌ ${target.name}에게 ${skill.name}이 빗나갔습니다!`, 'combat', detail);
                    } else {
                        const critMsg = result.crit ? ' (치명타!)' : '';
                        let dmgStr = formatNumber(result.baseDamage);
                        if (result.elementDamage) {
                            const emoji = ELEMENT_EMOJI[result.element] || '';
                            dmgStr = `${formatNumber(result.baseDamage)}+${emoji}${formatNumber(result.elementDamage)}`;
                        }
                        addMessage(`${skill.icon} ${target.name}에게 ${dmgStr}의 피해를 입혔습니다${critMsg}!`, 'combat', detail);
                    }
                    if (target.health <= 0) {
                        killMonster(target);
                        break;
                    }
                }
                processTurn();
                return;
            }
            const dx = Math.sign(target.x - gameState.player.x);
            const dy = Math.sign(target.y - gameState.player.y);
            gameState.player.mana -= manaCost;
            gameState.projectiles.push({ x: gameState.player.x, y: gameState.player.y, dx, dy, rangeLeft: dist, icon: skill.icon, damageDice: skill.damageDice, magic: skill.magic, skill: skillKey, element: skill.element, level });
            processTurn();
        }

        function healAction() {
            const healAmount = Math.min(Math.floor(getStat(gameState.player, 'maxHealth') * 0.3), getStat(gameState.player, 'maxHealth') - gameState.player.health);
            if (healAmount > 0) {
                gameState.player.health += healAmount;
                addMessage(`💚 플레이어가 휴식을 취해 ${formatNumber(healAmount)} 체력을 회복했습니다.`, 'info');
                updateStats();
            } else {
                addMessage('❤️ 체력이 이미 가득 찼습니다.', 'info');
            }
            processTurn();
        }

        function recallMercenaries() {
            const positions = [
                {x: gameState.player.x + 1, y: gameState.player.y},
                {x: gameState.player.x - 1, y: gameState.player.y},
                {x: gameState.player.x, y: gameState.player.y + 1},
                {x: gameState.player.x, y: gameState.player.y - 1},
                {x: gameState.player.x + 1, y: gameState.player.y + 1},
                {x: gameState.player.x - 1, y: gameState.player.y - 1},
                {x: gameState.player.x + 1, y: gameState.player.y - 1},
                {x: gameState.player.x - 1, y: gameState.player.y + 1}
            ];
            gameState.activeMercenaries.forEach(mercenary => {
                if (!mercenary.alive) return;
                for (const pos of positions) {
                    if (pos.x >= 0 && pos.x < gameState.dungeonSize &&
                        pos.y >= 0 && pos.y < gameState.dungeonSize &&
                        gameState.dungeon[pos.y][pos.x] === 'empty' &&
                        !gameState.activeMercenaries.some(m => m !== mercenary && m.alive && m.x === pos.x && m.y === pos.y) &&
                        !gameState.monsters.some(m => m.x === pos.x && m.y === pos.y)) {
                        mercenary.x = pos.x;
                        mercenary.y = pos.y;
                        break;
                    }
                }
            });
            renderDungeon();
            addMessage('📣 용병들을 호출했습니다.', 'mercenary');
            processTurn();
        }

        function pickUpAction() {
            const items = gameState.items.filter(i =>
                getDistance(gameState.player.x, gameState.player.y, i.x, i.y) <= 2);
            if (items.length === 0) {
                addMessage('📦 주변에 아이템이 없습니다.', 'info');
                processTurn();
                return;
            }
            items.forEach(item => {
                addToInventory(item);
                addMessage(`📦 ${item.name}을(를) 획득했습니다!`, 'item');
                const idx = gameState.items.indexOf(item);
                if (idx !== -1) gameState.items.splice(idx, 1);
                if (gameState.dungeon[item.y] && gameState.dungeon[item.y][item.x] === 'item') {
                    gameState.dungeon[item.y][item.x] = 'empty';
                }
            });
            renderDungeon();
            processTurn();
        }

        function updateShopDisplay() {
            const list = document.getElementById('shop-items');
            list.innerHTML = '';
            gameState.shopItems.forEach((item, i) => {
                const div = document.createElement('div');
                div.className = 'shop-item';
                const cost = item.price * SHOP_PRICE_MULTIPLIER;
                div.innerHTML = `<span>${item.icon} ${item.baseName}</span><span>${formatNumber(cost)}💰</span>`;
                div.onclick = () => buyShopItem(i);
                list.appendChild(div);
            });
        }

        function showShop() {
            updateShopDisplay();
            document.getElementById('shop-panel').style.display = 'block';
            gameState.gameRunning = false;
        }

        function hideShop() {
            document.getElementById('shop-panel').style.display = 'none';
            gameState.gameRunning = true;
        }

        function showItemTargetPanel(item) {
            const panel = document.getElementById('item-target-panel');
            const content = document.getElementById('item-target-content');
            content.innerHTML = `<h3>${item.name} 대상 선택</h3>`;
            const choices = [];
            const addBtn = (label, action) => {
                choices.push({ label, action });
                const btn = document.createElement('button');
                btn.textContent = label;
                btn.className = 'target-button';
                btn.onclick = () => { action(); hideItemTargetPanel(); };
                content.appendChild(btn);
            };

            if (item.type === ITEM_TYPES.REVIVE) {
                const dead = gameState.activeMercenaries.filter(m => !m.alive);
                if (dead.length === 0) {
                    addMessage('부활할 용병이 없습니다.', 'info');
                    return;
                }
                dead.forEach(m => {
                    addBtn(m.name, () => reviveMercenary(m));
                });
            } else if (item.type === ITEM_TYPES.POTION ||
                       item.type === ITEM_TYPES.EXP_SCROLL ||
                       item.type === ITEM_TYPES.FOOD ||
                       item.type === ITEM_TYPES.ESSENCE) {
                addBtn('플레이어', () => useItemOnTarget(item, gameState.player));
                gameState.activeMercenaries.forEach(m => {
                    addBtn(m.name, () => useItemOnTarget(item, m));
                });
            } else if (item.type === ITEM_TYPES.EGG) {
                addBtn('인큐베이터', () => placeEggInIncubator(item, item.incubation || 3));
            } else {
                addBtn('플레이어', () => equipItem(item));
                gameState.activeMercenaries.forEach(m => {
                    addBtn(m.name, () => equipItemToMercenary(item, m));
                });
            }
            const buttons = content.querySelectorAll('.target-button');
            if (buttons.length === 1) {
                buttons[0].click();
                return;
            }

            const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
            if (isTest && typeof prompt === 'function') {
                const msg = choices.map((c, i) => `${i}: ${c.label}`).join('\n');
                const res = prompt(msg);
                const idx = parseInt(res, 10);
                if (!isNaN(idx) && choices[idx]) choices[idx].action();
            } else {
                panel.style.display = 'block';
                gameState.gameRunning = false;
            }
        }

        function hideItemTargetPanel() {
            document.getElementById('item-target-panel').style.display = 'none';
            gameState.gameRunning = true;
        }

        function buyShopItem(index) {
            const item = gameState.shopItems[index];
            if (!item) return;
            const cost = item.price * SHOP_PRICE_MULTIPLIER;
            if (gameState.player.gold < cost) {
                addMessage('💸 골드가 부족합니다.', 'info');
                return;
            }
            gameState.player.gold -= cost;
            addToInventory(item);
            addMessage(`🛒 ${item.name}을(를) 구입했습니다!`, 'item');
            gameState.shopItems.splice(index, 1);
            updateStats();
            updateShopDisplay();
        }

        function startGame() {
            gameState.player.job = null;
            const allSkills = Object.keys(SKILL_DEFS);
            gameState.player.skillPoints = 0;
            allSkills.forEach(s => {
                if (!gameState.player.skills.includes(s)) {
                    gameState.player.skills.push(s);
                }
                gameState.player.skillLevels[s] = 1;
            });
            if (allSkills[0]) gameState.player.assignedSkills[1] = allSkills[0];
            if (allSkills[1]) gameState.player.assignedSkills[2] = allSkills[1];

            generateDungeon();
            const zombieMerc = convertMonsterToMercenary(createMonster('ZOMBIE', 0, 0, 1));
            zombieMerc.affinity = 195;
            zombieMerc.fullness = 50;
            gameState.standbyMercenaries.push(zombieMerc);
            for (let i = 0; i < 5; i++) {
                gameState.player.inventory.push(createItem('cookedMeal', 0, 0));
            }
            for (let i = 0; i < 5; i++) {
                gameState.player.inventory.push(createItem('smallExpScroll', 0, 0));
            }
            updateInventoryDisplay();
            updateSkillDisplay();
            updateIncubatorDisplay();
            updateMaterialsDisplay();
            updateActionButtons();
            updateStats();
        }

        // 초기화 및 입력 처리
        startGame();
        document.getElementById('save-game').onclick = saveGame;
        document.getElementById('load-game').onclick = loadGame;
        const newBtn = document.getElementById('new-game');
        if (newBtn) {
            newBtn.onclick = () => {
                if (typeof confirm !== 'function' || confirm('새 게임을 시작하시겠습니까? 진행 중인 내용이 사라집니다.')) {
                    location.reload();
                }
            };
        }
        document.getElementById('attack').onclick = meleeAttackAction;
        document.getElementById('ranged').onclick = rangedAction;
        document.getElementById('skill1').onclick = skill1Action;
        document.getElementById('skill2').onclick = skill2Action;
        document.getElementById('heal').onclick = healAction;
        document.getElementById('recall').onclick = recallMercenaries;
        document.getElementById('close-shop').onclick = hideShop;
        document.getElementById('close-mercenary-detail').onclick = hideMercenaryDetails;
        document.getElementById('close-monster-detail').onclick = hideMonsterDetails;
        document.getElementById('close-item-target').onclick = hideItemTargetPanel;
        document.getElementById('dungeon').addEventListener('click', handleDungeonClick);
        document.getElementById('pickup').onclick = pickUpAction;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                movePlayer(0, -1);
            }
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                movePlayer(0, 1);
            }
            else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                movePlayer(-1, 0);
            }
            else if (e.key === 'ArrowRight') {
                e.preventDefault();
                movePlayer(1, 0);
            }
            else if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'z') {
                e.preventDefault();
                meleeAttackAction();
            }
            else if (e.key.toLowerCase() === 'x') {
                e.preventDefault();
                skill1Action();
            }
            else if (e.key.toLowerCase() === 'c') {
                e.preventDefault();
                skill2Action();
            }
            else if (e.key.toLowerCase() === 'v') {
                e.preventDefault();
                rangedAction();
            }
            else if (e.key.toLowerCase() === 'a') {
                e.preventDefault();
                recallMercenaries();
            }
            else if (e.key.toLowerCase() === 'b') {
                e.preventDefault();
                pickUpAction();
            }
            else if (/^[1-9]$/.test(e.key)) {
                const idx = parseInt(e.key) - 1;
                if (gameState.activeMercenaries[idx]) {
                    e.preventDefault();
                    showMercenaryDetails(gameState.activeMercenaries[idx]);
                }
            }
        });
const exportsObj = {
gameState, addMessage, addToInventory, advanceIncubators, 
applyStatusEffects, assignSkill, autoMoveStep, averageDice, buildAttackDetail, 
buyShopItem, checkLevelUp, checkMercenaryLevelUp, checkMonsterLevelUp, 
convertMonsterToMercenary, craftItem, createChampion, createEliteMonster, 
createHomingProjectile, createItem, createMercenary, createMonster, 
createSuperiorMonster, createTreasure, dissectCorpse, equipItem, 
equipItemToMercenary, estimateSkillDamage, findAdjacentEmpty, findPath, 
formatItem, formatNumber, generateDungeon, generateStars, getAuraBonus, 
getDistance, getMonsterPoolForFloor, getPlayerEmoji, getStat, getStatusResist, 
handleDungeonClick, handleItemClick, handlePlayerDeath, 
hasLineOfSight, healAction, healTarget, hideItemTargetPanel, 
hideMercenaryDetails, hideMonsterDetails, hideShop, hireMercenary, killMonster, 
loadGame, meleeAttackAction, monsterAttack, movePlayer, nextFloor, 
processMercenaryTurn, processProjectiles, processTurn, purifyTarget, 
rangedAction, recallMercenaries, recruitHatchedSuperior, 
removeEggFromIncubator, renderDungeon, reviveMercenary, reviveMonsterCorpse,
rollDice, saveGame, sellItem, setMercenaryLevel, setMonsterLevel, setChampionLevel,
showChampionDetails, showItemTargetPanel, showMercenaryDetails,
showMonsterDetails, showShop, showSkillDamage, showAuraDetails, skill1Action, skill2Action,
spawnMercenaryNearPlayer, startGame, swapActiveAndStandby, tryApplyStatus,
unequipAccessory, unequipItemFromMercenary, updateActionButtons, updateCamera,
updateFogOfWar, updateIncubatorDisplay,
updateInventoryDisplay, updateMaterialsDisplay, updateMercenaryDisplay,
updateShopDisplay, updateSkillDisplay, updateStats, updateTurnEffects,
upgradeMercenarySkill, useItem, useItemOnTarget, useSkill, removeMercenary,
dismiss, sacrifice
};
Object.assign(window, exportsObj, {SKILL_DEFS, MERCENARY_SKILLS, MONSTER_SKILLS, MONSTER_SKILL_SETS, MONSTER_TRAITS, MONSTER_TRAIT_SETS, PREFIXES, SUFFIXES});

