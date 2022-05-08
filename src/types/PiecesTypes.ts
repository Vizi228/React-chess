import { PieceType, TeamType } from "./RefereeTypes"
export interface Pieces{
    image: string,
    x: number,
    y: number,
    type: PieceType,
    teamType: TeamType
}
export interface pieceProp {
    image: string,
}