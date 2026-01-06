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

                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input id="username" type="text" className= "placeholder:text-green-600" placeholder="samanvaya vats" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" className= "placeholder:text-green-600" placeholder="••••••••" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email" >Email</FieldLabel>
                            <Input id="email" type="email" className= "placeholder:text-green-600" placeholder="samanvaya@gmail.com" />
                        </Field>

                        <Field>
                            
                            <FieldLabel htmlFor="avatar"  >Avatar</FieldLabel>
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
                        <Button className="bg-green-600" onClick={handleSubmit}>Submit</Button>

                    </FieldGroup>
                </FieldSet>
            </div>
        </div>
    )
}
