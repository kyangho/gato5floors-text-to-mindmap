import { AddNote } from '@/components/Icon';
export function AddNoteButton({ onClick }) {
  return (
    <button
      className="w-full flex items-center gap-3 cursor-pointer my-3 p-2 hover:bg-gray-100 duration-150 rounded-xl"
      onClick={onClick}
    >
      <AddNote size={32} /> Add a new note
    </button>
  );
}
