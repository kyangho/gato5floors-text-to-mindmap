import { useEffect, useState } from 'react';
import { HistoryItem } from './HistoryItem';
import { AddNoteButton } from './button/AddNoteButton';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '@/redux/features/note';
import { map } from 'lodash';

export function HistoryBar({
  onChangeNote,
  onCreateNewNote,
  onDeleteNote,
  currentNoteId
}) {
  const dispatch = useDispatch();
  const notes = useSelector(({ note: { notes } }) => notes);
  useEffect(() => {
    dispatch(getNotes());
  }, []);
  return (
    <div className="fixed top-20 bottom-4 w-sidebar overflow-auto p-3 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-medium ">All Notes</h2>
      </div>

      <div>
        {map(notes, (note, index) => (
          <HistoryItem
            key={index}
            id={note.id}
            title={note.name}
            icon="https://picsum.photos/200/300"
            onClick={onChangeNote}
            onDeleteNote={onDeleteNote}
            active={note.id == currentNoteId}
          />
        ))}
        <AddNoteButton onClick={onCreateNewNote} />
      </div>
    </div>
  );
}
