import { History } from '@/components/Icon';
export function ShowHistoryButton({ onClick, id }) {
  return (
    <button
      className="flex items-center cursor-pointer my-3 p-2 duration-150 rounded-xl"
      onClick={e => onClick(e, id)}
    >
      <History />
    </button>
  );
}
