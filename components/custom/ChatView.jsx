"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api';
import { useContext } from 'react';
import { MessagesContext } from '@/context/MessagesContext';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Image from 'next/image';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import { AnimatedBackground } from '../animated-background';
import ReactMarkdown from 'react-markdown';
import { useSidebar } from '../ui/sidebar';


export const countToken = (inputText) => {
  return inputText.trim().split(/\s+/).filter(word => word).length;
};







const ChatView = () => {
    const {id} = useParams();
    const convex= useConvex();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    const{messages, setMessages} = useContext(MessagesContext);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const UpdateMessages=useMutation(api.workspace.UpdateMessages);
    const {toggleSidebar}= useSidebar();
    const UpdateTokens = useMutation(api.users.UpdateToken);

    useEffect(() => {
        id&&GetWorkspaceData();
    }, [id])


    /**
     * used to gett workspace data using workspace ID
     */
    const GetWorkspaceData=async()=>{
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId:id
        });
        setMessages(result?.messages);
        console.log(result);
        
    }

    useEffect(() => {
        if(messages?.length>0)
          {
            const role = messages[messages?.length-1].role;
            if(role=='user')  {

              GetAiResponse();
            }
          }
    }, [messages])

    const GetAiResponse=async()=>{
      setLoading(true);
      const PROMPT = JSON.stringify(messages)+Prompt.CHAT_PROMPT;
      const result = await axios.post('/api/ai-chat', {
        prompt:PROMPT
      });
      
      const aiResp= {
        role:'ai',
        content:result.data.result
      }
      setMessages(prev=>[...prev,aiResp]);



      await UpdateMessages({
        messages:[...messages, aiResp],
        workspaceId:id 
      })
      
      const token =Number(userDetail?.token)-Number(countToken(JSON.stringify(aiResp)));
      //update the token in Database

      await UpdateTokens({
        userId:userDetail?._id,
        token:token
      })
      setLoading(false);

    }

    const onGenerate = (input) =>{
      setMessages(prev=>[...prev, {
          role:'user',
          content:input
      }])
      setUserInput('');
    }
  return (
    <div className='relative h-[80vh] flex flex-col'>
      <AnimatedBackground />
      <div className='flex-1 overflow-y-scroll scrollbar-hide px-5'>
        {Array.isArray(messages)
          ? messages.map((msg, index) => (
              <div key={index} className='p-3 flex gap-2 leading-7 items-center rounded-lg mb-3 bg-[#222222]'>
                {msg?.role=='user' && <Image
                  src={userDetail?.picture}
                  alt='user'
                  width={35}
                  height={35}
                  className='rounded-full'
                />}
                <ReactMarkdown className='flex flex-col'>{msg.content}</ReactMarkdown>
              </div>
            ))
          : null
        }
        {loading && <div className='flex rounded-lg mb-2 p-3 gap-2 items-center bg-[#222222]' >
                  <Loader2Icon
                  className='animate-spin'
                  />
                  <h2>Generating response...</h2>
                </div>
                }
                
      </div>
      {/* Input Section */}
      <div className='flex gap-2 items-end'>
       {userDetail && <Image
        src={userDetail?.picture}
        alt='user'
        width={40}
        height={40}
        className='rounded-full cursor-pointer'
        onClick={toggleSidebar}
        />}
        
      <div className='p-5 border rounded-xl max-w-xl w-full mt-2'
      style={{backgroundColor:Colors.BACKGROUND}}
      
      >

      <div className='flex gap-2 mt-3'>
        <textarea value={userInput}
        onChange={(e)=>setUserInput(e.target.value)}
        className='outline-none w-full bg-transparent h-32 max-h-60 resize-none'
        placeholder='what you want to build'/>
        {userInput && <ArrowRight
        onClick={()=>onGenerate(userInput)}
        className='bg-pink-500 p-2 h-10 w-10 rounded-md cursor-pointer'/>}
      </div>

      <div>
        <Link className='h-7 w-6'/>
      </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default ChatView
