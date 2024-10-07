import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BLOCK: 'block',
};

function StoreBlock({ id, left, top, name, image }) {
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
        opacity: isDragging ? 0.7 : 1,
        width: '120px',  // 블록과 이미지의 크기를 동일하게 설정
        height: '120px', // 정사각형으로 설정
        cursor: 'move',
        borderRadius: '10px',  // 모서리를 둥글게 처리
        border: '1px solid #ddd',
        overflow: 'hidden',  // 이미지나 텍스트가 블록을 벗어나지 않도록 설정
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // 그림자 추가
        backgroundColor: 'white',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* 이미지 표시 - 이미지 크기를 블록과 동일하게 맞춤 */}
        {image && (
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',  // 블록 전체를 차지하도록 설정
              objectFit: 'cover',  // 이미지가 블록 크기에 맞춰 잘림
            }}
          />
        )}

        {/* 이미지 위에 이름 표시 */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',  // 반투명 배경
            color: 'white',
            textAlign: 'center',
            padding: '5px 0',
            fontSize: '14px',
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
}

export default StoreBlock;
