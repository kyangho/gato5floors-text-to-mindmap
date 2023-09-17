import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Note from './components/Note';
import { HistoryBar } from './components/HistoryBar';
import { TaskBar } from './components/TaskBar';
import AxiosInstance from '@/redux/axios';
import mermaid from 'mermaid';
import { getNotes } from '@/redux/features/note';
import MindMap from './components/MindMap';
import s from './index.module.less';

export default function Home() {
  const dispatch = useDispatch();
  const notes = useSelector(({ note: { notes } }) => notes);
  const refNote = useRef();

  const [generateJsonData, setGenerateJsonData] = useState({});

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
    const { data } = await AxiosInstance.get(
      `/note/${id}`,
      currentNote.historyId
        ? {
            historyId: currentNote.historyId
          }
        : {}
    );
    console.log(data);
    setCurrentNote({
      ...data,
      noteId: data.id,
      historyId: currentNote.historyId || data.historyId,
      icon: 'https://picsum.photos/200/300'
    });
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
      setGenerateJsonData(data.result);
    }
  }, []);

  const handleSaveNote = async () => {
    const { error } = await AxiosInstance.patch(
      `/note`,
      {
        content: refNote.current.getContent()
      },
      {
        params: { noteId: currentNote.noteId, historyId: currentNote.historyId }
      }
    );
    if (!error) {
      dispatch(getNotes());
    }
  };

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <HistoryBar
        key={notes}
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
          onSave={handleSaveNote}
        />

        <div className={s.reactFlowContainer}>
          <MindMap generateJsonData={generateJsonData} />
        </div>
      </div>
    </div>
  );
}

const handleGenerateMindmap = () => {
  alert('Generate Mindmap');
};
