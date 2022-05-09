import { generateMoves } from "../types/RefereeTypes";

export function bishopMovement({px, py, boardState, teamType, tileOccupiedByTeammate, tileOccupiedByOpponent}: generateMoves): any[] {
    const movesArr: any[] = [];
    const BOARD_TILE_MAX = 8;
    const BOARD_TILE_MIN = 0;
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let bottomRightMove = {x: px + i, y: py - i}
        if((bottomRightMove.x <= BOARD_TILE_MAX && bottomRightMove.x >= BOARD_TILE_MIN) && (bottomRightMove.y <= BOARD_TILE_MAX && bottomRightMove.y >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: bottomRightMove.x, y:bottomRightMove.y, boardState, teamType})) {
                movesArr.push(bottomRightMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: bottomRightMove.x, y:bottomRightMove.y, boardState, teamType})) break
            movesArr.push(bottomRightMove);
        }else {
            break
        }
    }
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let bottomLeftMove = {x: px - i, y: py - i};
        if((bottomLeftMove.x <= BOARD_TILE_MAX && bottomLeftMove.x >= BOARD_TILE_MIN) && (bottomLeftMove.y <= BOARD_TILE_MAX && bottomLeftMove.y >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: bottomLeftMove.x, y:bottomLeftMove.y, boardState, teamType})) {
                movesArr.push(bottomLeftMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: bottomLeftMove.x, y:bottomLeftMove.y, boardState, teamType})) break
            movesArr.push(bottomLeftMove);
        }else {
            break
        }
        
    }
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let topLeftMove = {x: px - i, y: py + i};
        if((topLeftMove.x <= BOARD_TILE_MAX && topLeftMove.x >= BOARD_TILE_MIN) && (topLeftMove.y <= BOARD_TILE_MAX && topLeftMove.y >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: topLeftMove.x, y:topLeftMove.y, boardState, teamType})) {
                movesArr.push(topLeftMove)
                break
            }    
            if(!tileOccupiedByTeammate({x: topLeftMove.x, y:topLeftMove.y, boardState, teamType})) break
            movesArr.push(topLeftMove);
        } else {
            break
        }
    }
    for(let i = 1; i < BOARD_TILE_MAX; i++){
        let topRightMove = {x: px + i, y: py + i};
        if((topRightMove.x <= BOARD_TILE_MAX && topRightMove.x >= BOARD_TILE_MIN) && (topRightMove.y <= BOARD_TILE_MAX && topRightMove.y >= BOARD_TILE_MIN)) {
            if(!tileOccupiedByOpponent({x: topRightMove.x, y:topRightMove.y, boardState, teamType})) {
                movesArr.push(topRightMove)
                break
            }
            if(!tileOccupiedByTeammate({x: topRightMove.x, y:topRightMove.y, boardState, teamType})) break
            movesArr.push(topRightMove);
        } else {
            break
        }            
    }

    return movesArr
}