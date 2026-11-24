# Credits

All models, textures and audio are generated at runtime in code. The only asset files are the font subsets below.

- Three.js r170 (MIT), loaded from jsDelivr.
- Font Patrick Hand by Patrick Wagesreiter (SIL Open Font License 1.1), from Google Fonts. The latin and latin-ext
  woff2 subsets are self-hosted in `assets/fonts/` (chalkboard headings and the in-world signs). Body text uses the
  system font stack.

## 3D chibi style (stil-3d, 24.11.2026)

The figures and props in `assets/3d/` were generated for this game with the Gemini app (Nano Banana image model),
from text descriptions of the characters in the game's own song video (tourist girl and the woman simit seller of
`atolye/muzik-reel/oyunlar/simit-firini/gorsel/genis.jpg`, Recraft V4.1 Pro). Each request asked for an item sheet on a
white background; the sheets were cut out and keyed locally with PIL (`atolye/oyun-stil/simit-firini/kes.py`).

| File | Tool | Content |
|---|---|---|
| `3d/chibi.webp` | Gemini (Nano Banana), 1 request (character sheet) | 3x3 sprite atlas in the scene: woman simit baker, master baker, apprentice, street seller, tourist girl, schoolboy, office worker, grandpa, woman in a headscarf |
| `3d/poz-*.webp` | same sheet | bakers, seller and tourist girl as single figures (title card, panels, end card) |
| `3d/urun-*.webp`, `firin.webp`, `tezgah.webp`, `tabla.webp`, `un.webp` | Gemini (Nano Banana), 1 request (prop sheet) | simit, poğaça, açma, çatal, pide icons; wood-fired oven and shop counter (scene cut-outs); seller's tray; flour sack |

## Cila (24.11.2026): sad poses and clay surfaces

Made with the Gemini app (Nano Banana image model), 2 requests, cut and keyed locally with PIL
(`atolye/oyun-stil/simit-firini/ham2/kes_poz.py`, `kes_doku.py`: white background flood-keyed, fringe colour replaced from the
inside, textures made seamless and normalised to multiplier maps).

| File | Tool | Content |
|---|---|---|
| `3d/uzgun.webp`, `3d/poz-uzgun.webp`, `poz-aglayan.webp`, `poz-endise.webp`, `poz-hayal.webp` | Gemini (Nano Banana), 1 request (2x2 pose sheet) | the woman simit baker of the video: sad, crying with an empty tray, worried, disappointed (burn alarm sprite, day summary, toasts, lost cards) |
| `3d/dok-cobble.webp`, `dok-roof.webp`, `dok-wall.webp`, `dok-floor.webp` | Gemini (Nano Banana), 1 request (2x2 texture sheet) | cobblestone street, terracotta roof tiles, plaster walls, wood plank floor; sampled in the world shader as clay multiplier maps |
