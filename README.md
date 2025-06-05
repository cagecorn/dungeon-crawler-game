# Dungeon Crawler Game

This project is a lightweight browser-based dungeon crawler. It lets players explore levels, battle enemies and gather loot directly in the browser.

## Playing

Open `index.html` in a modern web browser to start the game.

### Controls

- Use the arrow keys or on-screen arrows to move your character.
- Press `F` or click **Attack** to strike the nearest monster.
- Number keys `1`-`9` open the details of each hired mercenary.
- Additional actions such as **Heal**, **Recall**, **Skill1** and **Skill2** are available via the action buttons.

### Hiring Mercenaries

Click the buttons in the *Hire Mercenary* panel to recruit warriors, archers, healers or wizards. Each mercenary costs gold and appears near the player. You may have up to three mercenaries at a time; when full you will be prompted to replace an existing ally.

### Shop and Skill System

Spend collected gold in the shop to purchase items. Bought gear is placed in your inventory and can boost your stats when equipped. As you gain experience you can unlock new skills and activate them with the **Skill1** and **Skill2** buttons.

### Mercenary Skills

Each mercenary receives one random skill upon hiring. Using that skill costs the
mercenary's mana, and the skill's name and icon show up in the combat log when
activated. You can see the assigned skill and its mana cost in the mercenary's
detail panel and in the side list by their portrait. Open a mercenary's detail
panel with the corresponding number key (`1`-`9`) or by clicking their portrait
in the UI.

## Traits

Mercenaries start with two random traits. These are divided into five groups:

- **능력 강화형** – 기본 능력을 올려 주는 효과들
- **상태 반응형** – 전투 상황에 반응하여 발동
- **상태 부여형** – 적이나 아군에게 특별한 상태를 부여
- **필드 기반형** – 탐험을 돕는 특수한 능력
- **특수 행동형** – 특정 조건에서 고유 행동을 수행

Trait details can be viewed in the **특성 정보** panel below the game screen.

### Trait overview

- **철벽**: 방어력 +20%로 받는 피해가 감소합니다.
- **의지의 불꽃**: 상태 이상 중일 때 5초간 저항력 +30%.
- **마력 조율자**: 마나 회복 속도 +40%.
- **복수의 피**: 아군이 쓰러지면 3턴 동안 공격력 +40% 상승.
- **도망자 감각**: 적 수가 더 많을 때 회피율 +30%.
- **은밀한 칼날**: 공격 시 20% 확률로 출혈을 부여합니다.
- **구호의 손길**: 치유 스킬 사용 시 회복량 +25%.
- **도발의 혼**: 도발 성공 후 잠시 방어력 +10%.
- **보물 감별사**: 상자에서 희귀 아이템 발견 확률 +15%.
- **공허 지식자**: 어둠 속성 마법 피해 +20%.
- **맹공 돌진**: 전투 시작 후 첫 공격 피해 +50%.
- **집요한 사냥꾼**: 체력 50% 이하의 적에게 피해 +25%.

## Development

Install dependencies with:

```bash
npm install
```

## Testing

Run `npm install` once, then `npm test` to execute `tests/mercenaryFollow.test.js`.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Pull requests and issues are welcome. Please follow common open source etiquette when proposing changes.
