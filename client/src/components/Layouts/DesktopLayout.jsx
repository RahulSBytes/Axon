import React from 'react'
import Sidebar from "./Sidebar"
import Chat from './Chat'


function DesktopLayout() {
  return (
    <div className='bg-primary h-screen flex p-6'>
      <Sidebar/> 
      <Chat/>
      </div>
  )
}

export default DesktopLayout