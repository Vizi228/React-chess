import { useDrop } from 'react-dnd';
import Piece from './Piece';
import { handleMove, gameSubject } from '../Game';
import { useEffect, useState } from 'react';
import Promote from './Promote';

export default function Square({ piece, black, position }) {
  const className = black ? 'square black' : 'square white';
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      const currentPosition = item.id.split('_')[0];
      handleMove(currentPosition, position);
    },
  });
  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) => {
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null);
    });

    return () => subscribe.unsubscribe();
  }, [position]);
  return (
    <div className={className} ref={drop}>
      {promotion ? (
        <Promote {...promotion} />
      ) : (
        piece && <Piece position={position} piece={piece} />
      )}
    </div>
  );
}
