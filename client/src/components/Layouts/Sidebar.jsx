import { ClockFading, House, Plus, Star } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

function Sidebar() {

    const navs = [
        {
            icon: House,
            link: '/home',
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

    return (
        <nav className=' w-1/6 min-w-40'>
            <div className='text-4xl font-semibold'>Axon</div>
            <div className=' mt-16'>
                <ul className='flex flex-col gap-6 pl-2'>
                    <button className='bg-muted rounded-full py-1 w-3/4 text-secondary justify-center items-center bg-muted'>
                        <a href="" className='flex gap-1 justify-center'>
                            <Plus size={22} className='flex items-center'  />
                            <span className='font-medium'>New Chat</span>
                        </a>
                    </button>
                    {
                        navs.map((item) => <li  className='flex gap-2 items-center ' key={item.label}><item.icon size={20} className='text-muted' /> <a className='font-medium text-textcolor' href={item.link}>{item.label}</a> </li>)
                    }

                </ul>
            </div>
        </nav>
    )
}

export default Sidebar