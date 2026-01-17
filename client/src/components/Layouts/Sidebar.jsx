import { ClockFading, House, Plus, Star } from 'lucide-react'
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
        <nav className=' w-1/6 min-w-40'>

            {
                isNewTopicOpen && <TopicPopUp setIsNewTopicOpen={setIsNewTopicOpen} />
            }
            <div className='text-3xl font-adlam'>Axon</div>
            <div className=' mt-16'>
                <button onClick={() => setIsNewTopicOpen(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
                    <Plus/>
                    <span>New Chat</span>
                </button>
                <ul className='flex flex-col gap-6 ml-2 mt-7'>
                    {
                        navs.map((item) => <li className='flex gap-2 items-center ' key={item.label}><item.icon size={20} className='text-muted' /> <a className='font-medium text-textcolor' href={item.link}>{item.label}</a> </li>)
                    }

                </ul>
            </div>
        </nav>
    )
}

export default Sidebar