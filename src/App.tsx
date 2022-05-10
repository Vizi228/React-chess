import Chessboard from './components/Chessboard/Chessboard';
import './App.css'
import { CreateBoard } from './utils/createBoard';
import { CreatePieces } from './utils/createPieces';
import { Pieces } from './types/PiecesTypes';
import { useEffect, useRef, useState } from 'react';
import { dropPiece, grabPiece, movePiece } from './utils/chessMoves';
import Tile from './components/Chessboard/Tile';
import { grabPosition } from './types/MovesTypes';

function App() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [lastMovesPiece, setLastMovesPiece] = useState<object | null>(null)
    const [grabPosition, setGrabPosition] = useState<grabPosition | null>(null);
    const [currentTeam, setCurrentTeam] = useState<boolean>(true);
    const [pieces, setPieces] = useState<Pieces[]>([]);
    const board: any[] = CreateBoard(pieces, Tile);
    const boardRef: any = useRef<HTMLElement>();
    useEffect(() => {
      setPieces(CreatePieces())
  },[])
  return (
    <div className='app'         
          onPointerDown={(e) => grabPiece({e, setGrabPosition, setActivePiece, boardRef})} 
          onPointerMove={(e => movePiece({e, boardRef, activePiece}))} 
          onPointerUp={e => dropPiece({e, activePiece, setCurrentTeam,  currentTeam, setActivePiece, boardRef,grabPosition,setPieces,pieces, lastMovesPiece, setLastMovesPiece})}
    >
      <Chessboard board={board} boardRef={boardRef}/>
    </div>
  );
}

export default App;
