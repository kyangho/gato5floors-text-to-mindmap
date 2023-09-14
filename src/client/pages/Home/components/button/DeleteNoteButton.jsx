import { DeleteNote } from '@/components/Icon';
export function DeleteNoteButton({ onClick, id }) {
  return (
    <button
      className="flex items-center cursor-pointer my-3 p-2 hover:bg-gray-100 duration-150 rounded-xl"
      onClick={e => onClick(e, id)}
    >
      <DeleteNote />
    </button>
  );
}
