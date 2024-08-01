import { useRef, useState } from 'react';

const InsertTag = ({ setHtml }) => {
    const [scale, setScale] = useState(0);
    const handleClick = (e) => {
        setHtml(prev => prev === '' ? prev + e : prev + '\n' + e)
        setScale(0)
    }
    const showItems = () => {
        setScale(prev => prev === 0 ? 1 : 0)
    }
    return (
        <div className="bg-zinc-700">
            <div className='border-black border rounded ml-[25vw] mt-3 px-3 py-1 text-white bg-zinc-800 relative inline-block cursor-pointer'>
                <p onClick={showItems}>Select tag..</p>
                <div className={`absolute left-0 top-[2.2rem] w-[8rem] bg-zinc-800 rounded flex flex-col z-50 scale-${scale}`}>
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
        </div>
    );
};

export default InsertTag;
