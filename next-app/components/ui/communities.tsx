'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'
import CommunityUserAvatar from './community-user-avatar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './button'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CommunityType {
  id: number
  communityOwnerName: string
  totalCarbonEmission: number
  communityName: string
  communityAvatar: string
  CommunityAvatarPublicId?: string
  totalParticipants: number
  communityOwnerId: number
  createdAt?: string
  updatedAt?: string
}

const Communities = ({ id }: { id: string }) => {
  const [community, setCommunity] = useState<CommunityType | null>(null)

  const joinCommunityHandler = async()=>{
    try {
      const join = await axios.post(`http://localhost:3000/api/community/join-community?communityId=${id}`)
      console.log('the data after joining the community is : ' , join.data?.participant)
      if(join){
        toast.success("community joined successfully")
      }
    } catch (error) {
     console.log('the error at the time of joining the community is : ',error) 
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/community/current-community?communityId=${Number(id)}`
        )
        setCommunity(res.data?.community || null)
      } catch (error) {
        console.error('Error fetching community:', error)
      }
    }

    fetchData()
  }, [id])

  if (!community) {
    return <div className="text-green-700">Loading community...</div>
  }

  return (
    <div className="flex flex-col items-center w-full mr-3">

      <Avatar className="size-40 mt-1">
        <AvatarImage src={community.communityAvatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="py-3 px-20 w-full flex flex-col items-center border-2 rounded-2xl my-1 border-green-600">
        <CardTitle className="text-2xl text-green-700">
          {community.communityName.toUpperCase()}
        </CardTitle>

        <CardHeader className="w-full flex flex-col">
          <CardDescription>
            Carbon emission: {community.totalCarbonEmission}
          </CardDescription>
          <CardDescription>
            Total members: {community.totalParticipants}
          </CardDescription>
          <CardDescription>
            Created by: {community.communityOwnerName.toUpperCase()}
          </CardDescription>
        </CardHeader>

        <CardFooter className="w-full justify-between py-2">
          <Link href={`/explore-more/${id}`}>
            <Button variant="outline">Explore more</Button>
          </Link>

          <CardAction>
            <Button variant="outline" onClick={joinCommunityHandler}>JOIN</Button>
          </CardAction>

          <Link href={`/community-chats/${id}`}>
            <Button variant="outline">Chats</Button>
          </Link>
        </CardFooter>
      </div>

      <div className="text-xl py-1.5 font-semibold text-green-700 px-20 w-full flex justify-center border-2 rounded-2xl my-1 border-green-600">
        Total Members
      </div>

      <div className="w-full gap-1 flex flex-col">
        <CommunityUserAvatar />
        <CommunityUserAvatar />
        <CommunityUserAvatar />
      </div>

    </div>
  )
}

export default Communities
