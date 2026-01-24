import { ClockFading, Ghost, House, Plus, Star } from 'lucide-react'
import { useState } from 'react'
import TopicPopUp from '../minicomponents/TopicPopUp'

function Sidebar() {

    const navs = [
        {
            icon: House,
            link: '/',
            label: 'Home'
        },
        {
            icon: ClockFading,
            link: '/history',
            label: 'History'
        },
        {
            icon: Star,
            link: '/saved',
            label: 'Saved'
        },

    ]

    const [isNewTopicOpen, setIsNewTopicOpen] = useState(false)


    return (
        <nav className=' w-1/6 min-w-40 relative'>
            {
                isNewTopicOpen && <TopicPopUp setIsNewTopicOpen={setIsNewTopicOpen} />
            }
            <div className='text-3xl font-adlam mt-2 ml-5 flex'>Axon</div>
            <div className=' mt-16 ml-5'>
                <button onClick={() => setIsNewTopicOpen(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
                    <Plus />
                    <span>New Chat</span>
                </button>
                <ul className='flex flex-col gap-6 ml-2 mt-7'>
                    {
                        navs.map((item) => <li className='flex gap-2 items-center ' key={item.label}><item.icon size={20} className='text-muted' /> <a className='font-medium text-textcolor' href={item.link}>{item.label}</a> </li>)
                    }

                </ul>
            </div>
            <div className="flex gap-2 flex-col absolute bottom-0 w-full px-3">
                <button className="px-4 py-1.5 w-full text-sm font-medium text-muted border border-zinc-600 bg-secondary rounded-md hover:bg-zinc-200 transition-opacity">
                    Log in
                </button>
                <button className="px-4 py-1.5 w-full text-sm font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700  rounded-md transition-colors">
                    Sign up
                </button>
            </div>
        </nav>
    )
}

export default Sidebar