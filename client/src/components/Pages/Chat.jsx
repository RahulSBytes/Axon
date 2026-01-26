import { useOutletContext, useParams, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import Message from '../minicomponents/Message.jsx';

function Chat() {

    const { chatid } = useParams()
    const location = useLocation()
    const { initialMessage } = location.state || {}
    // ✅ Ref for the bottom element
    const bottomRef = useRef(null)


    const { chats = [], setChats, isLoading, setIsLoading, sendMessage } = useOutletContext()
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chats])

    const fetchChat = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/chats/${chatid}`
            )

            if (data.success) {
                setChats(data.chat.messages)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (initialMessage) {
            sendMessage(chatid, initialMessage)
            window.history.replaceState({}, document.title)
        } else {
            fetchChat()
        }
    }, [chatid])

    console.log(chats)

    return (
        <div id="pdf-printable" className='flex flex-1 overflow-y-scroll scrollbar-thin noScrollbar max-w-full'>
            {chats.length > 0 ? (
                <div className='w-full flex flex-col py-2'>
                    {chats.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                    {isLoading && (
                        <div className='p-4 text-muted animate-pulse'>
                            Thinking...
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            ) : (
                <div className='text-muted p-4'>
                    {isLoading ? 'Loading...' : 'No conversation yet'}
                </div>
            )}
        </div>
    )
}

export default Chat