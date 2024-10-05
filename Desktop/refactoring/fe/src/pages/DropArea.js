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
      style={{
        position: 'relative', // 드래그 요소의 절대 위치를 위해 상대적 위치 설정
        width: '100%',
        height: '400px', // 드롭 영역의 높이 설정
        border: '2px solid black', // 드롭 영역의 테두리
        marginTop: '20px',
      }}
    >
      {blocks.map((block) => (
        <StoreBlock
          key={block.id}
          id={block.id}
          left={block.left}
          top={block.top}
          name={block.name}       // 가게 이름 전달
          image={block.image}     // 가게 이미지 전달
        />
      ))}
    </div>
  );
}

export default DropArea;
