import {isValidMoveType,TeamType,PieceType } from "../types/RefereeTypes"

export default class Referee {
    isValidMove({px,py,x,y,type,teamType}:isValidMoveType) {
        
        if(teamType === TeamType.OUR &&  type === PieceType.PAWN){
            if(py === 1 && px === x && (y - py === 1 || y - py === 2)){
                return true
            } else if(px === x && y - py === 1) {
                return true
            }    
        }
        return false
    }
}