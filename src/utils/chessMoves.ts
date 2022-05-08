import Referee from "../referee/Referee"
import { Move,Drop,Grab } from "../types/MovesTypes";

export const grabPiece = ({e, setGrabX , setGrabY, setActivePiece, boardRef} : Grab) => {
    let element = e.target as HTMLElement
    if(element.classList.contains('tile-piece')){
        const x = Math.floor((e.clientX - boardRef.current.offsetLeft) / 100);
        const y = Math.abs(Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100));
        setGrabX(x);
        setGrabY(y)
        setActivePiece(element)
    }
}
export const movePiece = ({e, boardRef, activePiece } : Move) => {
    const x = e.clientX;
    const y = e.clientY;
    const coorLeft = boardRef.current.offsetLeft + 15;
    const coorRight = boardRef.current.offsetLeft + boardRef.current.offsetWidth - 15;
    const coorTop = boardRef.current.offsetTop + 15;
    const coorBottom = boardRef.current.offsetTop + boardRef.current.offsetHeight - 15;
    if(activePiece && coorTop < y && coorBottom > y ) {
        activePiece.style.position = 'absolute';
        activePiece.style.top = `${y - 50}px`;
        activePiece.style.zIndex = '100';
    }
    if(activePiece && coorLeft < x && coorRight > x) {
        activePiece.style.left = `${x - 50}px`;
        activePiece.style.position = 'absolute';
        activePiece.style.zIndex = '100';
    }
}
export const dropPiece = ({e,activePiece,setPieces,setActivePiece,boardRef,pieces,grabX,grabY, setLastMovesPiece, lastMovesPiece} : Drop) => {
    let referee = new Referee();

    //Calculate board coor

    const coorLeft = boardRef.current.offsetLeft + 15;
    const coorRight = boardRef.current.offsetLeft + boardRef.current.offsetWidth - 15;
    const coorTop = boardRef.current.offsetTop + 15;
    const coorBottom = boardRef.current.offsetTop + boardRef.current.offsetHeight - 15;
    const x = e.clientX;
    const y = e.clientY;

    let coorChessboard = coorLeft < x && coorRight > x && coorTop < y && coorBottom > y;
    
    //Move Piece

    if(activePiece){
        const x = Math.floor((e.clientX - boardRef.current.offsetLeft) / 100);
        const y = Math.abs(Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100));
        //Update board
        if(!coorChessboard) {
            activePiece.style.position = 'relative';
            activePiece.style.removeProperty('top');
            activePiece.style.removeProperty('left');
            activePiece.style.removeProperty('z-index');
            setActivePiece(null);
            return
        }
        //Attack Logic
        const currentPiece = pieces.find(p => p.y === grabY && p.x === grabX);
        const attackedPiece = pieces.find(p => p.y === y && p.x === x);
        const validMove = referee.isValidMove({px: grabX, py: grabY, x, y, type: currentPiece.type,teamType: currentPiece.teamType, boardState: pieces,lastMovesPiece})
        const isEnPassantMove = referee.isEnPassantMove({x,y,boardState: pieces,teamType: currentPiece.teamType, lastMovesPiece})

        setPieces(pieces.map(item => {
            if(item.x === grabX && item.y === grabY){
                if(validMove){
                  item.x = x;
                  item.y = y;
                }
                else{
                 activePiece.style.position = 'relative';
                 activePiece.style.removeProperty('top');
                 activePiece.style.removeProperty('left');
                 activePiece.style.removeProperty('z-index');
                } 
            }
            return item
        }))
        if(isEnPassantMove){
            setPieces(pieces.filter(item => item !== isEnPassantMove))
        }
        if(attackedPiece && validMove) {
            setPieces(pieces.filter(item => item !== attackedPiece))
        }
        setLastMovesPiece(currentPiece)
        setActivePiece(null);
    }
}
