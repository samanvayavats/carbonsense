import React from 'react'
import Cardforthepost from '@/components/ui/cardforthepost'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const page = () => {
  return (
    <div className=' flex flex-col'>

      <div className='flex items-center p-1 rounded border-2 mt-1 mr-1 justify-center'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='p-1 text-green-700 font-bold text-xl '>
          <h1>samanavaya vats </h1>
          <h1>abc@gmail.com </h1>
        </div>
      </div>

      <div className='w-full h-full flex flex-wrap gap-12 justify-center mt-10'>
        <Cardforthepost />
        <Cardforthepost />
        <Cardforthepost />
        <Cardforthepost />
        <Cardforthepost />
        <Cardforthepost />
        <Cardforthepost />
      </div>
    </div>
  )
}

export default page
