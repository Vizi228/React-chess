import Piece from "../Piece/Piece";

interface Props {
    number: number,
    image: string,
}

export default function Tile({number, image}: Props) {
    let name = number % 2 === 1 ? 'tile-white' : 'tile-black';
    return (
        <div className={['tile', name].join(' ')}>{image && <Piece image={image}/>}</div>
    )
}