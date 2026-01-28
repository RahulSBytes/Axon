import { useOutletContext, useParams, useLocation } from 'react-router-dom'
import { useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import Message from '../minicomponents/Message.jsx';

function Chat() {

    const { chatid } = useParams()
    const location = useLocation()
    const { initialMessage } = location.state || {}
    const bottomRef = useRef(null)
        const lastScrollTime = useRef(0);

    const scrollToBottom = useCallback(() => {
        const now = Date.now();
        if (now - lastScrollTime.current > 100) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            lastScrollTime.current = now;
        }
    }, []);


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




    return (
        <div id="pdf-printable" className='flex flex-1 overflow-y-scroll scrollbar-thin noScrollbar max-w-full'>
            {chats.length > 0 ? (
                <div className='w-full flex flex-col py-2'>
                    {chats.map((message, index) => (
                        <Message key={index} message={message} chatId={chatid} setChats={setChats} onTyping={scrollToBottom}  />
                    ))}
                    {isLoading && (
                        <div className='p-4 text-muted animate-pulse'>
                            Thinking...
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            ) : (
                <div className='text-zinc-400 p-4 flex justify-center items-center w-full'>
                    {isLoading ? 'Loading...' : 'No conversation yet'}
                </div>
            )}
        </div>
    )
}

export default Chat