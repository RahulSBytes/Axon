import { ChevronDown, Search, SquareArrowOutUpRight, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateOrTime } from '../../utils/helpers.js'



function Saved() {
  const [savedMessages, setSavedMessages] = useState([])
  const navigate = useNavigate()


  async function fetchmessages() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/saved/`)
    console.log("saved messages ::", data)
    if (data.success) {
      setSavedMessages(data.savedMessages)
    } else {
      console.log("error fetching saved messages")
    }
  }


  useEffect(() => {
    fetchmessages();
  }, [])



  async function handleUnsave(messageId) {
      try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/saved/${messageId}`)
        if (data.success && data.info) {
          setSavedMessages(prev => prev.filter((message) => message.messageId !== data.info.messageId));
        }
      } catch (error) {
        console.log("error unsaving message", error);
      }
    };


  return (
    <div className='flex h-full w-full flex-col px-14 scrollbar-thin'>
      <div className='pb-4 pt-6 pl-0 pr-8 flex justify-between items-center'>
        <h3 className='text-2xl font-medium'>Saved Messages</h3>
        <Search className='text-zinc-700 cursor-pointer' />
      </div>
      <section className=' overflow-y-scroll flex-1'>
        {
          savedMessages.map(({ conversationId, createdAt, messageId, messageText, parentQuestion, user }) => (
            <div key={messageId} className={` flex justify-between items-center cursor-pointer p-3 pr-3 border-b border-zinc-300 hover:bg-zinc-100`}>
              <span className='text-zinc-500  text-xs font-semibold'>{formatDateOrTime(createdAt)}</span>
              <div className='text-zinc-800 flex-1 mx-4 px-3'>
                <p className='font-semibold line-clamp-1'>{parentQuestion.questionText}</p>
                <p className='line-clamp-1 font-medium text-zinc-600'>{messageText}</p>
              </div>
              <div className='flex gap-3 text-zinc-800'>
                <button onClick={()=>navigate(`/chat/${conversationId}`)} type="button" className='hover:bg-zinc-200 p-2  rounded-full'><SquareArrowOutUpRight size={21} /></button>
                <button onClick={() => handleUnsave(messageId)} type="button" className='hover:bg-zinc-200 hover:text-red-500 p-2  rounded-full'><Trash2 size={21} /></button>
                <button type="button" className='hover:bg-zinc-200 p-2 rounded-full'><ChevronDown size={24} /></button>
              </div>
            </div>))
        }
      </section>
    </div>
  )
}

export default Saved