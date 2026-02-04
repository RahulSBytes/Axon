import { ClockFading, Ghost, House, Info, Plus, Star } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { createNewChat } from '../../utils/helpers.js'

function Sidebar() {
    const { user, logout } = useAuth()

    const navs = [
        { icon: House, link: '/', label: 'Home' },
        { icon: ClockFading, link: '/history', label: 'History' },
        { icon: Star, link: '/saved', label: 'Saved' },
        { icon: Info, link: '/about', label: 'About App' },
    ]

    const navigate = useNavigate()
 

    return (
        <nav className=' w-1/6 min-w-40 relative'>
            <div onClick={() => navigate('/')} className='text-3xl font-adlam mt-2 ml-5 flex cursor-pointer'>Axon</div>
            <div className=' mt-16 ml-5'>
                <ul className='flex flex-col gap-6 mx-2 mt-7 mr-3'>
                <button onClick={(e) => createNewChat(e, navigate)} className="flex gap-2 cursor-pointer w-full py-2 px-2 border border-green-700 rounded-full bg-zinc-800 text-white justify-center items-center">
                    <Plus size={25}   />
                    <span>New Chat</span>
                </button>
                    {
                        navs.map((item) => <NavLink to={item.link} className={({ isActive }) =>`flex gap-2 items-center cursor-pointer w-full py-1 px-2 rounded-full ${isActive? " bg-zinc-200 ":'hover:bg-zinc-200'}`} key={item.label}> <item.icon size={34} className='text-muted p-2 bg-zinc-200 rounded-lg' /> {item.label} </NavLink>)
                    }

                </ul>
            </div>
            <div className="flex gap-2 flex-col absolute bottom-0 w-full px-3">
                {user ? <button onClick={logout} className="px-4 py-1.5 w-full text-sm font-medium text-muted border border-zinc-600 bg-secondary rounded-md hover:bg-zinc-200 transition-opacity">
                    Log out
                </button> : <>
                    <button onClick={() => navigate('/login')} className="px-4 py-1.5 w-full text-sm font-medium text-muted border border-zinc-600 bg-secondary rounded-md hover:bg-zinc-200 transition-opacity">
                        Log in
                    </button>
                    <button onClick={() => navigate('/signup')} className="px-4 py-1.5 w-full text-sm font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700  rounded-md transition-colors">
                        Sign up
                    </button>
                </>
                }
            </div>
        </nav>
    )
}

export default Sidebar