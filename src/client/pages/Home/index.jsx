import Flow from '@/pages/Home/components/Mindmap';
import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Note from './components/Note';
import { HistoryBar } from './components/HistoryBar';
import { TaskBar } from './components/TaskBar';
import AxiosInstance from '@/redux/axios';
import Mermaid from './components/Mermaid';
import mermaid from 'mermaid';
import { getNotes } from '@/redux/features/note';

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
  const notes = useSelector(({ note: { notes } }) => notes);
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

  const [currentNoteId, setCurrentNoteId] = useState(0);
  const [currentNote, setCurrentNote] = useState({});
  const [isShowMindmap, setShowMindmap] = useState(true);
  const handleChangeNote = async id => {
    const { data } = await AxiosInstance.get(`/note/${id}`);
    setCurrentNote(data);
    setCurrentNoteId(data.id);
  };
  const handleShowMindmap = () => {
    setShowMindmap(!isShowMindmap);
  };
  const handleCreateNewNote = async () => {
    const newNote = {
      name: `Note ${notes.length}`,
      icon: 'https://picsum.photos/200/300',
      content: ''
    };
    const { data } = await AxiosInstance.post('/note', newNote);
    if (data) {
      await dispatch(getNotes());
      console.log(data);
      setCurrentNoteId(data.id);
    }
  };
  const handleDeleteNote = async (e, id) => {
    // debugger;
    e.stopPropagation();
    const { error } = await AxiosInstance.delete(`/note/${id}`);
    if (currentNoteId == id) {
      if (notes.length > 0) {
        setCurrentNoteId(notes[0].id);
      }
    }

    if (notes.length == 0) {
      setCurrentNoteId(0);
    }
    if (!error) {
      dispatch(getNotes());
    }
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
        key={notes}
        noteList={notes}
        onChangeNote={handleChangeNote}
        onCreateNewNote={handleCreateNewNote}
        onDeleteNote={handleDeleteNote}
        currentNoteId={currentNoteId}
      />
      <div className="ml-sidebar p-4 mt-header">
        <Note ref={refNote} note={currentNote} key={currentNoteId} />

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
