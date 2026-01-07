'use client'

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

export default function FieldInput() {

    const [avatar, setAvatar] = useState(null)

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files?.[0] || null
        setAvatar(selectedFile)
    }

    const handleSubmit = () => {
        console.log("Avatar file:", avatar)
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-md mt-10">
                <FieldSet>
                    <FieldGroup>
                        <h1 className="text-2xl font-bold">Create <label className="text-green-600">Community</label></h1>
                        <Field>
                            <FieldLabel htmlFor="community-name">Community-Name</FieldLabel>
                            <Input id="username" type="text" className= "placeholder:text-green-600" placeholder="Go-green" />
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
