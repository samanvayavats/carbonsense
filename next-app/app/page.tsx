import React from 'react'
import Frontpage from '@/components/ui/frontpage'
import Community from '@/components/ui/community'
import CommunityCard from '@/components/ui/community-card'
import PaginationDemo from '@/components/ui/community-pagination'
const page = () => {
  return (
    <div className='flex flex-col w-full h-full '>
    <Frontpage/>
    <Community/>
    <CommunityCard/>
    <PaginationDemo/>
    </div>
  )
}

export default page
