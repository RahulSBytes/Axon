import Cards from '../shared/Cards'
import { prompts } from '../../constants/constant.js'


function Tagline() {
    return (
        <>
            <div className='text-xl font-medium flex  flex-1 justify-center text-center flex-col mx-[9%] gap-1'>
                <div className='text-3xl'>Think Faster.<span className='text-accent'>Create Smarter.</span></div>
                <span className='text-muted text-base'>Your AI-powered assistant for instant answers, creative ideas, and intelligent conversations.</span>
            </div>
            <div  className='flex flex-1 overflow-y-scroll scrollbar-thin noScrollbar flex-col'>
                <div className='flex gap-6 mb-4'>
                    <Cards prompts={prompts} />
                </div>
            </div>
        </>
    )
}

export default Tagline