import { History } from '@/components/Icon';
export function ShowHistoryButton({ onClick, id, active }) {
  return (
    <button
      className={`flex items-center cursor-pointer my-3 p-2 duration-150 rounded-xl `}
      onClick={e => onClick(e, id)}
    >
      <History active={active} />
    </button>
  );
}
