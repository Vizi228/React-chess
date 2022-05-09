import { Pieces } from "./PiecesTypes";

export enum PieceType {
    PAWN,
    QUEEN,
    BISHOP,
    KING,
    ROOK,
    KNIGHT
}
export enum TeamType {
    OUR,
    OPPONENT
}
export interface isValidMoveType{
    px: number,
    py:number,
    x:number,
    y:number,
    type: PieceType,
    teamType: TeamType,
    boardState: Pieces[],
    lastMovesPiece: object | null, 
}
export interface tileIsOccupiedType{
    x:number,
    y:number,
    boardState: Pieces[],
}
export interface tileOccupiedBy{
    x:number,
    y:number,
    boardState: Pieces[],
    teamType: TeamType,
}
export interface isEnPassantMoveType {
    x:number,
    y:number,
    boardState: Pieces[],
    teamType: TeamType,
    lastMovesPiece: object | null, 
}
export interface generateMoves {
    px: number,
    py:number,
    boardState:Pieces[],
    teamType:TeamType,
    tileOccupiedByTeammate:any,
    tileOccupiedByOpponent:any
}