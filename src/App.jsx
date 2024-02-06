import {useState} from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-cominations";

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



function App() {

    const [gameTurns, setGameTurns] = useState([]);
    
    const activePlayer = derivedActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array => [...array])];
    gameTurns.forEach((turn) => {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
    });

    let winner;

    WINNING_COMBINATIONS.forEach((combination) => {
      const firstSquare = gameBoard[combination[0].row][combination[0].column];
      const secondSquare = gameBoard[combination[1].row][combination[1].column];
      const thirdSquare = gameBoard[combination[2].row][combination[2].column];

      if (firstSquare && 
        firstSquare === secondSquare && 
        firstSquare === thirdSquare) {
          winner = firstSquare;
          
      }
    });

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

    return (
      <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
          </ol>
          { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} /> }
          <GameBoard onSelectSquare={handleSelectSquare} 
          board={gameBoard}  />
        </div>
        <Log turns={gameTurns} />
      </main>
      </>
    )
}

export default App
