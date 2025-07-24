import ChatView from '@/components/custom/ChatView'
import CodeView from '@/components/custom/CodeView'
import React from 'react'

const workspace = () => {
  return (
    <div className='p-3 mt-3 pr-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-14'>
        <ChatView/>
        <div className='col-span-2'>
        <CodeView/>

        </div>
      </div>
    </div>
  )
}

export default workspace
