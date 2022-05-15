import { useEffect, useState } from 'react';
import { gameSubject, initGame } from './Game';
import Board from './components/Board';
import './App.css';
import { GameOver } from './components/GameOver';

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board.flat());
      setResult(game.result);
      setIsGameOver(game.isGameOver);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="App">
      {isGameOver && isGameOver ? <GameOver result={result} /> : ''}
      <Board turn={turn} board={board} />
    </div>
  );
}

export default App;
