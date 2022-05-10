import { isValidMoveType, TeamType, PieceType, tileIsOccupiedType, tileOccupiedBy, isEnPassantMoveType } from "../types/RefereeTypes"
import { bishopMovement } from "../utils/generateBishopMove";
import { knightMovement } from "../utils/generateKnightMoves";
import { pawnMovement } from "../utils/generatePawnMoves";
import { rookMovement } from "../utils/generateRookMoves";
export default class Referee {
    tileIsOccupied({ x, y, boardState }: tileIsOccupiedType): boolean {
        let inFrontOfTile = boardState.find(p => p.x === x && p.y === y)
        if (inFrontOfTile) return false
        else return true
    }
    tileOccupiedByOpponent({ x, y, boardState, teamType }: tileOccupiedBy): boolean {
        let occupiedTile = boardState.find(p => p.x === x && p.y === y && p.teamType !== teamType)
        if (occupiedTile) return false
        else return true
    }
    tileOccupiedByTeammate({ x, y, boardState, teamType }: tileOccupiedBy): boolean {
        let occupiedTile = boardState.find(p => p.x === x && p.y === y && p.teamType === teamType)
        if (occupiedTile) return false
        else return true
    }
    isEnPassantMove({ x, y, boardState, teamType, lastMovesPiece }: isEnPassantMoveType) {
        const team = teamType === TeamType.OUR
        const verticalMove = team ? -1 : 1;
        const enPassantCoor = team ? 5 : 2;
        const piece = boardState.find(p => p.x === x && p.y === y + verticalMove && p.teamType !== teamType && p.type === PieceType.PAWN)
        if (piece === lastMovesPiece && y === enPassantCoor) {
            return piece
        }
    }
    isValidMove({ px, py, x, y, type, teamType, currentTeam, boardState, lastMovesPiece }: isValidMoveType) {
        const currentTeamType = currentTeam ? TeamType.OUR : TeamType.OPPONENT;
        if (teamType === currentTeamType) {
            if (type === PieceType.PAWN) {
                console.log(pawnMovement({ px, py, boardState, tileOccupiedByOpponent: this.tileOccupiedByOpponent, tileOccupiedByTeammate: this.tileOccupiedByTeammate, teamType }))
                const pawnMoves = pawnMovement({ px, py, boardState, tileOccupiedByOpponent: this.tileOccupiedByOpponent, tileOccupiedByTeammate: this.tileOccupiedByTeammate, teamType });
                const validPawnMoves = pawnMoves.find(item => item.x === x && item.y === y);
                if (validPawnMoves) {
                    return true
                }
                if (this.isEnPassantMove({ x, y, boardState, teamType, lastMovesPiece })) {
                    return true
                }
            }
            if (type === PieceType.KNIGHT) {
                const knightMoves = knightMovement({ px, py, y, x, boardState, teamType, tileOccupiedByTeammate: this.tileOccupiedByTeammate })
                const validKnightMoves = knightMoves.find(item => item.x === x && item.y === y);
                console.log(knightMoves)
                if (validKnightMoves) {
                    return true
                }
            }
            if (type === PieceType.BISHOP) {
                const bishopMoves = bishopMovement({ px, py, tileOccupiedByOpponent: this.tileOccupiedByOpponent, tileOccupiedByTeammate: this.tileOccupiedByTeammate, boardState, teamType });
                const validBishopMovement = bishopMoves.find(item => item.x === x && item.y === y);
                if (validBishopMovement && this.tileIsOccupied({ x, y, boardState })) {
                    return true
                }
                if (validBishopMovement && !this.tileOccupiedByOpponent({ x, y, boardState, teamType })) {
                    return true
                }
            }
            if (type === PieceType.ROOK) {
                const rookMoves = rookMovement({ px, py, tileOccupiedByOpponent: this.tileOccupiedByOpponent, tileOccupiedByTeammate: this.tileOccupiedByTeammate, boardState, teamType });
                const validRookMoves = rookMoves.find(item => item.x === x && item.y === y);
                if (validRookMoves && this.tileIsOccupied({ x, y, boardState })) {
                    return true
                }
                if (validRookMoves && !this.tileOccupiedByOpponent({ x, y, boardState, teamType })) {
                    return true
                }
            }
            if (type === PieceType.QUEEN) {
                const bishopMoves = bishopMovement({ px, py, tileOccupiedByOpponent: this.tileOccupiedByOpponent, tileOccupiedByTeammate: this.tileOccupiedByTeammate, boardState, teamType });
                const rookMoves = rookMovement({ px, py, tileOccupiedByOpponent: this.tileOccupiedByOpponent, tileOccupiedByTeammate: this.tileOccupiedByTeammate, boardState, teamType });
                const validBishopMovement = bishopMoves.find(item => item.x === x && item.y === y);
                const validRookMoves = rookMoves.find(item => item.x === x && item.y === y);
                const validQueenMoves = validBishopMovement || validRookMoves;

                if (validQueenMoves && this.tileIsOccupied({ x, y, boardState })) {
                    return true
                }
                if (validQueenMoves && !this.tileOccupiedByOpponent({ x, y, boardState, teamType })) {
                    return true
                }
            }
            if (type === PieceType.KING) {
                const MAX_STEP_VALUE = 1;
                const validKingMove = (y !== py || x !== px) && ((y <= py + MAX_STEP_VALUE && y >= py - MAX_STEP_VALUE) && (x <= px + MAX_STEP_VALUE && x >= px - MAX_STEP_VALUE));
                const check = 1;
                if (validKingMove && this.tileOccupiedByTeammate({ x, y, boardState, teamType })) {
                    return true
                }
            }
        }

        return false
    }
}