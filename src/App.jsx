import { useEffect, useState } from "react";
import { Resizable } from 're-resizable';
import Editor from "./components/Editor";
import debounce from 'lodash/debounce';
import Header from "./components/Header";
import useLocalStorage from "./CustomHooks/useLocalStorage";
import { BsArrowsAngleContract } from "react-icons/bs";
import { BsArrowsAngleExpand } from "react-icons/bs";

function App() {
  const [html, setHtml] = useLocalStorage("html", "<h1>Hello, programmer!</h1>");
  const [css, setCss] = useLocalStorage("css", "body {background-color: #3F3F41; color: #FFFFFF;}");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  // These variables are to handle the flex grow of code editors
  const [htmlGrow, setHtmlGrow] = useState("flex-grow");
  const [cssGrow, setCssGrow] = useState("flex-grow");
  const [jsGrow, setJsGrow] = useState("flex-grow");

  // These variables are to handle toggle betwee icons when the editor is open or close
  const [iconToggleHtml, setIconToggleHtml] = useState(true);
  const [iconToggleCss, setIconToggleCss] = useState(true);
  const [iconToggleJs, setIconToggleJs] = useState(true);

  const [layoutVarOne, setLayoutVarOne] = useState(true);
  // I will use this variable to set the value of ifram to dynamically change in vh
  const [layoutVarTwo, setLayoutVarTwo] = useState(true);

  const debounceUpdate = debounce(() => {
    setSrcDoc(`
      <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
        <style>${css}</style>
        <body>${html}</body>
        <script>${js}</script>
      </html>
    `)
  }, 250);

  useEffect(() => {
    debounceUpdate();
  }, [html, css, js]);

  const handleLength = (e) => {
    // This function is to handle the length of the the code editor and also to change the opend and close icon of code editors
    if (e === 'HTML') {
      setHtmlGrow(htmlGrow === 'flex-grow' ? 'flex-grow-0 collapse-code' : 'flex-grow');
      setIconToggleHtml(!iconToggleHtml)
    } else if (e === 'CSS') {
      setCssGrow(cssGrow === 'flex-grow' ? 'flex-grow-0 collapse-code' : 'flex-grow');
      setIconToggleCss(!iconToggleCss)
    } else if (e === 'JS') {
      setJsGrow(jsGrow === 'flex-grow' ? 'flex-grow-0 collapse-code' : 'flex-grow');
      setIconToggleJs(!iconToggleJs)
    }

  }

  const changeLayout = (e) => {
    if (e === 'column') {
      setLayoutVarOne(false);
      setLayoutVarTwo(false);
    } else {
      setLayoutVarOne(true);
      setLayoutVarTwo(true);
    }
  }

  return (
    <>
      <Header setHtml={setHtml} changeLayout={changeLayout} />
      {/* This is the code editors section */}
      
      <div className={`flex ${layoutVarOne ? 'flex-col' : 'flex-row'} overflow-hidden`}>
        {/* The resizable will allow it to resize if the user want to resize */}
      <Resizable
      enable={{
        right: true,   // Allow resizing from the right side only
        left: false,
        top: false,
        bottom: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      minWidth={'30vw'}
      >
        <div className={`flex gap-4 p-3 min-w-[30vw] bg-zinc-700 ${layoutVarOne ? "flex-row" : "flex-col"}`}>
          <div className={`${htmlGrow} flex flex-col`}>
            {/* HTml editor */}
            <div className='flex justify-between bg-black text-white pr-2 pl-4'>
              <p>HTML</p>
              <button onClick={() => handleLength('HTML')}>{iconToggleHtml ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
            </div>
            <Editor
              language={"xml"}
              value={html}
              onchange={setHtml}
              iconToggleHtml={iconToggleHtml}
            />
          </div>
          <div className={`${cssGrow} flex flex-col`}>
            {/* CSS editor */}
            <div className='flex justify-between bg-black text-white pr-2 pl-4'>
              <p>CSS</p>
              <button onClick={() => handleLength('CSS')}>{iconToggleCss ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
            </div>
            <Editor
              language={"css"}
              value={css}
              onchange={setCss}
              iconToggleCss={iconToggleCss}
            />
          </div>
          <div className={`${jsGrow} flex flex-col`}>
            {/* JS editor */}
            <div className='flex justify-between bg-black text-white pr-2 pl-4'>
              <p>JS</p>
              <button onClick={() => handleLength('JS')}>{iconToggleJs ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
            </div>
            <Editor
              language={"javascript"}
              value={js}
              onchange={setJs}
              iconToggleJs={iconToggleJs}
            />
          </div>
        </div>
      </Resizable>
        {/* this is the ifram section where website is rendered */}
        <div className={`${layoutVarTwo ? 'h-[50vh]' : 'h-[100vh]'} w-full`}>
          <iframe
            srcDoc={srcDoc}
            height={'100%'}
            width={'100%'}
            title="Output"
            sandbox="allow-scripts allow-modals"
          />
        </div>
      </div>
    </>
  )
}

export default App;
