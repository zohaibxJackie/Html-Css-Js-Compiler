import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useEffect, useState } from 'react';

const Editors = (props) => {
  const { language, value, onchange, setSave } = props;
  const handleChange = (value, event) => {
    onchange(value);
  }

  function handleEditorDidMount(editor, monaco) {
    editor.addAction({
      id: 'save-action',
      label: 'Save',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => {
        // Prevent default save behavior if needed
        editor.getAction('editor.action.formatDocument').run(); // Example action: format document
        setSave(prev => {
          return !prev;
        });
      },
    });
  }
  
  return (
    <>
        <Editor
        height="50vh" 
        defaultLanguage={`${language}`} 
        defaultValue={`${value}`} 
        value={`${value}`}
        theme="vs-dark"
        onChange={handleChange}
        onMount={handleEditorDidMount}
        
        />;     
    </>
  )
}

export default Editors;