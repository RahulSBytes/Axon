import { ChevronRight, ClockFading, House, Info, KeyRound, LogOut, Menu, Star, UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom';

function Mobnav() {
    const { user, logout } = useAuth();
    const navigate = useNavigate()
      const [isNavOpen, setIsNavOpen] = useState(false)
    

    const navs = [
        { icon: House, method: () => navigate('/'), label: 'Home' },
        { icon: ClockFading, method: () => navigate('/history'), label: 'History' },
        { icon: Star, method: () => navigate('/saved'), label: 'Saved' },
        { icon: KeyRound, method: () => navigate('/login'), label: 'Login' },
        { icon: UserRoundPlus, method: () => navigate('/signup'), label: 'Signup' },
        { icon: LogOut, method: () => logout(), label: 'Logout' },
        { icon: Info, method:() => navigate('/about'), label: 'About App' },
    ]





    const handleButtonClick = (action) => {
        setIsNavOpen(false);
        if (action) action();
    };

    return (
        <div className='flex flex-col  md:hidden w-fit '>
            <nav className='flex justify-between items-center'>
                <div onClick={() => setIsNavOpen(true)} className='cursor-pointer pr-2'><Menu size={27} /></div>
            </nav>
            {isNavOpen && <div className=' flex flex-col  absolute z-40 right-0 top-0 h-screen items-center w-screen bg-secondary p-3 px-8'>
                <div className='flex items-center  w-full'>
                    <h4 className='text-3xl font-bold flex-1 py-5 text-zinc-800'>Profile</h4>
                    <button onClick={() => setIsNavOpen(false)} className='border-2 border-zinc-300 rounded-md h-fit px-2'>esc</button>
                </div>
                <div className='w-full flex flex-col gap-3 items-center my-6'>
                    {user.avatar ?
                        <img src={user.avatar} className='w-20 h-20 object-cover rounded-full border-zinc-500 border-2' /> :
                        <div className='w-20 h-20 rounded-full border-zinc-500 border-2 bg-yellow-400 flex justify-center items-center text-3xl font-medium'>{user.fullName[0].toUpperCase()}</div>
                    }
                    <div className='flex flex-col items-center'>
                        <p className='font-bold text-zinc-700 text-lg'>{user.fullName}</p>
                        <p className='text-zinc-600 text-sm'>{user.email}</p>
                    </div>
                </div>
                <ul className='flex flex-col gap-4 mt-6 w-full '>
                    {
                        navs.map((item) => {
                            if ((!user && item.label == 'Logout') || (user && (item.label === "Signup" || item.label === "Login"))) return null;
                            return <li onClick={() => handleButtonClick(item.method)} className='flex cursor-pointer hover:text-zinc-600 p-4 font-semibold text-lg text-zinc-600 w-full justify-between' key={item.label}>
                                <div className='flex gap-4 items-center'>
                                    <item.icon size={40} className='text-muted p-2 bg-zinc-200 rounded-lg' /> {item.label}
                                </div>
                                <ChevronRight size={22} />
                            </li>
                        })
                    }

                </ul>
            </div>
            }
        </div>
    )
}

export default Mobnav