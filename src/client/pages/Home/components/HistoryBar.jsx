import { useState } from 'react';
import { HistoryItem } from './HistoryItem';
import { AddNoteButton } from './button/AddNoteButton';

export function HistoryBar({
  noteList: noteListProp,
  onChangeNote,
  onCreateNewNote,
  onDeleteNote
}) {
  const [noteList, setNodeList] = useState(noteListProp);
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
          />
        ))}
        <AddNoteButton onClick={onCreateNewNote} />
      </div>
    </div>
  );
}
