---
title: Sportsbetting
description: All about sportsbetting
---

# Sports Betting Cheat Sheet

## 1. Core Concepts
- **Sportsbook**: The company accepting bets.
- **Market**: A specific bet you can place.
- **Handle**: Total amount wagered.
- **Hold**: Sportsbook's expected profit.
- **Juice / Vig**: The sportsbook's commission built into odds.

## 2. Odds Formats

### American Odds
- **-150**: Risk $150 to win $100 profit.
- **+150**: Risk $100 to win $150 profit.

### Decimal Odds
- 2.50 = Total return = Stake × 2.50

### Fractional Odds
- 5/2 = Win $5 for every $2 wagered.

## 3. Implied Probability
- Negative odds: `|odds| / (|odds| + 100)`
- Positive odds: `100 / (odds + 100)`

Examples:
| Odds | Probability |
|------|------------:|
| -110 | 52.4% |
| -200 | 66.7% |
| +100 | 50% |
| +200 | 33.3% |

## 4. Main Bet Types

### Moneyline (ML)
Simply pick who wins.

### Point Spread
Favorite must win by more than the spread.
Example:
- Chiefs -6.5
- Raiders +6.5

### Totals (Over/Under)
Bet whether combined score goes over or under a number.

### Run Line / Puck Line
Spread for baseball (±1.5) and hockey.

## 5. Player Props
Individual player statistics.

Examples:
- Passing yards
- Strikeouts
- Rebounds
- Touchdowns
- Anytime scorer
- First touchdown
- Assists
- Hits
- Home runs

## 6. Team Props
Examples:
- Team total points
- First team to score
- Team over/under
- Race to 20 points

## 7. Popular Markets
- First Half
- Second Half
- First Quarter
- Live Betting
- Alternate Lines
- Correct Score
- Winning Margin
- Double Chance (soccer)
- Draw No Bet
- Both Teams to Score (soccer)

## 8. Parlays
Multiple bets combined.
Every leg must win.

Pros:
- Huge payouts

Cons:
- Hard to hit

### Same Game Parlay (SGP)
Multiple bets from one game.

## 9. Round Robin
Creates several smaller parlays automatically.

## 10. Teaser
Moves the spread in your favor but lowers payout.

Mostly NFL/NBA.

## 11. Pleaser
Opposite of a teaser.
Better payout, harder odds.

## 12. Live Betting
Bet while the game is in progress.
Odds constantly change.

## 13. Cash Out
Settle a bet before it finishes.

Pros:
- Lock profit
- Reduce loss

Cons:
- Usually less value than letting the bet ride.

## 14. Line Movement
Odds change because of:
- Injuries
- Weather
- Sharp money
- Public betting
- Breaking news

### Reverse Line Movement
The line moves opposite public betting.
Often indicates respected ("sharp") bettors.

## 15. Sharp vs Public
### Sharp Bettors
Professional bettors using data.

### Public Bettors
Casual bettors.

Sportsbooks often respect sharp action.

## 16. Steam Move
Large, sudden line movement caused by respected bettors.

## 17. CLV (Closing Line Value)
Whether you got a better number than the closing line.
Consistently beating the closing line is considered a good long-term indicator.

## 18. Bankroll Management
- Never chase losses.
- Bet fixed units.

### Unit
Usually 1–2% of bankroll.

Example:
Bankroll = $1,000
1 Unit = $10–20

Typical sizing:
- 1 Unit: Normal
- 2 Units: Strong opinion
- 3+ Units: Rare

## 19. Expected Value (EV)
Positive EV means your estimated chance is higher than the sportsbook's implied probability.

Example:
Sportsbook implies 45%.
You estimate 52%.
Likely positive EV.

## 20. Common Terms
- Favorite
- Underdog
- Push
- Hook (.5)
- Bad Beat
- Backdoor Cover
- Hedge
- Middle
- Fade
- Tail
- Lock (never guaranteed)
- Trap Line (controversial concept)
- Pick'em (PK)

## 21. Reading Odds
- Bigger negative = stronger favorite.
- Bigger positive = bigger underdog.

## 22. Beginner Strategy
1. Learn moneylines and spreads.
2. Bet single wagers first.
3. Keep records.
4. Ignore "locks."
5. Compare odds at multiple sportsbooks.
6. Focus on one sport.
7. Manage your bankroll.

## 23. Example
NFL:
Chiefs -3 (-110)

Bet $110:
- Chiefs win by 4+ → Win $100.
- Chiefs win by exactly 3 → Push.
- Chiefs lose or win by 1–2 → Lose.

## 24. Red Flags
- Chasing losses
- Betting emotionally
- Betting every game
- Increasing bet size after losses
- Following picks blindly

## 25. Quick Reference

| Term | Meaning |
|------|---------|
| ML | Moneyline |
| ATS | Against the Spread |
| O/U | Over/Under |
| Prop | Proposition Bet |
| SGP | Same Game Parlay |
| EV | Expected Value |
| CLV | Closing Line Value |
| Vig | Sportsbook commission |
| Unit | Standard bet size |
| Hook | Half point |

Good betting is about making many disciplined, positive expected value decisions over time—not about guaranteeing wins on any single bet.
""")

out="/mnt/data/Sports_Betting_Cheat_Sheet.md"
pypandoc.convert_text(md,"md",format="md",outputfile=out,extra_args=["--standalone"])
print(out)
