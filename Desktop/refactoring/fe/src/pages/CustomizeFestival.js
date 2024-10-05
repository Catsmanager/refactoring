import React, { useState } from 'react';
import DragDropContext from './DragDropContext';
import DropArea from './DropArea';
import StoreBlock from './StoreBlock'; 
import '../styles/CustomizeFestival.css';

function CustomizeFestival() {
  const [title, setTitle] = useState('축제 이름');
  const [description, setDescription] = useState('축제 설명이 여기에 표시됩니다.');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [fontStyle, setFontStyle] = useState('Arial');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  // 블록 상태 관리
  const [blocks, setBlocks] = useState([
    { id: 1, name: '가게 1', left: 100, top: 100, image: null },
    { id: 2, name: '가게 2', left: 200, top: 200, image: null },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [storeName, setStoreName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackgroundImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // 가게 블록 추가 함수 (선택한 이미지와 이름 추가)
  const addBlock = () => {
    if (!selectedImage || !storeName) return;
    const newBlock = {
      id: blocks.length + 1,
      name: storeName,
      image: selectedImage,
      left: 50,
      top: 50,
    };
    setBlocks([...blocks, newBlock]);
    setStoreName(''); // 이름 초기화
  };

  // 블록 위치 업데이트 함수
  const moveBlock = (id, left, top) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, left, top } : block
      )
    );
  };

  // 가게 이미지 선택
  const storeImages = [
    { src: '/img/store1.png', alt: 'Store 1' },
    { src: '/img/store1.png', alt: 'Store 2' },
    { src: '/img/store1.png', alt: 'Store 3' },
  ];

  return (
    <DragDropContext>
      <div className="customize-festival-container">
        <h2>축제 커스터마이징</h2>

        {/* 축제 정보 커스터마이징 폼 */}
        <form className="customize-form">
          <div className="form-group">
            <label>축제 이름:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>설명:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>배경 색상 선택:</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>텍스트 색상 선택:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>글꼴 선택:</label>
            <select
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
          <div className="form-group">
            <label>배경 이미지 업로드:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
        </form>

        {/* 실시간 미리보기 */}
        <div className="preview-section">
          <h3>미리보기</h3>
          <div
            className="preview-card"
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
              fontFamily: fontStyle,
              backgroundImage: previewImage ? `url(${previewImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>

        {/* 가게 이미지 선택 */}
        <div>
          <h4>가게 이미지 선택</h4>
          {storeImages.map((store, index) => (
            <img
              key={index}
              src={store.src}
              alt={store.alt}
              onClick={() => setSelectedImage(store.src)} // 이미지 선택
              style={{
                width: '50px',
                height: '50px',
                margin: '10px',
                cursor: 'pointer',
                border: selectedImage === store.src ? '2px solid blue' : '1px solid gray',
              }}
            />
          ))}
        </div>

        {/* 가게 이름 입력 */}
        <div>
          <h4>가게 이름</h4>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="가게 이름을 입력하세요"
          />
        </div>

        {/* 가게 블록 추가 버튼 */}
        <button onClick={addBlock} className="btn btn-primary">
          가게 추가
        </button>

        {/* 드롭 가능한 영역 */}
        <DropArea blocks={blocks} moveBlock={moveBlock} />
      </div>
    </DragDropContext>
  );
}

export default CustomizeFestival;
