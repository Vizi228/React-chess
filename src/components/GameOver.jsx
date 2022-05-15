import { resetGame } from '../Game';

export function GameOver({ result }) {
  return (
    <div className="over">
      <h3>GAME OVER!</h3>
      <p>Result - {result}</p>
      <button onClick={() => resetGame()}>New Game</button>
    </div>
  );
}
