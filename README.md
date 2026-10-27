# Simit Fırını

**Play online:** https://furkiozknn.github.io/simit-firini/ (desktop and phone, no install)
![Simit Fırını gameplay: the bakery and simit sellers on the street](docs/gameplay.gif)

A 3D simit bakery tycoon on an old Istanbul street. One `index.html`, Three.js r170, no build step, no external assets.

Knead, shape, dip in molasses, roll in sesame and bake. Staff the stations, keep the oven from burning your simit, send simitçi with trays to the pier, school, park, office and tea houses, and become the most famous bakery on the street: **5,000 lira and 4 stars of reputation by day 20**, then an endless mode.

![Gameplay](docs/gameplay.png)

## How to play

- **Plan the day** (production targets, prices, ingredient orders, staff, upgrades, contracts), then press *Open the shop*.
- **Stations**: kneading, shaping, molasses, sesame, oven. An unstaffed station runs at 30 % (the owner fills in), but an unattended oven burns bread.
- **Drag a worker** onto a station or a street spot in the 3D scene, or use the Plan / side panels.
- **Simitçi** carry trays to street spots, sell by the hour, and walk back to refill. Demand follows the hour and the weather (rain empties the park and pier, cold fills the tea houses).
- Wages, rent and wood are paid at night. Go below zero and you are bankrupt.
- Recipes unlock over time: poğaça, açma, çatal, pide.

## Controls

| Input | Action |
|---|---|
| Drag / wheel / pinch | Pan / zoom |
| Click a label or station | Open its panel |
| Drag a worker | Move to station or street spot |
| `P` / `Esc` | Pause / back |
| `M`, `X`, `L`, `F` | Music, effects, language, fullscreen |
| `1` `2` `3` | Speed 1x / 2x / 4x |
| Arrows / WASD, `+` `-` | Pan, zoom |

## URL flags

`?auto` (a bot plays to the end with the same rules as a player), `?debug` (fps, draw calls, JS errors; `window.simitfiriniSim(seconds)` fast-forwards without rendering), `?sim=N`, `?low`, `?lang=en`, `?noassets` (accepted; the game uses no assets), `?seed=N`, `?speed=N`. Live state is on `window.simitfirini`.

## Balance

All recipes, prices, demand curves and upgrade costs are in the `DATA` table inside `index.html`. A sensible bot wins in roughly 9 of 12 seeds (between day 16 and 20); a careless one goes bankrupt around day 7.

## Credits

Everything (geometry, textures, music, sound effects) is generated in code. See `CREDITS.md`.

Built by Claude Sonnet 5.5 with Claude Code from one prompt: `prompts/simit-firini.md`.
