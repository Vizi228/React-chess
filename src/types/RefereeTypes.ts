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
}