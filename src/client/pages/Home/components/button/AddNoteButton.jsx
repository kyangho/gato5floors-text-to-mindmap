import { AddNote } from '@/components/Icon';
export function AddNoteButton({ onClick }) {
  return (
    <button
      className="flex items-center cursor-pointer my-3 p-2 hover:bg-gray-100 duration-150 rounded-xl"
      onClick={onClick}
    >
      <AddNote /> Add a new note
    </button>
  );
}
