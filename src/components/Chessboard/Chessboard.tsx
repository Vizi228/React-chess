import './Chessboard.css'
import { CreateBoard } from '../../utils/createBoard';
import { CreatePieces } from '../../utils/createPieces';
import { Pieces } from '../../types/Pieces';
import { useEffect, useRef, useState } from 'react';
import { dropPiece, grabPiece, movePiece } from '../../utils/chessMoves';
import Tile from './Tile';


export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabX, setGrabX] = useState<number>(0);
    const [grabY, setGrabY] = useState<number>(0);
    const [pieces, setPieces] = useState<Pieces[]>([]);
    const board: any[] = CreateBoard(pieces, Tile);
    const boardRef: any = useRef<HTMLElement>();

    useEffect(() => {
        setPieces(CreatePieces())
    },[])
    return (
        <div 
        onMouseDown={(e) => grabPiece({e, setGrabX, setGrabY, setActivePiece, boardRef})} 
        onMouseMove={(e => movePiece({e, boardRef, activePiece}))} 
        onMouseUp={e => dropPiece({e, activePiece, setActivePiece, boardRef,grabX,grabY,setPieces,pieces})}
        ref={boardRef} 
        className='chessboard'>
            {board}
        </div>
    )
}