'use client'
import React from "react"
import Communities from "@/components/ui/communities"
const page = ({params}:{params:Promise<{ id: string }>})=>{
    const {id} = React.use(params)

    return <>
    {/* <p>this is the id of the community : {id}</p> */}
    <Communities/>
    </>
}

export default page