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

Mercenaries receive two random traits that provide various bonuses. Traits are grouped into five categories—"구력 강화형" (Ability), "상태 반응형" (Reactive), "상태 부여형" (Status), "필드 기반형" (Field) and "특수 행동형" (Special Action). Trait information is visible in the “📜 특성 정보” panel at the bottom of the game screen.

#### Ability Traits (구력 강화형)

- **철벽**: 받는 피해 20% 감소
- **돌주먹**: 공격력 +2
- **거산**: 최대 체력 +5
- **마력 조율자**: 마나 회복 속도 +0.5
- **장신**: 명중률 +0.1
- **재빠름**: 회피율 +0.1
- **오크의 피**: 공격력 +1, 체력 +3

#### Reactive Traits (상태 반응형)

현재 구현된 특성은 없습니다.

#### Status Traits (상태 부여형)

현재 구현된 특성은 없습니다.

#### Field Traits (필드 기반형)

- **재산 관리인**: 획득 골드 +20%
- **책벌레**: 경험치 획득량 +20%

#### Special Action Traits (특수 행동형)

현재 구현된 특성은 없습니다.

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
