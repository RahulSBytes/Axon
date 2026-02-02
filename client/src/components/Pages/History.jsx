import { Pin, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateOrTime } from '../../utils/helpers.js'
import { useLoadingState } from '../../hooks/useLoadingState.js'



function History() {
    const [conversation, setConversation] = useState([])
    const navigate = useNavigate()

    const { isLoading, withLoading } = useLoadingState()
    const [isSearchOpened, setIsSearchOpened] = useState(false)


    async function fetchConveration() {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats`)
        if (data.success) {
            setConversation(data.chats)
        } else {
            console.log("error fetching conversation")
        }
    }

    useEffect(() => {
        fetchConveration();
    }, [])


    const handleClick = (chatId) => {
        navigate(`/chat/${chatId}`)
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
            console.log("error deleting conversation", error);
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
            console.log("error pinning conversation", error)
        }
    }

    function handleSearch() {
        alert("this feature is being developed !!")
    }


    return (
        <div className='flex h-full w-full flex-col px-14 scrollbar-thin'>
            <div className='pb-4 pt-6 pl-0 pr-8 flex justify-between items-center'>
                <h3 className='text-2xl font-medium'>History</h3>
                <div className='flex gap-2 items-center'>
                    {false && <input type="text" className=' border-2 border-zinc-400 rounded-full px-4 py-1 text-zinc-600 font-medium outline-none' />}
                    <Search onClick={handleSearch} className='text-zinc-700 cursor-pointer' />
                </div>
            </div>
            {
                conversation.length > 0 ?
                    <section className=' overflow-y-scroll flex-1'>
                        {
                            conversation.map(({ title, created_at, _id, messages, isPinned }) => (
                                <div onClick={() => handleClick(_id)} key={_id} className={` flex justify-between items-center cursor-pointer p-3 pr-5 border-b border-zinc-300 hover:bg-zinc-100`}>
                                    <span className='text-zinc-500  text-xs font-semibold'>{formatDateOrTime(created_at)}</span>
                                    <div className='text-zinc-800 flex-1 mx-4 px-3'>
                                        <p className='font-semibold line-clamp-1'>{title}</p>
                                        <p className='line-clamp-1 font-medium text-zinc-600'>{messages[1]?.text || "no converation available"}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={withLoading(_id + title, (e) => handleDelete(e, _id))} type="button" className={`hover:bg-zinc-200 hover:text-red-500 p-2  rounded-full`}  ><Trash2 className={`${isLoading(_id + title) ? 'animate-bounce' : ''}`} size={21} /></button>
                                        <button onClick={withLoading(_id, (e) => handlePin(e, _id, !isPinned))} type="button" className='hover:bg-zinc-200 p-2 rounded-full'><Pin className={`${isLoading(_id) ? "animate-bounce" : ''}`} fill={isPinned ? "#61616a" : "#f1f1f1"} color='#212121' size={21} /></button>
                                    </div>
                                </div>))
                        }
                    </section> : <div className='h-full flex justify-center items-center text-zinc-400 font-semibold'>No Chat History, Try Creating New </div>
            }
        </div>
    )
}

export default History