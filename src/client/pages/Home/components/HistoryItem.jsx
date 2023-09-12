import { useState } from 'react';
export function HistoryItem({ title, icon, onClick, id }) {
  const [Title, setTitle] = useState(title);
  const [Avatar, setAvatar] = useState(icon);

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="w-8 h-8">
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="history-item__title ml-4">
        <h3>{Title}</h3>
      </div>
    </div>
  );
}
