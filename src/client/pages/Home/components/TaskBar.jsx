import { ShowButton } from './button/ShowButton';
import { GenerateButton } from './button/GenerateButton';
import { SaveNoteButton } from './button/SaveNoteButton';
export function TaskBar({
  onToggleMindmap,
  isShowMindmap,
  onGenerate,
  onSave
}) {
  return (
    <div className="flex justify-around py-3 my-3 bg-transparent ">
      <GenerateButton onClick={onGenerate} />
      <ShowButton isShowMindmap={isShowMindmap} onClick={onToggleMindmap} />
      <SaveNoteButton onClick={onSave} />
    </div>
  );
}
