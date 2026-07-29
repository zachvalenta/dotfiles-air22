# OVERVIEW

LOCATION: `/Users/zach/Documents/zv/notes/sw`

# INDEX

## computation/
```
computation/
├── circuits.md
│   └── TOPICS: link to "Secret Life of Circuits" book reference
├── computation.md
│   └── TOPICS: computation reading list, foundations, logic gates, information theory, memory/data primitives, firmware/hardware overview
│   └── SEARCH: Jackie Stewart, Arpaci, Bryant, Galvin, Tanenbaum, MacCormick, Kopec, Nisan, nand2tetris, Ben Eater, Gleick, Hillis, Petzold, Kleppmann, Von Neumann, zstandard, Yann Collet, snappy, lzma, brotli, gzip, DRAM, mmap, endianness, Morris worm, BIOS, UEFI, CMOS, FPGA, TPU, qubit
│   └── RELATED: domains/humanities/philosophy.md, domains/humanities/sociology.md, guts/protocols/serde.md, guts/network/http.md, design/architecture/test.md, lang/plt.md, guts/operating-systems/linux.md, guts/operating-systems/containers.md
│   └── HEADERS: 🪨 FOUNDATIONS, logic gates, information theory, compression, entropy, models, 💾 DATA, cache, register, storage, 🟨 ZA, firmware, hardware
├── foundations/
│   ├── compression.md
│   │   └── TOPICS: zstd, snappy, lzma, lossy/lossless compression, codecs as computation
│   │   └── RELATED: guts/protocols/serde.md
│   ├── entropy.md
│   │   └── TOPICS: entropy, information gain, randomness, session IDs
│   ├── information.md
│   │   └── TOPICS: information theory, signal/noise, analog vs. digital
│   ├── logic-gates.md
│   │   └── TOPICS: wires, gates, relays, transistors, NOT/AND/OR
│   ├── number-representation.md
│   │   └── TOPICS: bits, words, bit masks, bit fields, byte order, endianness
│   └── what-is-computation.md
│       └── TOPICS: computation thesis, mechanical sympathy, substrate-to-symbol framing, lambda-free foundations
├── hardware/
│   ├── accelerators.md
│   │   └── TOPICS: FPGA, TPU, NPU, hardware acceleration, quantum computing
│   ├── chips.md
│   │   └── TOPICS: silicon, wafers, semiconductors, chip/foundry/fabless concepts
│   ├── firmware.md
│   │   └── TOPICS: BIOS, UEFI, boot chain, CMOS
│   ├── history.md
│   │   └── TOPICS: computing history timeline, Babbage to microcomputers
│   ├── manufacturing.md
│   │   └── TOPICS: ASML, TSMC, Intel, geopolitics, scaling, process constraints
│   └── pcbs-and-signals.md
│       └── TOPICS: PCB traces, high-speed signals, physical layout
├── learning-paths.md
│   └── TOPICS: tiny8, nand2tetris, CS from scratch, Ben Eater, build-from-first-principles courses
├── memory/
│   ├── cache.md
│   │   └── TOPICS: L1/L2/L3 cache, locality, CPU-cache-friendly programming
│   ├── ram.md
│   │   └── TOPICS: RAM, DRAM, addresses, memory controllers, swap
│   ├── registers.md
│   │   └── TOPICS: registers vs. memory/cache, width, latency
│   ├── storage.md
│   │   └── TOPICS: disks, SSDs, HDDs, blocks, sectors, content-addressed storage
│   ├── virtual-memory.md
│   │   └── TOPICS: pages, page tables, page faults, swap area
│   └── zero-copy.md
│       └── TOPICS: mmap, Arrow/DuckDB, avoiding data movement
├── models/
│   ├── lambda-calculus.md
│   │   └── TOPICS: lambda calculus
│   ├── proof-assistants.md
│   │   └── TOPICS: Lean proof assistant, formal lower-bound proofs for schedulers
│   │   └── SEARCH: EpicVogel, load engine capacity, deductive vs. empirical proofs
│   │   └── RELATED: computation/processors/vliw.md
│   ├── sat.md
│   │   └── TOPICS: SAT solvers, CNF, boolean satisfiability, config/dependency validation
│   │   └── SEARCH: DPLL, CDCL, WalkSAT, Glucose3, pysat, clause, disjunction, conjunction
│   ├── state-machines.md
│   │   └── TOPICS: FSMs, DFAs, statecharts, state machine replication
│   │   └── SEARCH: xstate, statelyai, arpitbhayani, DFA
│   │   └── RELATED: design/system/distributed.md
│   └── turing-machines.md
│       └── TOPICS: Turing completeness, halting problem, stack/register machines, Von Neumann model
│       └── SEARCH: incompleteness theorem, busy beavers, congress-is-a-vm
└── processors/
    ├── alu.md
    │   └── TOPICS: ALU, opcode, data path width
    ├── cpu.md
    │   └── TOPICS: processor/core fundamentals, chip manufacturing, materials, computing timeline
    │   └── SEARCH: hyperthreading, NPU, Apple silicon, ARM64, x86, fabless, foundry, TSMC, Samsung, GlobalFoundries, Morris Chang, HDL, vacuum tubes, wafer, semiconductor, Babbage, Hollerith, Colossus, ENIAC, Altair 8080, danluu, Byrne Hobart
    │   └── RELATED: guts/operating-systems/linux.md
    │   └── HEADERS: operations, manufacturing, materials, timeline
    ├── gpu.md
    │   └── TOPICS: GPU architecture, CUDA programming, GPU vs. CPU/TPU
    │   └── SEARCH: CUDA, shaders, Blackwell, taichi, embarrassingly parallel, ByteByteGo
    │   └── HEADERS: TPU
    ├── isa.md
    │   └── TOPICS: instruction set architecture, ARM64 vs. x86, RISC-V
    │   └── SEARCH: Bryant, hackers and painters, drewdevault, danluu, Butler Lampson
    ├── simd.md
    │   └── TOPICS: SIMD vector operations, use cases, language/library support
    │   └── SEARCH: BLAS, LAPACK, pocketfft, V8, JavaScriptCore, quickwit, turbopuffer
    │   └── RELATED: guts/operating-systems/threads.md
    └── vliw.md
        └── TOPICS: VLIW architecture, compiler-driven instruction scheduling, kernel scheduling optimization
        └── SEARCH: EpicVogel, DSP, Qualcomm Hexagon, list scheduler, DAG scheduling, NP-hard, path-bits scheduling
        └── RELATED: computation/models/proof-assistants.md, dsa/algos.md
```

## data/
```
├── #meta.md
│   └── TOPICS: data modeling, relational design, normalization, schema taxonomy, backup/replication, ERD tooling
│   └── SEARCH: EAV, star schema, three-schema approach, ontology, Codd, denormalization, CMU Pavlo, Stonebraker, PITR, WAL, logical replication, pgdog, Vitess, Dolt, DVC, d2, drawSQL, dbdocs, GraphViz
│   └── RELATED: analytics/warehouse.md, transactions/sql.md, dbms/postgres.md, dbms/distributed.md
│   └── HEADERS: ⭕️ FACTORS, access, density, EAV, width, taxonomy, 🛰️ INGRESS, OLTP, OLAP, 🔑 INTEGRITY, backup, replicate, partitioning, version control, 🕸️ RELATIONAL, Codd, 1-1, M-1, 1-M, M-M, name spaces, normalization, 🖼️ REPR, ERD (d2), UML
├── analytics/
│   ├── BI.md
│   │   └── TOPICS: BI platforms, dashboards, charting/notebook tools, presentation libraries
│   │   └── SEARCH: Datasette, Metabase, Hex, Briefer, Superset, Preset, Redash, Streamlit, PyGWalker, Evidence, Vega-Altair, Bokeh, Great Tables, Holoviz, xan, termgraph
│   │   └── RELATED: analytics/charting.md, analytics/eda.md, analytics/stat.md
│   │   └── HEADERS: ⛽️ PLATFORMS, 📼 Datasette, 💄 Great Tables, Holoviz, 🪶 Superset, 🥗 GUI, 🎁 datawrapper, 🟩 Great Tables, 🦋 matplotlib, 9️⃣ plotnine, 💶 TradingView
│   ├── charting.md
│   │   └── TOPICS: terminal & Python charting libraries, chart type taxonomy
│   │   └── SEARCH: asciigraph, termgraph, xan, plotext, YouPlot, uPlot, plotille, bashplotlib, gnuplot, incplot, sparkline, ridgeline, Sankey
│   │   └── RELATED: analytics/BI.md, analytics/stat.md
│   │   └── HEADERS: 📊 TYPES, 🛠️ TOOLS, asciigraph, fastplotlib, incplot, ⭐️ plodder, plotext, plotille, rich, termgraph, uniplot, xan, youplot, 🟧 ZA, semantics
│   ├── data-eng.md
│   │   └── TOPICS: data engineering architecture, job-market notes, query engine vs. warehouse, metadata/catalog tools
│   │   └── SEARCH: BemiDB, Iceberg, Parquet, DuckDB, Datahub, Amundsen, Atlas, Marquez, OpenLineage, entity resolution, Zingg, lakehouse
│   │   └── RELATED: analytics/lake.md, analytics/warehouse.md, analytics/query-engines.md, analytics/pipelines.md
│   │   └── HEADERS: 🟨 ZA, metadata (Datahub)
│   ├── dataframes.md
│   │   └── TOPICS: dataframe APIs, Pandas vs Polars, Ibis/Narwhals interop layers
│   │   └── SEARCH: Ibis, Narwhals, Wes McKinney, dtale, Buckaroo, Data Wrangler, LazyFrame, predicate pushdown, schema_overrides, smart_join
│   │   └── RELATED: analytics/eda.md, dbms/duckdb.md
│   │   └── HEADERS: ⚙️ DESIGN, 🦢 Ibis, 🐋 Narwhals, 🖥️ TLV, 🐼 PANDAS, DML, IO, 🐻‍❄️ POLARS, read, EDA, joins, predicates, select, write
│   ├── eda.md
│   │   └── TOPICS: exploratory data analysis tooling, SQL-over-files CLIs, spreadsheet tooling
│   │   └── SEARCH: Visidata, Harlequin, TablePlus, DBeaver, DbGate, Rainfrog, Ultorg, OctoSQL, dsq, xan, xsv, miller, fkfind, dataclerk, nocodb, Airtable, IronCalc
│   │   └── RELATED: analytics/dataframes.md, dbms/sqlite.md, transactions/sql.md
│   │   └── HEADERS: 💻 GUI, sabiql, Harlequin, TablePlus, Ultorg, 🟦 VISIDATA, ⭐️ config, ⭐️ Mongo loader, attr, DML, records, sheets, 🔍 SQL OVER FILES, 🐙 OctoSQL, 🍞 miller, 🟨 ZA, EDA (WTFK), entry (dataclerk), spreadsheet (Excel), 💊 xan, ❎ xsv
│   ├── lake.md
│   │   └── TOPICS: data lakehouse architectures, table formats, object storage
│   │   └── SEARCH: DuckLake, pg_lake, Iceberg, Delta Lake, Hudi, Hadoop, HDFS, MapReduce, data mesh, HCatalog, Netflix
│   │   └── RELATED: analytics/warehouse.md, analytics/data-eng.md, dbms/duckdb.md
│   │   └── HEADERS: 🦆 DuckLake, pg lake, Hadoop, Hudi, 🧊 Iceberg, mesh
│   ├── pipelines.md
│   │   └── TOPICS: ETL/ELT pipelines, orchestration, entity resolution, dbt fundamentals, distributed execution engines
│   │   └── SEARCH: Zingg, Great Expectations, Pandera, dataframely, Catalyst optimizer, shuffle, broadcast join, dbt ref/source, materialization, Airbyte, Prefect, Dagster, bruin, DLT
│   │   └── RELATED: analytics/data-eng.md, analytics/streaming.md, transactions/sql.md
│   │   └── HEADERS: 🔢 STEPS, entity resolution, clean, test, 🏎️ EXECUTION ENGINES, burla, Dask, ✰ Spark, vector, 🐠 DBT, basics, rf
│   ├── query-engines.md
│   │   └── TOPICS: SQL query execution engines, warehouse vs. query engine distinction
│   │   └── SEARCH: CrateDB, DataFusion, Presto, Trino, BigQuery, Hydra
│   │   └── RELATED: analytics/data-eng.md, analytics/warehouse.md, dbms/postgres.md
│   │   └── HEADERS: ☢️ DataFusion, Graft, ⦊ Presto, 🐰 Trino
│   ├── stat.md
│   │   └── TOPICS: statistics, probability theory, sampling/experiment design, outlier detection
│   │   └── SEARCH: p-value, Berkson's paradox, Simpson's paradox, McNamara fallacy, Bayes, Markov chains, Monte Carlo, MCTS, RCT, Fermi estimation, selection bias, PCA, factor analysis, winsorizing, clipping
│   │   └── RELATED: analytics/BI.md, analytics/charting.md, analytics/eda.md
│   │   └── HEADERS: ⚖️ FACETS, cardinality, distribution, location, spread / outlier detection, standard deviation, 🎰 PROBABILITY, 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Bayes, 🇷🇺 Markov chains, 🇵🇱 Monte Carlo, 🧪 SAMPLING, trials, simulation, 🟨️ ZA, techniques, regression
│   ├── streaming.md
│   │   └── TOPICS: real-time/event stream processing, Kafka ecosystem, CDC architectures
│   │   └── SEARCH: Kafka, Flink, Faust, ksqlDB, NATS, Pulsar, iggy, walrus, CDC, pgflo, SQL Flow, Tributary, WarpStream
│   │   └── RELATED: analytics/pipelines.md, dbms/postgres.md, transactions/nosql.md
│   │   └── HEADERS: 🛰️ MODEL, event time, ordering, replay, durability, 🧮 PROCESSING, windows, joins, state, watermarks, exactly once, backpressure, 🧰 SYSTEMS, Flink, Faust, streams, 🐙 Kafka, Kinesis, Beam, Spark, 🧱 ARCHITECTURES, CDC, stream SQL, realtime dashboards, 🟨 ZA, old notes
│   ├── warehouse.md
│   │   └── TOPICS: data warehouse design, star/snowflake schema, OLAP dbms options
│   │   └── SEARCH: fact table, dimension table, star schema, snowflake schema, Delta Lake, Photon, Unity Catalog, Clickhouse, chDB, Databricks, Snowflake, Bauplan, Bemi
│   │   └── RELATED: dbms/duckdb.md, analytics/lake.md, analytics/query-engines.md, #meta.md
│   │   └── HEADERS: 🔲 DESIGN, facts and dimensions, schema, ⬜️ OPTIONS, Bauplan, Bemi, Crunchy, 🌕 Clickhouse, 🧱 Databricks, Materialize, ❄️ Snowflake, 🟨 ZA
├── dbms/
│   ├── distributed.md
│   │   └── TOPICS: distributed/scale-out DBMS, sharding middleware
│   │   └── SEARCH: CockroachDB, Spanner, PlanetScale, Vitess, Multigres, TigerBeetle, VSR, rqlite, toydb
│   │   └── RELATED: #meta.md, dbms/postgres.md
│   │   └── HEADERS: 🪳 CockroachDB, 🌐 PlanetScale, 🐯 TigerBeetle
│   ├── duckdb.md
│   │   └── TOPICS: DuckDB embedded OLAP engine, CLI/config/loading
│   │   └── SEARCH: .duckdbrc, pg_duckdb, Arrow, MotherDuck, friendlier SQL, BigFrame, Postgres scanner, binary transfer mode
│   │   └── RELATED: analytics/warehouse.md, analytics/lake.md, dbms/postgres.md
│   │   └── HEADERS: 🟨 ZA, config, CLI, design, internals, lib, load
│   ├── postgres.md
│   │   └── TOPICS: Postgres tooling, operations, extensions, hosting options
│   │   └── SEARCH: pgbouncer, Citus, pgrx, ParadeDB, pgvector, Xata, Neon, psycopg2, pgcli, litecli favorites, WAL, wire protocol, replication slots
│   │   └── RELATED: dbms/distributed.md, dbms/duckdb.md, internals/engines.md, internals/indexing.md, dbms/sqlite.md
│   │   └── HEADERS: 🪭 DESIGN, extensions, internals, psycopg, connection pooler, auth, ✂️ TOOLING, CLI, 🔵 psql, 💿 dbcli, 🟠 pgcli, 🔴 GUI (Mathesar), 🏡 HOSTED, ✳️ Neon, 🦋 Xata, MySQL, Oracle, 🟨 ZA
│   ├── sqlite.md
│   │   └── TOPICS: SQLite tooling, embedded database design/limitations
│   │   └── SEARCH: litecli, sqlite-utils, turso/limbo, libsql, litestream, STRICT tables, manifest typing, FTS4, sqlean, WAL
│   │   └── RELATED: dbms/postgres.md, dbms/distributed.md, internals/engines.md
│   │   └── HEADERS: ✂️ TOOLING, CLI, 🟠 litecli, ⚛️ sqlite-utils, 🪭 DESIGN, typing, constaints, 🩱 turso, 💧 litestream, 🟨 ZA, usage, extensions
├── internals/
│   ├── byo.md
│   │   └── TOPICS: build-your-own database tutorials, FoundationDB layered architecture
│   │   └── SEARCH: FoundationDB, layers concept, CMU Pavlo, py-caskdb, gosql, toydb, deterministic simulation testing
│   │   └── RELATED: internals/engines.md, dbms/distributed.md
│   │   └── HEADERS: BYO, 🦠 FoundationDB, async
│   ├── engines.md
│   │   └── TOPICS: DBMS internals, query optimizer, storage/WAL, maintenance operations
│   │   └── SEARCH: query planner, selection pushdown, plan flip, pg_stat_plans, buffer manager, WAL, checkpoint, MVCC, transaction wraparound, OrioleDB, InnoDB, WiredTiger, connection pooling
│   │   └── RELATED: internals/indexing.md, dbms/postgres.md, internals/byo.md
│   │   └── HEADERS: 🏎️ ENGINES, query, storage, logging / WAL, perf, 🛠️ MAINTENANCE, vacuuming, analyze, reindexing, checkpoint, 🟨 ZA, connections
│   ├── indexing.md
│   │   └── TOPICS: database indexes, access paths, B-tree/LSM data structures
│   │   └── SEARCH: BRIN, covering index, partial index, multicolumn index, HNSW, SSTable, LSM tree, vacuum, autovacuum, bitmap index, hash index
│   │   └── RELATED: internals/engines.md, dbms/postgres.md
│   │   └── HEADERS: basics, usage, types, 🗼 DATA STRUCTURES, b tree, bitmap, hash
├── transactions/
│   ├── graph.md
│   │   └── TOPICS: graph databases, hierarchical data modeling in relational stores
│   │   └── SEARCH: Apache AGE, SQL/PGQ, Cypher, GQL, Memgraph, EdgeDB, adjacency list, closure table, materialized path, cozo, JanusGraph, Neo4j
│   │   └── RELATED: transactions/nosql.md, transactions/sql.md, #meta.md
│   │   └── HEADERS: graph (), IN CORKBOARD / USING RELATIONAL, hierarchical, Relational model, Non-relational options, Ladybug, Neo4J, query languages, 🟨 ZA
│   ├── nosql.md
│   │   └── TOPICS: MongoDB CRUD/aggregation, NoSQL data model taxonomy (KV/column/document/time-series)
│   │   └── SEARCH: PyMongo, Beanie, mongosh, Compass, DbGate, sharding, replica set, Cassandra, BigTable, HBase, FerretDB, DocumentDB, TinyDB, PoloDB, Timescale, hypertable, RocksDB, sled
│   │   └── RELATED: transactions/graph.md, dbms/distributed.md, transactions/sql.md
│   │   └── HEADERS: 🟩 MONGO, find, aggregation, admin, UI, existing, shell, fix, 🗺️ NON, column store (Cassandra), document (DocumentDB), key, ⌚️ time series (Timescale), obj store
│   ├── orm.md
│   │   └── TOPICS: ORMs, query builders, SQLAlchemy internals, N+1 query problem
│   │   └── SEARCH: impedance mismatch, active record, data mapper, pypika, sqlc, Drizzle, SQLx, Diesel, Peewee, SQLModel, Piccolo, select_related, prefetch_related, backref
│   │   └── RELATED: transactions/sql.md, dbms/postgres.md
│   │   └── HEADERS: DESIGN, code gen, query builders, drizzle / no-ORM, 🟥 SQLAlchemy, alternatives, snippets, backrefs, ⚖️ N + 1, problem, join, eager batch
│   ├── sql.md
│   │   └── TOPICS: SQL DML/DDL, joins, keys, schema design, migrations, window functions
│   │   └── SEARCH: PRQL, Malloy, preql, Trilogy, Zillion, CTE, window functions, Flyway, pgroll, sqldef, atlasgo, non-equi join, cross join, composite key, surrogate key, schema-on-read
│   │   └── RELATED: transactions/orm.md, #meta.md, transactions/nosql.md, internals/indexing.md
│   │   └── HEADERS: 🧫 DESIGN, replacements, standards, 🚜 DML, distinct, execution order, functions, JSON, predicates, select, subqueries, 🐧 GROUPING, group by, partition by, window functions, 🧩 JOINS, IO/LR, self/cross/natural, 🔑 KEYS, primary (PK), foreign (FK), 🗺️ SCHEMA (DDL), approaches, constraints, migrations, typing, 🪵 TABLES, CTE, views, 🟨️ ZA, commands, style
```

## design/
```
├── architecture/
│   ├── #meta.md
│   │   └── TOPICS: architecture taxonomy, clarity/simplicity principles, resource efficiency, audit-trail docs
│   │   └── SEARCH: grugbrain, YAGNI, worse is better, boring technology, tach, copy-on-write, LRU, memoization, RFC, ADR
│   │   └── RELATED: system/#meta.md, architecture/design-patterns.md, system/caches.md
│   │   └── HEADERS: ⭕️ FACTORS, clarity, maintainable, modular (tach), 🔬 RESOURCE EFFICIENCY, copy on write, caching, lazy evaluation, memoization, pooling, 🏮 AUDIT TRAIL, ADR, changelog / release notes, readme, RFC, 🟨 ZA, scaffold / checklist, structure
│   ├── code.md
│   │   └── TOPICS: coding style spectrum, functional vs OOP, design principles, refactoring vocabulary
│   │   └── SEARCH: Lopes exercises in programming style, code golf, Hickey, y combinator, curry, monad, Liskov, Law of Demeter, Hollywood principle, Pluggy, Fowler refactoring, tidy first, Hungarian notation
│   │   └── RELATED: architecture/#meta.md, architecture/design-patterns.md, architecture/domain.md
│   │   └── HEADERS: 🖲️ STYLE, Hickey / Lisp / data-driven, functional, object-oriented, method chaining, ⠎ PATTERNS, composition, coupling / cohesion, dependency injection (DI), IoC, plugins, SOLID, 🏗️ REFACTORING, extract, inline, 🟨 ZA, comments
│   ├── design-patterns.md
│   │   └── TOPICS: GoF design pattern catalog with Python examples
│   │   └── SEARCH: strangler fig, entity component, Gamma design patterns, Conery, flyweight, mediator, template method, visitor, bridge, facade, composite, proxy
│   │   └── RELATED: architecture/code.md, architecture/domain.md
│   │   └── HEADERS: 🏭 CREATIONAL, ✅ factory, ✅ builder, singleton, 🦠 STRUCTURAL, adapter (interface), 📍 decorator, 🔍 BEHAVIORAL, command, observer, iterator, 📍 strategy, 🟨 ZA, CRUD-ers
│   ├── domain.md
│   │   └── TOPICS: domain-driven design layering, DDD tactical/strategic patterns, Evans notes
│   │   └── SEARCH: CQRS, bounded context, ubiquitous language, aggregate, repository pattern, data mapper, active record, event storming, betradar basketball rf
│   │   └── RELATED: architecture/design-patterns.md, backend/django.md, system/patterns.md
│   │   └── HEADERS: 🗺️ STRATEGIC (domain), bounded context, ubiquitous language, DSLs, invariants / rule encapsulation, unit of work, 🛠️ TACTICAL, obj (entity), services, data mapper, repo, 🏗️ IMPL, rf, 🟧 Kero, Evans, Percival, Django
│   ├── profiling.md
│   │   └── TOPICS: profiling and benchmarking tools for Python and Linux
│   │   └── SEARCH: hyperfine, timeit, pyinstrument, py-spy, memray, cProfile, line profiler, austin, pyroscope, flamegraph, sampling profiler, tracemalloc
│   │   └── RELATED: system/telemetry.md, lang/python/stdlib.md
│   │   └── HEADERS: benchmark, timeit, start here, options (memray), types
│   └── test.md
│       └── TOPICS: testing taxonomy, TDD/BDD, formal methods, fuzzing/property testing, test doubles
│       └── SEARCH: MCDC coverage, hypothesis, mutmut, TLA+, Lean, Z3, SAT, VCR/cassette, testcontainers, golden file, insta snapshot, Locust load testing
│       └── RELATED: system/#meta.md, architecture/#meta.md, system/distributed.md
│       └── HEADERS: 🕋 DESIGN, taxonomy, TDD, BDD, 🔬 FORMAL METHODS, constraint modeling, model checking (TLA+ | Lean), theorem proving, 👾 GENERATIVE, fuzz, mutation, property, 🕳️ INTEGRATION, API, load, TUI, browser, db, 🔣 IO, doubles, factories | fixtures, golden file, snapshot
├── backend/
│   ├── api.md
│   │   └── TOPICS: API design styles (REST/GraphQL/RPC), schema/contract tooling, pagination/rate-limiting
│   │   └── SEARCH: HATEOAS, Fielding, idempotency, JSON:API, OpenAPI/Swagger, apistar, token bucket, leaky bucket, jitter, slug
│   │   └── RELATED: backend/django.md, backend/flask.md, system/distributed.md
│   │   └── HEADERS: 🏮 DESIGN, GraphQL, REST, RPC, 📰 SCHEMA, contract testing, JSON:API, JSON Schema, OPEN API, 🟨 ZA, pagination, rate limiting, slugs, versioning
│   ├── django.md
│   │   └── TOPICS: Django reference - REST framework, ORM, auth, deployment, task queues
│   │   └── SEARCH: DRF, F expressions, QuerySet laziness, AbstractUser, allauth, Django Q2, Procrastinate, MVT, htmx, django-ninja, channels, unfold admin
│   │   └── RELATED: backend/api.md, architecture/domain.md, system/queues.md, ux/frontend.md
│   │   └── HEADERS: 🛰️ API, Django Bolt, DRF, middleware, serialization, URLs, views, 🔑 AUTH, users, permissions, default, custom, magic links, registration-redux, allauth, ⚙️ CONFIG, deployment, denv, project structure, security, settings, static files, 🍱 DB, admin, DDL, managed, meta, DML, migrations, 💳 LIBS, code quality, debug, money, need for prod, real-time (channels), tasks, TUI, 🟨 ZA, design, governance, templates, signals, testing
│   ├── fast-api.md
│   │   └── TOPICS: FastAPI framework notes, debugging, Rust-inspired backends
│   │   └── SEARCH: SGI/server gateway interface, fastapi-radar, cbfa
│   │   └── RELATED: lang/python/stdlib.md
│   └── flask.md
│       └── TOPICS: Flask project structure evolution, extensions, deployment
│       └── SEARCH: app factory, blueprint, Grinberg mega tutorial, Werkzeug, WSGI, flask-login, JWT, flash messaging, request context
│       └── RELATED: backend/django.md, backend/api.md, system/middleware.md
│       └── HEADERS: STRUCTURE, blog, 🌱 single module, 🌿 n modules, 🍀 pkg, 🗣 Ray, 🗣 Grinberg, sink, auth, config, context, dev server, Flask SQLAlchemy, libs, REST, routing, templates, testing
├── system/
│   ├── #meta.md
│   │   └── TOPICS: system design taxonomy, availability/scalability factors, diagramming tools
│   │   └── SEARCH: CAP theorem factors, Little's Law, fault domain, service mesh, d2, mermaid, C4, Structurizr, Excalidraw
│   │   └── RELATED: architecture/#meta.md, system/distributed.md, system/progression.md
│   │   └── HEADERS: ⭕️ FACTORS, bound / constraints, elements, available, observable, reliable, scalable, 🖼️ VIZ, 🔵 d2, mermaid, entities, system, whiteboard / mind map
│   ├── aws.md
│   │   └── TOPICS: AWS service reference - compute, network, storage, IAM, certification
│   │   └── SEARCH: ECS/Fargate/EKS, spot instance, Lambda cold start, VPC/NACL, jump box/bastion, RDS/Aurora, S3 clonefiles, IAM least privilege, CDK/CloudFormation, MSK/Kinesis
│   │   └── RELATED: system/cloud.md, system/infra.md, system/queues.md
│   │   └── HEADERS: 🤖 COMPUTE, containers, EC2, Lambda, 🕸️ NETWORK, Route53, VPC, DMZ, 🧳️ STORAGE, RDS, S3, 🟨 ZA, certification, IaC, IAM, interfaces, messaging, telemetry
│   ├── caches.md
│   │   └── TOPICS: caching layer options - diskcache, memcached, Redis
│   │   └── SEARCH: moka-py, distributed hash table, Valkey, Dragonfly, redb, Redka, TTL hell, key expiration
│   │   └── RELATED: system/distributed.md, architecture/#meta.md
│   │   └── HEADERS: diskcache / moke, memcached, Redis
│   ├── cloud.md
│   │   └── TOPICS: non-AWS cloud/hosting options - static, PaaS, FaaS, agent sandboxes
│   │   └── SEARCH: Github Pages CNAME setup, Val Town, sprites.dev Firecracker, exe.dev, Cloud Foundry Diego/DEA, fly.io, Railway, GCP IAM, nitric IfC
│   │   └── RELATED: system/aws.md, system/infra.md
│   │   └── HEADERS: 🗿 STATIC, Amazon, Github Pages, sourcehut, 🧮 FUNC, Python Anywhere, Val Town, 👾 AGENTS, Cloudflare, exe.dev, modal, sprites.dev, TigerFS, 🚢 PaaS, coolify, OpenCloud, Supabase, 🌃 FULL, CF, fly.io, railway, 🌈 GCP, 🤯 DIFF, platform.sh, pico, ⭐️ SST, ⭐️ nitric
│   ├── deployment.md
│   │   └── TOPICS: IaC tools, CICD strategies, env/secrets management
│   │   └── SEARCH: Ansible playbook/inventory, Terraform state/provider, GitOps, blue-green/canary/dark launch, 12-factor config, dotenvx, sops, feature flag tooling (flipt/unleash)
│   │   └── RELATED: system/cloud.md, system/aws.md, system/#meta.md
│   │   └── HEADERS: 🧮 IaC, Ansible, Copilot, deptool, pulumi, Sake, Terraform, 🟨 ZA, CICD, env var (12 factor), denv, feature flag, secrets (dotenvx)
│   ├── distributed.md
│   │   └── TOPICS: distributed systems fundamentals - consensus, transactions, consistency, caching
│   │   └── SEARCH: Byzantine generals, Lamport clock, CRDT, Raft/Paxos/VSR, MVCC, serializability, CAP/PACELC, dirty read, LRU/LFU eviction, cache stampede, Zookeeper znode
│   │   └── RELATED: system/#meta.md, system/caches.md, system/queues.md
│   │   └── HEADERS: 🤝 CONSENSUS, CRDT, Paxos, Raft, VSR, 🏦 TRANSACTIONS, ACID, CAP theorem, consistency, locks, retry, 🟨 ZA, blockchain, caching / perf, service discovery
│   ├── infra.md
│   │   └── TOPICS: self-hosting / stack-native infra, cost control, VPN mesh
│   │   └── SEARCH: Hetzner, Kamal, Dokku, Piku, stack-native vs cloud-native, FinOps FOCUS, IaaS taxonomy, Tailscale/headscale
│   │   └── RELATED: system/cloud.md, system/aws.md, system/deployment.md
│   │   └── HEADERS: 🏡 SELF HOST, stack native, Dokploy, Dokku, Kamal, Miren, oxide, Piku, Ubicloud, 🟨 ZA, cost control, IaaS / hosting, 🐳 Tailscale
│   ├── middleware.md
│   │   └── TOPICS: reverse proxies, load balancing, web/app servers
│   │   └── SEARCH: HAProxy, ALB/NLB, uWSGI, Gunicorn workers, Granian, Nginx upstream/directive, Caddy modules
│   │   └── RELATED: backend/flask.md, backend/django.md, system/infra.md
│   │   └── HEADERS: 📟️ PROXY, CDN, load balancing, 🔋 WEB SERVERS, Caddy, Ferron, Granian, Gunicorn, Nginx
│   ├── patterns.md
│   │   └── TOPICS: system-level architecture patterns - serverless, event-driven, monolith vs microservices
│   │   └── SEARCH: baked data/flat data, PostgREST, JAMstack, CQRS, event sourcing, event storming, distributed monolith, vertical vs horizontal scaling
│   │   └── RELATED: architecture/domain.md, system/distributed.md, system/queues.md
│   │   └── HEADERS: ➖ SERVERLESS, baked data, baked db, no code, no backend, jamstack, 🟨 ZA, event-driven, event sourcing / CQRS / pub sub, microservices, monolith
│   ├── progression.md
│   │   └── TOPICS: taxonomized progression of infra shapes from local to hyperscale
│   │   └── SEARCH: decomposition pressure, stack-native, PaaS/FaaS/hyperscaler grid, Compose vs local K8s, modular monolith, event backbone
│   │   └── RELATED: system/infra.md, system/cloud.md, system/aws.md
│   │   └── HEADERS: 2️⃣ REWRITE, semantics, max composed, external db, external static/media delivery, separate frontend, async work, read acceleration, analytical storage, differentiated users, functional partitioning, event backbone, 1️⃣ FIRST DRAFT, LOCAL, STACK NATIVE, PaaS, FaaS, HYPERSCALER, 🟨 ZA
│   ├── queues.md
│   │   └── TOPICS: message queues, task runners, cron scheduling, AMQP brokers
│   │   └── SEARCH: Kafka vs RabbitMQ, ARQ/Celery/Huey, pgmq, AMQP, deadletter queue, fanout exchange, cron/anacron, task queue vs workflow engine
│   │   └── RELATED: system/aws.md, system/distributed.md, backend/django.md
│   │   └── HEADERS: 🪼 QUEUES, cron, task (DJT, Celery, ARQ), 📮 MSG, Mosquitto, Rabbit, pgmq
│   ├── telemetry.md
│   │   └── TOPICS: observability - metrics, tracing, logging, monitoring platforms
│   │   └── SEARCH: MTTD/MTTR, p99 latency, RPS/QPS, ddtrace, OpenTelemetry, Prometheus/Grafana/Loki, Sentry filters, eBPF flamegraph, structured logging (loguru/structlog), healthcheck/uptime services
│   │   └── RELATED: architecture/profiling.md, system/distributed.md, system/middleware.md
│   │   └── HEADERS: 📊 METRICS, bandwidth, latency, throughput, perf, load parameters, ⭕️ factors, 🩻 MONITORING, Beszel, 🐶 Datadog, Grafana, 🪨 Graphite, Honeycomb, Honey Badger, HyperDX, ⭐️ App Signal, 🔥 Logfire, OpenTelemetry, Prometheus, 🟪 Sentry, Side Eye, 🟧 Signoz, 🔬 TRACING, bpf, 🟨 ZA, customer analytics, incidents, logging, uptime / healthcheck / heartbeat
│   └── workflow.md
│       └── TOPICS: workflow orchestration engines and durable execution
│       └── SEARCH: Airflow DAG/XCom/catchup, Dagster, Prefect, Temporal durable execution, Hatchet
│       └── RELATED: system/queues.md, system/distributed.md
│       └── HEADERS: 🏎️ ENGINES, Airflow, Prefect, ex: payment run, ex: artist fanout, 🚁 DURABLE EXECUTION, Temporal, 🟨 ZA
└── ux/
    ├── css.md
    │   └── TOPICS: CSS layout, selectors, minimal CSS frameworks
    │   └── SEARCH: Flexbox/grid, BEM, water.css, pico.css, Tailwind, DaisyUI, custom properties
    │   └── RELATED: ux/frontend.md, ux/html.md
    │   └── HEADERS: canvas, layout, selectors, FRAMEWORKS, pico, Tailwind
    ├── frontend.md
    │   └── TOPICS: frontend framework landscape - hypermedia vs SPA
    │   └── SEARCH: htmx/Datastar, Alpine.js, LiveView/pyview, React vs Svelte, Vue, SPA tradeoffs, progressive enhancement, hydration
    │   └── RELATED: ux/css.md, backend/django.md, backend/flask.md
    │   └── HEADERS: 🪀 INTERACTIVE, 🐟 alpine, 🪷 jQuery, 🛜 HYPERMEDIA, 🌌 Datastar, 🟦 htmx, 🎮 LiveView, 🛁 SPA, ☢️ React, 🟩 Vue, 🟨 ZA, design, state
    ├── html.md
    │   └── TOPICS: HTML elements/forms, static site generators
    │   └── SEARCH: semantic web, static site generators (Zola/Hugo/Pelican/Hakyll), CMS vs headless CMS, site search (lunr/Stork), Wayback/ArchiveBox
    │   └── RELATED: ux/css.md, ux/frontend.md
    │   └── HEADERS: 🦾 SSG, alternatives, features, ♾️ Hakyll, ◻️ Hastie, 🪴 Quartz, 🔲 Zola, 🟨 ZA, archive
    ├── mobile.md
    │   └── TOPICS: cross-platform mobile/desktop app frameworks
    │   └── SEARCH: Tauri, Iced, SwiftUI, Flet/Kivy/Flutter, Apple ID receipt validation, GrapheneOS
    │   └── RELATED: ux/frontend.md
    │   └── HEADERS: ICED, Tauri, SwiftUI, alternatives, desktop, za, android
    └── terminal.md
        └── TOPICS: CLI/TUI tooling in Python, Go, Rust - Click, Textual, ratatui, gum, rich
        └── SEARCH: Click vs argparse vs Typer, Bubbletea/Charm, OpenTUI/Kitty graphics protocol, ratatui snapshot testing, rich console, gum for bash, Cobra/Viper
        └── RELATED: lang/golang.md, lang/python/stdlib.md
        └── HEADERS: 🖱️ CLICK, basic, args, default cmd, 🔣 INPUT, 🚅 bullet, questionary, 📺 TUI, 🦄 Charm, 👾 OpenTUI, 🐀 ratatui, 🐍 Textual, 🎆 PIZAZZ, 🍬 gum, 💰 rich, terminal text effects, 🟨 ZA, assorted Golang, design
```

## dsa/
```
├── 01-adt/
│   ├── heaps-priority-queues.md
│   │   └── TOPICS: heap-backed priority queues, push/pop/peek complexity, tie-breaking
│   │   └── SEARCH: heapq, sift_up, heapify, nlargest, itertools.count tie breaker
│   │   └── RELATED: dsa/02-structures/heaps.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── lists.md
│   │   └── TOPICS: list ADT contract independent of array/linked backing
│   │   └── SEARCH: array module, SimpleList class, random access cost
│   │   └── RELATED: dsa/02-structures/arrays-strings.md, dsa/02-structures/linked-lists.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── maps-sets.md
│   │   └── TOPICS: map/set contract, hash table vs tree backing
│   │   └── SEARCH: Counter, defaultdict, set algebra, union/intersection/difference
│   │   └── RELATED: dsa/02-structures/hash-tables.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── stacks-queues.md
│   │   └── TOPICS: stack/queue/deque semantics, monotonic variants
│   │   └── SEARCH: pythonmorsels, deque, next_greater, sliding_max
│   │   └── RELATED: dsa/04-patterns/monotonic-stack-queue.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   └── union-find.md
│       └── TOPICS: disjoint-set union, path compression, dynamic connectivity
│       └── SEARCH: DSU class, union by size, alpha(n), Kruskal, equivalence classes
│       └── RELATED: dsa/04-patterns/offline-queries.md, dsa/04-patterns/greedy.md, dsa/05-domains/flows-cuts.md
│       └── HEADERS: When To Reach For This, Core Ideas, Snippets
├── 02-structures/
│   ├── arrays-strings.md
│   │   └── TOPICS: array/string ops, prefix sums, two-pointer scans
│   │   └── SEARCH: itertools.accumulate, join, array.array, HN link
│   │   └── RELATED: dsa/04-patterns/prefix-sums.md, dsa/04-patterns/two-pointers.md, dsa/01-adt/lists.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── graphs.md
│   │   └── TOPICS: adjacency list/matrix, BFS/DFS, topological sort
│   │   └── SEARCH: build_adj, shortest_path_len, topo_sort, defaultdict, AWS random graph theory link
│   │   └── RELATED: dsa/05-domains/flows-cuts.md, dsa/05-domains/matching.md, dsa/data-structures.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── hash-tables.md
│   │   └── TOPICS: hashing for membership, counting, grouping, dedup
│   │   └── SEARCH: two_sum, group_anagrams, stable hashable keys
│   │   └── RELATED: dsa/01-adt/maps-sets.md, dsa/data-structures.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── heaps.md
│   │   └── TOPICS: binary heap array layout, min-heap invariant
│   │   └── SEARCH: parent/left/right index math, sift_up, heapify
│   │   └── RELATED: dsa/01-adt/heaps-priority-queues.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── linked-lists.md
│   │   └── TOPICS: pointer manipulation, cycle detection, node merges
│   │   └── SEARCH: slow/fast pointer, has_cycle, dummy head, merge sorted lists
│   │   └── RELATED: dsa/04-patterns/two-pointers.md, dsa/01-adt/lists.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   └── trees.md
│       └── TOPICS: DFS/BFS traversal, BST lookup, trie sketch
│       └── SEARCH: inorder, level_order, bst_contains, bisect.insort
│       └── RELATED: dsa/03-specialized/tries.md, dsa/data-structures.md
│       └── HEADERS: When To Reach For This, Core Ideas, Snippets
├── 03-specialized/
│   ├── bloom-filters.md
│   │   └── TOPICS: probabilistic membership testing, false positives only
│   │   └── SEARCH: hash salts, might_contain, expensive_lookup guard pattern
│   │   └── RELATED: dsa/data-structures.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── fenwick-trees.md
│   │   └── TOPICS: binary indexed tree, point update, range sum
│   │   └── SEARCH: BIT, i & -i lowbit trick, prefix_sum
│   │   └── RELATED: dsa/03-specialized/segment-trees.md, dsa/04-patterns/prefix-sums.md, dsa/04-patterns/difference-array.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── interval-trees.md
│   │   └── TOPICS: overlap queries via augmented max-end trees
│   │   └── SEARCH: overlaps predicate, containing_point, linear scan baseline
│   │   └── RELATED: dsa/05-domains/intervals.md, dsa/03-specialized/segment-trees.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── lru-caches.md
│   │   └── TOPICS: least-recently-used eviction, capacity-bound caching
│   │   └── SEARCH: functools.lru_cache, OrderedDict.move_to_end, popitem(last=False)
│   │   └── RELATED: dsa/02-structures/hash-tables.md, dsa/02-structures/linked-lists.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── segment-trees.md
│   │   └── TOPICS: range query/update tree over associative ops
│   │   └── SEARCH: lazy propagation, range_min, iterative segment tree
│   │   └── RELATED: dsa/03-specialized/fenwick-trees.md, dsa/03-specialized/interval-trees.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── skip-lists.md
│   │   └── TOPICS: probabilistic balancing via multi-level linked lists
│   │   └── SEARCH: random_level, expected O(log n), ordered map/set alternative
│   │   └── RELATED: dsa/02-structures/linked-lists.md, dsa/data-structures.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── spatial-indexes.md
│   │   └── TOPICS: nearest-neighbor and spatial range queries
│   │   └── SEARCH: quadtree, k-d tree, R-tree, dist2, bounding box overlap
│   │   └── RELATED: dsa/05-domains/geometry.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── suffix-arrays-trees.md
│   │   └── TOPICS: substring search over mostly-static strings
│   │   └── SEARCH: suffix_array, bisect_left substring search, naive materialization caveat
│   │   └── RELATED: dsa/05-domains/strings.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   └── tries.md
│       └── TOPICS: prefix tree for string/token prefix queries
│       └── SEARCH: has_prefix, autocomplete, routing tables, dictionary-backed trie
│       └── RELATED: dsa/02-structures/trees.md, dsa/05-domains/strings.md, dsa/data-structures.md
│       └── HEADERS: When To Reach For This, Core Ideas, Snippets
├── 04-patterns/
│   ├── backtracking.md
│   │   └── TOPICS: exhaustive search via choose-recurse-undo, pruning
│   │   └── SEARCH: subsets, n_queens, itertools.combinations/permutations/product
│   │   └── RELATED: dsa/04-patterns/divide-and-conquer.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── complexity.md
│   │   └── TOPICS: Big-O growth classes, amortized cost, time/space tradeoffs
│   │   └── SEARCH: Big-Theta, Big-Omega, timeit, getsizeof, bench scaffold
│   │   └── RELATED: dsa/algos.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Common Shapes, Snippets
│   ├── difference-array.md
│   │   └── TOPICS: batched range updates materialized via prefix sum
│   │   └── SEARCH: apply_range_adds, max_active bookings, offline range updates
│   │   └── RELATED: dsa/03-specialized/fenwick-trees.md, dsa/04-patterns/prefix-sums.md, dsa/04-patterns/sweep-line.md, dsa/04-patterns/patterns.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── divide-and-conquer.md
│   │   └── TOPICS: split-solve-combine recursion, recurrence-driven complexity
│   │   └── SEARCH: count_inversions, merge_count, pow_fast binary exponentiation
│   │   └── RELATED: dsa/04-patterns/sorting.md, dsa/04-patterns/backtracking.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── dynamic-programming.md
│   │   └── TOPICS: overlapping subproblems, memoization vs tabulation
│   │   └── SEARCH: fib, knapsack, functools.cache, state/transition/base case
│   │   └── RELATED: dsa/algos.md, dsa/05-domains/strings.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── greedy.md
│   │   └── TOPICS: locally optimal choice with exchange-argument proof
│   │   └── SEARCH: interval scheduling, boats_needed, kruskal, exchange argument, staying-ahead argument
│   │   └── RELATED: dsa/01-adt/union-find.md, dsa/05-domains/intervals.md, dsa/algos.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── monotonic-stack-queue.md
│   │   └── TOPICS: nearest greater/smaller, rolling min/max, dominated candidates
│   │   └── SEARCH: next_greater, sliding_min, O(n) amortized push/pop-once
│   │   └── RELATED: dsa/01-adt/stacks-queues.md, dsa/04-patterns/sliding-window.md, dsa/04-patterns/patterns.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── offline-queries.md
│   │   └── TOPICS: batch/sort all queries upfront, restore original order
│   │   └── SEARCH: count_leq, connected_under_limit, thresholded connectivity, (query, original_index) pairs
│   │   └── RELATED: dsa/01-adt/union-find.md, dsa/04-patterns/patterns.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── patterns.md
│   │   └── TOPICS: index of problem-shape patterns, when each applies
│   │   └── RELATED: dsa/04-patterns/sliding-window.md, dsa/04-patterns/two-pointers.md, dsa/04-patterns/prefix-sums.md, dsa/04-patterns/difference-array.md, dsa/04-patterns/monotonic-stack-queue.md, dsa/04-patterns/sweep-line.md, dsa/04-patterns/offline-queries.md
│   │   └── HEADERS: When To Reach For This, Core Patterns
│   ├── prefix-sums.md
│   │   └── TOPICS: immutable range-sum queries, O(1) after preprocessing
│   │   └── SEARCH: itertools.accumulate, count_subarrays_sum, half-open range trick
│   │   └── RELATED: dsa/02-structures/arrays-strings.md, dsa/04-patterns/difference-array.md, dsa/04-patterns/patterns.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── randomized.md
│   │   └── TOPICS: sampling, Las Vegas vs Monte Carlo, adversarial-input avoidance
│   │   └── SEARCH: reservoir sampling, quickselect, estimate_pi, secrets.randbelow
│   │   └── RELATED: dsa/04-patterns/sorting.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── search.md
│   │   └── TOPICS: candidate-space search - binary search, BFS, A*, branch and bound
│   │   └── SEARCH: first_true monotonic predicate, astar heuristic, bisect_left/bisect_right
│   │   └── RELATED: dsa/02-structures/graphs.md, dsa/algos.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── sliding-window.md
│   │   └── TOPICS: contiguous range with incremental enter/leave state
│   │   └── SEARCH: max_len_at_most_k_distinct, max_sum_window, fixed vs variable window
│   │   └── RELATED: dsa/04-patterns/two-pointers.md, dsa/04-patterns/monotonic-stack-queue.md, dsa/04-patterns/patterns.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── sorting.md
│   │   └── TOPICS: comparison vs counting/radix sort, stability
│   │   └── SEARCH: merge sort, counting_sort, itemgetter/attrgetter, Omega(n log n) lower bound
│   │   └── RELATED: dsa/algos.md, dsa/04-patterns/divide-and-conquer.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── sweep-line.md
│   │   └── TOPICS: ordered event scanning over time or coordinates
│   │   └── SEARCH: active_counts, max_overlap, start/end event tie-breaking
│   │   └── RELATED: dsa/05-domains/intervals.md, dsa/04-patterns/difference-array.md, dsa/04-patterns/patterns.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   └── two-pointers.md
│       └── TOPICS: opposing and slow/fast pointer traversal over ordered sequences
│       └── SEARCH: pair_sum_sorted, itertools.pairwise, cycle detection
│       └── RELATED: dsa/02-structures/linked-lists.md, dsa/04-patterns/sliding-window.md, dsa/04-patterns/patterns.md
│       └── HEADERS: When To Reach For This, Core Ideas, Snippets
├── 05-domains/
│   ├── flows-cuts.md
│   │   └── TOPICS: max-flow min-cut, capacity routing, augmenting paths
│   │   └── SEARCH: Edmonds-Karp, residual graph, bfs_parent, networkx.maximum_flow
│   │   └── RELATED: dsa/05-domains/matching.md, dsa/02-structures/graphs.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── geometry.md
│   │   └── TOPICS: computational geometry - orientation, convex hull, intersection
│   │   └── SEARCH: cross product, monotonic chain, dist2, hypot/atan2, float tolerance
│   │   └── RELATED: dsa/03-specialized/spatial-indexes.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── intervals.md
│   │   └── TOPICS: interval merging, greedy selection, overlap sweep
│   │   └── SEARCH: merge_intervals, select_non_overlapping, half-open vs closed endpoints
│   │   └── RELATED: dsa/04-patterns/sweep-line.md, dsa/03-specialized/interval-trees.md, dsa/04-patterns/greedy.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── matching.md
│   │   └── TOPICS: bipartite/stable matching, assignment problems, flow reduction
│   │   └── SEARCH: max_bipartite_matching, stable_matching (Gale-Shapley style), scipy.linear_sum_assignment
│   │   └── RELATED: dsa/05-domains/flows-cuts.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   ├── ranking.md
│   │   └── TOPICS: scoring, top-k, PageRank, Elo, Borda aggregation
│   │   └── SEARCH: heapq.nlargest, elo_update, pagerank iteration, borda count
│   │   └── RELATED: dsa/algos.md
│   │   └── HEADERS: When To Reach For This, Core Ideas, Snippets
│   └── strings.md
│       └── TOPICS: pattern search, edit distance, rolling hash, KMP
│       └── SEARCH: prefix_function, kmp_search, rolling_hashes, edit_distance DP
│       └── RELATED: dsa/03-specialized/tries.md, dsa/03-specialized/suffix-arrays-trees.md, dsa/04-patterns/dynamic-programming.md
│       └── HEADERS: When To Reach For This, Core Ideas, Snippets
├── algos.md
│   └── TOPICS: personal algorithm reference dump - complexity, matching, ranking, search, strategies
│   └── SEARCH: Bhargava grokking algorithms, Skiena, Christian algorithms to live by, Dasgupta, MacCormick, La Rocca, Khamis, Wengrow, Tuckfield, Hurbans, NP-complete, NP-hard, set covering, knapsack, BM25, Okapi BM25F, PageRank, TF-IDF, A*, Bellman-Ford, Dijkstra, genetic algorithms, simulated annealing, PRNG, Mersenne Twister, quicksort, Timsort, topological sort, recursion, tail call optimization, Levenshtein, fuzzywuzzy, rapidfuzz, thefuzz, flashtext, difflib SequenceMatcher, Aho-Corasick, inverted index, TSP, MST
│   └── RELATED: computation/computation.md, guts/operating-systems/linux.md, dsa/04-patterns/complexity.md, dsa/04-patterns/greedy.md, dsa/04-patterns/dynamic-programming.md, dsa/04-patterns/sorting.md, dsa/04-patterns/search.md, dsa/05-domains/ranking.md
│   └── HEADERS: constants, NP, runtimes, regex, difflib, mask, flashtext, Levenshtein distance, rapidfuzz, thefuzz, bm25, PageRank, TF-IDF, binary, bfs/dfs, engine, brute force, dynamic programming, greedy, linear programming, knapsack problem, PRNG, set covering, sort, recursion
└── data-structures.md
    └── TOPICS: personal data-structure reference - ADT/impl/complexity/capability taxonomies
    └── SEARCH: Conery, Kubica graph algorithms fun way, Bratanic, Kleppmann, treap, red-black tree, splay tree, B-tree, quadtree, HyperLogLog, cuckoo filter, count-min sketch, Datomic, RDF, SPARQL, triple-store, anytree, category theory, functor, monad, swisstable, dynamic array resizing
    └── RELATED: lang/academic/lisp.md, lang/python/runtime.md, guts/operating-systems/linux.md, dsa/01-adt/heaps-priority-queues.md, dsa/01-adt/stacks-queues.md, dsa/02-structures/graphs.md, dsa/02-structures/linked-lists.md, dsa/02-structures/trees.md, dsa/02-structures/hash-tables.md, dsa/03-specialized/bloom-filters.md, dsa/03-specialized/tries.md, dsa/03-specialized/skip-lists.md
    └── HEADERS: heap, graph, semantics, category theory, linked list, map, queue, stack, tree, semantics, tools, binary, ordered, trie, array, bloom filter, hash table, family, implementation, ADT, complexity, capability, operations, probabilistic
```

## guts/
```
├── compilers/
│   ├── cleanup.md
│   │   └── TOPICS: static analysis tooling — linting, type checking, ctags, LSP
│   │   └── SEARCH: ruff, pyright, ctags, gutentags, jedi, LSP, gopls, rust-analyzer, pylance, pylyzer, tree-sitter, coc.nvim, espanso
│   │   └── RELATED: dsa/algos.md, lang/python/runtime.md, guts/operating-systems/text.md, tools/feedback/neovim.md, data/#meta.md
│   │   └── HEADERS: 🔬 STATIC CODE ANALYSIS, lint (ruff), type check (pyright), symbol index (ctags), semantic analysis (jedi), LSP
│   ├── models.md
│   │   └── TOPICS: index of compiler execution models — tree-walk, bytecode VM, native, JIT, transpiler
│   │   └── SEARCH: tree-walking interpreter, bytecode VM, native code, JIT compilation, transpilers, single-pass compiler
│   ├── pipeline.md
│   │   └── TOPICS: compiler pipeline stages — lexing, parsing, AST, IR, LLVM, WASM, codegen
│   │   └── SEARCH: lexer tokenizer, parser generator, tree-sitter, AST, symbol table, IR, SSA, LLVM IR, bytecode, WASM, ELF, Mach-O, objdump, BNF
│   │   └── RELATED: lang/productive/lua.md, guts/operating-systems/multiplexers.md, guts/operating-systems/interfaces.md
│   │   └── HEADERS: lex, parse / grammar / treesitter, treesitter, semantic analysis, AST, IR, LLVM, WASM, backend (code gen)
│   └── runtimes.md
│       └── TOPICS: language runtimes — sandboxing, VMs, ABI, FFI, garbage collection
│       └── SEARCH: Deno sandbox, Monty, CPython no sandboxing, ABI, extern "C", no_mangle, CFFI, cffi, JNI, cgo, garbage collection, weakref, __del__, undefined behavior
│       └── RELATED: ml/03-eng/agents.md, guts/operating-systems/containers.md, lang/low-level/zig.md
│       └── HEADERS: 🔮 RUNTIME, sandboxing (Deno, monty), minimal, VMs, ABI, FFI, garbage collection
├── network/
│   ├── application.md
│   │   └── TOPICS: DNS, email, push tech (SSE/WebSockets), secure transfer, SSH, TLS, IRC, NTP
│   │   └── SEARCH: DNS records A/AAAA/CNAME/MX, doggo dig dog, whois, SMTP IMAP POP3 JMAP, mbox, SSE, WebSockets, SFTP SCP croc, ssh-keygen ssh-agent mosh, TLS handshake OpenSSL ACME PKI, IRC senpai, NTP UTC leap second
│   │   └── RELATED: design/system/aws.md, design/backend/api.md, lang/python/stdlib.md
│   │   └── HEADERS: 📖 DNS, packets, records, registrars / servers, 🐶 tooling (doggo), URLs, zones, 📫 EMAIL, off Google, clients, delivery, SMTP, 🫸 PUSH, SSE, WebSockets, 🔐 SECURE, file transfer (SFTP), SSH, TLS, OpenSSL, PKI, 🟨 ZA, IRC, NTP
│   ├── http.md
│   │   └── TOPICS: HTTP headers, status codes, caching, cookies/auth tokens, CORS, CLI tooling
│   │   └── SEARCH: ETag, Cache-Control, CORS preflight, JWT, bearer token, rate-limit headers, 2xx-5xx status codes, curl, httpie, http-prompt, idempotent PUT/POST/PATCH
│   │   └── RELATED: design/system/infra.md, design/system/distributed.md, design/backend/api.md, guts/security/exploits.md
│   │   └── HEADERS: what happens when, 📇 HEADERS, caching / perf, cookies, connection, CORS, custom, rate limiting, security, tokens, 🔢 STATUS CODES, 🟢 200s, 🔄 300s (redirect), 🙈 400s (client err), 🛑 500s (server err), 🛠️ TOOLING, curl, httpie, http-prompt, 🟨 ZA, methods / verbs
│   ├── link.md
│   │   └── TOPICS: home internet setup — ISP, routers, hardware, telephony, topologies
│   │   └── SEARCH: RSRP, RSRQ, modem, router, switch, hub, repeater, NAT, default gateway, QoS, DHCP, VLAN, meshtastic, SS7, PSTN, GSM, simplex/duplex/multicast/broadcast, out-of-band management, SNMP
│   │   └── HEADERS: 🏠 HOME INTERNET, ISP, debug, hardware, speed, config, 🟨️ ZA, mesh, data centers, telephony, transmissions
│   └── tcp-ip.md
│       └── TOPICS: IP addressing, packet capture tools, TCP/UDP, VPN, firewalls
│       └── SEARCH: IPv4 IPv6, DHCP, NAT, subnet mask, tcpdump, Wireshark, BPF/eBPF, TCP handshake SYN, UDP, VPN Wireguard Mullvad, nftables, iptables, pf, ufw, traceroute, ping, ICMP, 127.0.0.1, 0.0.0.0
│       └── RELATED: design/system/telemetry.md
│       └── HEADERS: 📡 IP, addresses, packet, 🟨️ ZA, UDP, TCP, tooling, VPN, firewall
├── operating-systems/
│   ├── bash.md
│   │   └── TOPICS: Bash control flow, args, execution modes, variable handling
│   │   └── SEARCH: test brackets [ ] vs [[ ]], for/while/until loops, $@ $# positional args, shebang, source vs execute, set -euo pipefail, strict mode, shellcheck
│   │   └── HEADERS: ⑃ CONTROL FLOW, checks, operators, iteration, conditionals, 🟨 ZA, args, design, execution, snippets, variables
│   ├── containers.md
│   │   └── TOPICS: Docker, Colima, Podman, Kubernetes, container internals, image/secrets mgmt
│   │   └── SEARCH: docker-compose, cgroups, namespaces, containerd, runC, OCI, Colima, Lima, QEMU, Podman rootless daemonless, multi-stage builds, dive, lazydocker, k9s, kubectl, minikube, Helm, etcd, seccomp, pivot root, bind mount, tmpfs
│   │   └── RELATED: design/system/aws.md, design/system/cloud.md, design/backend/django.md, guts/operating-systems/linux.md, guts/compilers/runtimes.md
│   │   └── HEADERS: ⛵️ DOCKER, 🟩 cmd, components, compose, data mgmt, Capp, 🛠️ tooling, volumes, 🔬️ INTERNALS, approaches, 🍎 container, 🦙 Colima, 🦭 Podman, engines, Evans, images, 🚢 KUBERNETES, design, util, 🟨 ZA, 🐍 Python, secrets
│   ├── denv.md
│   │   └── TOPICS: build systems, task runners, package management, Homebrew/Nix, shell profiles, dotfiles, env vars, XDG
│   │   └── SEARCH: just, Make, Bazel, ninja, mise, semver, Homebrew taps/formula, Nix nix-darwin, zshenv/zprofile/zshrc, PATH debugging, XDG_CONFIG_HOME, dotfiles symlink, stow
│   │   └── RELATED: lang/python/pkg.md, tools/za/git.md, tools/za/it.md, tools/clankers/claude.md
│   │   └── HEADERS: 🏗️ BUILD SYSTEMS, just, make, 📦 PACKAGING, binaries, dependencies, semver, 🍺 Homebrew, troubles, constraints, registries, managers, mise, 🧬 Nix, 💋 PROFILES, files, shells, aliases, 🟨 ZA, dotfiles, env var, path, XDG
│   ├── distros.md
│   │   └── TOPICS: macOS config/apps/bindings, Linux distro history, Rosetta, provisioning
│   │   └── SEARCH: Vimium, Spotlight, Finder, Preview, VLC, xcode-select, command line tools, Rosetta arm64, dotfiles provisioning, Unix/BSD/Debian/Ubuntu/RHEL history
│   │   └── RELATED: guts/operating-systems/linux.md, tools/za/keyboards.md
│   │   └── HEADERS: 🍎 MACOS, Vimium, apps, bindings, command line tools, provision, rosetta, settings, 🟨 ZA, alternatives, history
│   ├── linux.md
│   │   └── TOPICS: Linux filesystem, file descriptors, symlinks, I/O redirection, systemd, kernel, permissions
│   │   └── SEARCH: inode, file descriptor stdin/stdout/stderr, symlink vs hard link, XDG cache, FHS, pipes, xargs, exit codes, systemd, systemctl, journalctl, syscalls, fork, exec, chmod octal, umask, man pages
│   │   └── RELATED: design/system/aws.md, tools/za/it.md, guts/operating-systems/containers.md
│   │   └── HEADERS: 🗃️ FILES, descriptors, fs, globbing, links, sockets, 🌊 FLOW, IO, operators, xargs, 🟨 ZA, daemons (systemd), date/time, exit codes, kernel, man pages, scripts, perms + user/group
│   └── threads.md
│       └── TOPICS: concurrency vs parallelism, Python GIL/async, goroutines, processes/threads
│       └── SEARCH: GIL, free-threading, asyncio event loop, multiprocessing vs threading, goroutines, channels, mutex, fork/exec, deadlock, race condition, livelock, nohup, PID, PPID, OOM killer
│       └── RELATED: guts/operating-systems/linux.md, lang/plt.md, design/system/distributed.md, lang/python/runtime.md, computation/computation.md, design/system/infra.md
│       └── HEADERS: 🐍 PYTHON, 🖖 CONCURRENCY, async, event loops, 🛤️ PARALLEL, goroutines, GIL, multiprocessing, threading, 🧵 PROCESSES, basics, background, creation, segments, traits, problems
├── protocols/
│   ├── edi.md
│   │   └── TOPICS: X12 EDI standard, segments/transaction sets, VAN/AS2, parsing tools
│   │   └── SEARCH: ASC X12, EDIFACT, VAN, AS2, ISA/GS/ST/SE envelope, BCT, LIN, DTM, CTP, CTB, PID, LDT segments, x12-edi-tools, pyedi, Stedi Guide JSON
│   │   └── HEADERS: 🗺️ ECOSYSTEM, standards bodies, middlemen, constraints, replacement, 🧬 SEGMENTS, semantics, sequence, ☸️ meta, ISA, GS, ST / SE, BCT (purpose), CTT / GE / IEA, 🛰️ info, LIN (ID), G53 (op), DTM (date range), CTB (order quantity), PID (desc), LDT (lead time), CTP (price), G39 (physical characteristics), 🛠️ TOOLING, pyedi
│   ├── serde.md
│   │   └── TOPICS: serialization formats — columnar, row-oriented, IPC, wire
│   │   └── SEARCH: Apache Arrow, Parquet, ORC, Vortex, Avro schema evolution, CSV/DSV/TSV, Cap'n Proto, protobuf wire format, Thrift, BSON, MessagePack, JSON, jq, jless
│   │   └── RELATED: data/#meta.md, computation/computation.md, dsa/algos.md, lang/python/stdlib.md, design/system/telemetry.md, design/backend/api.md
│   │   └── HEADERS: 🏛️ COLUMNAR, 🏹 Arrow, 📐 Parquet, 🌪️ Vortex, 🚣‍♀️ ROW-ORIENTED, 🪶 Avro, 🟢 CSV, 👋 IPC, Capn Proto, protobuf, Thrift, 🛜 WIRE, BSON, MessagePack, 🟡 JSON, design, in databases, query (jq), view (jless)
│   └── spec.md
│       └── TOPICS: config file formats, character encoding, identifiers, number systems
│       └── SEARCH: TOML, YAML, INI, KDL, Cuelang, XML, UTF-8, Unicode, ASCII, digraphs, prefix codes, Huffman coding, UUID versions, UPC check digit, ASIN, DUNS, octal, binary, hex, RFC, IETF, ANSI, ISO, POSIX
│       └── RELATED: data/#meta.md, lang/plt.md, domains/humanities/sociology.md, lang/python/stdlib.md, computation/foundations/information.md, dsa/algos.md, design/system/telemetry.md
│       └── HEADERS: 🗃️ CONFIG, Cuelang, INI, KDL, TOML, XML, YAML, 🪪 ENCODING, semantics, ascii, utf-8, Unicode, prefix codes, codecs, 🪪 IDENTIFIERS, commercial, UUID, 🧮 NUMBERS, octal, binary, hex, 🟨 ZA, standards bodies, structure
└── security/
    ├── auth.md
    │   └── TOPICS: access control, auth protocols (OAuth/Kerberos/LDAP), passwords
    │   └── SEARCH: RBAC, ABAC, casbin, OpenID Connect, Zanzibar, Auth0, Dex, Kerberos keytab TGS KDC, LDAP distinguished name, OAuth2 flow, passkeys, password managers (Bitwarden, pass), salt hashing, MFA
    │   └── RELATED: design/backend/django.md, guts/network/application.md
    │   └── HEADERS: 👽 USERS, access control, auth, Auth0, Dex, Kerberos, LDAP, OAuth, better auth, Tinyauth, passwords
    ├── cryptography.md
    │   └── TOPICS: cryptography — symmetric/asymmetric encryption, hashing, ECC
    │   └── SEARCH: RSA, Diffie-Hellman, ECC, AES, SHA-256, PGP, Age, argon2, bcrypt, scrypt, salt, rainbow table, Merkle tree, one-way hash
    │   └── RELATED: domains/stem/math/core.md, computation/computation.md
    │   └── HEADERS: encryption, hashing
    └── exploits.md
        └── TOPICS: security exploits — injection attacks, supply chain, prompt injection
        └── SEARCH: XSS, CSRF, SSRF, SQL injection, parameterized queries, directory traversal, LFI, RFI, supply chain attack (npm, PyPI), prompt injection, rootkit, zero-day, phishing, sim swap, replay attack
        └── RELATED: tools/za/git.md, ml/03-eng/agents.md
        └── HEADERS: culture, 🟨 ZA, prompt injection, file inclusion, SQL injection, supply chain, XSS
```

## lang/
```
├── academic/
│   ├── haskell.md
│   │   └── TOPICS: sparse link dump, Hakyll static site generator
│   │   └── SEARCH: Hakyll, TheAlgorithms/Haskell
│   ├── lisp.md
│   │   └── TOPICS: Lisp dialect survey — Clojure, Racket, s-expressions, macros
│   │   └── SEARCH: homoiconicity, s-expression, prefix notation, Common Lisp, Fennel, Janet, Scheme, Racket, Clojure, no-loops
│   │   └── RELATED: dsa/algos.md, lang/productive/golang.md
│   │   └── HEADERS: 🟩 Clojure, 🟦 Racket, 🐘 Haskell, 🐪 OCaml, language, s expressions
│   ├── ocaml.md
│   │   └── TOPICS: OCaml stub — FUSE filesystem, JS transpilation links
│   │   └── SEARCH: opamui, Google Drive FUSE, Melange
├── low-level/
│   ├── assembly.md
│   │   └── TOPICS: assembly fundamentals, ARM/x86 learning resources
│   │   └── SEARCH: HLA, intrinsics, ARM, x86-64, compiler explorer/Godbolt, nand2tetris, Manga Microprocessors
│   ├── c.md
│   │   └── TOPICS: C build/link pipeline — headers, objects, static/shared libs
│   │   └── SEARCH: gcc, Clang, .a vs .so, libc, glibc, musl, K&R, c89/c99/c11/c23
│   │   └── HEADERS: src -> objs, linking, design, stdlib, compilers, history
│   ├── odin.md
│   │   └── TOPICS: Odin as "C replacement with better defaults" for game/OS dev
│   │   └── SEARCH: Zylinski, Oberon influence, Nim comparison
│   │   └── HEADERS: DESIGN
│   ├── rust.md
│   │   └── TOPICS: Rust ownership/borrow checker, Cargo packaging, macros, project layout
│   │   └── SEARCH: borrow checker, ownership, lifetimes, crates.io, insta snapshots, flowistry, rustup editions, evcxr_repl
│   │   └── RELATED: lang/python/runtime.md, lang/python/pkg.md, lang/plt.md, design/ux/terminal.md
│   │   └── HEADERS: borrow checker / ownership, design, macros, structs, basics, dep isolation, local dev, structure, testing, example codebases, flowistry, version mgmt, ➕ C++
│   ├── zig.md
│   │   └── TOPICS: Zig — comptime, FFI, systems/build tooling
│   │   └── SEARCH: comptime, Andrew Kelley, TigerBeetle, ziglings, cross-compilation
├── plt.md
│   └── TOPICS: programming language theory — typing, memory, semantics, control flow
│   └── SEARCH: nominative/duck typing, type inference, reflection, subtyping, gradual typing, garbage collection, stack vs heap, pass by reference/value, generics, hoisting, cyclomatic complexity, branching factor
│   └── RELATED: lang/low-level/c.md, lang/low-level/rust.md, lang/python/obj.md, computation/computation.md
│   └── HEADERS: history, models, community, spec, stdlib, systems programming, argument passing, pointers, stacks, operators, units, generics, terminology, control flow, functions, overloading
├── productive/
│   ├── beam.md
│   │   └── TOPICS: Gleam and Elixir on BEAM, Phoenix/LiveView
│   │   └── SEARCH: BEAM, OTP, Ecto, Erlang processes, message passing, Gleam
│   │   └── HEADERS: gleam, 👾 Elixir
│   ├── golang.md
│   │   └── TOPICS: Go basics, module/package management, project layout, web frameworks
│   │   └── SEARCH: go.mod, go.sum, GOPATH, GOBIN, GOROOT, generics, slices vs arrays, Pocketbase, Templ, Fiber, Gin, MVS
│   │   └── RELATED: guts/operating-systems/threads.md, lang/low-level/odin.md
│   │   └── HEADERS: collections, design, functions, variables, previous writeup, semantics, workspaces, modules, env var, installs, project structure, version mgmt, web
│   ├── java.md
│   │   └── TOPICS: Java packaging, JVM internals, Hibernate/JPA, Maven, Spring Boot
│   │   └── SEARCH: classpath, JDK/JRE/JVM, classloader, Hibernate DDL modes, Maven phases/goals, Spring beans, aspect-oriented
│   ├── js.md
│   │   └── TOPICS: JavaScript basics, npm packaging, browser APIs, bun/node/deno runtimes
│   │   └── SEARCH: ECMAScript history, IIFE, spread operator, Webpack, tree shaking, DOM, V8, SpiderMonkey, service worker, Algolia, Meilisearch, Typesense
│   │   └── RELATED: lang/python/pkg.md, guts/operating-systems/linux.md, tools/za/it.md, guts/security/exploits.md
│   │   └── HEADERS: lang, packaging, internationalization (i18n), search, browser, perf, 🫓 bun, Node / Deno, version mgmt (nvm)
│   ├── lua.md
│   │   └── TOPICS: Lua tables, OOP via metatables, embedding strategies
│   │   └── SEARCH: metatable, __index, LuaRocks, LuaJIT, Fennel, yazi plugins, Hammerspoon
│   │   └── RELATED: lang/academic/lisp.md, lang/python/runtime.md, guts/compilers/pipeline.md, guts/operating-systems/multiplexers.md
│   │   └── HEADERS: tables, self, OOP, modules, embedded, usage
│   ├── r.md
│   │   └── TOPICS: R for statistics, tidyverse ecosystem, CRAN packaging
│   │   └── SEARCH: CRAN, packrat, RStudio, tidyverse, ggplot2, grammar of graphics
│   │   └── RELATED: data/analytics/stat.md
│   ├── ruby.md
│   │   └── TOPICS: Ruby books/community link stub — metaprogramming, _why the lucky stiff
│   │   └── SEARCH: mousehole, Ruby Under a Microscope
│   ├── ts.md
│   │   └── TOPICS: TypeScript learning stub, Flow as alternative
│   │   └── SEARCH: gibbok typescript book, Flow
├── python/
│   ├── collections.md
│   │   └── TOPICS: Python collections — hashable/mutable/iterable semantics, dict/list/string/tuple ops
│   │   └── SEARCH: itertools, generator expression, shallow vs deep copy, slicing, namedtuple, defaultdict, f-strings, t-strings, bisect
│   │   └── RELATED: domains/stem/math/core.md, dsa/algos.md, lang/python/obj.md
│   │   └── HEADERS: hashable, mutable, subscriptable, perf, comprehensions, iterables, itertools, generators, copy, lodash, query, slice, sort, dict, list, string, tuple
│   ├── cq.md
│   │   └── TOPICS: Python testing (pytest/unittest/BDD), coverage, lint/fmt, logging
│   │   └── SEARCH: pytest fixture scopes, behave Gherkin, coverage.py sys.settrace, ruff, flake8, loguru, structlog, doctest, ward, tox/nox
│   │   └── RELATED: design/architecture/test.md, lang/python/stdlib.md, design/system/telemetry.md
│   │   └── HEADERS: behave (BDD), coverage, doctest, mocks, pytest, snob, tox, unittest, ward, docstring, lint / fmt (ruff), logging (loguru), stats, style
│   ├── logic.md
│   │   └── TOPICS: Python control flow, exceptions, pattern matching, functions/closures/lambdas
│   │   └── SEARCH: EAFP vs LBYL, structural pattern matching, functools.partial/reduce, closures, singledispatch, walrus operator, variadic args
│   │   └── RELATED: domains/humanities/philosophy.md, lang/plt.md
│   │   └── HEADERS: conditionals, exceptions, matching, operators, try/catch, args, functional, inner / closures, lambdas, overloading
│   ├── obj.md
│   │   └── TOPICS: Python OOP — classes, dataclasses, dunder methods, metaprogramming, typing
│   │   └── SEARCH: metaclass, descriptor protocol, MRO, mixin, monkey patch, __getattr__/__setattr__, mypy vs pyright, pydantic, attrs
│   │   └── RELATED: design/backend/django.md, lang/plt.md, lang/python/stdlib.md
│   │   └── HEADERS: dataclass, dunder, comparison, context mgmt, init, methods, property, interfaces, mixin, protocol, getattr rabbit hole, other uses, decorators, descriptor, memory, assignment, packing, intern, symbol table, 🌌 ty, 🟦 mypy, 🔺 pydantic
│   ├── pkg.md
│   │   └── TOPICS: Python packaging history — pip/Poetry/pipx/uv, PEPs, pyenv version mgmt
│   │   └── SEARCH: PyPI, wheel vs sdist vs egg, pyproject.toml, PEP 517/518/621/751, pyenv lzma bug, PyInstaller, PyOxidizer, python-build-standalone, Anaconda/conda
│   │   └── RELATED: guts/operating-systems/linux.md, lang/low-level/rust.md, lang/plt.md, design/ux/frontend.md
│   │   └── HEADERS: project structure, executables, publish, registries, PEPs, build backends, distutils, setup, wheel, venv, pip, Poetry, pipx, diving in, scripts, 2019-2026 workflow, inheritance, migrate, denv, Build Standalone, lzma / SSL thing, antipatterns, pyenv, upgrades
│   ├── runtime.md
│   │   └── TOPICS: CPython internals — bytecode, JIT, C extensions, import system
│   │   └── SEARCH: PVM, PyO3, maturin, RustPython, PyPy, Cython, HPy, bytecode, GIL, free-threading, namespace packages, sys.path, circular imports
│   │   └── RELATED: lang/low-level/rust.md, lang/python/pkg.md, lang/productive/lua.md
│   │   └── HEADERS: alternatives, compilation, JIT, extensions, 🦀 PyO3, contributing, design, usage, governance, pytest choking on Python stupidity, exec, namespaces, scope, semantics, underscores
│   └── stdlib.md
│       └── TOPICS: Python stdlib — pathlib/files, serialization, HTTP/scraping, WSGI/ASGI
│       └── SEARCH: pathlib, csv DictReader/DictWriter, requests, BeautifulSoup, Scrapy, Selenium, WSGI vs ASGI, GitPython, strptime/strftime, re module
│       └── RELATED: design/architecture/#meta.md, design/system/infra.md, design/backend/fast-api.md, dsa/algos.md
│       └── HEADERS: env, files, pathlib, process exec, 🪲 jiter, json, 🍫 Marshmallow, orjson, HTTP (requests), scraping, server gateway (SGI), datetime, git, math, regex
```

## ml/
```
├── 01-build/
│   ├── classical.md
│   │   └── TOPICS: classical ML algorithms — CRFs, HMM, regression, KNN, trees, scikit
│   │   └── SEARCH: CRFs, HMM, linear regression, logistic regression, k-nearest neighbors, k-means, decision tree, SVM, naive Bayes, random forest, XGBoost, LightGBM, scikit-learn, scipy, statsmodels
│   │   └── RELATED: dsa/algos.md, data/analytics/stat.md
│   │   └── HEADERS: CRFs (Conditional Random Fields), HMM (Hidden Markov Models), 📈 linear regression, 🛖 KNN, decision tree, SVM, naive Bayes classifier, 🌳 random forest, XGBoost / LightGBM, scipy, scikit
│   ├── control.md
│   │   └── TOPICS: post-training and steering — RLHF, DPO, LoRA, prompting
│   │   └── SEARCH: DPO, RLAIF, RLHF, RLVR, LoRA, activation steering, DSPy, few-shot, chain of density, context rot, temperature, top-k, top-p, logit bias
│   │   └── RELATED: ml/01-build/training.md
│   │   └── HEADERS: DPO, RLAIF, RLHF, prompting (DSPy)
│   ├── llms.md
│   │   └── TOPICS: LLM architecture history and model timeline, BERT to DeepSeek
│   │   └── SEARCH: encoder-only, decoder-only, encoder-decoder, multimodal, Eliza, nanoGPT, BERT, T5, GPT-2, GPT-3, CLIP, Stable Diffusion, Llama, DeepSeek, AGI, TinyML, OCR, VQA
│   │   └── RELATED: ml/01-build/neural-networks.md, ml/01-build/training.md
│   │   └── HEADERS: encoder-only, decoder-only, encoder-decoder, multimodal, Eliza-now, Google Translate, BERT (2018), T5 (2019), GPT-2 (2019), GPT-3 (2020), CLIP (2021), Stable Diffusion (2022), Llama (2023), DeepSeek (2024)
│   ├── neural-networks.md
│   │   └── TOPICS: neural network fundamentals, architectures, and DL frameworks
│   │   └── SEARCH: activation function, weighted sum, backpropagation, forward propagation, MLP, CNN, RNN, transformers, MoE, mixture of experts, tensorflow, keras, tinygrad, pytorch, jax, autograd, JIT, XLA, n-gram
│   │   └── RELATED: ml/01-build/llms.md, ml/01-build/repr.md
│   │   └── HEADERS: weights, activations, layers, forward pass, backprop, MLP, CNNs, RNNs, transformers, tensorflow, tinygrad, pytorch, jax, n-grams
│   ├── nlp.md
│   │   └── TOPICS: NLP primitives — tokenization, sentiment analysis, spaCy, speech
│   │   └── SEARCH: spaCy, NLTK, VADER, Hugging Face Transformers, sentiment analysis, word cloud, speech recognition, sentiment polarity, subjectivity
│   │   └── RELATED: ml/03-eng/classification.md, ml/01-build/repr.md
│   ├── repr.md
│   │   └── TOPICS: vectors, tokenization, and embeddings — the representation layer for NLP/LLMs
│   │   └── SEARCH: cosine similarity, dot product, norm, dimensionality, Word2Vec, BPE, WordPiece, SentencePiece, tiktoken, vocabulary, sentence-transformers, all-MiniLM-L6-v2, BGE-M3, Cohere Embed v4, voyage, text-embedding-3-large, MLX, n-gram
│   │   └── RELATED: ml/01-build/nlp.md, ml/03-eng/vector-db.md, ml/03-eng/semantic-search.md, ml/03-eng/topic-modeling.md, lang/python/stdlib.md
│   │   └── HEADERS: numpy, vocabulary, splitting algos, BPE (byte pair encoding), WordPiece, SentencePiece, models
│   └── training.md
│       └── TOPICS: training pipeline — pretraining, data, finetuning, LoRA, evaluation metrics
│       └── SEARCH: pretraining, fine-tuning, LoRA, PEFT, QLoRA, SFT, DPO, domain adaptation, FineWeb, Common Crawl, C4, MLflow, precision, recall, F1, AUC-ROC, BLEU, ROUGE, perplexity, knowledge distillation
│       └── RELATED: ml/01-build/control.md, ml/01-build/llms.md, ml/02-srv/inference.md
│       └── HEADERS: these fucking goofs, features / labels, 💐 learn w/ Iris, curation (FineWeb), supervised, unsupervised, reinforcement, MLflow, small scale from scratch, domain adaption, SFT, PEFT / LoRA
├── 02-srv/
│   ├── inference.md
│   │   └── TOPICS: inference serving — prefill/decode, batching, KV cache, quantization
│   │   └── SEARCH: TTFT, TPOT, TPS, prefill, decode, KV cache, PagedAttention, quantization, speculative decoding, tensor parallelism, expert parallelism, disaggregation, vLLM, TGI, Triton, prefix caching, small language models
│   │   └── RELATED: ml/01-build/llms.md, ml/03-eng/rag.md, design/system/infra.md
│   │   └── HEADERS: prefill, decode, why the split matters, batching, prefix caching, KV-cache management, quantization, speculative decoding, parallelism, disaggregation, VLLM, TGI, Triton, scheduler, routing, streaming, SLM
│   └── orchestration.md
│       └── TOPICS: LLM app orchestration frameworks — LangChain, LlamaIndex, LangGraph
│       └── SEARCH: LangGraph, LangChain, LlamaIndex, RAGFlow, LightRAG, Hugging Face transformers, ChromaDB, BAAI/bge-small-en-v1.5, zero-shot classification, sentiment pipeline
│       └── RELATED: ml/03-eng/rag.md, ml/03-eng/vector-db.md
│       └── HEADERS: Codex answer, LangGraph, LangChain, llama-index, RAGFlow, lightRAG, Hugging Face
└── 03-eng/
    ├── agents.md
    │   └── TOPICS: agent harness internals — sandboxing, model routing, memory, tool calling, MCP
    │   └── SEARCH: PreToolUse hook, denylist, Seatbelt, sandbox-exec, srt, nono, Docker sandbox, Claude Opus/Sonnet/Haiku pricing, extra usage, ccusage, tokscale, context window, compaction, AGENTS.md, CLAUDE.md, slash commands, skills, hooks, ACP, MCP, structured output, ReAct loop, harness, OpenHands, web search Exa Tavily
    │   └── RELATED: tools/clankers/claude.md, tools/clankers/codex.md, design/system/cloud.md, design/architecture/#meta.md, ml/02-srv/orchestration.md
    │   └── HEADERS: denylist, runtime, OS (Seatbelt, nono), container, Pi, Claude, Codex, Anthropic, big guys, Qwen, Deepseek, GLM, OpenCode Go / Zen, OSS - hosted, OSS - ur hardware, calculators, budgets, usage logs, pre-flight calculator, 🥧 pi, bargainbot, ccusage, Tokscale, security, cross-language distro, model routing, rules, specs, memory, window, plan mode, cmd, skills, hooks, ACP, MCP, CLI, structured output, file reads, sessions, state / control loop, orchestration, example workflow, 👐 OpenHands, web search
    ├── classification.md
    │   └── TOPICS: classification patterns — routing, moderation, tagging, intent
    │   └── SEARCH: intent classifier, tool-calling routing, customer support routing, banking assistant intent, informational/navigational/transactional intent, content moderation
    │   └── RELATED: ml/01-build/nlp.md, ml/03-eng/domains.md
    │   └── HEADERS: text classification / intent classifer
    ├── domains.md
    │   └── TOPICS: multimodal AI task catalog — audio, vision, tabular, RL
    │   └── SEARCH: ASR, TTS, STS, Whisper, Parakeet, Handy, WisprFlow, OCR, VQA, CLIP, YOLO, CenterNet, object detection, image segmentation, video classification, tabular regression, reinforcement learning robotics
    │   └── RELATED: ml/01-build/nlp.md, ml/01-build/llms.md
    │   └── HEADERS: CLI, STT / ASR, TTS
    ├── extraction.md
    │   └── TOPICS: unstructured-to-structured extraction pipeline — parsing, NER, summarization
    │   └── SEARCH: pdfannots, markitdown, kreuzberg, pdf-craft, liteparse, parsr, poppler, pdftotext, Apache Tika, named entity recognition, NER, spaCy, gazetteers, map-reduce summarization
    │   └── RELATED: ml/01-build/nlp.md, dsa/algos.md
    │   └── HEADERS: tools, clean up, entity recognition, summarization
    ├── rag.md
    │   └── TOPICS: retrieval-augmented generation pipeline — indexing, retrieval, generation, failure modes
    │   └── SEARCH: chunking, docling, chonkie, reranker, Cohere rerank, LangChain, LlamaIndex, RAGFlow, LightRAG, graph RAG, RDF, OWL, Neo4j, Cypher, hybrid RAG, agentic RAG, vectorless RAG, cache-augmented generation, RAGAS, ARES, TruLens
    │   └── RELATED: ml/03-eng/vector-db.md, ml/03-eng/semantic-search.md, ml/02-srv/orchestration.md, ml/02-srv/inference.md, ml/03-eng/agents.md
    │   └── HEADERS: load, parse, clean, chunk (docling, chonkie), embedding, index / vector db, rewrite, retrieval, filter, rerank, pack context, generation, cite / verify, retrieval miss, bad chunking, context dilution, hallucinated citation, graph RAG, supporting pieces, flavors
    ├── semantic-search.md
    │   └── TOPICS: semantic vs. keyword search, embeddings-based retrieval
    │   └── SEARCH: TF-IDF, bag of words, BM25, hybrid search, BERT, Sentence-BERT, GLiNER, vector similarity, cosine similarity, pgvector music, erwindb
    │   └── RELATED: dsa/algos.md, ml/03-eng/vector-db.md, ml/03-eng/rag.md, ml/01-build/repr.md
    │   └── HEADERS: hybrid
    ├── topic-modeling.md
    │   └── TOPICS: unsupervised topic discovery — BERTopic pipeline, corpus clustering
    │   └── SEARCH: BERTopic, UMAP, HDBSCAN, c-TF-IDF, topic clusters, corpus exploration, coherence, separability
    │   └── RELATED: ml/01-build/nlp.md, ml/03-eng/classification.md, ml/03-eng/semantic-search.md, ml/03-eng/extraction.md
    │   └── HEADERS: what problem, vs. classification vs. semantic search, pipeline, embeddings, UMAP, HDBSCAN, c-TF-IDF, where it fits, backend implementation shape, eval, when to use, backend idiot mental model
    └── vector-db.md
        └── TOPICS: vector database comparison and hands-on ChromaDB/RAG walkthrough
        └── SEARCH: ChromaDB, Pinecone, pgvector, S3 Vectors, Qdrant, ParadeDB, Pixeltable, turbopuffer, Weaviate, Zilliz Milvus, HNSW, IVFFlat, cosine similarity, sentence-transformers, all-MiniLM-L6-v2, dot product, employee handbook demo
        └── RELATED: ml/03-eng/rag.md, ml/03-eng/semantic-search.md, ml/01-build/repr.md
        └── HEADERS: ChromaDB, Pinecone, pgvector, S3 Vectors, qdrant, ParadeDB, Pixeltable, turbopuffer, weaviate, zilliz, vector db intro, working with vectors, word/text embeddings, querying, RAG context prompt
```

## tools/
```
├── clankers/
│   ├── #meta.md
│   │   └── TOPICS: agentic coding workflow features — sessions, remote/mobile, subagents, TDD
│   │   └── SEARCH: OpenCode, Amp, session naming/retention, Beads task mgmt, Ralph loop, Playwright/site-clone, Conductor, VLIW kernel challenge, worktrees, showboat
│   │   └── RELATED: tools/clankers/pi.md, tools/za/git.md, computation/processors/vliw.md
│   │   └── HEADERS: 🌻 FEATURES, sessions, remote (termux), handoff (Beads), testing, playright, showboat, 🏎️ GOING FASTER, worktrees, subagents, parallel, 🚂 Conductor, Ralph
│   ├── amp.md
│   │   └── TOPICS: survey of AI coding CLI/IDE alternatives to Claude Code
│   │   └── SEARCH: Amp, Gemini CLI, OpenCode, Synthcoda, Crush, open claw, Zed AI, aider, mods, llm (Datasette), Elia, Cursor, Windsurf, Codeium, Devin, chat GUIs
│   │   └── RELATED: tools/clankers/claude.md, tools/clankers/codex.md, tools/clankers/pi.md, tools/feedback/vim.md
│   │   └── HEADERS: 🎯 TRY OUT, 🏳️‍🌈 Gemini, 🔳 OpenCode, Synthcoda, ⚰️ LEGACY INTERFACES, extensions, 🌠 Crush, 🦞 open claw, IDE (Zed), 🔻 aider, mods, llm, Elia, GUI
│   ├── claude.md
│   │   └── TOPICS: Claude Code config, plugins, subscription vs API cost control, install methods
│   │   └── SEARCH: CLAUDE.md, settings.json, hooks, plugins config, API key vs Pro subscription, usage caps, terminal-setup, vim mode, --resume, npm/bun/native installer, NVM/Homebrew conflict
│   │   └── RELATED: tools/clankers/codex.md, ml/03-eng/agents.md, guts/operating-systems/denv.md
│   │   └── HEADERS: 🌐 CONTEXT, spec, plugins, 💵 COST CONTROL, math, clean up, setup, 🎛️ CONFIG, files, resume, phone / remote control, 🟨 ZA, install
│   ├── codex.md
│   │   └── TOPICS: OpenAI Codex CLI setup, sessions, config vs Claude
│   │   └── SEARCH: AGENTS.md, config.toml, codex resume, rg over ~/.codex/sessions, gpt-5.4, readline
│   │   └── RELATED: tools/clankers/claude.md, tools/clankers/pi.md
│   │   └── HEADERS: 🟨 ZA, sessions, config
│   └── pi.md
│       └── TOPICS: Pi (badlogic) coding agent — session trees, branching, built-in commands, config
│       └── SEARCH: /tree /fork /clone /compact, session branches, AGENTS.md, settings.json, keybindings, non-interactive mode
│       └── RELATED: tools/clankers/#meta.md, ml/03-eng/agents.md, tools/clankers/amp.md
│       └── HEADERS: 🎙️ JUST TALKING, branches, sessions, 🟠 USER-ADDED, extensions, pkgs, 🟨 ZA, built-in cmds, panels, Scripton-esque, config, CLI
├── feedback/
│   ├── IDE.md
│   │   └── TOPICS: editor comparison — VS Code, Zed, Emacs, Helix, JetBrains, fresh
│   │   └── SEARCH: Markdown outline bug, soft wrap, PyCharm speed search/keymaps, Zed vim mode, VS Code workspaces/keybindings, org mode, catppuccin
│   │   └── RELATED: tools/feedback/vim.md, ml/03-eng/agents.md
│   │   └── HEADERS: 🦚 ALTERNATIVES, design, Emacs, fresh, Helix, Jetbrains, Zed, 🏭 VS Code, config, negatives, workspaces, installs
│   ├── debug.md
│   │   └── TOPICS: Python debugging internals and tools — pdb, ipdb, AST, inspect
│   │   └── SEARCH: sys.settrace, bdb, pdbpp, .pdbrc, debugpy, ipdb, inspect.getsource, pdb.pm(), pyastgrep, stackprinter
│   │   └── RELATED: lang/python/stdlib.md
│   │   └── HEADERS: 🐛 DEBUG, alternatives, AST, inspect, pdb, pudb
│   ├── neovim.md
│   │   └── TOPICS: Neovim config rebuild — LazyVim, LSP/Mason, Telescope, aerial outliner, plugins
│   │   └── SEARCH: LazyVim, Mason, nvim-cmp, lsp-zero, aerial.nvim, Telescope, treesitter, catppuccin, barbar, oil.nvim, mini.nvim, highlight groups
│   │   └── RELATED: guts/operating-systems/interfaces.md, tools/za/git.md, guts/compilers/cleanup.md
│   │   └── HEADERS: 🗓️ 2026 RESTART, workspaces, MD fmt, reqs, preview images, problems w/ Lazy, files / opts / keys, port Ekphos, cleanup, 🛠️ UTILS, outliner, highlight, LSP, fold, git, lint, 🔍 SEARCH, fuzzy, Telescope, marks, 📦 PLUGINS / PACKAGES, fs layout, distros (LazyVim), lazy, config, built-in, 🟨 ZA, help
│   ├── notebooks.md
│   │   └── TOPICS: REPL/notebook taxonomy — Jupyter, Marimo, Quarto, LaTeX/Markdown/PDF publishing
│   │   └── SEARCH: Jupyter, Marimo WASM, Quarto qmd, jupytext, Sybil doctest, markdown-it-py, mistune, glow, mdcat, LaTeX packages, pdftk, PDF readers, MDX/MyST
│   │   └── RELATED: data/analytics/BI.md, domains/stem/documentation/notes.md, guts/compilers/runtimes.md
│   │   └── HEADERS: 📔 NOTEBOOK, design, information design / Bret Victor, hosted, 🟧 Jupyter, 🟩 Marimo, Scripton, 📜 DOCUMENTS, LaTeX, Markdown, PDF, 🔵 Quarto
│   ├── repl.md
│   │   └── TOPICS: Python REPL tooling — iPython config, PYTHONSTARTUP, object inspection
│   │   └── SEARCH: ipdb, wat, godump, konch, PYTHONSTARTUP, ipython_config.py, %debug, %paste, autoreload, stack traces
│   │   └── RELATED: tools/feedback/vim.md, lang/python/stdlib.md
│   │   └── HEADERS: 👾 REPL, features, 🟦 iPython, startup
│   └── vim.md
│       └── TOPICS: Vim/Neovim core semantics — buffers, modes, motions, operators, registers, config
│       └── SEARCH: barbar.nvim tabline, jumplist, visual block mode, macros, undofile, leader key, vimrc, runtimepath, ftplugin, augroup
│       └── RELATED: guts/operating-systems/linux.md, guts/operating-systems/interfaces.md, tools/feedback/neovim.md, tools/za/git.md
│       └── HEADERS: 🔳 ORG, buffers, tabs / sessions, windows, workspaces, 🔢 MODES, normal, visual, command, ⭕️ CORE, motions, operators, registers, 🎛️ CONFIG, vimrc, options, paths, mappings
├── os/
│   ├── files.md
│   │   └── TOPICS: filesystem tools — fuzzy finders, listers, explorers, yazi plugin dev
│   │   └── SEARCH: fs-meta metadata idea, broot, fzf, Telescope, Television, eza, lla, lsd, yazi sympop plugins, fd, zoxide, fselect, watchexec, mprocs, trash utils
│   │   └── RELATED: tools/feedback/vim.md, dsa/algos.md, ml/03-eng/agents.md
│   │   └── HEADERS: 🕉️ FS-META, init, bad, maybe, 🧸 FUZZY FIND / PICKER, 🟦 broot, 🌸 fzf, 🔭 Telescope, 📺 Television, 📋 LISTERS, reqs, 🪨 eza, 🇲🇦 lla, 🤪 lsd, 🔍 EXPLORERS, browsr, 🦆 yazi, 🟨 ZA, finders (fd), differs, editors, jumpers (zoxide), trash, watchers
│   ├── interfaces.md
│   │   └── TOPICS: window managers, desktop environments, shells (zsh/fish), readline, prompt
│   │   └── SEARCH: i3/yabai/Aerospace, Raycast hotkeys, Hammerspoon, Karabiner, TTY cooked/raw mode, PTY, job control, atuin, readline vi mode, starship, oh-my-posh, powerline-shell
│   │   └── RELATED: tools/za/keyboards.md, guts/operating-systems/containers.md, tools/za/it.md
│   │   └── HEADERS: 🖥️ DESKTOP ENVIRONMENT, compositors, managers, launcher / workflows (Raycast), 🐚 SHELL, subshells, 🖨️ TTY, 🐠 fish, 🦓 zsh, 📜 history (atuin), 📝 line editor (readline), 🪧 prompt (oh-my-posh)
│   ├── monitoring.md
│   │   └── TOPICS: system monitoring CLI — disk, CPU/mem, ports, progress bars, psutil
│   │   └── SEARCH: mactop, macchina, dust, duf, ncdu, procs, btop, glances, havn, ss, tqdm, rich progress bars, psutil process_iter
│   │   └── RELATED: design/system/telemetry.md
│   │   └── HEADERS: 🔬 MONITORING, witr, disk (dust/df), mem/CPU (ps/procs), ports (havn), progress bars (tqdm), psutil
│   ├── multiplexers.md
│   │   └── TOPICS: Zellij and tmux terminal multiplexers — sessions, panes, layouts, config
│   │   └── SEARCH: Zellij config.kdl, session resurrection, stacked/floating panes, zjstatus, catppuccin zellij, tmux windows/sessions, tpm
│   │   └── RELATED: tools/feedback/IDE.md, tools/os/interfaces.md, tools/feedback/vim.md, tools/za/it.md
│   │   └── HEADERS: 🧩 ZELLIJ, scrollback buffer, sessions, tabs, panes, layouts, basics, modes, plugins, config, cleanup, design, workspaces, shells, 🍵 ALTERNATIVES, ⏳ prise, 🟩 tmux, tuios, 🟨 ZA, semantics
│   ├── terminals.md
│   │   └── TOPICS: terminal emulator internals — color, ghostty config, iTerm arrangements, Wave
│   │   └── SEARCH: ANSI escape codes, LS_COLORS, vivid, xterm-256color vs true color, ghostty splits/themes/fonts/keybinds, iTerm profiles/arrangements, herdr, cmux
│   │   └── RELATED: domains/art/viz/color.md, tools/za/it.md, tools/os/files.md
│   │   └── HEADERS: 🔬 INTERNALS, color, keys, 🦑 OPTIONS, 😑 cmux, 🐮 herdr, 👻 ghostty, 🍎 iTerm, 🍃⭐️ Wave
│   └── text.md
│       └── TOPICS: shell text-processing tools — awk, bat, ripgrep, sed, coreutils
│       └── SEARCH: awk snippets, bat config/themes, ripgrep glob flags/.rgignore, sed BSD vs GNU, tr/cut/uniq/join/paste, modern-unix Rust rewrites, pbcopy
│       └── RELATED: tools/za/git.md, dsa/algos.md, tools/feedback/vim.md, data/analytics/eda.md
│       └── HEADERS: ✏️ TEXT, awk, pager (bat), search (ripgrep), stream edit (sed), string processing, 🟨️ ZA, coreutils, clipboard
└── za/
    ├── git.md
    │   └── TOPICS: Git internals, GitHub CLI/Actions, branch/commit/rebase workflow, tooling, servers
    │   └── SEARCH: gh CLI aliases, GitHub Actions, jj (jujutsu), lazygit, delta/diff-so-fancy, tig/serie, rebase -i, worktrees, git bisect/reflog, submodules, GitLab deploy tokens, monorepo, Gitea/Forgejo/Codeberg
    │   └── RELATED: tools/clankers/#meta.md, lang/python/stdlib.md, guts/protocols/spec.md, guts/security/exploits.md
    │   └── HEADERS: 🐙 GITHUB, Actions, CLI, Markdown, repos, assessment tool, search, 🔬️ INTERNALS, states, design, jj, 🛠️ TOOLING, ⬆️ GUI (GitUp), 🔻 pager (delta), 🐼 porcelain (lazygit), ⛳️ repo browser (Tig | serie), tracker (jiancha), 🏗️ WORKFLOW, branch, commit, tags, diff, hooks, log, cherry pick, merge, remotes, stash, undo, the past (blame / bisect), workflow, worktrees, 🟨 ZA, config, monorepo, review, server
    ├── hw.md
    │   └── TOPICS: personal machine history/specs, monitor formulas, peripherals
    │   └── SEARCH: mbp14 Mojave upgrade, mini23 specs, PPI/aspect-ratio formulas, BenQ/Dell monitor models, KVM wiring, iPad Procreate, WhatsApp number migration, screencast gear
    │   └── RELATED: ml/03-eng/agents.md, domains/stem/documentation/notes.md, domains/art/viz/draw.md
    │   └── HEADERS: 📋 MANIFEST, mbp14, mini23, 🏭 MANUFACTURERS, 🍎 Apple, 🐧 Linux, 🪟 Windows, 🖥️ MONITORS, aspect ratio, coloration, frames, pixels, specs, models, 🟨️ ZA, cameras, iPad, KVM, mice, phone, screencast
    ├── it.md
    │   └── TOPICS: backup/sync strategy, restic, homelab/self-hosted media, cmus, metadata tagging
    │   └── SEARCH: Time Machine, restic init/backup/forget/prune, rclone/syncthing, cmus kcm/playlists, beets MusicBrainz tags, yt-dlp config, Jellyfin/Navidrome
    │   └── RELATED: data/transactions/sql.md, tools/za/git.md, design/system/infra.md, domains/stem/documentation/notes.md
    │   └── HEADERS: 🖲️ BACKUP, catalog, mini23 ➡️ toshiba-26, reimage, sync, restic, 🗂 HOMELAB, fs, media servers, movies, photos, 🎶 MUSIC, pydub (editing), cmus, metadata (beets), youtube-dl
    └── keyboards.md
        └── TOPICS: ZSA Voyager keymap/firmware, RSI, keycaps/switches, DIY ergo boards
        └── SEARCH: QMK, Oryx, ZMK, home row mods, tap-hold/chordal hold, combos, one-shot modifiers, Kailh/Gateron switches, keycap profiles, Voyager/Moonlander/Ergodox, Corne/Iris/Lily58
        └── RELATED: guts/operating-systems/distros.md
        └── HEADERS: 📐 LAYOUT, question, firmware, keys, layers, multiplex, HRM, 🏎️ SPEED, typing, layouts, 🧩 COMPONENTS, caps, switches, ⌨️ MODELS, BYO, ergo
```

# KEY CROSS-REFERENCES

DATA PIPELINE
* `data/transactions/sql.md` ↔ `data/transactions/orm.md` ↔ `data/internals/` (engines, indexing)
* `data/analytics/dataframes.md` ↔ `data/analytics/stat.md` ↔ `data/analytics/eda.md`
* `data/analytics/warehouse.md` ↔ `data/analytics/lake.md` → DuckDB, Iceberg, dbt
* `data/dbms/` (postgres, sqlite, duckdb, distributed) → engines and tooling
* `domains/stem/math/core.md` → math foundations

ML / AI
* `ml/01-build/` → classical, neural-networks, llms, training, control, repr, nlp
* `ml/02-srv/` → inference, orchestration
* `ml/03-eng/` → rag, vector-db, semantic-search, agents, classification, extraction, topic-modeling
* `data/analytics/stat.md`, `dsa/algos.md` → underpinnings

COMPUTATION (from-scratch CS)
* `computation/foundations/` → logic gates, information, compression, entropy
* `computation/{memory,processors,hardware,models}/` → the machine bottom-up
* `dsa/` (01-adt → 05-domains) → data structures & algorithms taxonomy

WEB / UX
* `design/ux/html.md`, `design/ux/css.md`, `design/ux/frontend.md` → SSGs, Tailwind, htmx/Datastar
* `design/ux/mobile.md` → Tauri, Iced, SwiftUI
* `design/ux/terminal.md` → Click, Textual, ratatui, gum
* `lang/productive/js.md` → JS runtimes, bundlers
* `domains/art/viz/` → color, typography, web-design

BACKEND / SYSTEM DESIGN
* `design/backend/` → api, django, flask, fast-api
* `design/architecture/` → code, domain, design-patterns, test, profiling, #meta
* `design/system/` → distributed, queues, caches, deployment, infra, cloud, aws, telemetry, workflow, progression, patterns, middleware

PYTHON
* `lang/python/*.md` → collections, logic, obj, pkg, runtime, stdlib, cq
* `design/backend/{flask,django,fast-api}.md` → web frameworks
* `tools/feedback/{debug,repl,notebooks}.md` → dev workflow

AGENTIC / TOOLS
* `tools/clankers/` → claude, codex, amp, pi, #meta
* `ml/03-eng/agents.md` → harness internals, sandboxing, MCP
* `guts/compilers/runtimes.md` → sandboxing, VMs, FFI

GUTS (low-level / infra)
* `guts/network/` → http, application, tcp-ip, link
* `guts/operating-systems/` → linux, containers, threads, bash, distros, denv
* `guts/protocols/` → serde, spec, edi
* `guts/security/` → auth, cryptography, exploits
* `guts/compilers/` → pipeline, models, runtimes, cleanup

EDITORS / TERMINAL
* `tools/feedback/{vim,neovim,IDE}.md` → editors
* `tools/os/` → files, interfaces, multiplexers, terminals, text, monitoring
* `tools/za/` → git, keyboards, hw, it
