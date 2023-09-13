import { useState } from 'react';
import { HistoryItem } from './HistoryItem';

export function HistoryBar({ noteList: noteListProp, onChangeNote }) {
  const [noteList, setNodeList] = useState(noteListProp);
  return (
    <div className="fixed top-20 bottom-4 w-sidebar overflow-auto p-3 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-medium ">History</h2>
      </div>
      <div>
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
