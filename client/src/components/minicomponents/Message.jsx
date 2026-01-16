import { Clipboard, Dot, FileText, GhostIcon, Star, Volume2 } from 'lucide-react';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import moment from 'moment';


function Message({ message }) {
    const { message_id, role, content, model, tokens, created_at } = message

    if (message.role == "user") {
        return <div className={`max-w-[60%] bg-zinc-100 rounded-sm p-2 self-end mt-2`}>
            <div className='flex text-xs items-center font-medium text-zinc-500'>
                <span className='text-zinc-800'> Me </span>  <Dot className='' /> {moment(created_at).fromNow()}
            </div>
            <div key={message_id} className={` flex  flex-col text-textcolor`}>
                <ReactMarkdown >{message.content}</ReactMarkdown>
            </div>
        </div>
    } else {
        return (
            <div className={`max-w-[60%]  rounded-sm p-2 self-start`}>
                <div className='flex text-xs items-center font-medium text-zinc-500'>
                    <span className='text-zinc-800 flex text-base items-center gap-1'> <GhostIcon size={18}/> Axon </span>  <Dot className='' /> {moment(created_at).fromNow()}
                </div>
                <div key={message_id} className={` flex  flex-col my-1  text-zinc-800`}>
                    <ReactMarkdown >{message.content}</ReactMarkdown>
                </div>
                <div className='flex gap-2 mt-2'>
                    <Clipboard size={18} className='text-muted hover:scale-[0.94]' />
                    <FileText  size={18} className='text-muted hover:scale-[0.94]' />
                    <Volume2 fill="currentColor" size={18} className='text-muted hover:scale-[0.94]' />
                    <Star fill="currentColor" size={18} className='text-muted hover:scale-[0.94]' />
                </div>
            </div>
        )
    }
}

export default Message