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
