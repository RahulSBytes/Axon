import { useOutletContext, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import Message from '../minicomponents/Message.jsx';
import toast from 'react-hot-toast';
import MiniLoader from '../minicomponents/MiniLoader.jsx';

function Chat() {

    const { chatid } = useParams()
    const location = useLocation()
    const { initialMessage } = location.state || {}
    const bottomRef = useRef(null)
    const lastScrollTime = useRef(0);
    const navigate = useNavigate()




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
            toast.error("Error fetching chat")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setChats([]);

        if (initialMessage) {
            sendMessage(chatid, initialMessage);
            navigate(location.pathname, { replace: true, state: {} });
        } else {
            fetchChat();
        }
    }, [chatid]);

    const scrollToBottom = useCallback(() => {
        const now = Date.now();
        if (now - lastScrollTime.current > 100) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            lastScrollTime.current = now;
        }
    }, []);


    return (
        <div id="pdf-printable" className='flex flex-1 overflow-y-scroll px-4 md:px-0 scrollbar-thin noScrollbar max-w-full'>
            {chats.length > 0 ? (
                <div className='w-full flex flex-col py-2'>
                    {chats.map((message, index) => (
                        <Message key={index} message={message} chatId={chatid} setChats={setChats} onTyping={scrollToBottom} />
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
                    {isLoading ? "" : 'No conversation yet'}
                </div>
            )}
        </div>
    )
}

export default Chat