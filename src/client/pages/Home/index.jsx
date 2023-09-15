import Flow from '@/pages/Home/components/Mindmap';
import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Note from './components/Note';
import { HistoryBar } from './components/HistoryBar';
import { TaskBar } from './components/TaskBar';
import AxiosInstance from '@/redux/axios';
import Mermaid from './components/Mermaid';
import mermaid from 'mermaid';

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
  const refNote = useRef();

  const [chart, setChart] = useState(`graph TB
  A[Kawhi Leonard]
  B[College Basketball]
  C[NBA Career]
  
  A --> B
  A --> C`);

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
  const handleGenerateMindMap = useCallback(async () => {
    const { data } = await AxiosInstance.post('/note/generate', {
      content: refNote.current.getContent()
    });

    if (data.result) {
      console.log(data.result);
      setChart(data.result);
    }
  }, []);
  useEffect(() => {
    mermaid.contentLoaded();
  }, [chart]);
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
          ref={refNote}
          note={
            currentNoteId != -1
              ? noteList.find(item => item.id == currentNoteId)
              : { title: 'Please create a new note', content: '', id: -1 }
          }
          key={currentNoteId}
        />

        <TaskBar
          onGenerate={handleGenerateMindMap}
          isShowMindmap={isShowMindmap}
          onToggleMindmap={handleShowMindmap}
        />
        {isShowMindmap &&
          chart &&
          (() => {
            console.log(chart);
            mermaid.contentLoaded();
            return <div className="mermaid">{chart}</div>;
          })()}
      </div>
    </div>
  );
}

const handleGenerateMindmap = () => {
  alert('Generate Mindmap');
};
