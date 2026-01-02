import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './button'
const communityUserAvatar = () => {
    return (
        <Button variant='outline' className='text-green-700 w-40 flex border-2 border-green-600 rounded-2xl py-1 items-center justify-between px-4 my-2 '>
            <Avatar className='size-12 '>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>UserName</div>
        </Button >
    )
}

export default communityUserAvatar
