
import React from 'react'
import Cardforthepost from '@/components/ui/cardforthepost'
const page = ({params}:{params:Promise<{id : string}>}) => {
    const {id} = React.use(params)
  return (
    <div className='w-full  text-center'>
        <h1 className='mt-4 font-mono  text-5xl'>Community <label className='text-green-600' >Name</label> </h1>
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
