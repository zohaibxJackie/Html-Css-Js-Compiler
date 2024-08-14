// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/material.css'
// import 'codemirror/mode/xml/xml'
// import 'codemirror/mode/css/css'
// import 'codemirror/mode/javascript/javascript'
// import { Controlled as CodeMirror } from 'react-codemirror2'

import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const Editors = (props) => {
  const { language, value, onchange, currentLanguage } = props;
  const handleChange = (value, event) => {
    onchange(value);
  }
  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  return (
    <>
        {/* <CodeMirror
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
          className='max-w-full'
        /> */}
        <Editor
        height="50vh" 
        defaultLanguage={`${language}`} 
        defaultValue={`${value}`} 
        theme="vs-dark"
        onChange={handleChange}
        onMount={handleEditorDidMount}
        />;
        
    </>
  )
}

export default Editors;