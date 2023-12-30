import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./WINING_COMBINATION.js";
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combinations of WINNING_COMBINATIONS) {
    const fSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const sSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const tSquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      fSquareSymbol &&
      fSquareSymbol === sSquareSymbol &&
      sSquareSymbol === tSquareSymbol
    ) {
      winner = players[fSquareSymbol];
    }
  }
  return winner;
}
function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activeplayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSqaue(rowIndex, colIndex) {
    // setActivePlayer((activePlayer) => (activePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTruns) => {
      const currentPlayer = derivedActivePlayer(prevTruns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTruns,
      ];
      return updatedTurns;
    });
  }
  function handleReStart() {
    setGameTurns([]);
  }
  function handlePnameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activeplayer === "X"}
            onChangeName={handlePnameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activeplayer === "O"}
            onChangeName={handlePnameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleReStart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSqaue}
          // activeplayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
