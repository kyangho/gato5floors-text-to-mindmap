import AxiosInstance from '@/redux/axios';
import { fetchManyNotes } from '@/redux/features/note';
import { Menu, MenuItem } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useDispatch } from 'react-redux';

function Note({ note }, ref) {
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const editorRef = useRef(null);

  const handleGetContent = useCallback((config = {}) => {
    if (editorRef.current) return editorRef.current.getContent(config);
  }, []);
  const handleContextMenu = event => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.screenX + event.x / 2 - 12,
            mouseY: event.clientY
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = e => {
    setContextMenu(null);
  };

  useImperativeHandle(ref, () => ({ getContent: handleGetContent }), []);

  const callSaveNoteApi = async note => {
    const { error } = await AxiosInstance.post(`/note/update`, {
      noteId: note.id,
      historyId: note.historyId,
      content: editorRef.current.getContent()
    });
    if (!error) {
      dispatch(fetchManyNotes());
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(note.content);
    }
  }, [note]);

  return (
    <>
      <Editor
        apiKey="v9438snmq8yvm2d1nfg8v8w9ktvi5q719oq33uekbo9tt614"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={note?.content}
        init={{
          height: 500,
          menubar: false,
          icons: 'thin',
          contextmenu: 'link image table',
          toolbar:
            'styles | bold italic underline strikethrough forecolor backcolor | image link codesample hr | bullist numlist checklist| searchreplace | help',
          style_formats: [
            { title: 'Title', block: 'h1' },
            { title: 'Heading', block: 'h2' },
            { title: 'Sub heading', block: 'h3' },
            { title: 'Paragraph', block: 'p' },
            { title: 'Code', inline: 'code' },
            { title: 'Quote', block: 'blockquote' },
            { title: 'Callout', block: 'div', classes: 'call-out' }
          ]
        }}
        style={{ cursor: 'context-menu' }}
        onEditorChange={() => {}}
        onContextMenu={handleContextMenu}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem>
      </Menu>
    </>
  );
}

export default forwardRef(Note);
