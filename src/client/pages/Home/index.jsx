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
import useStore from './components/MindMap/store';

export default function Home() {
  const dispatch = useDispatch();
  const { notes, currentNote } = useSelector(({ note }) => note);
  const refNote = useRef();
  const [generateJsonData, setGenerateJsonData] = useState({});

  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges
  }));

  const [currentNoteId, setCurrentNoteId] = useState(0);
  const [isShowMindmap, setShowMindmap] = useState(true);

  const handleChangeNote = useCallback(
    async id => {
      await dispatch(
        fetchOneNote({
          id,
          historyId: currentNote.historyId
        })
      );
      setGenerateJsonData(currentNote.mindmap);
      setCurrentNoteId(id);
    },
    [currentNote.historyId, currentNote.mindmap]
  );
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
      content: refNote.current.getContent({ format: 'text' }),
      id: currentNote.id,
      historyId: currentNote.historyId
    });

    if (data) {
      setGenerateJsonData(data);
    }
  }, [currentNote]);

  const handleGenerateFromMindMap = useCallback(async () => {
    const { data } = await AxiosInstance.post('/note/completions', {
      mindmap: { edges, nodes },
      id: currentNote.id,
      historyId: currentNote.historyId
    });
    if (data) {
      await dispatch(
        fetchOneNote({
          id: currentNote.id,
          historyId: currentNote.historyId
        })
      );
    }
  }, [currentNote, edges, nodes]);

  const handleSaveNote = async () => {
    const { error } = await AxiosInstance.post(`/note/update`, {
      noteId: currentNote.id,
      historyId: currentNote.historyId,
      content: refNote.current.getContent(),
      mindmap: {
        nodes,
        edges
      }
    });
    if (!error) {
      dispatch(fetchManyNotes());
    }
  };
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
          onGenerateFromMindMap={handleGenerateFromMindMap}
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
