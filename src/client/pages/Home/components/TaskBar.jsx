import { GenerateButton } from './button/GenerateButton';
import { SaveNoteButton } from './button/SaveNoteButton';
import { CompletionsButton } from './button/CompletionsButton';
export function TaskBar({ onGenerateFromMindMap, onGenerate, onSave }) {
  return (
    <div className="flex justify-around py-3 my-3 bg-transparent ">
      <GenerateButton onClick={onGenerate} />
      <CompletionsButton onClick={onGenerateFromMindMap} />
      <SaveNoteButton onClick={onSave} />
    </div>
  );
}
