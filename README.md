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

### Mercenary Traits

Every hired companion also receives two random traits. Traits fall into five categories—"구력 강화형" (Ability), "상태 반응형" (Reactive), "상태 부여형" (Status), "필드 기반형" (Field) and "특수 행동형" (Special Action). You can review the effects of each trait in the bottom **특성 정보** panel.

#### Ability Traits (구력 강화형)

- **철벽**: 방어력이 크게 증가하여 받는 피해를 감소시킵니다.
- **의지의 불꽃**: 상태 이상에 걸렸을 때 저항력이 상승합니다.
- **마력 조율자**: 마나 회복 속도가 증가합니다.
- **맹공 돌진**: 전투 시작 후 첫 공격의 피해가 크게 증가합니다.
- **집요한 사냥꾼**: 상태 이상에 걸린 적에게 추가 피해를 줍니다.
- **공허 지식자**: 어둠 속성에 대한 지식으로 관련 능력이 강화됩니다.

#### Reactive Traits (상태 반응형)

- **복수의 피**: 동료가 쓰러지면 공격력이 일시적으로 증가합니다.
- **도망자 감각**: 체력이 낮을 때 회피율이 상승합니다.

#### Status Traits (상태 부여형)

- **은밀한 칼날**: 공격 시 일정 확률로 출혈 효과를 부여합니다.
- **구호의 손길**: 아군 치유 효과가 강화됩니다.
- **도발의 혼**: 적을 도발하여 자신의 방향으로 끌어들입니다.

#### Field Traits (필드 기반형)

- **보물 감별사**: 상자에서 희귀 아이템을 발견할 확률이 높아집니다.

#### Special Action Traits (특수 행동형)

This category grants unique abilities, though no such traits are currently
implemented.

## Development

Install dependencies with:

```bash
npm install
```

## Testing

Run `npm install` to install **jsdom** and other dependencies, then execute `npm test` to run the test suite.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Pull requests and issues are welcome. Please follow common open source etiquette when proposing changes.
