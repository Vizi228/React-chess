import {isValidMoveType,TeamType,PieceType, tileIsOccupiedType, tileOccupiedBy, isEnPassantMoveType } from "../types/RefereeTypes"
import { bishopMovement } from "../utils/generateBishopMove";
import { rookMovement } from "../utils/generateRookMoves";
export default class Referee {
    tileIsOccupied({x,y,boardState}: tileIsOccupiedType): boolean{
        let inFrontOfTile = boardState.find(p => p.x === x && p.y === y)
        if(inFrontOfTile) return false
        else return true
    }
    tileOccupiedByOpponent({x,y,boardState, teamType}: tileOccupiedBy): boolean{
        let occupiedTile = boardState.find(p => p.x === x && p.y === y && p.teamType !== teamType)
        if(occupiedTile) return false
        else return true
    }
    tileOccupiedByTeammate({x,y,boardState,teamType}: tileOccupiedBy): boolean {
        let occupiedTile = boardState.find(p => p.x === x && p.y === y && p.teamType === teamType)
        if(occupiedTile) return false
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
        if(type === PieceType.KNIGHT){
            //Calculate the movements
            let topMove = (y === py + 2 && x === px + 1) || (y === py + 2 && x === px - 1);
            let rightMove = (y === py + 1 && x === px + 2) || (y === py-1 && x === px + 2);
            let leftMove = (y === py + 1 && x === px - 2) || (y === py-1 && x === px - 2);
            let bottomMove = (y === py-2 && x === px -1) || (y === py-2 && x === px + 1);
            let controlMoves = topMove || rightMove || leftMove || bottomMove;


            if(controlMoves && this.tileIsOccupied({x,y,boardState}) ){
                return true
            }
            if(controlMoves && !this.tileOccupiedByOpponent({x,y,boardState, teamType})) {
                return true
            }
        }
        if(type === PieceType.BISHOP){
            const bishopMoves = bishopMovement({px,py,tileOccupiedByOpponent: this.tileOccupiedByOpponent,tileOccupiedByTeammate: this.tileOccupiedByTeammate,boardState,teamType});
            const validBishopMovement = bishopMoves.find(item => item.x === x && item.y === y);
            if(validBishopMovement && this.tileIsOccupied({x,y,boardState})){
                return true
            }
            if(validBishopMovement && !this.tileOccupiedByOpponent({x,y,boardState, teamType})) {
                return true
            }
        }
        if(type === PieceType.ROOK) {
            const rookMoves = rookMovement({px,py,tileOccupiedByOpponent: this.tileOccupiedByOpponent,tileOccupiedByTeammate: this.tileOccupiedByTeammate,boardState,teamType});
            const validRookMoves = rookMoves.find(item => item.x === x && item.y === y);
            if(validRookMoves && this.tileIsOccupied({x,y,boardState})) {
                return true
            }
            if(validRookMoves && !this.tileOccupiedByOpponent({x,y,boardState, teamType})) {
                return true
            }
        }
        if(type === PieceType.QUEEN) {
            const bishopMoves = bishopMovement({px,py,tileOccupiedByOpponent: this.tileOccupiedByOpponent,tileOccupiedByTeammate: this.tileOccupiedByTeammate,boardState,teamType});
            const rookMoves = rookMovement({px,py,tileOccupiedByOpponent: this.tileOccupiedByOpponent,tileOccupiedByTeammate: this.tileOccupiedByTeammate,boardState,teamType});
            const validBishopMovement = bishopMoves.find(item => item.x === x && item.y === y);
            const validRookMoves = rookMoves.find(item => item.x === x && item.y === y);
            const validQueenMoves = validBishopMovement || validRookMoves;
            console.log(bishopMoves)
            if(validQueenMoves && this.tileIsOccupied({x,y,boardState})) {
                return true
            }
            if(validQueenMoves && !this.tileOccupiedByOpponent({x,y,boardState, teamType})) {
                return true
            }
        }
        if(type === PieceType.KING) {
            const MAX_STEP_VALUE = 1;
            const validKingMove = (y !== py || x !== px) && ((y <= py + MAX_STEP_VALUE && y >= py - MAX_STEP_VALUE) && (x <= px + MAX_STEP_VALUE && x >= px - MAX_STEP_VALUE));
            if(validKingMove && this.tileOccupiedByTeammate({x,y,boardState,teamType})){
                console.log('valid')
                return true
            }
        }
        return false
    }
}