
export default function GameOver( {winner, onRestart} ) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner ? <p>Player {winner} wins!</p> : <p>It's a draw</p>}
            <p>
                 <button onClick={onRestart}>Reset Game</button>
            </p>
        </div>
    );
}