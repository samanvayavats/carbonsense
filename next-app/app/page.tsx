'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Frontpage from '@/components/ui/frontpage'
import Community from '@/components/ui/community'
import CommunityCard from '@/components/ui/community-card'
import PaginationDemo from '@/components/ui/community-pagination'

interface CommunityType {
  id: number
  communityOwnerName: string
  totalCarbonEmission: number,
  communityName: string
  communityAvatar: string
  CommunityAvatarPublicId?: string
  totalParticipants: number
  communityOwnerId: number
  createdAt?: string
  updatedAt?: string
}

const Page = () => {
  const [communities, setCommunities] = useState<CommunityType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/community/all-communities'
        )
        setCommunities(res.data?.community || [])
      } catch (error) {
        console.error('Error fetching communities:', error)
      }
    }

    fetchData()
  }, [communities])

if (!communities) {
    return <div className="text-green-700">Loading community...</div>
  }

  return (
    <div className='flex flex-col w-full h-full '>
    <Frontpage/>
    <Community/>
    <CommunityCard communities={communities}/>
    <PaginationDemo/>
    </div>
  )
}

export default Page
//  id :Math.random(),
//         CardTitle : "CarbonKills",
//         cardDescription :45,
//         cardCarbon : '4000kg'