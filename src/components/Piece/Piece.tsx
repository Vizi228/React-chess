interface pieceProp {
    image: string,
}

export default function Piece({image}: pieceProp) {
    return (
        <div className="tile-piece" style={{backgroundImage: `url(${image})`}}></div>
    )
}