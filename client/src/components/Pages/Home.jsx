import { ChevronDown, ChevronUp, Globe, Send, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

import Cards from '../shared/Cards'
import { conversation } from '../../constants/constant.js'
import Chat from './Chat.jsx'
import Message from '../minicomponents/Message.jsx';
// import AgentMessage from '../minicomponents/AgentMessage.jsx';
// import UserMessage from '../minicomponents/UserMessage.jsx';

function Home() {
  const chats = useState(null)
  const [isCapsuleHovered, setIsCapsuleHovered] = useState(false)
  const handleclick = () => {
    return
  }

  const llms = [
    "GPT-4",
    "Claude 3",
    "Gemini 1.5",
    "LLaMA 3",
    "Mistral Large"
  ]

  const prompts = [
    "Write a LinkedIn post about my new job.",
    "What's wrong with this code?",
    "What are the latest trends in AI?"
  ]


  const [isWebSearchEnabled,setIsWebSearchEnabled] = useState(false);


  return (
    <>
      <div className='flex self-end m-4 mb-0 absolute'>
        <div className={`flex bg-primary ${isCapsuleHovered ? "rounded-sm" : "rounded-full"} px-1 justify-between items-center border border-zinc-300 gap-1`}>

          {
            isCapsuleHovered ? <div className='flex flex-col items-center p-4 pt-2 pr-2' onClick={() => setIsCapsuleHovered(false)}>

              <ChevronUp onClick={() => setIsCapsuleHovered(true)} className='text-muted self-end cursor-pointer' size={26} />
              <img src="https://stylishattitudedp.com/wp-content/uploads/2025/11/Blur-DP-for-Instagram-Boy-3-768x767.jpg" className='w-20 h-20 object-cover rounded-full border-secondary border-2' />
              <p className='font-medium text-muted'>Rahul Sharma</p>
              <p className='text-zinc-500 text-sm'>rraj@gmail.com</p>
            </div> : <>
              <img src="https://stylishattitudedp.com/wp-content/uploads/2025/11/Blur-DP-for-Instagram-Boy-3-768x767.jpg" className='h-8 w-8 rounded-full border-secondary border-2' />
              <ChevronDown onClick={() => setIsCapsuleHovered(true)} className='text-muted cursor-pointer' size={26} />
            </>
          }

        </div>

      </div>

      <div className='w-3/4 flex flex-col mb-3 max-h-full'>
        <div className='flex flex-1 overflow-y-scroll scrollbar-thin noScrollbar'>
          {
            conversation.messages.length > 0 ?
              <div className='w-full flex flex-col py-2'>
                {
                  conversation.messages.map((message) => <Message message={message} /> )
                }
              </div>
              : <>
                <div className='text-xl font-medium flex  flex-1 justify-center text-center flex-col mx-[9%] gap-1'>
                  <div className='text-3xl'>Think Faster.<span className='text-accent'>Create Smarter.</span></div>
                  <span className='text-muted text-base'>Your AI-powered assistant for instant answers, creative ideas, and intelligent conversations.</span>
                </div>
                <div className='flex gap-6 mb-4'>
                  <Cards prompts={prompts} />
                </div>
              </>
          }
        </div>
        <form action="#" method="get" className='bg-primary flex rounded-sm bottom-2 mb-2'>
          <div className='w-full'>

            <div className='flex'>
              <textarea rows={3} className='w-full bg-transparent m-3 mb-2 outline-none text-muted font-medium' />
            </div>
            <div className='flex gap-2 flex-1 m-2'>
              <div onClick={()=>setIsWebSearchEnabled((prev)=>!prev)} className={`flex rounded-full px-2 text-sm items-center gap-1 border border-zinc-400 cursor-pointer text-muted ${isWebSearchEnabled? "bg-blue-200 border-blue-500":""}`}>
                <Globe size={17} />
                Web Search
              </div>
              <select name="" id="" className='border border-zinc-400 rounded-full px-1 text-muted bg-primary'>
                {
                  llms.map((model) => <option value={model}>{model}</option>)
                }
              </select>
            </div>
          </div>
          <button onClick={handleclick} className='pr-6 pl-1 w-18 flex justify-center items-center'><Send size={32} className='text-muted' /></button>
        </form>


      </div>
    </>
  )
}

export default Home