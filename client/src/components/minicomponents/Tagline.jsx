import { getRandomPrompts } from '../../utils/helpers.js'
import { SendHorizonal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'


function Tagline() {

    const { handleSend } = useOutletContext()
    const [prompts, setPrompts] = useState([])

    useEffect(() => {
        setPrompts(getRandomPrompts(3));
    }, [])

    return (
        <>
            <div className=' text-xl font-medium flex  flex-1 justify-center text-center flex-col mx-[9%] gap-4'>
                <div className='text-3xl font-adlam'>Think Faster.<span className='text-accent'>Create Smarter.</span></div>
                <span className='text-zinc-600 text-sm'>A multi-model AI agent powered by cutting-edge LLMs. Seamlessly switch between models for coding, creativity, and complex reasoning.</span>
            </div>
            <div className='flex overflow-y-scroll scrollbar-thin noScrollbar flex-col  w-full'>
                <div className='flex gap-6 mb-4 flex-col sm:flex-row justify-center px-3'>
                    {prompts.map((prompt) => <div key={Math.random()} className='p-2 flex md:w-1/3 w-4/6 ml-3 sm:ml-0 justify-between bg-zinc-100 shadow-sm border text-zinc-700 font-medium border-zinc-200 rounded-lg'>
                        <span className='text-sm line-clamp-2'>{prompt}</span>
                        <button onClick={(e) => handleSend(e, prompt)} className=' flex items-end px-1' ><SendHorizonal size={16} /></button>
                    </div>
                )}
                </div>
            </div>
        </>
    )
}

export default Tagline