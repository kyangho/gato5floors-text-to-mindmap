import { fetchOneNote } from '@/redux/features/note';
import { Modal } from '@mui/material';
import dayjs from 'dayjs';
import { isFunction, map } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function HistoryModal({ open, onClose, id }) {
  const dispatch = useDispatch();
  const { currentNote } = useSelector(({ note }) => note);
  const handleChooseHistory = async ({ id, historyId }) => {
    await dispatch(
      fetchOneNote({
        id,
        historyId
      })
    );
    if (isFunction(onClose)) {
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <div className="bg-white absolute rounded-3xl top-1/2 left-1/2 p-4 shadow-xl transform -translate-x-1/2 -translate-y-1/2 min-w-[576px]">
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">History</h1>
            {map(currentNote.history, note => (
              <div
                className="mb-2 cursor-pointer hover:bg-gray-100 duration-150 p-2 px-4 mt-4 border-b-2"
                key={note.id}
                onClick={() =>
                  handleChooseHistory({
                    id: note.note_id,
                    historyId: note.id
                  })
                }
              >
                <h3 className="text-lg font-bold">{note.name}</h3>
                <p className="text-gray-400">
                  {dayjs(note.updated_at).format('DD-MM-YYYY HH:mm:ss')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
