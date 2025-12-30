import React from 'react'
import { Search } from 'lucide-react';
const community = () => {
    return (
        <div className=' w-full  flex items-center justify-center rounded-xs '>
            <div className=' rounded-sm pr-1 border-2 border-green-600 flex justify-end items-center' >
                <input
                    className='  px-8 py-0.5 border-green-600 '
                    type="text"
                    placeholder='Search communities'
                />
                <Search
                    className='text-green-600 '
                />
            </div>
        </div>
    )
}

export default community
