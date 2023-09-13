export function HistoryItem({ title, icon, onClick, id }) {
  return (
    <div
      className="flex items-center cursor-pointer my-3 p-2 hover:bg-gray-100 duration-150 rounded-xl"
      onClick={() => onClick(id)}
    >
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
  );
}
