import { useEffect, useState } from 'react';
import { HistoryItem } from './HistoryItem';
import { AddNoteButton } from './button/AddNoteButton';
import { useDispatch } from 'react-redux';
import { getNotes } from '@/redux/features/note';

export function HistoryBar({
  noteList: noteListProp,
  onChangeNote,
  onCreateNewNote,
  onDeleteNote,
  currentNoteId
}) {
  const dispatch = useDispatch();
  const [noteList, setNodeList] = useState(noteListProp);

  useEffect(() => {
    dispatch(getNotes());
  }, []);
  return (
    <div className="fixed top-20 bottom-4 w-sidebar overflow-auto p-3 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-medium ">All Notes</h2>
      </div>

      <div>
        {noteList.map((item, index) => (
          <HistoryItem
            key={index}
            id={item.id}
            title={item.title}
            icon={item.icon}
            onClick={onChangeNote}
            onDeleteNote={onDeleteNote}
            active={item.id == currentNoteId}
          />
        ))}
        <AddNoteButton onClick={onCreateNewNote} />
      </div>
    </div>
  );
}
