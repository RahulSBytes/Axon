import { Check, ChevronDown, ChevronUp, Clipboard, Dot, Ghost, Search, SquareArrowOutUpRight, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateOrTime } from '../../utils/helpers.js'
import moment from 'moment'
import MarkdownRenderer from '../minicomponents/MarkdownRenderer.jsx'
import { useCopy } from '../../hooks/useCopy.js'



function Saved() {
  const [savedMessages, setSavedMessages] = useState([])
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate()
  const { copied, copyToClipboard } = useCopy()

  const toggleExpand = (messageId) => {
    setExpandedId(expandedId === messageId ? null : messageId);
  };

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

  async function handleUnsave(e, messageId) {
    e.stopPropagation(e)
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
      <section className="overflow-y-scroll flex-1">
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
            <div key={messageId} className="border-b border-zinc-300">
              {/* Header Strip */}
              <div onClick={() => toggleExpand(messageId)} className="flex justify-between items-center cursor-pointer p-3 pr-3 hover:bg-zinc-100">
                <span className="text-zinc-500 text-xs font-semibold">
                  {formatDateOrTime(createdAt)}
                </span>

                {/* Preview Text */}
                <div className="text-zinc-800 flex-1 mx-4 px-3">
                  <p className="font-semibold line-clamp-1">
                    {parentQuestion.questionText}
                  </p>
                  <p className="line-clamp-1 font-medium text-zinc-600">
                    {messageText}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 text-zinc-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(e)
                      navigate(`/chat/${conversationId}`)
                    }}
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
              </div>

              {/* Expandable Content */}
              {isExpanded && <div className={`transition-all duration-300 ease-in-out max-h-full opacity-100`}>
                <div className="bg-zinc-50 p-4 border-t border-zinc-200">
                  {/* Question */}
                  <div className="max-w-[70%] bg-zinc-100 rounded-lg p-3 self-end mt-2">
                    <div className="flex text-xs items-center font-medium text-zinc-500">
                      <span className="text-zinc-800 font-semibold">You</span>
                      <Dot />
                      {moment(createdAt).fromNow()}
                    </div>
                    <div className="text-zinc-800 mt-1 whitespace-pre-wrap">{parentQuestion.questionText}</div>
                  </div>

                  {/* Answer */}
                  <div className="max-w-[85%] rounded-lg p-3 self-start mt-2">
                    {/* Header */}
                    <div className="flex text-xs items-center font-medium text-zinc-500">
                      <span className="text-zinc-800 flex text-base items-center gap-1 font-semibold">
                        <Ghost size={16} />
                        Axon
                      </span>
                      <Dot />
                      {moment(createdAt).fromNow()}
                    </div>

                    {/* text */}
                    <div className="text-zinc-800 mt-1 ">
                      <MarkdownRenderer text={messageText} />
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      {/* Copy */}
                      <button
                        onClick={() => copyToClipboard(messageText)}
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        title="Copy message"
                      >
                        {copied ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Clipboard size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>}
            </div>
          );
        })}
      </section>
    </div>
  )
}

export default Saved