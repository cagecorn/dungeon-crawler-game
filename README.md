# Dungeon Crawler Game

This project is a lightweight browser-based dungeon crawler. It lets players explore levels, battle enemies and gather loot directly in the browser.

## Playing

Open `index.html` in a modern web browser to start the game. The player now begins with every available skill already learned, so no class selection is required.


### Controls

- Use the arrow keys or on-screen arrows to move your character.
- Press `Z` (or `F`) or click **Attack** to strike the nearest monster.
- Number keys `1`-`9` open the details of each hired mercenary.
- Additional actions such as **Heal**, **Recall**, **Skill1** and **Skill2** are available via the action buttons. You can also use `X` for **Skill1**, `C` for **Skill2** and `V` to recall your mercenaries.

### Hiring Mercenaries

Click the buttons in the *Hire Mercenary* panel to recruit warriors, archers, healers or wizards. Each mercenary costs gold and appears near the player. You may have up to three mercenaries at a time; when full you will be prompted to replace an existing ally.

### Shop and Skill System

Spend collected gold in the shop to purchase items. Bought gear is placed in your inventory and can boost your stats when equipped. All skills are unlocked from the start and can be assigned to the **Skill1** and **Skill2** slots.

### Mercenary Skills

Each mercenary receives one random skill upon hiring. Using that skill costs the
mercenary's mana, and the skill's name and icon show up in the combat log when
activated. You can see the assigned skill and its mana cost in the mercenary's
detail panel and in the side list by their portrait. Open a mercenary's detail
panel with the corresponding number key (`1`-`9`) or by clicking their portrait
in the UI.


### Mercenary Traits

*This system has been removed.* Mercenaries no longer receive random traits or related bonuses.

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
