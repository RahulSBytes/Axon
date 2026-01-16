import { Cross, X } from 'lucide-react'
import React from 'react'

function TopicPopUp({ setIsNewTopicOpen }) {
    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-white/30 backdrop-blur-sm rounded-sm"
            style={{ zIndex: 9999 }}
        >
            <div className="h-fit py-5  w-2/3 bg-white shadow-lg rounded-md  items-center justify-center flex flex-col gap-3">
                <X onClick={() => setIsNewTopicOpen(false)} size={19} className='self-end mr-5 rounded-full hover:bg-zinc-200' />
                <h3 className='text-xl text-zinc-800'>What's the topic on your mind?</h3>
                <form action="" method='post' className='flex flex-col  w-full items-center gap-4'>
                    <input type="text" className='w-3/4 py-2 px-3 outline-none bg-primary text-center' />
                    <div className='flex gap-4'>
                        <button onClick={() => setIsNewTopicOpen(false)} type="button" className='border border-zinc-600 px-3 rounded-sm hover:bg-zinc-100'>Cancel</button>
                        <button type="submit" className='bg-muted text-white px-3 rounded-sm hover:bg-zinc-600'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TopicPopUp
