import { useState } from 'react';

import { BsLayoutSidebar } from "react-icons/bs";

const Header = ({ setHtml, changeLayout }) => {
    // using scale property to show and hide the menu of HTML tags
    const [scale, setScale] = useState(0);
    const handleClick = (e) => {
        setHtml(prev => prev === '' ? prev + e : prev + '\n' + e);
        setScale(0);
    }
    const showItems = () => {
        console.log("hello")
        setScale(prev => prev === 0 ? 1 : 0)
    }
    
    return (
        <div className="bg-[#1e1e1e] flex justify-between items-center gap-4 p-4">
            <div className='border-black border rounded text-white bg-[#4b506299] relative inline-block cursor-pointer'>
                <button title='Insert HTML tags' className='px-5 py-2' onClick={showItems}>Insert tag..</button>
                {/* The reason I applied inline css instead of applying tailwind is that because I was facing an issue. Whenever I started the server, the value of scale was being updated but it was not updated in the tailwind css. so I had to apply inline css, other option was to apply a funtion in tailwind */}
                <div className={`absolute left-0 top-[2.2rem] w-[8rem] bg-zinc-800 rounded flex flex-col z-50 `} style={{transform: `scale(${scale})`}}>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<div></div>')}>div</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<h1></h1>')}>h1</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<p></p>')}>p</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<span></span>')}>span</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<button></button>')}>button</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<a href="#"></a>')}>a (link)</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<strong></strong>')}>strong</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<em></em>')}>em</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<ul></ul>')}>ul</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<ol></ol>')}>ol</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<li></li>')}>li</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<img src="" alt="">')}>img</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<table></table>')}>table</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<tr></tr>')}>tr</button>
                    <button className='hover:bg-zinc-900' onClick={() => handleClick('<td></td>')}>td</button>
                </div>
            </div>
            <div className='flex gap-4 text-white'>
                <button className='p-2 bg-[#4b506299] rounded' onClick={() => changeLayout('column')}>
                    <BsLayoutSidebar className='cursor-pointer' title='Change Layout' />
                </button>
                <button className='p-2 bg-[#4b506299] rounded' onClick={() => changeLayout('row')}>
                    <BsLayoutSidebar className='cursor-pointer rotate-90' title='Change Layout' />
                </button>
            </div>
        </div>
    );
};

export default Header;
