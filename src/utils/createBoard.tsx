export function CreateBoard(pieces: any[], Tile: Function) {
    const verticalAxis = ['1','2','3','4','5','6','7','8'];
    const horizontalAxis = ['a','b','c','d','e','f','g','h'];
    let board = [];
    for(let i = verticalAxis.length-1; 0 <= i; i--) {
        for(let j = 0; j < horizontalAxis.length; j++){
            let key = verticalAxis[i] + horizontalAxis[j]
            let number = i + j + 2;
            let img = undefined;
            pieces.forEach(piece => {
               if(piece.x === j && piece.y === i) img = piece.image
            })
            board.push(<Tile key={key} number={number} image={img}/>)
        }
    }
    return board
}