import { Modal } from '@mui/material';
import { useState } from 'react';

const testHistoryofNote = [
  {
    id: 0,
    title: 'Note 0',
    timestamp: '2021-10-10 10:10'
  },
  {
    id: 1,
    title: 'Note 0',
    timestamp: '2021-10-08 10:10'
  },
  {
    id: 2,
    title: 'Note 2',
    timestamp: '2021-10-07 10:10'
  }
];

export function HistoryModal({ open, onClose, id }) {
  const [historyList, setHistoryList] = useState(testHistoryofNote);

  const getHistory = () => {
    console.log(`get history of note ${id}`);
  };

  const handleChooseHistory = id => {
    alert(`choose history ${id}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <div className="bg-white absolute rounded-3xl top-1/2 left-1/2 p-4 shadow-xl transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">History</h1>
            {historyList.map(note => (
              <div
                className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-xl"
                key={note.id}
                onClick={() => handleChooseHistory(note.id)}
              >
                <h3 className="text-lg font-bold">{note.title}</h3>
                <p className="text-gray-500">{note.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
