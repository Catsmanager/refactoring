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
        opacity: isDragging ? 0.5 : 1,
        width: '100px', // 고정 너비 설정
        height: '100px', // 고정 높이 설정
        cursor: 'move',
        border: '1px solid #ddd',
        textAlign: 'center',
        backgroundColor: 'lightgray', // 배경색 설정
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* 이미지 표시 */}
        {image && (
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* 이름을 이미지 위에 표시 */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
            color: 'white', // 텍스트 색상
            textAlign: 'center',
            padding: '5px 0',
            fontSize: '12px',
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
}

export default StoreBlock;
