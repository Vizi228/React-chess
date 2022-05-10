import { TeamType } from "./RefereeTypes"


export interface Grab{
    e: React.MouseEvent, 
    setGrabPosition: any
    setActivePiece: any, 
    boardRef: any,
}
export interface Move {
    e: React.MouseEvent, 
    boardRef: any, 
    activePiece: HTMLElement | null,
}
export interface Drop {
    e: React.MouseEvent, 
    activePiece: HTMLElement | null, 
    setActivePiece: any,
    boardRef: any, 
    grabPosition: grabPosition | null, 
    setPieces: any, 
    pieces: any[],
    lastMovesPiece: object | null,
    setLastMovesPiece: any,
    currentTeam: boolean,
    setCurrentTeam: any,
}
export interface grabPosition {
    x: number,
    y: number
}