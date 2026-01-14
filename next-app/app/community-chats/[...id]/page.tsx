import React from 'react'

import Aiandgroupchat from '@/components/ui/aiandgroupchat'
const page = ({params} : {params : Promise<{id : string}>}) => {
    const {id} = React.use(params)
  return (
    <div className='w-full'>
      this is the Community chat for the id : {id}
         <Aiandgroupchat/>
    </div>
  )
}

export default page
