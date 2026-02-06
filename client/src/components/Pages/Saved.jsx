import { Check, ChevronDown, ChevronUp, Clipboard, Dot, EllipsisVertical, ExternalLink, Ghost, MessagesSquare, Search, SquareArrowOutUpRight, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateOrTime } from '../../utils/helpers.js'
import moment from 'moment'
import MarkdownRenderer from '../minicomponents/MarkdownRenderer.jsx'
import { useCopy } from '../../hooks/useCopy.js'
import { useLoadingState } from '../../hooks/useLoadingState.js'
import Mobnav from '../Layouts/Mobnav.jsx'
import toast from 'react-hot-toast'
import MiniLoader from '../minicomponents/MiniLoader.jsx'




function Saved() {

  const [savedMessages, setSavedMessages] = useState([])
  const [expandedId, setExpandedId] = useState(null);
  const [isButtonsOpen, setIsButtonsOpen] = useState('')
  const { isLoading, withLoading } = useLoadingState()
  const [loading, setIsLoading] = useState(false)


  const navigate = useNavigate()
  const { copied, copyToClipboard } = useCopy()


  async function fetchmessages() {
    setIsLoading(true);
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/saved`)
    if (data.success) {
      setSavedMessages(data.savedMessages)
    } else {
      toast.error("Error fetching saved messages")
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchmessages()
  }, [])


  if(loading) return <MiniLoader/>


  const toggleExpand = (messageId) => {
    setExpandedId(expandedId === messageId ? null : messageId);
  };



  function openButtonsOption(e, messageId) {
    e.stopPropagation();
    setIsButtonsOpen(messageId);
  }


  async function handleUnsave(e, messageId) {
    e.stopPropagation(e)
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/saved/${messageId}`)
      if (data.success && data.info) {
        setSavedMessages(prev => prev.filter((message) => message.messageId !== data.info.messageId));
      }
    } catch (error) {
      toast.error("Error unsaving message");
    }
  };


  function searchHandler() {
    toast("This feature is being developed")
  }


  const openParentChat = (e, chatid) => {
    e.stopPropagation(e)
    navigate(`/chat/${chatid}`)
  }


  return (
    <div className='flex h-full w-full flex-col scrollbar-thin px-6'>
      <div className='w-full flex justify-between items-center h-24'>
        <span className='font-adlam text-2xl cursor-pointer'>Saved Messages</span>
        <div className='flex gap-4'>
          <div className='flex gap-2 items-center'>
            {false && <input type="text" className=' border-2 border-zinc-400 rounded-full px-4 py-1 text-zinc-600 font-medium outline-none' />}
            <Search onClick={searchHandler} className='text-zinc-700 cursor-pointer' />
          </div>
          <Mobnav />
        </div>
      </div>
      {savedMessages.length > 0 ? <section className="overflow-y-scroll flex-1">
        {savedMessages.map(({
          conversationId,
          createdAt,
          messageId,
          messageText,
          parentQuestion,
          user
        }) => {
          const isExpanded = expandedId === messageId;

          return (
            <div key={messageId} className="border-b border-zinc-300  flex flex-col">
              {/* Header Strip */}
              <div onClick={() => toggleExpand(messageId)} className="flex min-h-20 justify-between items-center cursor-pointer sm:gap-6 h-full hover:bg-zinc-100">
                {
                  isButtonsOpen != messageId ?
                    <>
                      <span className="text-zinc-500 text-xs font-semibold hidden sm:inline">
                        {formatDateOrTime(createdAt)}
                      </span>

                      {/* Preview Text */}
                      <div className="text-zinc-800 flex-1 w-9/12">
                        <p className="font-semibold line-clamp-1">
                          {parentQuestion.questionText}
                        </p>
                        <p className="line-clamp-1 font-medium text-zinc-600">
                          {messageText}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="gap-3 text-zinc-800 hidden sm:flex">
                        <button
                          onClick={(e) => openParentChat(e, conversationId)}
                          type="button"
                          className="hover:bg-zinc-200 p-2 rounded-full transition-colors"
                          title="Open in chat"
                        >
                          <SquareArrowOutUpRight size={21} />
                        </button>

                        <button
                          onClick={(e) => handleUnsave(e, messageId)}
                          type="button"
                          className="hover:bg-zinc-200 hover:text-red-500 p-2 rounded-full transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 size={21} />
                        </button>

                        <button className="hover:bg-zinc-200 p-2 rounded-full transition-all">
                          {isExpanded ? (
                            <ChevronUp size={24} />
                          ) : (
                            <ChevronDown size={24} />
                          )}
                        </button>
                      </div>
                      <EllipsisVertical className='sm:hidden' onClick={(e) => openButtonsOption(e, messageId)} />
                    </> : <div className="flex items-center justify-between  rounded-lg h-full w-full">
                      <div className="flex items-center flex-1 justify-around">
                        <button onClick={withLoading(messageId, (e) => openParentChat(e, conversationId))} className="bg-zinc-200 justify-center flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-700  rounded-md transition-colors">
                          <MessagesSquare size={16} className={`${isLoading(messageId) ? "animate-bounce" : ''}`} />
                          Open Parent Chat
                        </button>
                        <button onClick={withLoading(messageId + "hi", (e) => handleUnsave(e, messageId))} className="flex items-center gap-1 px-3 py-1.5 text-sm text-zinc-700  justify-center bg-zinc-200   rounded-md transition-colors">
                          <Trash2 className={`${isLoading(messageId + "hi") ? 'animate-bounce' : ''}`} size={16} />
                          Delete
                        </button>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setIsButtonsOpen('') }} className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200 rounded-md transition-colors">
                        <X size={20} />
                      </button>
                    </div>
                }

              </div>
              {isExpanded && (
                <div className="border-t h-full">
                  <div className="p-4 md:p-6 space-y-4">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] md:max-w-[70%] bg-zinc-800 text-white rounded-2xl rounded-tr-sm p-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                          <span className="font-semibold text-zinc-200">You</span>
                          <Dot size={16} />
                          <span>{moment(createdAt).fromNow()}</span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm md:text-base">
                          {parentQuestion.questionText}
                        </p>
                      </div>
                    </div>

                    {/* Answer */}
                    <div className="flex justify-start">
                      <div className="max-w-[90%] md:max-w-[85%]">
                        {/* Header */}
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                          <div className="flex items-center gap-1.5 font-semibold text-zinc-700">
                            <div className="p-1 bg-zinc-100 rounded-md">
                              <Ghost size={14} />
                            </div>
                            Axon
                          </div>
                          <Dot size={16} />
                          <span>{moment(createdAt).fromNow()}</span>
                        </div>

                        {/* Message Content */}
                        <div className="bg-zinc-100 rounded-2xl rounded-tl-sm p-4">
                          <div className="text-zinc-800 text-sm md:text-base prose prose-sm max-w-none">
                            <MarkdownRenderer text={messageText} />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-3 ml-2">
                          <button
                            onClick={() => copyToClipboard(messageText)}
                            className="flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                            title="Copy message"
                          >
                            {copied ? (
                              <>
                                <Check size={14} className="text-green-500" />
                                <span className="text-green-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Clipboard size={14} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => openParentChat(e, conversationId)}
                            className="flex items-center gap-1.5 px-2 py-1 text-xs text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
                          >
                            <ExternalLink size={14} />
                            <span>View in Chat</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </section> : <div className='h-full flex justify-center items-center text-zinc-400 font-semibold'>No Message Saved</div>
      }
    </div>
  )
}

export default Saved