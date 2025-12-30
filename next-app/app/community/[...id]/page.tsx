'use client'
import React from "react"
const page = ({params}:{params:Promise<{ id: string }>})=>{
    const {id} = React.use(params)

    return <>
    <p>this is the id of the community : {id}</p>
    </>
}

export default page