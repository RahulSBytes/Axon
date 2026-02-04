import { ChevronDown, ChevronUp, Download, Globe, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { llms } from '../../constants/constant.js'
import { exportPDF } from '../../utils/exportPDF.js';
import { useAuth } from '../../hooks/useAuth.js';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Mobnav from '../Layouts/Mobnav.jsx';
import toast from 'react-hot-toast';

function Home() {
  const [isToolCalling, setIsToolCalling] = useState(false);
  const [isCapsuleHovered, setIsCapsuleHovered] = useState(false)
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState("llama-3.3-70b-versatile")

  const { pathname } = useLocation()
  const { chatid } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()



  useEffect(() => {
    if (!pathname.startsWith('/chat/')) {
      setChats([]);
    }
  }, [pathname]);


  const handleExport = () => {
    exportPDF({
      title: 'Axon Conversation',
      userName: user.fullName,
      userEmail: user.email,
    })
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
        { prompt: message, model: selectedModel, toolCalling: isToolCalling }
      )

      if (data.success) {
        setChats(prev => {
          const updatedChats = prev.map(msg =>
            msg._id === tempId ? data.userMessage : msg
          )
          return [...updatedChats, { ...data.assistantMessage, isNew: true }] // isNew is just for animation purpose
        })
      }
    } catch (error) {
      setPrompt(message)
      toast.error("Failed sending message")
      setChats(prev => prev.filter(msg => msg._id !== tempId))
    } finally {
      setIsLoading(false)
    }
  }



  const handleSend = async (e, prompt) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    const messageToSend = prompt;
    setPrompt('')

    if (!pathname.startsWith('/chat/')) {
      setChats([]);
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
      <div className="hidden md:flex items-center justify-center gap-3 absolute top-4 right-4">
        <div className="relative">
          {isCapsuleHovered ? (
            <div className="absolute right-0 top-0 bg-white border border-zinc-200 rounded-xl shadow-lg p-4 flex flex-col items-center min-w-[220px] z-50">
              <ChevronUp
                onClick={() => setIsCapsuleHovered(false)}
                className="text-zinc-400 hover:text-zinc-600 self-end cursor-pointer transition-colors"
                size={20}
              />

              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-16 h-16 object-cover rounded-full border-2 border-zinc-100"
                  alt={user.fullName}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex justify-center items-center text-2xl font-semibold text-white">
                  {user.fullName[0].toUpperCase()}
                </div>
              )}

              <p className="font-semibold text-zinc-800 mt-3">{user.fullName}</p>
              <p className="text-zinc-500 text-sm truncate max-w-[180px]">{user.email}</p>

              {pathname.startsWith('/chat/') && <button
                type="button"
                onClick={handleExport}
                className="mt-4 px-4 py-2 w-full text-sm font-medium text-zinc-700 border border-zinc-300  rounded-lg  transition-colors"
              >
                Export
              </button>
              }
              <button
                type="button"
                onClick={logout}
                className="mt-4 px-4 py-2 w-full text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsCapsuleHovered(true)}
              className="flex items-center gap-2 p-1 px-1 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="h-8 w-8 rounded-full object-cover"
                  alt={user.fullName}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex justify-center items-center text-sm font-semibold text-white">
                  {user.fullName[0].toUpperCase()}
                </div>
              )}
              <ChevronDown className="text-zinc-500" size={18} />
            </button>
          )}
        </div>
      </div>

      <div className='md:w-3/4 w-full flex flex-col mb-3 max-h-full  h-full'>
        <div className='w-full flex justify-between items-center h-24 px-4 md:hidden'>
          <span className='font-adlam text-4xl cursor-pointer'>Axon</span> <Mobnav />
        </div>
        <Outlet context={{
          chats,
          setChats,
          isLoading,
          handleSend,
          setIsLoading,
          sendMessage
        }} />
        <form
          onSubmit={(e) => handleSend(e, prompt)}
          className="bg-zinc-100 border border-zinc-300 rounded-xl p-2 m-2 md:mx-0"
        >
          <div className="flex items-end gap-2 w-full ">
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything..."
                disabled={isLoading}
                rows={3}
                className="w-full bg-transparent px-2 py-1 outline-none text-zinc-800 placeholder:text-zinc-400 resize-none min-h-[40px] max-h-[120px]"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />

              <div className="flex items-center gap-2 px-2 pb-1">
                <button
                  type="button"
                  onClick={() => setIsToolCalling((prev) => !prev)}
                  className={`p-1.5 rounded-full gap-1 transition-colors flex items-center text-xs py-1 px-2 ${isToolCalling
                    ? "text-blue-600 bg-blue-100"
                    : "hover:text-zinc-600 hover:bg-zinc-200 bg-zinc-200  text-zinc-500  "
                    }`}
                  title="Web Search"
                >
                  <Globe size={18} />
                  <p>Search</p>
                </button>

                <select
                  onChange={(e) => setSelectedModel(e.target.value)}
                  value={selectedModel}
                  className="text-xs text-zinc-500 bg-transparent bg-zinc-200 py-[6px] px-2 w-1/3 rounded-full outline-none cursor-pointer"
                >
                  {llms.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`p-3 rounded-xl transition-all ${prompt.trim() && !isLoading
                ? "bg-zinc-800 text-white hover:bg-zinc-700"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                }`}
            >
              <Send size={20} />
            </button>
          </div>
        </form>


      </div>
    </>
  )
}

export default Home