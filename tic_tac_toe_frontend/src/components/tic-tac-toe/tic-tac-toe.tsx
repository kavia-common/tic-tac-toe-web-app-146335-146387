import { component$, useStore, $, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./tic-tac-toe.css?inline";

type Player = "X" | "O" | null;

interface GameState {
  board: Player[];
  xIsNext: boolean;
  winner: Player;
  isDraw: boolean;
  moves: number;
}

/**
 * PUBLIC_INTERFACE
 * TicTacToe renders a two-player Tic Tac Toe game.
 * - Centered, responsive board with Ocean Professional theme.
 * - Displays current player, winner, and draw status.
 * - Includes New Game button.
 */
export const TicTacToe = component$(() => {
  useStylesScoped$(styles);

  const state = useStore<GameState>({
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null,
    isDraw: false,
    moves: 0,
  });

  // PUBLIC_INTERFACE
  const newGame = $(() => {
    state.board = Array(9).fill(null);
    state.xIsNext = true;
    state.winner = null;
    state.isDraw = false;
    state.moves = 0;
  });

  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  // PUBLIC_INTERFACE
  const calculateWinner = $((board: Player[]): Player => {
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  });

  // PUBLIC_INTERFACE
  const handleClick = $((index: number) => {
    if (state.winner || state.board[index]) return;

    const board = state.board.slice();
    board[index] = state.xIsNext ? "X" : "O";
    state.board = board;
    state.moves += 1;

    const w = (calculateWinner as any)(board) as Player;
    if (w) {
      state.winner = w;
    } else if (state.moves === 9) {
      state.isDraw = true;
    } else {
      state.xIsNext = !state.xIsNext;
    }
  });

  const currentPlayer: Player = state.xIsNext ? "X" : "O";

  return (
    <div class="game-container center">
      <section class="card game-card" role="region" aria-label="Tic Tac Toe Game">
        <header class="game-header">
          <h2 class="game-title">
            <span class="brand-mark" aria-hidden="true" />
            <span class="accent">Tic Tac Toe</span>
          </h2>
          <span class={`badge ${state.xIsNext ? "badge-primary" : "badge-secondary"}`}>
            Turn: {currentPlayer}
          </span>
        </header>

        <div class="board-wrapper" aria-live="polite">
          <div class="board" role="grid" aria-label="Game board">
            {state.board.map((value, i) => {
              const isDisabled = Boolean(state.winner || state.isDraw || value);
              const markClass = value === "X" ? "x" : value === "O" ? "o" : "";
              return (
                <button
                  key={i}
                  role="gridcell"
                  aria-label={`Cell ${i + 1}${value ? ` occupied by ${value}` : ""}`}
                  class={`cell ${markClass} ${isDisabled ? "disabled" : ""}`}
                  onClick$={() => handleClick(i)}
                  disabled={isDisabled}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div class="info-panel">
          {!state.winner && !state.isDraw && (
            <div class="status-line">
              <span class="status-dot" aria-hidden="true" />
              <span class="status">
                Next move: <strong class={state.xIsNext ? "badge-primary" : "badge-secondary"}>{currentPlayer}</strong>
              </span>
            </div>
          )}

          {state.winner && (
            <div class="status-line status-winner" role="status">
              🏆 Winner: <strong>{state.winner}</strong>
            </div>
          )}

          {state.isDraw && !state.winner && (
            <div class="status-line status-draw" role="status">
              🤝 It's a draw
            </div>
          )}

          <div class="controls">
            <button type="button" class="btn btn-primary" onClick$={newGame}>
              New Game
            </button>
          </div>

          <div class="subtle" aria-hidden="true">
            X plays in blue, O plays in amber. Good luck!
          </div>
        </div>
      </section>
    </div>
  );
});
