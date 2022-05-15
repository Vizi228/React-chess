import { Move } from '../Game';

function Promote({ color, from, to }) {
  const pieces = ['R', 'Q', 'B', 'N'];
  return (
    <div className="promotion-main">
      {pieces.map((piece, i) => (
        <div
          key={i}
          className={`promotion-block ${i % 3 === 0 ? 'black' : ''}`}
          onClick={() => Move(from, to, piece.toLowerCase())}>
          <img className="promotion-image" src={`./assets/images/${color}${piece}.png`} alt="123" />
        </div>
      ))}
    </div>
  );
}

export default Promote;
