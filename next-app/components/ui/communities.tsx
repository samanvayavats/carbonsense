import React from 'react'
import CommunityUserAvatar from './community-user-avatar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const communities = () => {
    return (
        <div className='flex flex-col items-center h-auto  w-full mr-3  '>
            <Avatar className='size-40 mt-1'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className=' py-3 px-20 w-full items-center flex flex-col border-2 rounded-2xl my-1 border-green-600 '>
                <CardTitle className='text-2xl text-green-700'>community name </CardTitle>
                <CardHeader className='w-full  flex flex-col ' >
                    <CardDescription>Carbon emmisson : </CardDescription>
                    <CardDescription>Total member : </CardDescription>
                    <CardDescription>Created by : </CardDescription>
                </CardHeader>

                <CardFooter className='w-full  justify-between py-2 text-green-700'>
                    <CardTitle> <Button variant={'outline'}>expore more </Button></CardTitle>
                    <CardAction><CardTitle className='text-green-700'>
                        <Button variant={'outline'}>JOIN </Button></CardTitle></CardAction>
                </CardFooter>
            </div>

            <div className=' text-xl py-1.5 font-semibold text-green-700 px-20 w-full items-center flex flex-col border-2 rounded-2xl my-1 border-green-600'>Total Members</div>
            <div className=' w-full gap-1 flex flex-col '>
            <CommunityUserAvatar/>
            <CommunityUserAvatar/>
            <CommunityUserAvatar/>
            <CommunityUserAvatar/>
            <CommunityUserAvatar/>
            </div>
        
        </div>
    )
}

export default communities
