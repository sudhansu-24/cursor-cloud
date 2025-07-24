"use client"
import { MessagesContext } from "@/context/MessagesContext";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { api } from '@/convex/_generated/api';
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";







const CodeView = () => {
  const {id} = useParams();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILES);
  const {messages, setMessages} = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const[loading, setLoading] = useState(false);
  const UpdateTokens=useMutation(api.users.UpdateToken);

  useEffect(() => {

    id&&GetFiles();


  
  }, [id])
  
  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId:id

    });
    const mergedFiles={...Lookup.DEFAULT_FILES,...result?.fileData}
    setFiles(mergedFiles);
    setLoading(false);
  }

  useEffect(() => {
         if(messages?.length>0)
           {
             const role = messages[messages?.length-1].role;
             if(role=='user') 
               {
 
               GenerateAiCode();
             }
           }
     }, [messages])
  

  const GenerateAiCode = async () =>{
    setLoading(true);
    const PROMPT= JSON.stringify(messages)+ " " +Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code',{
      prompt:PROMPT
    });
    console.log(result.data);
    const aiResp=result.data;

    const mergedFiles={...Lookup.DEFAULT_FILES,...aiResp?.files}
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId:id,
      files:aiResp?.files

    });

     const token =Number(userDetail?.token)-Number(countToken(JSON.stringify(aiResp)));
          //update the token in Database
    
          await UpdateTokens({
            userId:userDetail?._id,
            token:token
          })


    setActiveTab('code');
    setLoading(false);
  }
  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border ">
        <div className="flex items-center flex-wrap shrink-0 justify-center rounded-full bg-black p-1 w-[140px] gap-3">
          <h2
          onClick={()=>setActiveTab('code')}
          className={`text-sm cursor-pointer ${activeTab=='code'&& 'text-red-500 bg-red-500 bg-opacity-25 p-1 px-2 rounded-full'} `}>Code</h2>
          <h2
          onClick={()=>setActiveTab('preview')}
          className={`text-sm cursor-pointer ${activeTab=='preview'&& 'text-red-500 bg-red-500 bg-opacity-25 p-1 px-2 rounded-full'} `}>Preview</h2>
          
        </div>
      </div>
      <div className="relative w-full">
        {loading || !files ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 rounded-lg" style={{height:'75vh'}}>
            <Loader2Icon className="animate-spin h-10 w-10 text-white mb-4" />
            <h2 className="text-white text-lg">Generating your files...</h2>
          </div>
        ) : null}
        {!loading && files && (
          <SandpackProvider
            files={files}
            template="react" theme={"dark"}
            customSetup={{
              dependencies:{...Lookup.DEPENDANCY}
            }}
            options={{
              externalResources:['https://cdn.tailwindcss.com']
            }}
          >
            <SandpackLayout >
              {activeTab=="code" ? <>
                <SandpackFileExplorer style={{height:'75vh' }}/>
                <SandpackCodeEditor style={{height:'75vh'}}/>
              </> :
              <>
                <SandpackPreview style={{height:'75vh'}} showNavigator={true}/>
              </>}
            </SandpackLayout>
          </SandpackProvider>
        )}
      </div>
    </div>
  )
}

export default CodeView
