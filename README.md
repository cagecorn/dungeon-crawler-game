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

Mercenaries receive two random traits that grant small percentage bonuses. Trait details appear in the “📜 특성 정보” panel at the bottom of the game screen. Traits are grouped into five categories—"구력 강화형" (Ability), "상태 반응형" (Reactive), "상태 부여형" (Status), "필드 기반형" (Field) and "특수 행동형" (Special Action).

#### Ability Traits (구력 강화형)

- **철벽**: 받는 피해 10% 감소
- **맹공 돌진**: 첫 공격 피해 15% 증가
- **마력 조율자**: 마나 회복 속도 10% 증가

#### Reactive Traits (상태 반응형)

- **복수의 피**: 동료 전사 시 3턴 동안 공격력 15% 증가
- **도망자 감각**: 체력 30% 미만에서 회피율 10% 증가
- **의지의 불꽃**: 상태 이상 저항 15% 증가

#### Status Traits (상태 부여형)

- **은밀한 칼날**: 공격 시 15% 확률로 3턴 출혈

#### Field Traits (필드 기반형)

- **공허 지식자**: 마법 공격력 10% 증가
- **도발의 혼**: 적이 자신을 공격할 확률 10% 상승

#### Special Action Traits (특수 행동형)

- **구호의 손길**: 치유 효과 10% 증가
- **보물 감별사**: 보물에서 얻는 골드 15% 증가

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
