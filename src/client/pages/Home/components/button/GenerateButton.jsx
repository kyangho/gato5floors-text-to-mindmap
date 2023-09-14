import { Setting } from '@/components/Icon';

export function GenerateButton({ onClick }) {
  return (
    <button
      className="px-3 py-2 rounded-xl bg-blue-400 text-white text-center hover:bg-blue-500 font-medium duration-150 flex items-center gap-3"
      onClick={onClick}
    >
      <Setting />
      Generate Mindmap
    </button>
  );
}
