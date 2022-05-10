import { generateMoves, TeamType } from "../types/RefereeTypes";

export function pawnMovement({px, py, boardState, teamType, tileOccupiedByTeammate, tileOccupiedByOpponent}: generateMoves): any[] {
    const movesArr: any[] = [];
    const team = teamType === TeamType.OUR
    const startRow = team ? py === 1 : py === 6;
    const topMove = team ? py + 1 : py -1
    const validRightAttackMoves = !tileOccupiedByOpponent({x: px + 1,y: topMove,boardState,teamType});
    const validLeftAttackMoves = !tileOccupiedByOpponent({x: px - 1 ,y: topMove,boardState,teamType});
    
    for(let i = 0; i < 1; i++) {
        if(tileOccupiedByOpponent({x: px,y: topMove,boardState,teamType}) && tileOccupiedByTeammate({x: px,y: topMove,boardState,teamType})) {
            if(startRow) {
                movesArr.push({x : px, y: topMove})
                movesArr.push({x : px, y: team? py + 2 : py -2})
            } else {
                movesArr.push({x : px, y: topMove})
            }     
        }
        if(validRightAttackMoves) {
            movesArr.push({x : px + 1, y: topMove})
        }
        if(validLeftAttackMoves){
            movesArr.push({x : px - 1, y: topMove})
        }
    }
    return movesArr
}