"use client"

import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { useState, useEffect } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSideBar from '@/components/custom/AppSideBar'
import SignInDialog from './../components/custom/SignInDialog'


const Provider = ({children}) => {
    const [messages, setMessages] = useState();
    const [userDetail, setUserDetail] = useState();
    const [openDialog, setOpenDialog] = useState(false); // LIFTED STATE
    const convex = useConvex();

    useEffect(() => {
      isAuthenticated();
    }, [])

    const isAuthenticated= async()=>{
        if(typeof window !== "undefined")
        {
            const userStorage = localStorage.getItem('user');
            if (userStorage) {
                const user = JSON.parse(userStorage);
                if (user?.email) {
                    //fetch from the database
                    const result = await convex.query(api.users.GetUser, {email: user.email});
                    setUserDetail(result);
                    console.log(result);
                }
            }
        }
    }
  return (
    <div>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
        <UserDetailContext value={{userDetail, setUserDetail}}>
        <MessagesContext.Provider value={{messages, setMessages}}>
        <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        forcedTheme="dark"
        disableTransitionOnChange
        >
            <Header setOpenDialog={setOpenDialog}/>
            <SidebarProvider defaultOpen={false}>
              <AppSideBar/>
      {children}
            </SidebarProvider>
        </NextThemesProvider>
        <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
        </MessagesContext.Provider>
        </UserDetailContext>
        </GoogleOAuthProvider>
    </div>
  )
}

export default Provider
