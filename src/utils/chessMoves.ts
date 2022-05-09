import Referee from "../referee/Referee"
import { Move,Drop,Grab } from "../types/MovesTypes";

export const grabPiece = ({e, setGrabPosition , setActivePiece, boardRef} : Grab) => {
    let element = e.target as HTMLElement
    if(element.classList.contains('tile-piece')){
        const x = Math.floor((e.clientX - boardRef.current.offsetLeft) / 100);
        const y = Math.abs(Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100));
        setGrabPosition({x,y})
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





export const dropPiece = ({e,activePiece,setPieces,setActivePiece,boardRef,pieces,grabPosition, setLastMovesPiece, lastMovesPiece} : Drop) => {
    let referee = new Referee();

    //Calculate board coor

    const coorLeft = boardRef.current.offsetLeft + 15;
    const coorRight = boardRef.current.offsetLeft + boardRef.current.offsetWidth - 15;
    const coorTop = boardRef.current.offsetTop + 15;
    const coorBottom = boardRef.current.offsetTop + boardRef.current.offsetHeight - 15;
    const x = e.clientX;
    const y = e.clientY;
    let coorChessboard = coorLeft < x && coorRight > x && coorTop < y && coorBottom > y;
    if(activePiece && grabPosition){
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
        const currentPiece = pieces.find(p => p.y === grabPosition.y && p.x === grabPosition.x);
        const attackedPiece = pieces.find(p => p.y === y && p.x === x);
        const validMove = referee.isValidMove({px: grabPosition.x, py: grabPosition.y, x, y, type: currentPiece.type,teamType: currentPiece.teamType, boardState: pieces,lastMovesPiece})
        const isEnPassantMove = referee.isEnPassantMove({x,y,boardState: pieces,teamType: currentPiece.teamType, lastMovesPiece})
        //Move Piece
        setPieces(pieces.map(item => {
            if(item.x === grabPosition.x && item.y === grabPosition.y){
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
