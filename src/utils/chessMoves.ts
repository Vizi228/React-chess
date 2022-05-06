import Referee from "../referee/Referee"
import { Move,Drop,Grab } from "../types/Moves";

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
export const movePiece = ({e, boardRef, activePiece} : Move) => {
    const coorLeft = boardRef.current.offsetLeft + 35;
    const coorRight = boardRef.current.offsetLeft + boardRef.current.offsetWidth - 35;
    const coorTop = boardRef.current.offsetTop + 35;
    const coorBottom = boardRef.current.offsetTop + boardRef.current.offsetHeight - 35;
    const x = e.clientX;
    const y = e.clientY;
    let coorChessboard = coorLeft < x && coorRight > x && coorTop < y && coorBottom > y;
    if(activePiece && coorChessboard) {
      activePiece.style.position = 'absolute';
      activePiece.style.left = `${x - 50}px`;
      activePiece.style.top = `${y - 50}px`;
    }
}
export const dropPiece = ({e,activePiece,setPieces,setActivePiece,boardRef,pieces,grabX,grabY} : Drop) => {
    let referee = new Referee();
    if(activePiece){
        const x = Math.floor((e.clientX - boardRef.current.offsetLeft) / 100);
        const y = Math.abs(Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100));
        
        setPieces(pieces.map(item => {
            if(item.x === grabX && item.y === grabY){
                if(referee.isValidMove({px: grabX, py: grabY, x, y, type: item.type,teamType: item.teamType})){
                  item.x = x;
                  item.y = y;
                }
                else{
                 activePiece.style.position = 'relative';
                 activePiece.style.removeProperty('top');
                 activePiece.style.removeProperty('left');
                } 
            }
            return item
        }))
        setActivePiece(null);
    }
}