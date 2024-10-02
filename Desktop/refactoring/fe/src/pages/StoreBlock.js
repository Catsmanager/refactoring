import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BLOCK: 'block',
};

function StoreBlock({ id, left, top, children }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BLOCK,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: 'lightgray',
        padding: '10px',
        cursor: 'move',
        border: '1px solid #ddd',
      }}
    >
      {children}
    </div>
  );
}

export default StoreBlock;
