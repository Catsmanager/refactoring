import React from 'react';
import { useDrop } from 'react-dnd';
import StoreBlock from './StoreBlock';

const ItemTypes = {
  BLOCK: 'block',
};

function DropArea({ blocks, moveBlock }) {
  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      moveBlock(item.id, left, top);
    },
  });

  return (
    <div
      ref={drop}
      className="drop-area"
    >
      {blocks.map((block) => (
        <StoreBlock key={block.id} id={block.id} left={block.left} top={block.top}>
          {block.name}
        </StoreBlock>
      ))}
    </div>
  );
}

export default DropArea;
