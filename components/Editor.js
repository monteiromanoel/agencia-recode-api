import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = () => {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  return (
    <Editor
      id="editor"
      apiKey="8svz9148gua03293my7b0e5drfls3zdv5h5b52vt4dbntdgt"
      init={{
        selector: 'textarea',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;