import { SendHorizonal } from 'lucide-react';
import React from 'react'

function Cards({ prompts = [] }) {
    const handleClick = () => {

    }
    return (
        <>
            {prompts.map((prompt) => <div key={Math.random()} className=' p-2 flex bg-primary rounded-md w-1/3'>
                <span className='text-sm line-clamp-2'>{prompt}</span>
                <button onClick={() => handleClick(prompt)} className=' flex items-end px-1' ><SendHorizonal size={16} /></button>
            </div>)}
        </>
    );
}

export default Cards