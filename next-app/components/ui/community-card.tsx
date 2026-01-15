import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
const communityCard = ({communities}:{communities:any}) => {
 
   
    return (
       <div>
        {
             communities.map((i:any)=>{
                return <Card key={i.id} className='m-6'>
            <CardHeader>
                <CardTitle>{i.communityName}</CardTitle>
                <CardDescription>{i.totalCarbonEmission}</CardDescription>
                <p>{i.totalParticipants}</p>
                   <Link href={`/community/${i.id}`}><Button className='py-4 px-20 text-green-700' variant={'outline'} > Explore</Button></Link>
            <CardContent>
            </CardContent>
                <CardAction><Avatar>
                    <AvatarImage src={i.communityAvatar} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </CardAction>
            </CardHeader>
        </Card>
            })
        }
       </div>
    )
}

export default communityCard
