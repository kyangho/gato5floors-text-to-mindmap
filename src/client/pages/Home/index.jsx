import { demoCallApi } from '@/redux/features/demo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Note from './components/Note';
import { HistoryBar } from './components/HistoryBar';
import { TaskBar } from './components/TaskBar';
import AxiosInstance from '@/redux/axios';
import { fetchOneNote, fetchManyNotes } from '@/redux/features/note';
import MindMap from './components/MindMap';
import s from './index.module.less';

export default function Home() {
  const dispatch = useDispatch();
  const { notes, currentNote } = useSelector(({ note }) => note);
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
  const [isShowMindmap, setShowMindmap] = useState(true);

  const handleChangeNote = async id => {
    await dispatch(
      fetchOneNote({
        id,
        historyId: currentNote.historyId
      })
    );
    setGenerateJsonData(currentNote.mindmap);
    setCurrentNoteId(id);
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
      await dispatch(fetchManyNotes());
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
      dispatch(fetchManyNotes());
    }
  };

  const handleGenerateMindMap = useCallback(async () => {
    const { data } = await AxiosInstance.post('/note/generate', {
      content: refNote.current.getContent(),
      id: currentNote.id,
      historyId: currentNote.historyId
    });

    if (data.result) {
      setGenerateJsonData(data.result);
    }
  }, []);

  const handleSaveNote = async () => {
    const { error } = await AxiosInstance.post(`/note/update`, {
      noteId: currentNote.id,
      historyId: currentNote.historyId,
      content: refNote.current.getContent()
    });
    if (!error) {
      dispatch(fetchManyNotes());
    }
  };
  console.log(currentNote);
  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <HistoryBar
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
