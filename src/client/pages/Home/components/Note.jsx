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

  const handleGetContent = useCallback(() => {
    return editorRef.current.getContent({ format: 'text' });
  }, []);
  const handleContextMenu = event => {
    event.preventDefault();
    console.log(event);
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
    console.log(editorRef.current.selection.getContent({ format: 'text' }));
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
          ],
          content_style:
            "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.4; margin: 3rem auto; max-width: 740px; } table { border-collapse: collapse; } table th, table td { border: 1px solid #ccc; padding: 0.4rem; } figure { display: table; margin: 1rem auto; } figure figcaption { color: #999; display: block; margin-top: 0.25rem; text-align: center; } hr { border-color: #ccc; border-style: solid; border-width: 1px 0 0 0; } code { background-color: #e8e8e8; border-radius: 3px; padding: 0.1rem 0.2rem; } img { max-width: 100%; } div.callout { border-radius: 4px; background-color: #f7f6f3; padding: 1rem 1rem 1rem 3rem; position: relative; } div.callout:before { content: '📣'; display: block; position: absolute; top: 1rem; left: 1rem; font-size: 20px; } .mce-content-body:not([dir=rtl]) blockquote { border-left: 2px solid #ccc; margin-left: 1.5rem; padding-left: 1rem; } .mce-content-body[dir=rtl] blockquote { border-right: 2px solid #ccc; margin-right: 1.5rem; padding-right: 1rem; }"
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
