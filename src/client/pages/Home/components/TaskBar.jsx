import { ShowButton } from './ShowButton';
import { GenerateButton } from './GenerateButton';
export function TaskBar({ onToggleMindmap, isShowMindmap, onGenerate }) {
  return (
    <div className="flex justify-around">
      <GenerateButton onClick={onGenerate} />
      <ShowButton isShowMindmap={isShowMindmap} onClick={onToggleMindmap} />
    </div>
  );
}
