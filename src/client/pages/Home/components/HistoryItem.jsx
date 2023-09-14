import { DeleteNoteButton } from './button/DeleteNoteButton';

export function HistoryItem({
  title,
  icon,
  onClick,
  id,
  onDeleteNote,
  active
}) {
  return (
    <div
      className={`flex items-center justify-between cursor-pointer my-3 p-2  duration-150 rounded-xl ${
        active ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-gray-100'
      }`}
      onClick={() => onClick(id)}
    >
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
      <DeleteNoteButton onClick={onDeleteNote} id={id} />
    </div>
  );
}
