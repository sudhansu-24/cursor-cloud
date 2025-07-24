import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailContext } from '@/context/UserDetailContext';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import uuid4 from 'uuid4';
  

const SignInDialog = ({openDialog,closeDialog}) => {

  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const CreateUser=useMutation(api.users.CreateUser);


  
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer'+tokenResponse?.access_token } },
    );

    console.log(userInfo);
    const user = userInfo.data;
    await CreateUser({
      name: user?.name,
      email: user?.email,
      picture: user?.picture,
      uid: uuid4(),
    })

    if(typeof window !== undefined)
    {
      localStorage.setItem('user', JSON.stringify(user));
    }


    setUserDetail(userInfo?.data);

    //save this inside the database
    closeDialog(false);
  },
  onError: errorResponse => console.log(errorResponse),
});


  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription>
        <div  className='flex items-center justify-center flex-col gap-3'>

        <h2 className='font-bold text-white text-2xl text-center'>Sign in to get started with CursorCloud Latest</h2>

        <p className='mt-2 text-center'>To use CursorCloud you must log into an existing account or create one</p>

        <Button className='bg-purple-500 hover:bg-purple-400 mt-2 text-white' onClick={googleLogin}>Sign In With Google</Button>
        <p>By using CursorCloud, you consent to the collection of usage data to enhance performance and user experience.</p>
      
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default SignInDialog
