import { DeleteNoteButton } from './button/DeleteNoteButton';
import { ShowHistoryButton } from './button/ShowHistoryButton';
import { HistoryModal } from './modal/HistoryModal';
import { useState } from 'react';

export function HistoryItem({
  title,
  icon,
  onClick,
  id,
  onDeleteNote,
  active
}) {
  const [isShowHistory, setIsShowHistory] = useState(false);
  const handleCloseModal = () => {
    console.log('close modal');
    setIsShowHistory(false);
  };

  const showHistory = () => {
    setIsShowHistory(true);
    console.log('show history');
  };

  return (
    <div
      className={`flex items-center justify-between cursor-pointer my-3 p-2  duration-150 rounded-xl  ${
        active
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'hover:bg-gray-100'
      }`}
      onClick={() => onClick(id)}
    >
      <HistoryModal open={isShowHistory} onClose={handleCloseModal} id={id} />
      <div className="flex items-center">
        <div className="w-12 h-12">
          <img
            src={icon}
            alt="avatar"
            className="h-full aspect-square object-cover rounded-full"
          />
        </div>
        <div className="ml-2">
          <h3 className="text-lg ">{title}</h3>
        </div>
      </div>
      <div className="flex items-center">
        <ShowHistoryButton onClick={showHistory} active={active} />
        <DeleteNoteButton onClick={onDeleteNote} id={id} />
      </div>
    </div>
  );
}
