import {useState} from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-cominations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  });

  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  gameTurns.forEach((turn) => {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  });
  return gameBoard;
}

function App() {

    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = derivedActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex){
      setGameTurns((prevTurns) => {
        const currentPlayer = derivedActivePlayer(prevTurns);

        const updatedTurns = [
          { 
            square: {row: rowIndex, col: colIndex}, 
            player: currentPlayer },
             ...prevTurns
            ];

        return updatedTurns;
      });
    }

    function handleRestart(){
      setGameTurns([]);
    }

    function handlePlayerNameChange(playerSymbol, newName){
      setPlayers((prevPlayers) => {
        return {
          ...prevPlayers,
          [playerSymbol]: newName
        }
      });
    }

    return (
      <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player 
            initialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onChangeName={handlePlayerNameChange} />
            <Player 
            initialName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}/>
          </ol>
          { (winner || hasDraw) && <GameOver 
          winner={winner} 
          onRestart={handleRestart} /> }
          <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}  />
        </div>
        <Log turns={gameTurns} />
      </main>
      </>
    )
}

export default App

				   