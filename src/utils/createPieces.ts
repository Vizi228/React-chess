import { PieceType, TeamType } from "../types/RefereeTypes";
export function CreatePieces() {
    let pieces = [];
    for(let i = 0; i < 8; i++) {
        pieces.push({image: '/assets/images/bP.png', x: i,y: 6,type: PieceType.PAWN,teamType: TeamType.OPPONENT})
    }
    for(let i = 0; i < 8; i++) {
        pieces.push({image: '/assets/images/wP.png', x: i,y: 1,type: PieceType.PAWN,teamType: TeamType.OUR})
    }
    for(let i = 0; i < 2; i++) {
        const teamType = (i === 0) ? TeamType.OPPONENT : TeamType.OUR
        const type = (teamType === TeamType.OPPONENT) ? 'b' : 'w';
        const y = (teamType === TeamType.OPPONENT) ? 7 : 0;
        pieces.push({image: `/assets/images/${type}B.png`, x: 2,y: y,type: PieceType.BISHOP, teamType});
        pieces.push({image: `/assets/images/${type}B.png`, x: 5,y: y,type: PieceType.BISHOP, teamType});
        pieces.push({image: `/assets/images/${type}K.png`, x: 4,y: y,type: PieceType.KING, teamType});
        pieces.push({image: `/assets/images/${type}N.png`, x: 1,y: y,type: PieceType.KNIGHT, teamType});
        pieces.push({image: `/assets/images/${type}N.png`, x: 6,y: y,type: PieceType.KNIGHT, teamType});
        pieces.push({image: `/assets/images/${type}Q.png`, x: 3,y: y,type: PieceType.QUEEN, teamType});
        pieces.push({image: `/assets/images/${type}R.png`, x: 0,y: y,type: PieceType.ROOK, teamType});
        pieces.push({image: `/assets/images/${type}R.png`, x: 7,y: y,type: PieceType.ROOK, teamType});
    }
    return pieces;
}