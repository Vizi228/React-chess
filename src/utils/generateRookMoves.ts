import { generateMoves } from "../types/RefereeTypes";

export function rookMovement({px, py, boardState, teamType, tileOccupiedByTeammate, tileOccupiedByOpponent}: generateMoves): any[] {
    const movesArr: any[] = [];
    const BOARD_TILE_MAX = 8;
    const BOARD_TILE_MIN = 0;

    ///Right Moves
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let rightMove = {x: px + i, y: py}
        if((rightMove.x <= BOARD_TILE_MAX && rightMove.x >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: rightMove.x, y:rightMove.y, boardState, teamType})) {
                movesArr.push(rightMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: rightMove.x, y:rightMove.y, boardState, teamType})) break
            movesArr.push(rightMove);
        }else {
            break
        }
    }

    ///TopMoves
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let topMove = {x: px, y: py + i};
        if((topMove.y <= BOARD_TILE_MAX && topMove.y >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: topMove.x, y:topMove.y, boardState, teamType})) {
                movesArr.push(topMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: topMove.x, y:topMove.y, boardState, teamType})) break
            movesArr.push(topMove);
        }else {
            break
        }
        
    }
    ///LeftMoves
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let leftMove = {x: px - i, y: py};
        if((leftMove.x <= BOARD_TILE_MAX && leftMove.x >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: leftMove.x, y:leftMove.y, boardState, teamType})) {
                movesArr.push(leftMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: leftMove.x, y:leftMove.y, boardState, teamType})) break
            movesArr.push(leftMove);
        }else {
            break
        }
        
    }

    ///BottomMoves
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let bottomMove = {x: px, y: py - i};
        if((bottomMove.y <= BOARD_TILE_MAX && bottomMove.y >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: bottomMove.x, y:bottomMove.y, boardState, teamType})) {
                movesArr.push(bottomMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: bottomMove.x, y:bottomMove.y, boardState, teamType})) break
            movesArr.push(bottomMove);
        }else {
            break
        }
        
    }

    return movesArr
}