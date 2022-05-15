import { useEffect, useState } from 'react';
import Square from './Square';

function Board({ board, turn }) {
  const [currentBoard, setCurrentBoard] = useState([]);

  const getXYPosition = (i) => {
    const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7);
    const y = turn === 'w' ? Math.abs(Math.floor(i / 8 - 8)) : Math.floor(i / 8 + 1);
    return [x, y];
  };
  const getPosition = (i) => {
    const [x, y] = getXYPosition(i);
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x];
    return `${letter}${y}`;
  };
  const isBlack = (i) => {
    const [x, y] = i;
    return (x + y) % 2 === 0;
  };
  useEffect(() => {
    turn && turn === 'w' ? setCurrentBoard(board) : setCurrentBoard(board.reverse());
  }, [board, turn]);

  return (
    <div className="board">
      {currentBoard &&
        currentBoard.map((piece, i) => {
          return (
            <Square
              piece={piece}
              position={getPosition(i)}
              key={i}
              black={isBlack(getXYPosition(i))}
            />
          );
        })}
    </div>
  );
}

export default Board;
