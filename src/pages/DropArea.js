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
        height: '500px', // 드롭 영역의 높이 확장
        border: '2px dashed #aaa', // 더 부드러운 테두리 (대시 스타일)
        borderRadius: '12px', // 테두리 둥글게 설정
        backgroundColor: '#f9f9f9', // 배경색 추가 (밝은 톤)
        padding: '10px', // 내부 간격 추가
        marginTop: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 그림자 추가
        transition: 'all 0.2s ease', // 부드러운 전환
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

