import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import debounce from 'lodash/debounce';
import InsertTag from "./components/InsertTag";
import useLocalStorage from "./CustomHooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html","");
  const [css, setCss] = useLocalStorage("css","");
  const [js, setJs] = useLocalStorage("js","");
  const [srcDoc, setSrcDoc] = useState("");

  const debounceUpdate = debounce(() => {
    setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>
    `)
  }, 1000);

  useEffect(() => {
    debounceUpdate();
  }, [html, css, js]);  


  return (
    <div>
      <InsertTag setHtml={setHtml} />
      <div className="h-[50vh] flex gap-4 p-3 bg-zinc-700">
        <div className="flex-grow basis-0 flex flex-col">
          {/* HTml editor */}
          <Editor
          currentLanguage={"HTML"}
          language={"xml"} 
          value={html}
          onchange={setHtml}
          />
        </div>
        <div className="flex-grow basis-0 flex flex-col">
          {/* CSS editor */}
          <Editor 
          currentLanguage={"CSS"}
          language={"css"} 
          value={css}
          onchange={setCss}
          />
        </div>
        <div className="flex-grow basis-0 flex flex-col">
          {/* JS editor */}
          <Editor 
          currentLanguage={"JS"}
          language={"javascript"} 
          value={js}
          onchange={setJs}
          />
        </div>
      </div>
      {/* this is the lower section */}
      <div className="h-[50vh]">
        <iframe 
        srcDoc={srcDoc}
        height={'100%'}
        width={'100%'}
        title="Output"
        sandbox="allow-scripts"
        />
      </div>
    </div>
  )
}

export default App
