import Flow from '@/pages/Home/components/Mindmap';
import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Note } from './components/Note';
import { HistoryBar } from './components/HistoryBar';
import { TaskBar } from './components/TaskBar';

const testNoteList = [
  {
    id: 0,
    title: 'Note 0',
    icon: 'https://picsum.photos/200/300',
    content: 'Content 0'
  },
  {
    id: 1,
    title: 'Note 1',
    icon: 'https://picsum.photos/200/300',
    content: 'Content 1'
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

  const [noteList, setNoteList] = useState(testNoteList);
  const [currentNoteId, setCurrentNoteId] = useState(1);
  const [isShowMindmap, setShowMindmap] = useState(true);
  const handleChangeNote = id => {
    setCurrentNoteId(id);
  };
  const handleShowMindmap = () => {
    setShowMindmap(!isShowMindmap);
  };
  const handleCreateNewNote = () => {
    const newNote = {
      id: noteList.length,
      title: `Note ${noteList.length}`,
      icon: 'https://picsum.photos/200/300',
      content: 'Content ' + noteList.length
    };
    setNoteList([...noteList, newNote]);
    setCurrentNoteId(newNote.id);
  };
  const handleDeleteNote = (e, id) => {
    // debugger;
    e.stopPropagation();
    const newNoteList = noteList.filter(item => item.id !== id);
    const newNoteId = newNoteList.length == 0 ? -1 : newNoteList[0].id;
    setCurrentNoteId(newNoteId);
    setNoteList(newNoteList);
  };

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <HistoryBar
        key={noteList}
        noteList={noteList}
        onChangeNote={handleChangeNote}
        onCreateNewNote={handleCreateNewNote}
        onDeleteNote={handleDeleteNote}
        currentNoteId={currentNoteId}
      />
      <div className="ml-sidebar p-4 mt-header">
        <Note
          note={
            currentNoteId != -1
              ? noteList.find(item => item.id == currentNoteId)
              : null
          }
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
