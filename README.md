# Supervive Vault Trainer

A fan-made, unofficial mini-game by Colin Auberger, based on the vault mechanic from **Theorycraft Games Inc.'s SUPERVIVE**.

## How to play

On PC, press `E` to initiate a round and `E` again to attempt stopping the cursor within the green range. Customize your experience with various options.

## Upcoming features

- Detailed information about vault mechanics on the website.
- Optional timer between rounds.
- Option to mimic teammates destroying red pylons.
- Tracking of vault health and time to crack the vault for scoring purposes.
- Accuracy and error information displayed at the end of each round.

## In-game vault mechanics (for reference)

Interact with the vault gate to trigger the lock-picking mini-game. A green circle expands with a countdown timer before the yellow cursor begins to move.

### Success:

Stopping the cursor in a green area deals damage to the vault gate and increases the lock-picking difficulty by reducing the area sizes.

- **Good Stop:** Stopping the cursor in the darker green area deals 3063 damage to the vault gate.
- **Perfect Stop:** Stopping the cursor in the lighter green area results in a "perfect" stop, dealing 6125 damage to the vault gate and spawning a red pylon (maximum of 2).
- **Teammate Assistance:** Teammates can destroy red pylons to reduce difficulty and directly damage the vault gate for an additional 6125 damage.

### Fail:

A failed stop decreases difficulty, but spawns blue orbs that float toward you. Teammates must destroy these orbs before they reach you to avoid taking damage and being forced out of the lock-picking mini-game.

- **Stopping too early or too late.**
- **Exiting prematurely.**
- **Waiting for 2 laps.**

## License

MIT License - Copyright (c) 2024 Colin Auberger
