import { Search } from 'lucide-react'
import { history } from '../../constants/constant.js'
import moment from 'moment'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'



function History() {
    const [conversation, setConversation] = useState([])

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
    })


    const handleClick = (chatId) => {
        console.log(chatId)
    }


    return (
        <div className='flex h-full w-full flex-col px-14 scrollbar-thin'>
            <div className='pb-4 pt-6 pl-0 pr-8 flex justify-between items-center'>
                <h3 className='text-2xl font-medium'>History</h3>
                <Search className='text-zinc-700 cursor-pointer' />
            </div>
            <section className=' overflow-y-scroll flex-1'>
                {
                    conversation.map(({ title, created_at, _id },index) => <div onClick={() => handleClick(_id)} key={_id} className={` flex justify-between cursor-pointer p-3 ${index % 2 == 0 ? "bg-zinc-300" : ""}`}>
                        <p className='text-zinc-800'>{title}</p> <span className='text-muted  text-sm'>{moment(created_at).fromNow()}</span>
                    </div>)
                }
            </section>
        </div>
    )
}

export default History