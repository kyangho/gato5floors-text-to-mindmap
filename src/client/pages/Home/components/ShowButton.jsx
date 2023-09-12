import { useState } from 'react';

export function ShowButton({ onClick, isShowMindmap }) {
  return (
    <button className="show-button" onClick={onClick}>
      {isShowMindmap ? 'Hide Mindmap' : 'Show Mindmap'}
    </button>
  );
}
