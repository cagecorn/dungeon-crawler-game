        const ITEM_TYPES = {
            WEAPON: 'weapon',
            ARMOR: 'armor',
            ACCESSORY: 'accessory',
            POTION: 'potion',
            REVIVE: 'revive',
            EXP_SCROLL: 'expScroll',
            EGG: 'egg'
        };

        const SHOP_PRICE_MULTIPLIER = 3;

        const MERCENARY_NAMES = ['Aldo', 'Borin', 'Cara', 'Dain', 'Elin', 'Faris'];

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

        };

        const SKILL_DEFS = {
            Fireball: { name: 'Fireball', icon: '🔥', damageDice: '1d10', range: 5, magic: true, element: 'fire', manaCost: 3 },
            Iceball: { name: 'Iceball', icon: '❄️', damageDice: '1d8', range: 5, magic: true, element: 'ice', manaCost: 2 },
            FireNova: { name: 'Fire Nova', icon: '🔥', damageDice: '1d6', radius: 3, magic: true, element: 'fire', manaCost: 5 },
            IceNova: { name: 'Ice Nova', icon: '❄️', damageDice: '1d6', radius: 3, magic: true, element: 'ice', manaCost: 4 },
            Heal: { name: 'Heal', icon: '💖', heal: 10, range: 2, manaCost: 3 },
            Purify: { name: 'Purify', icon: '🌀', purify: true, range: 2, manaCost: 2 },
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
            NaturalAura: { name: 'Natural Aura', icon: '🌿', passive: true, radius: 6, aura: { defense: 1, magicResist: 1 } }
        };

        // 용병 전용 스킬 정의
        const MERCENARY_SKILLS = {
            ChargeAttack: { name: 'Charge Attack', icon: '⚡', range: 2, manaCost: 2, multiplier: 1.5, dashRange: 4 },
            DoubleStrike: { name: 'Double Strike', icon: '🔪', range: 1, manaCost: 3 },
            Heal: { name: 'Heal', icon: '✨', range: 2, manaCost: 2 },
            Purify: { name: 'Purify', icon: '🌀', range: 2, manaCost: 2 },
            Fireball: { name: 'Fireball', icon: '🔥', range: 4, manaCost: 3, damageDice: '1d8', magic: true, element: 'fire' },
            Iceball: { name: 'Iceball', icon: '❄️', range: 5, manaCost: 2, damageDice: '1d8', magic: true, element: 'ice' },
            HawkEye: { name: 'Hawk Eye', icon: '🦅', range: 5, manaCost: 2 },
            RegenerationAura: { name: 'Regeneration Aura', icon: '💚', passive: true, radius: 6, aura: { healthRegen: 1 } },
            MeditationAura: { name: 'Meditation Aura', icon: '🌀', passive: true, radius: 6, aura: { manaRegen: 1 } },
            HasteAura: { name: 'Haste Aura', icon: '💨', passive: true, radius: 6, aura: { evasion: 0.05 } },
            ConcentrationAura: { name: 'Concentration Aura', icon: '🎯', passive: true, radius: 6, aura: { accuracy: 0.05 } },
            CondemnAura: { name: 'Condemn Aura', icon: '⚔️', passive: true, radius: 6, aura: { critChance: 0.05 } },
            NaturalAura: { name: 'Natural Aura', icon: '🌿', passive: true, radius: 6, aura: { defense: 1, magicResist: 1 } }
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
            shortSword: { name: 'Short Sword', output: 'shortSword', materials: { wood: 1, iron: 2 }, turns: 5 }
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

        // 게임 상태
        const MONSTER_VISION = 6;
        const FOG_RADIUS = 6; // increased player vision range
        const MERCENARY_TRIGGER_DISTANCE = 5; // player distance to trigger ally attacks
        const gameState = {
            dungeon: [],
            fogOfWar: [],
            cellElements: [],
            player: {
                x: 0,
                y: 0,
                level: 1,
                endurance: 10,
                focus: 5,
                strength: 5,
                agility: 5,
                intelligence: 0,
                baseDefense: 0,
                maxHealth: 20,
                health: 20,
                maxMana: 10,
                mana: 10,
                healthRegen: 0.3,
                manaRegen: 0.5,
                attack: 5,
                defense: 1,
                accuracy: 0.8,
                evasion: 0.1,
                critChance: 0.05,
                magicPower: 0,
                magicResist: 0,
                job: null,
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
                expNeeded: 20,
                gold: 1000,
                inventory: [],
                skillPoints: 0,
                skillLevels: {},
            skills: [],
                assignedSkills: {1: null, 2: null},
                equipped: {
                    weapon: null,
                    armor: null,
                    accessory1: null,
                    accessory2: null
                }
            },
            activeMercenaries: [],
            standbyMercenaries: [],
            get mercenaries() { return this.activeMercenaries; },
            monsters: [],
            corpses: [],
            treasures: [],
            items: [],
            projectiles: [],
            exitLocation: { x: 0, y: 0 },
            shopLocation: { x: 0, y: 0 },
            shopItems: [],
            materials: { herb: 5, wood: 3, iron: 0 },
            knownRecipes: ['healthPotion'],
            craftingQueue: [],
            floor: 1,
            dungeonSize: 80,
            viewportSize: 25,
            camera: { x: 0, y: 0 },
            autoMovePath: null,
            autoMoveActive: false,
            turn: 0,
            incubators: [null, null],
            hatchedSuperiors: [],
            gameRunning: true
        };
        window.gameState = gameState;
Object.assign(window, { ITEM_TYPES, SHOP_PRICE_MULTIPLIER, MERCENARY_NAMES, MERCENARY_TYPES, CHAMPION_TYPES, MONSTER_TYPES, ITEMS, SKILL_DEFS, MERCENARY_SKILLS, MONSTER_SKILLS, MERCENARY_SKILL_SETS, MONSTER_SKILL_SETS, MONSTER_TRAIT_SETS, RECIPES, HEAL_MANA_COST, ELEMENT_EMOJI, STATUS_NAMES, STATUS_ICONS, MONSTER_TRAITS, PREFIXES, SUFFIXES, MONSTER_VISION, FOG_RADIUS, MERCENARY_TRIGGER_DISTANCE, gameState });
export { ITEM_TYPES, SHOP_PRICE_MULTIPLIER, MERCENARY_NAMES, MERCENARY_TYPES, CHAMPION_TYPES, MONSTER_TYPES, ITEMS, SKILL_DEFS, MERCENARY_SKILLS, MONSTER_SKILLS, MERCENARY_SKILL_SETS, MONSTER_SKILL_SETS, MONSTER_TRAIT_SETS, RECIPES, HEAL_MANA_COST, ELEMENT_EMOJI, STATUS_NAMES, STATUS_ICONS, MONSTER_TRAITS, PREFIXES, SUFFIXES, MONSTER_VISION, FOG_RADIUS, MERCENARY_TRIGGER_DISTANCE, gameState };
