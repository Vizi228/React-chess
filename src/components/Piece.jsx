import { useDrag, DragPreviewImage } from "react-dnd"


function Piece({piece, position}) {
  const src =  `./assets/images/${piece.color}${piece.type.toUpperCase()}.png`;
  const [{isDragging} , drag, preview] = useDrag({
      type: 'piece',
      item: {type: 'piece', id: `${position}_${piece.color}_${piece.type}`},
      collect: (monitor) => {
          return {isDragging: !!monitor.isDragging()}
      }
  })
  return (
     <>
        <DragPreviewImage connect={preview} src={src}/>
        <div className='piece' ref={drag}  style={{opacity: isDragging ? 0 : 1}}><img src={src} alt='piece' /></div>
     </>
  )
}

export default Piece