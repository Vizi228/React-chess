import {isValidMoveType,TeamType,PieceType, tileIsOccupiedType, tileOccupiedByOpponentType, isEnPassantMoveType } from "../types/RefereeTypes"

export default class Referee {
    tileIsOccupied({x,y,boardState}: tileIsOccupiedType): boolean{
        let inFrontOfTile = boardState.find(p => p.x === x && p.y === y)
        if(inFrontOfTile) return false
        else return true
    }
    tileOccupiedByOpponent({x,y,boardState, teamType}: tileOccupiedByOpponentType): boolean{
        let inSideOfTile = boardState.find(p => p.x === x && p.y === y && p.teamType !== teamType)
        if(inSideOfTile) return false
        else return true
    }
    isEnPassantMove ({x,y,boardState,teamType, lastMovesPiece}: isEnPassantMoveType){
        const team = teamType === TeamType.OUR
        const verticalMove = team ? -1 : 1;
        const enPassantCoor = team ? 5 : 2;
        const piece = boardState.find(p => p.x === x && p.y === y + verticalMove && p.teamType !== teamType && p.type === PieceType.PAWN)
        if(piece === lastMovesPiece && y === enPassantCoor) {
            return piece
        }
    }
    isValidMove({px,py,x,y,type,teamType,boardState,lastMovesPiece}:isValidMoveType) {
        if(type === PieceType.PAWN){
            //Start asset
            let team = teamType === TeamType.OUR
            let startRow = team ? py === 1 : py === 6;

            //Controlling Pawn Move
            let controlSideMoves = px === x;
            let controlFirstMove = team ?  y - py === 2 : y - py === -2;
            let controlOtherMove = team ? y - py === 1 : y - py === -1;
            //Reduce occupied movement
            let IsOccupied = (this.tileIsOccupied({x,y,boardState}) && this.tileIsOccupied({x,y: (team ? y-1 : y+1),boardState}));
            // Move Logic
            if(startRow && controlSideMoves && controlFirstMove  && IsOccupied){
                return true
            } else if(controlSideMoves && controlOtherMove && this.tileIsOccupied({x,y,boardState})) {
                return true
            }
            // Attack Logic
            let validFrontAttack = (x - px === 1 || x - px === -1);
            let validSideAttack = (team ? y - py === 1 : y - py === -1);
            if(this.isEnPassantMove({x,y,boardState,teamType,lastMovesPiece})){
                return true
            }
            if(validFrontAttack && validSideAttack && !this.tileOccupiedByOpponent({x,y,boardState,teamType})){
                return true
            }
        }
        return false
    }
}