import Chessboard from './components/Chessboard/Chessboard';
import './App.css'
import { CreateBoard } from './utils/createBoard';
import { CreatePieces } from './utils/createPieces';
import { Pieces } from './types/PiecesTypes';
import { useEffect, useRef, useState } from 'react';
import { dropPiece, grabPiece, movePiece } from './utils/chessMoves';
import Tile from './components/Chessboard/Tile';

function App() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [lastMovesPiece, setLastMovesPiece] = useState<object | null>(null)
    const [grabX, setGrabX] = useState<number>(0);
    const [grabY, setGrabY] = useState<number>(0);
    const [pieces, setPieces] = useState<Pieces[]>([]);
    const board: any[] = CreateBoard(pieces, Tile);
    const boardRef: any = useRef<HTMLElement>();
    useEffect(() => {
      setPieces(CreatePieces())
  },[])
  return (
    <div className='app'         
          onPointerDown={(e) => grabPiece({e, setGrabX, setGrabY, setActivePiece, boardRef})} 
          onPointerMove={(e => movePiece({e, boardRef, activePiece}))} 
          onPointerUp={e => dropPiece({e, activePiece, setActivePiece, boardRef,grabX,grabY,setPieces,pieces, lastMovesPiece, setLastMovesPiece})}
    >
      <Chessboard board={board} boardRef={boardRef}/>
    </div>
  );
}

export default App;
