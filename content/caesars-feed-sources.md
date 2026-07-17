---
title: GTP Feed Sources — Comparison & Overview
description: A table of feed that we pull from and what they are used for.
---
## Feed Categories & Key Differences

### 🏟️ Incident / Live Data Feeds
These provide **real-time game events** (plays, scores, suspensions) that drive in-play models.

| Feed | What It Does | Key Characteristics |
|------|-------------|---------------------|
| **BetRadar (LiveScout)** | Real-time incident data from scouts at games or TV pictures | Largest coverage, but prone to generic "Bet Stops" that force suspensions for no clear reason. Official MLB data provider. Lost NFL rights to BetGenius. Covers NCAA Football, Basketball, Hockey, Tennis (ITF), Table Tennis |
| **BetGenius** | Incident data + full event pricing (combined solution) | Official NFL data rights holder. Lower-latency streaming feed. Easier suspension handling than BetRadar, but has message sequencing issues (missed sequence numbers force re-requests). Requires "booking" games before mapping IDs, which complicates fixture mapping |
| **RunningBall** (StatsPerform) | Pure incident feed for basketball & football | Highest quality and most reliable incident feed on the market, but more expensive and doesn't provide pricing — must pair with a separate pricing feed (e.g., TXOdds) |
| **IPSD** | Incident feed in the priority chain | Sits between BetGenius and RunningBall in the aggregation priority |
| **IMG** | Incident + pricing for ATP Tennis, Grand Slams, PGA/European Golf, UFC | Excellent data quality for tennis — enables automated match/fixture creation. Golf product is "world-class" and unmatched. Rights-based, so coverage is narrow but deep |

**Aggregation priority:** `manual → bet_genius → ipsd → running_ball → bet_radar_livescout`

---

### 💰 Pricing / Opinion Feeds
These provide **bookmaker odds and consensus lines** used to set pre-match pricing and feed internal models.

| Feed | What It Does | Key Characteristics |
|------|-------------|---------------------|
| **Don Best** | Consensus line from 100s of bookmakers | Primary driver of pre-match pricing for all major US sports (NFL, NBA, MLB, NHL). Currently only consuming the consensus line — not the full book-by-book data. Follows the market but doesn't lead it. Good for automation but limits competitive pricing |
| **Tipex (TXOdds)** | Asian market prices from high-liquidity Asian books | Primary feed for Soccer (Asian Handicap / Asian Goal Line). Most comprehensive Soccer pricing available. Also covers other sports but with lower liquidity. Used to create internal "WH Asian Lines" through a model |
| **Kero** | Opinion/pricing feed | Used alongside other opinion feeds in the pricing chain |

---

### 🎯 Player Props & SGP Feeds
These provide **specialized pricing** for player-level and same-game parlay markets.

| Feed | What It Does | Key Characteristics |
|------|-------------|---------------------|
| **Swish** | Player props (pre-match + in-play) + SGP pricing | Far and away the leading US player props provider. Handles creation, pricing, AND settlement of prop bets. Revenue share model (Caesars pays rev share on all bets routed through Swish, even non-prop SGPs). Covers NFL, NBA, MLB, NHL, NCAA |
| **BeSpin** | Player props for NFL & MLB | Secondary player props provider |
| **ZeroFlucs** | SGP pricing only | Covers NFL PM, NCAAF PM, NBA PM, NHL PM for same-game parlay correlation pricing |
| **SimpleBet** | Various in-play micro-markets | Being retired. Previously provided micro-markets (next play, next at-bat style) for NFL, NBA, MLB, NHL, NCAAF, NCAAB |

---

### 📊 Scoreboard / Supplementary

| Feed | What It Does |
|------|-------------|
| **StatsPerform (Stats)** | Drives customer-facing scoreboards in US and RoW. Used because BetRadar couldn't be published in the US due to licensing restrictions — Stats provides richer data for the front-end experience |

---

## How They Work Together (Example: NFL Game)

1. **Pre-match:** Don Best consensus → sets opening lines and main market prices
2. **Player props:** Swish → creates & prices prop markets, handles settlement
3. **SGP pricing:** ZeroFlucs → provides correlation pricing for same-game parlays
4. **In-play incidents:** BetGenius (primary, official rights) → real-time play data drives the in-play model
5. **Scoreboard:** StatsPerform → powers what the customer sees on-screen

---

## Full Source List

| # | Feed | Category |
|---|------|----------|
| 1 | BetRadar (LiveScout) | Incident / Live Data |
| 2 | BetGenius | Incident / Live Data + Pricing |
| 3 | RunningBall | Incident / Live Data |
| 4 | IPSD | Incident / Live Data |
| 5 | IMG | Incident / Live Data + Pricing |
| 6 | Don Best | Pricing / Opinion |
| 7 | Tipex (TXOdds) | Pricing / Opinion |
| 8 | Kero | Pricing / Opinion |
| 9 | Swish | Player Props + SGP |
| 10 | BeSpin | Player Props |
| 11 | ZeroFlucs | SGP Pricing |
| 12 | SimpleBet | Micro-markets (being retired) |
| 13 | StatsPerform | Scoreboard / Supplementary |
