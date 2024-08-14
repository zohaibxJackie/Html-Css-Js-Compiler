import { useEffect, useState } from "react";
import { Resizable } from 're-resizable';
import Editors from "./components/Editors";
import debounce from 'lodash/debounce';
import Header from "./components/Header";
import useLocalStorage from "./CustomHooks/useLocalStorage";
import { BsArrowsAngleContract } from "react-icons/bs";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useHotkeys } from 'react-hotkeys-hook' 

function App() {
  const [html, setHtml] = useLocalStorage("html", "<h1>Hello, programmer!</h1>");
  const [css, setCss] = useLocalStorage("css", "body {background-color: #3F3F41; color: #FFFFFF;}");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  const [save, setSave] = useState(false);
  const [indicateSave, setIndicateSave] = useState(false);

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
  // This is for the code editors, the reason why i added this was because that whenever the user resize the editor, and changes the layout, the layout was behaving abnormally. Feel free to experment with it by removing it
  const [layoutVarThird, setLayoutVarThird] = useState(true);

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
/*
  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'S' || event.key === 's')) {
      event.preventDefault(); // Prevent the default browser action
      setSave(!save);
    }
  }); */

  // whenver there is some change in html, css, js, we will indicate to save the document
  useEffect(() => {
    setIndicateSave(true);
  }, [html, css, js])

  useEffect(() => {
    debounceUpdate();
    setIndicateSave(false);
  }, [save]);

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
      setLayoutVarThird(false);
    } else {
      setLayoutVarOne(true);
      setLayoutVarTwo(true);
      setLayoutVarThird(true);
    }
  }
  useHotkeys('ctrl+s', (e) => {
    e.preventDefault();
    setSave(!save);
  })
  // useHotkeys('ctrl+s', (e) => {
  //   e.preventDefault();
  //     setSave(!save);
  // }, { scopes: ['settings'] })
  

  return (
    <>
      <Header setHtml={setHtml} changeLayout={changeLayout} />
      {/* This is the code editors section */}

      <div className={`flex ${layoutVarOne ? 'flex-col' : 'flex-row'} overflow-hidden`}>
        {/* The resizable will allow it to resize if the user want to resize */}
        {/* <HotkeysProvider initiallyActiveScopes={['settings']}> */}

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
          minWidth={`${layoutVarThird ? '100%' : '30%'}`}
          maxWidth={'80%'}
          
        >
          <div className={`flex gap-4 px-3 pt-1 min-w-[30vw] bg-[#252526] ${layoutVarOne ? "flex-row" : "flex-col"}`}>
            <div className={`${htmlGrow} flex flex-col`}>
              {/* HTml editor */}
              <div className='flex justify-between bg-black text-white pr-2 pl-4'>
                <p>{indicateSave ? <GoDotFill className="inline" /> : ''} HTML</p>
                <button onClick={() => handleLength('HTML')}>{iconToggleHtml ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
              </div>
                <Editors
                  language={"xml"}
                  value={html}
                  onchange={setHtml}
                  iconToggleHtml={iconToggleHtml}
                />
            </div>
            <div className={`${cssGrow} flex flex-col`}>
              {/* CSS editor */}
              <div className='flex justify-between bg-black text-white pr-2 pl-4'>
                <p>{indicateSave ? <GoDotFill className="inline" /> : ''} CSS</p>
                <button onClick={() => handleLength('CSS')}>{iconToggleCss ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
              </div>
              <Editors
                language={"css"}
                value={css}
                onchange={setCss}
                iconToggleCss={iconToggleCss}
              />
            </div>
            <div className={`${jsGrow} flex flex-col`}>
              {/* JS editor */}
              <div className='flex justify-between bg-black text-white pr-2 pl-4'>
                <p>{indicateSave ? <GoDotFill className="inline" /> : ''} JS</p>
                <button onClick={() => handleLength('JS')}>{iconToggleJs ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</button>
              </div>
              <Editors
                language={"javascript"}
                value={js}
                onchange={setJs}
                iconToggleJs={iconToggleJs}
              />
            </div>
          </div>
        </Resizable>
        {/* </HotkeysProvider> */}

        {/* this is the ifram section where website is rendered */}
        <div className={`${layoutVarTwo ? 'h-[50vh]' : 'auto'} w-full max-w-full`}>
          <iframe
            srcDoc={srcDoc}
            height={'100%'}
            width={'100%'}
            title="Output"
            allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
            allowfullscreen="true"
            allowpaymentrequest="true" allowtransparency="true"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            loading="lazy"
          />
        </div>
      </div>
    </>
  )
}


export default App;