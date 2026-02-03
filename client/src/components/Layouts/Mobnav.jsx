import { ClockFading, House, Info, Menu, Star } from 'lucide-react'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom';
// import { navs} from "../../constants/constant.js"

function Mobnav({ nav }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate()
    const { isNavOpen, setIsNavOpen } = nav;

    const navs = [
        { icon: House, link: '/', label: 'Home' },
        { icon: ClockFading, link: '/history', label: 'History' },
        { icon: Star, link: '/saved', label: 'Saved' },
    ]

        const handleButtonClick = (action) => {
        setIsNavOpen(false);  // Close drawer
        if (action) action(); // Execute button's specific action
    };

    return (
        <div className='flex flex-col  md:hidden relative'>
            <nav className=' flex justify-between px-5 py-7 items-center w-full'>
                <div className='font-adlam text-4xl cursor-pointer'>Axon</div>
                <div onClick={() => setIsNavOpen(true)} className='cursor-pointer pr-2'><Menu size={27} /></div>
            </nav>
            {isNavOpen && <div className=' flex flex-col  absolute top-0 h-screen items-center w-screen bg-secondary p-3 px-8'>
                <div className='flex items-center  w-full'>
                    <h4 className='text-3xl font-bold flex-1 py-5 text-zinc-800'>Profile</h4>
                    <button onClick={() => setIsNavOpen(false)} className='border-2 border-zinc-300 rounded-md h-fit px-2'>esc</button>
                </div>
                <div className='w-full flex gap-3 items-center my-6'>
                    {user.avatar ?
                        <img src={user.avatar} className='w-16 h-16 object-cover rounded-full border-secondary border-2' /> :
                        <div className='w-20 h-20 rounded-full border-zinc-500 border-2 bg-yellow-400 flex justify-center items-center text-3xl font-medium'>{user.fullName[0].toUpperCase()}</div>
                    }
                    <div>
                        <p className='font-bold text-zinc-700 text-lg'>{user.fullName}</p>
                        <p className='text-zinc-600 text-sm'>{user.email}</p>
                    </div>
                </div>
                <ul className='flex flex-col gap-12 mt-14 w-full '>
                    {
                        navs.map((item) => <li onClick={()=>handleButtonClick(() => navigate(item.link))} className='flex gap-4 items-center cursor-pointer hover:text-zinc-600 w-fit pl-2 pr-4 font-semibold text-lg text-zinc-600' key={item.label}> <item.icon size={22} className='text-muted' /> {item.label} </li>)
                    }
                    <li className='flex gap-4 items-center cursor-pointer text-lg hover:text-zinc-600 w-fit pl-2 pr-4' > <Info size={22} className='text-muted ' /> About App </li>
                </ul>
                <div className="flex gap-2 flex-col absolute bottom-4 w-full px-3 items-center">
                    {user ? <button onClick={()=>handleButtonClick(logout)} className="px-4 py-2 w-4/5 text-sm  font-medium text-muted border border-zinc-600 bg-secondary rounded-md hover:bg-zinc-200 transition-opacity">
                        Log out
                    </button> : <>
                        <button onClick={()=>handleButtonClick(() => navigate('/login'))} className="px-4 py-2 w-4/5 text-sm font-medium text-muted border border-zinc-600 bg-secondary rounded-md hover:bg-zinc-200 transition-opacity">
                            Log in
                        </button>
                        <button onClick={()=>handleButtonClick(() => navigate('/signup'))} className="px-4 py-2 w-4/5 text-sm font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700  rounded-md transition-colors">
                            Sign up
                        </button>
                    </>
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default Mobnav