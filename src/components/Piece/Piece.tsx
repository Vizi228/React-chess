import { pieceProp } from "../../types/PiecesTypes"

const Piece: React.FC<pieceProp> = ({image}) =>{
    return (
        <div className="tile-piece" onDragStart={e => false} style={{backgroundImage: `url(${image})`}}></div>
    )
}
export default Piece