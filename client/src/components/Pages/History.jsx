import { EllipsisVertical, Pin, PinIcon, Search, Trash2, X } from 'lucide-react'
import { Fragment, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateOrTime } from '../../utils/helpers.js'
import { useLoadingState } from '../../hooks/useLoadingState.js'
import toast from 'react-hot-toast'
import Mobnav from '../Layouts/Mobnav.jsx'



function History() {
    const [conversation, setConversation] = useState([])
    const navigate = useNavigate()

    const { isLoading, withLoading } = useLoadingState()
    const [isSearchOpened, setIsSearchOpened] = useState(false)
    const [isButtonsOpen, setIsButtonsOpen] = useState('')
    const [isPinnedClicked, setIsPinnedClicked]= useState(false)


    async function fetchConveration() {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats`)
        if (data.success) {
            setConversation(data.chats)
        } else {
            toast.error("Error fetching conversation")
        }
    }

    useEffect(() => {
        fetchConveration();
    }, [])


    const handleClick = (chatId) => {
        navigate(`/chat/${chatId}`)
    }

    function openButtonsOption(e, chatId) {
        e.stopPropagation();
        setIsButtonsOpen(chatId);
    }

    async function handleDelete(e, chatId) {
        setTimeout(() => {
            console.log("waited")
        }, 1000000)
        e.stopPropagation()
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`)
            if (data.success) {
                setConversation(prev => prev.filter((chat) => chat._id != data.chatId))
            }
        } catch (error) {
            toast.error("Error deleting conversation");
        }
    }

    async function handlePin(e, chatId, isPinned) {
        e.stopPropagation()
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}/toggle-pin`, { isPinned })
            if (data.success) {
                setConversation(prev => prev.map((chat) => {
                    return chat._id == data.updatedData._id
                        ? { ...chat, isPinned: data.updatedData.isPinned }
                        : chat
                }))
            }
        } catch (error) {
            toast.error("Error pinning conversation");
        }
    }

    function handleSearch() {
        toast("This feature is being developed")
    }


    return (
        <div className='flex w-full h-full flex-col md:px-14 px-6 scrollbar-thin'>
            <div className='w-full flex justify-between items-center h-24'>

                <span className='font-adlam text-2xl cursor-pointer'>History</span>

                <div className='flex gap-4'>
                    <div className='flex gap-2 items-center'>
                        {false && <input type="text" className=' border-2 border-zinc-400 rounded-full px-4 py-1 text-zinc-600 font-medium outline-none' />}
                        <Search onClick={handleSearch} className='text-zinc-700 cursor-pointer' />
                    </div>
                    <Mobnav />
                </div>
            </div>
            <div className='flex gap-4 mb-2'>
                
                <button onClick={()=>setIsPinnedClicked(false)} className={`rounded-full gap-1 transition-colors flex items-center text-xs py-1 px-6 font-semibold ${!isPinnedClicked
                    ? "text-blue-600 bg-blue-100 outline-blue-800"
                    : "hover:text-zinc-600 hover:bg-zinc-200 bg-zinc-200  text-zinc-500  "
                    }`}>All</button>
                <button onClick={()=>setIsPinnedClicked(true)}  className={`rounded-full gap-1 font-semibold transition-colors flex items-center text-xs py-1 px-2 ${isPinnedClicked
                    ? "text-blue-600 bg-blue-100"
                    : "hover:text-zinc-600 hover:bg-zinc-200 bg-zinc-200  text-zinc-500  "
                    }`}>Pinned</button>
            </div>
            {
                conversation.length > 0 ?
                    <section className='overflow-y-scroll scrollbar-thin flex-1'>
                        {
                            conversation.map(({ title, created_at, _id, messages, isPinned }) => {
                                if(isPinnedClicked && !isPinned) return null;
                               return isButtonsOpen !== _id ? <Fragment key={_id}>
                                    <div onClick={() => handleClick(_id)} className={` flex justify-between items-center cursor-pointer h-20 pr-5 border-b border-zinc-300 hover:bg-zinc-100`}>
                                        <span className='text-zinc-500  text-xs font-semibold hidden sm:block'>{formatDateOrTime(created_at)}</span>
                                        <div className='text-zinc-800 flex-1 sm:mx-4 px-3'>
                                            <p className='font-semibold line-clamp-1'>{title}</p>
                                            <p className='line-clamp-1 font-medium text-zinc-600'>{messages[1]?.text || "no converation available"}</p>
                                        </div>
                                        <div className='sm:flex hidden gap-2 '>
                                            <button onClick={withLoading(_id + title, (e) => handleDelete(e, _id))} type="button" className={`hover:bg-zinc-200 hover:text-red-500 p-2  rounded-full`}  ><Trash2 className={`${isLoading(_id + title) ? 'animate-bounce' : ''}`} size={21} /></button>
                                            <button onClick={withLoading(_id, (e) => handlePin(e, _id, !isPinned))} type="button" className='hover:bg-zinc-200 p-2 rounded-full'><Pin className={`${isLoading(_id) ? "animate-bounce" : ''}`} fill={isPinned ? "#61616a" : "#f1f1f1"} color='#212121' size={21} /></button>
                                        </div>
                                        <EllipsisVertical size={20} onClick={(e) => openButtonsOption(e, _id)} className='block sm:hidden cursor-pointer' />
                                    </div>
                                </Fragment> : <Fragment key={_id}>
                                    <div className="flex items-center justify-between rounded-lg h-20 pr-5 border-b border-zinc-300 w-full">
                                        <div className="flex items-center flex-1 justify-around">
                                            <button onClick={withLoading(_id, (e) => handlePin(e, _id, !isPinned))} className="bg-zinc-200 justify-center flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-700 w-1/3 rounded-md transition-colors">
                                                <PinIcon size={16} className={`${isLoading(_id) ? "animate-bounce" : ''}`} fill={isPinned ? "#61616a" : "#f1f1f1"} />
                                                Pin
                                            </button>
                                            <button onClick={withLoading(_id + title, (e) => handleDelete(e, _id))} className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-700 w-1/3 justify-center bg-zinc-200   rounded-md transition-colors">
                                                <Trash2 className={`${isLoading(_id + title) ? 'animate-bounce' : ''}`} size={16} />
                                                Delete
                                            </button>
                                        </div>
                                        <button onClick={() => setIsButtonsOpen('')} className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 rounded-md transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>
                                </Fragment>
                            })
                        }
                    </section> : <div className='h-full flex justify-center items-center text-zinc-400 font-semibold'>No Chat History, Try Creating New </div>
            }
        </div>
    )
}

export default History