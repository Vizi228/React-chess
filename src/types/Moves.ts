export interface Grab{
    e: React.MouseEvent, 
    setGrabX:any , 
    setGrabY: any, 
    setActivePiece: any, 
    boardRef: any
}
export interface Move {
    e: React.MouseEvent, 
    boardRef: any, 
    activePiece: HTMLElement | null
}
export interface Drop {
    e: React.MouseEvent, 
    activePiece: HTMLElement | null, 
    setActivePiece: any,
    boardRef: any, 
    grabX: number, 
    grabY: number, 
    setPieces: any, 
    pieces: any[]
}