'use client'

import { toast } from "sonner"
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import axios from "axios"

export default function FieldInput() {
      const { data: session, status } = useSession()

    const [avatar, setAvatar] = useState(null)
     const [communityName, setcommunityName] = useState('')
        // const [toast, settoast] = useState(false)
    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files?.[0] || null
        setAvatar(selectedFile)
    }

    const handleSubmit = async() => {
        // console.log("Avatar file:", avatar)
        try {
            const formData = new FormData()
            formData.append('communityName' ,communityName)
            formData.append('communityAvatar' , avatar || '')

            const data = await axios.post('http://localhost:3000/api/community/create-community' , formData)
            // if(data){
                toast.success("Event has been created.")
                console.log('the data after creating the community is ', data)
            // }

        } catch (error) {
            console.error('the error at the time of creating the community is ', error)
        }

    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-md mt-10">
                <FieldSet>
                    <FieldGroup>
                        <h1 className="text-2xl font-bold">Create <label className="text-green-600">Community {session?.user?.email}</label></h1>
                        <Field>
                            <FieldLabel htmlFor="community-name">Community-Name</FieldLabel>
                            <Input id="username" type="text" className= "placeholder:text-green-600" placeholder="Go-green" 
                            onChange={(e)=>{setcommunityName(e.target.value)}}
                            />
                        </Field>

                        <Field>
                            
                            <FieldLabel htmlFor="community-avatar"  >Community-Avatar</FieldLabel>
                            <Input
                                className= "file:text-green-600 "
                                id="avatar"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Field>
                           {avatar &&  <Avatar>
                                <AvatarImage src={URL.createObjectURL(avatar)} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>}
                        <Button className="bg-green-600" onClick={handleSubmit}>Create-Community</Button>

                    </FieldGroup>
                </FieldSet>
            </div>
        </div>
    )
}
