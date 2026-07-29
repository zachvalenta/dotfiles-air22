# OVERVIEW

LOCATION: `/Users/zach/Documents/zv/notes/bookcase`

## 🏗️ redesign

Notes on books I've read.

Should it be a bibliography mgmt system? Maybe.

Should everything here just be in domains | sw notes instead? Maybe.

# INDEX

## books.md

Reading lists organized by category.

└── HEADERS: STEM (dev, math, science), LIT (African, 🇺🇸 American, English, Europe, essays, half-realism, 🇯🇵 Japan, poetry, prose fiction, Russian, theatre), NON-FICTION (criticism, business, econ, games, history, music, philosophy, politics, psychology, religion, sociology, viz, writing)

```
├── STEM
│   ├── dev
│   │   └── algos, architecture, data, language, ML, networking, system
│   │   └── SEARCH: Bhargava, Skiena, nand2tetris, Kleppmann, sql, DDD
│   ├── math
│   │   └── general, school, stat, forecasting, game theory, poker
│   │   └── SEARCH: Huff, Silver, Tetlock, superforecasting, Bayes
│   └── science
│       └── medicine, genetics, IQ, biology, physics
│       └── SEARCH: Gawande, Oster, Caplan, bell curve, Mukherjee
├── LIT
│   ├── fiction by region
│   │   └── African (Ghana, Nigeria, South Africa, Sudan)
│   │   └── American (Franzen, Highsmith, McCarthy, Melville, Morrison)
│   │   └── English (Austen, Ishiguro, Maugham, Tolkien, Woolf)
│   │   └── Europe (France, Italy, Germany, Ireland, Russia)
│   │   └── Japan (Kawabata, Tanizaki, Soseki)
│   ├── essays
│   │   └── SEARCH: Didion, Montaigne, Klosterman, Hickey
│   ├── half-realism
│   │   └── SEARCH: Barthelme, Borges, Calvino, Kafka, Marquez
│   ├── poetry
│   │   └── SEARCH: Carson, Whitman, Neruda, haiku
│   └── theatre
│       └── SEARCH: Shakespeare, Sophocles, Aeschylus, Beckett
├── NON-FICTION
│   ├── criticism
│   │   └── SEARCH: Wood, Moretti, distant reading, Auerbach
│   ├── business
│   │   └── SEARCH: Lewis, lean startup, scientific mgmt
│   ├── econ
│   │   └── SEARCH: Hayek, Taleb, Cowen, progress studies, Thiel
│   ├── history
│   │   └── SEARCH: Fukuyama, Diamond, Zeihan, Fischer, Judt
│   ├── music
│   │   └── SEARCH: theory, Levine, Felts, Gioia, recording, guitar, piano
│   ├── philosophy
│   │   └── SEARCH: stoicism, Farnsworth, epistemology, aesthetics
│   ├── politics
│   │   └── SEARCH: identity, institutions, polarization, Scott
│   ├── psychology
│   │   └── SEARCH: Kahneman, Cialdini, influence, social
│   ├── religion
│   │   └── SEARCH: Buddhism, Daoism, Confucius, Bible, Koran
│   └── sociology
│       └── SEARCH: parenting, linguistics, Chinese language
```

RELATED
* `domains/humanities/philosophy.md` - philosophy notes
* `domains/art/music/musicology/` - music theory / history
* `domains/stem/math/stat.md` - statistics
* `sw/data/dbms/` - for database design ideas

## reading notes

Individual reading notes now live in per-media trees directly under `bookcase/` (the old `notes/<media>/...` layout is gone). Path: `<media>/<country>/<year-author-title>.md`.

```
├── fiction/  (~84 notes)
│   └── england, france, greece, japan, nigeria, russia, usa, za
├── movies/  (~61 notes)
│   └── france (Nouvelle Vague: Godard, Truffaut, Malle, Melville)
│   └── japan (Kurosawa, Ozu)
│   └── usa (Linklater, Coppola, Tarantino, Mann)
│   └── za
├── domains/  (~197 notes on non-fiction books)
│   └── art, cooking, humanities, stem
└── sw/  (~40 notes on software books)
    └── data, design, guts, lang, ml, work
```

## tooling

Rust CLI (replaced the old Python `cli.py` / `Makefile` / SQL setup).

* `Cargo.toml`, `src/` (`main.rs`, `app.rs`, `index.rs`, `work.rs`), `justfile`
* ER model concepts: book, author, reading, genre, location
