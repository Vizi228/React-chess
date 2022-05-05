export function CreatePieces() {
    let pieces = [];
    for(let i = 0; i < 8; i++) {
        pieces.push({image: '/assets/images/bP.png', x: i,y: 6})
    }
    for(let i = 0; i < 8; i++) {
        pieces.push({image: '/assets/images/wP.png', x: i,y: 1})
    }
    for(let i = 0; i < 2; i++) {
        const type = (i === 0) ? 'b' : 'w';
        const y = (i === 0) ? 7 : 0;
        pieces.push({image: `/assets/images/${type}B.png`, x: 2,y: y});
        pieces.push({image: `/assets/images/${type}B.png`, x: 5,y: y});
        pieces.push({image: `/assets/images/${type}K.png`, x: 4,y: y});
        pieces.push({image: `/assets/images/${type}N.png`, x: 1,y: y});
        pieces.push({image: `/assets/images/${type}N.png`, x: 6,y: y});
        pieces.push({image: `/assets/images/${type}Q.png`, x: 3,y: y});
        pieces.push({image: `/assets/images/${type}R.png`, x: 0,y: y});
        pieces.push({image: `/assets/images/${type}R.png`, x: 7,y: y});
    }
    return pieces;
}    