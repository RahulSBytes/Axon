import { getRandomPrompts } from '../../utils/helpers.js'
import { SendHorizonal } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'


function Tagline() {

    const { handleSend } = useOutletContext()

    return (
        <>
            <div className='text-xl font-medium flex  flex-1 justify-center text-center flex-col mx-[9%] gap-1'>
                <div className='text-3xl'>Think Faster.<span className='text-accent'>Create Smarter.</span></div>
                <span className='text-muted text-base'>Your AI-powered assistant for instant answers, creative ideas, and intelligent conversations.</span>
            </div>
            <div className='max-h-fit flex flex-1 overflow-y-scroll scrollbar-thin noScrollbar flex-col justify-end w-full'>
                <div className='flex gap-6 mb-4 flex-col  md:flex-row'>
                    {getRandomPrompts(3).map((prompt) => <div key={Math.random()} className=' p-2 flex bg-primary rounded-md md:w-1/3 w-4/6 ml-3 justify-between'>
                        <span className='text-sm line-clamp-2'>{prompt}</span>
                        <button onClick={(e) => handleSend(e,prompt)} className=' flex items-end px-1' ><SendHorizonal size={16} /></button>
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default Tagline