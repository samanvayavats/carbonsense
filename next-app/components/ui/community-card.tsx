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
const communityCard = () => {
 
    const cardData = [{
        id :Math.random(),
        CardTitle : "CarbonKills",
        cardDescription :45,
        cardCarbon : '4000kg'
    },
    {
        id :Math.random(),
        CardTitle : "CarbonKills",
        cardDescription :45,
        cardCarbon : '4000kg'
    },
    {
        id :Math.random(),
        CardTitle : "CarbonKills",
        cardDescription :45,
        cardCarbon : '4000kg'
    },
    {
        id :Math.random(),
        CardTitle : "CarbonKills",
        cardDescription :45,
        cardCarbon : '4000kg'
    },
    {
        id :Math.random(),
        CardTitle : "CarbonKills",
        cardDescription :45,
        cardCarbon : '4000kg'
    },
    ]
    
    return (
       <div>
        {
             cardData.map((i)=>{
                return <Card key={i.id} className='m-6'>
            <CardHeader>
                <CardTitle>{i.CardTitle}</CardTitle>
                <CardDescription>{i.cardCarbon}</CardDescription>
                <p>{i.cardDescription}</p>
                   <Link href={`/community/${i.id}`}><Button className='py-4 px-20 text-green-700' variant={'outline'} > Explore</Button></Link>
            <CardContent>
            </CardContent>
                <CardAction><Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
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
