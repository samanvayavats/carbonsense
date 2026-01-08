import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const cardforthepost = () => {
    return (
        <div className='border-2 rounded-md p-2 w-80 ' >
            <div className='flex flex-wrap items-center border-b-2 p-1 '>
                <Avatar className='size-9 '>
                    <AvatarImage  src="https://github.com/evilrabbit.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='pl-1 font-semibold text-green-600 '>username</h1>
            </div>
            <p className='text-left pb-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus non in, aliquam velit magnam fugiat itaque ipsam soluta neque dolorum rerum.</p>
            <img src="https://github.com/evilrabbit.png" alt="console.error();
            " />
        </div>
    )
}

export default cardforthepost
