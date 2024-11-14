import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DragDropContext({ children }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

export default DragDropContext;
