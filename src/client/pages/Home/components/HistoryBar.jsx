import { useState } from 'react';
import { HistoryItem } from './HistoryItem';

export function HistoryBar({ noteList: noteListProp, onChangeNote }) {
  const [noteList, setNodeList] = useState(noteListProp);
  return (
    <div className="h-screen">
      <div className="history-bar__title">
        <h2>History</h2>
      </div>
      <div className="history-bar__list">
        {noteList.map((item, index) => (
          <HistoryItem
            key={index}
            id={item.id}
            title={item.title}
            icon={item.icon}
            onClick={onChangeNote}
          />
        ))}
      </div>
    </div>
  );
}
