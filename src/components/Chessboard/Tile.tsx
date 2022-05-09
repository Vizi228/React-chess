import Piece from "../Piece/Piece";

interface TileProps {
    number: number,
    image: string,
}

const Tile: React.FC<TileProps> = ({number, image}) => {
    let name = number % 2 === 1 ? 'tile-white' : 'tile-black';
    return (
        <div onDragStart={e => false} className={['tile', name].join(' ')}>{image && <Piece image={image}/>}</div>
    )
}
export default Tile