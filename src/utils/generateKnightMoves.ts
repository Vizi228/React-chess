import { generateKnightMoves } from "../types/RefereeTypes";

export function knightMovement({ px, py, y, x, boardState, teamType, tileOccupiedByTeammate }: generateKnightMoves): any[] {
    const movesArr: any[] = [];
    for (let i = 0; i < 1; i++) {
        if (tileOccupiedByTeammate({ x: x, y: y, boardState, teamType })) {
            movesArr.push({ y: py + 2, x: px + 1 })
            movesArr.push({ y: py + 1, x: px - 2 })
            movesArr.push({ y: py + 2, x: px - 1 })
            movesArr.push({ y: py - 1, x: px + 2 })
            movesArr.push({ y: py + 1, x: px + 2 })
            movesArr.push({ y: py - 1, x: px - 2 })
            movesArr.push({ y: py - 2, x: px - 1 })
            movesArr.push({ y: py - 2, x: px + 1 })
        }

    }
    return movesArr
}