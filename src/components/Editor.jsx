import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import { Controlled as CodeMirror } from 'react-codemirror2'

const Editor = (props) => {
  const { language, value, onchange, currentLanguage } = props;
  const handleChange = (editor, data, value) => {
    onchange(value);
  }

  return (
    <>
        <CodeMirror
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
        />
    </>
  )
}

export default Editor;