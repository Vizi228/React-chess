import Piece from "../Piece/Piece";

import { TileProps } from "../../types/TileTypes";

const Tile: React.FC<TileProps> = ({number, image}) => {
    let name = number % 2 === 1 ? 'tile-white' : 'tile-black';
    return (
        <div onDragStart={e => false} className={['tile', name].join(' ')}>{image && <Piece image={image}/>}</div>
    )
}
export default Tile