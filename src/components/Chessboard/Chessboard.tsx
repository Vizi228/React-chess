import './Chessboard.css'

interface chessboardProps {
    board: any[],
    boardRef: any
}

const Chessboard: React.FC<chessboardProps> = ({board, boardRef}) =>  {
    return (
        <div 
        ref={boardRef} 
        className='chessboard'>
            {board}
        </div>
    )
}
export default Chessboard