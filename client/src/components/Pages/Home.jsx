import { ChevronDown, ChevronUp, Download, DownloadIcon, Globe, Send, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'

import Cards from '../shared/Cards'
import { conversation, llms, prompts } from '../../constants/constant.js'
import Message from '../minicomponents/Message.jsx';
import { exportPDF } from '../../utils/exportPDF.js';
import { useAuth } from '../../hooks/useAuth.js';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

function Home() {
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isCapsuleHovered, setIsCapsuleHovered] = useState(false)
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')

  const { pathname } = useLocation()
  const { chatid } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleExport = () => {
    exportPDF({
      title: conversation.title || 'Chat Conversation',
      userName: 'Rahul Sharma',
      userEmail: 'rraj@gmail.com',
    });
  };

  const sendMessage = async (id, message) => {
    setIsLoading(true)
    const tempId = crypto.randomUUID()

    setChats(prev => [...(prev || []), {
      _id: tempId,
      role: 'user',
      text: message,
      createdAt: new Date().toISOString()
    }])

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats/${id}/message`,
        { prompt: message }
      )

      console.log("datatata :: ", data)

      if (data.success) {
        setChats(prev => {
          const updatedChats = prev.map(msg =>
            msg._id === tempId ? data.userMessage : msg
          )
          return [...updatedChats, data.assistantMessage]
        })
      }
    } catch (error) {
      console.error(error)
      setChats(prev => prev.filter(msg => msg._id !== tempId))
    } finally {
      setIsLoading(false)
    }
  }



  const handleSend = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    const messageToSend = prompt;
    setPrompt('')

    if (!pathname.startsWith('/chat/')) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats`,
        { title: messageToSend.slice(0, 50) }
      )

      if (data.success) {
        navigate(`/chat/${data.conversation._id}`, {
          state: { initialMessage: messageToSend }
        })
      }
    } else {
      await sendMessage(chatid, messageToSend)
    }
  }


  return (
    <>
      <div className='flex self-end m-4 mb-0 absolute'>
        <div className={`flex bg-primary ${isCapsuleHovered ? "rounded-sm" : "rounded-full"} px-1 justify-between items-center border border-zinc-300 gap-1`}>

          {
            isCapsuleHovered ? <div className='flex flex-col items-center px-6 py-2  justify-center' onClick={() => setIsCapsuleHovered(false)}>

              <ChevronUp onClick={() => setIsCapsuleHovered(true)} className='text-muted self-end cursor-pointer' size={26} />
              {user.avatar ?
                <img src={user.avatar} className='w-20 h-20 object-cover rounded-full border-secondary border-2' /> :
                <div className='w-20 h-20 rounded-full border-zinc-500 border-2 bg-yellow-400 flex justify-center items-center text-3xl font-medium'>{user.fullName[0].toUpperCase()}</div>
              }
              <p className='font-medium text-muted'>{user.fullName}</p>
              <p className='text-zinc-500 text-sm'>{user.email}</p>
              <button type="button" onClick={logout} className="mt-3 px-4 py-1.5 w-full text-sm font-medium text-muted border border-zinc-600 bg-secondary rounded-md hover:bg-zinc-200 transition-opacity">Logout</button>
            </div> : <>
              {user.avatar ?
                <img src={user.avatar} className='h-8 w-8 rounded-full border-secondary border-2' /> :
                <div className='h-8 w-8 object-cover rounded-full border-zinc-500 border-2 bg-yellow-400 flex justify-center items-center  font-medium'>{user.fullName[0].toUpperCase()}</div>
              }

              <ChevronDown onClick={() => setIsCapsuleHovered(true)} className='text-muted cursor-pointer' size={26} />
            </>
          }

        </div>

      </div>

      <div className='w-3/4 flex flex-col mb-3 max-h-full'>
        <Outlet context={{
          chats,
          setChats,
          isLoading,
          setIsLoading,
          sendMessage
        }} />
        <form onSubmit={handleSend} className='bg-primary flex rounded-sm bottom-2 mb-2'>
          <div className='w-full'>

            <div className='flex'>
              <textarea value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything..."
                disabled={isLoading} rows={3} className='w-full bg-transparent m-3 mb-2 outline-none text-muted font-medium' />
            </div>
            <div className='flex gap-2 flex-1 m-2'>
              <div onClick={() => setIsWebSearchEnabled((prev) => !prev)} className={`flex rounded-full px-2 text-sm items-center gap-1 border border-zinc-400 cursor-pointer text-muted ${isWebSearchEnabled ? "bg-blue-200 border-blue-500" : ""}`}>
                <Globe size={17} />
                Web Search
              </div>
              <select name="" id="" className='border border-zinc-400 rounded-full px-1 text-muted bg-primary'>
                {
                  llms.map((model, index) => <option key={index} value={model}>{model}</option>)
                }
              </select>
              {pathname.startsWith('/chat/') && <div>
                <button onClick={handleExport} type="button" className='flex border border-zinc-600 rounded-full py-1 px-2' ><DownloadIcon size={16} /> <span>Pdf</span></button>
              </div>}
            </div>
          </div>
          <button type="submit" disabled={isLoading || !prompt.trim()} className='pr-6 pl-1 w-18 flex justify-center items-center'><Send size={32} className='text-muted' /></button>
        </form>


      </div>
    </>
  )
}

export default Home