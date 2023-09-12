import Flow from '@/pages/Home/components/Mindmap';
import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Note } from './components/Note';
import { HistoryBar } from './components/HistoryBar';
import { TaskBar } from './components/TaskBar';

const testNoteList = [
  {
    id: 1,
    title: 'Note 1',
    icon: 'https://picsum.photos/200/300',
    content: 'Content 1'
  },
  {
    id: 2,
    title: 'Note 2',
    icon: 'https://picsum.photos/200/300',
    content: 'Content 2'
  }
];

export default function Home() {
  const dispatch = useDispatch();

  const handleCallApi = useCallback(async () => {
    const { payload } = await dispatch(demoCallApi());

    console.log(payload);
  }, []);

  useEffect(() => {
    handleCallApi();
  });

  const [currentNoteId, setCurrentNoteId] = useState(1);
  const [isShowMindmap, setShowMindmap] = useState(true);
  const handleChangeNote = id => {
    setCurrentNoteId(id);
  };
  const handleShowMindmap = () => {
    setShowMindmap(!isShowMindmap);
  };
  return (
    <div className="h-screen flex justify-between">
      <HistoryBar noteList={testNoteList} onChangeNote={handleChangeNote} />
      <div className="h-screen">
        <Note
          content={testNoteList[currentNoteId - 1].content}
          key={currentNoteId}
        />
        <TaskBar
          isShowMindmap={isShowMindmap}
          onGenerate={handleGenerateMindmap}
          onToggleMindmap={handleShowMindmap}
        />
        {isShowMindmap && <Flow />}
      </div>
    </div>
  );
}

const handleGenerateMindmap = () => {
  alert('Generate Mindmap');
};
