import AxiosInstance from '@/redux/axios';
import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

function Note({ note }, ref) {
  const editorRef = useRef(null);

  const handleGetContent = useCallback(() => {
    return editorRef.current.getContent({ format: 'text' });
  }, []);

  useImperativeHandle(ref, () => ({ getContent: handleGetContent }), []);

  let timeOut = setTimeout(() => {
    callSaveNoteApi(note);
  }, 1000);

  return (
    <Editor
      apiKey="jiykzdltudi91hz3l9ckhczhgcijddsc5a0mqishzg9rrz8y"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={`<h1>${note?.title || 'New Note'}</h1>` + note?.content}
      init={{
        height: 500,
        menubar: false,
        icons: 'thin',
        plugins: [
          'codesample',
          'hr',
          'image',
          'imagetools',
          'link',
          'lists',
          'checklist',
          'help',
          'searchreplace'
        ],
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
      onEditorChange={() => {
        clearTimeout(timeOut);
        const content = editorRef.current.getContent();
        note.name = 'New Note';
        note.content = content;
        timeOut = setTimeout(() => {
          callSaveNoteApi(note);
        }, 1000);
      }}
    />
  );
}

const callSaveNoteApi = async note => {
  const { data, error } = AxiosInstance.post('/note', note);
  if (error) {
    //notification error
    return;
  }
  if (data) {
    //notification success
  }
};

export default forwardRef(Note);
