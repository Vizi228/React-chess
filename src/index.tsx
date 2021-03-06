import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>

);

