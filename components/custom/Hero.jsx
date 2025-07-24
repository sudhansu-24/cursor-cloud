"use client"

import React, { useContext } from 'react'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import { useState } from 'react'
import Colors from '@/data/Colors'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import SignInDialog from './SignInDialog'
import { AnimatedBackground } from "@/components/animated-background"
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';




const Hero = () => {
    const [userInput, setUserInput] = useState('');
    const {messages, setMessages} = useContext(MessagesContext);
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false); // loading state for transition
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();
    
    const onGenerate = async (input)=>{
        if(!userDetail?.name)
            {
                setOpenDialog(true);
                return
            
        }
        setLoading(true); // Start loading overlay
        const msg = {
          role:'user',
          content:input
        }
        setMessages([msg]); // Always set as array!

        const workspaceId = await CreateWorkspace({
            user:userDetail._id,
            messages:[msg]
        });
        setTimeout(() => { // Give a short fade-out effect
          setLoading(false);
          router.push('/workspace/'+workspaceId);
        }, 500);
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full gap-2'>
        <AnimatedBackground />
        {/* Loading Overlay with Framer Motion */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80"
            >
              <svg className="animate-spin h-12 w-12 text-pink-500 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <h2 className="text-white text-2xl font-bold mb-2">Creating your workspace…</h2>
              <p className="text-gray-300">Please wait while we set things up for you.</p>
            </motion.div>
          )}
        </AnimatePresence>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-400 '>{Lookup.HERO_DESC}</p>
      <div className='p-3 border rounded-xl max-w-xl w-full mt-2'
      style={{backgroundColor:Colors.BACKGROUND}}
      >
      <div className='flex gap-2 mt-3'>
        <textarea
        onChange={(e)=>setUserInput(e.target.value)}
        className='outline-none w-full bg-transparent h-32 max-h-60 resize-none'
        placeholder='what you want to build'
        disabled={loading}
        />
        {userInput && <ArrowRight
        onClick={()=>!loading && onGenerate(userInput)}
        className={`bg-pink-500 p-2 h-10 w-10 rounded-md cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}/>} 
      </div>
      <div>
        <Link className='h-7 w-6'/>
      </div>
        </div>
        <div className='flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3'>
            {Lookup?.SUGGESTIONS.map((suggestion, index)=>(
                    <h2
                    onClick={()=>!loading && onGenerate(suggestion)}
                    className={`p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    key={index}>{suggestion}</h2>
            ))}
        </div>
        <SignInDialog
        openDialog={openDialog} closeDialog={(v)=>setOpenDialog(v)}
        />
    </div>
  )
}

export default Hero
