import React, { useContext } from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';



const Header = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div className='p-4 w-full flex flex-col items-center'>
      
      <Link href='/'>
        <div className="logo font-bold text-2xl text-white text-center">
          CursorCloud
        </div>
      </Link>
      {!userDetail?.name && (
        <div className='flex gap-5 mt-2 justify-center'>
          <Button variant='ghost'>Sign In</Button>
          <Button className='text-white bg-pink-700'>Get Started</Button>
        </div>
      )}
    </div>
  )
}

export default Header
