import './Chessboard.css'
import { CreateBoard } from '../../utils/createBoard';
import { CreatePieces } from '../../utils/createPieces';
import { Piece } from '../../types/Piece';
import React, { useRef } from 'react';


export default function Chessboard() {
    const boardRef: any = useRef<HTMLElement>();
    const pieces: Piece[] = CreatePieces();
    const board: any[] = CreateBoard(pieces);

    let activePiece: HTMLElement | null = null

    const grabPiece = (e: React.MouseEvent) => {
        let element = e.target as HTMLElement
        if(element.classList.contains('tile-piece')){
            activePiece = element;
        }
    }
    const movePiece = (e: React.MouseEvent) => {
        const coorLeft = boardRef.current.offsetLeft;
        const coorRight = boardRef.current.offsetLeft + boardRef.current.offsetWidth;
        const coorTop = boardRef.current.offsetTop;
        const coorBottom = boardRef.current.offsetTop + boardRef.current.offsetHeight;
        const x = e.clientX;
        const y = e.clientY;
        let coorChessboard = coorLeft < x && coorRight > x && coorTop < y && coorBottom > y;
        if(activePiece && coorChessboard) {
          activePiece.style.position = 'absolute';
          activePiece.style.left = `${x - 50}px`;
          activePiece.style.top = `${y - 50}px`;
        }
    }
    const dropPiece = (e: React.MouseEvent) => {
        activePiece = null;
    }
    
    return (
        <div 
        onMouseDown={(e) => grabPiece(e)} 
        onMouseMove={(e => movePiece(e))} 
        onMouseUp={e => dropPiece(e)}
        ref={boardRef} 
        className='chessboard'>
            {board}
        </div>
    )
}