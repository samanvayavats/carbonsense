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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FieldInput() {

    const [avatar, setAvatar] = useState(null)
    const [defaultOption, setdefaultOption] = useState(true)

    const swapButton = () => {
        setdefaultOption(!defaultOption)
    }

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files?.[0] || null
        setAvatar(selectedFile)
    }

    const handleSubmit = () => {
        console.log("Avatar file:", avatar)
    }

    return (
        <div className="w-full flex justify-center ">
            <div className="w-full max-w-md mt-10">
                <FieldSet>
                <h1 className="text-2xl font-bold">Upload <label className="text-green-600">Image</label></h1>

                    <FieldGroup>
                        <RadioGroup defaultValue="Post-In-Community">
                            <div className="flex items-center space-x-2" >
                                <RadioGroupItem value="Post-In-Community" id="Post-In-Community" onClick={swapButton} />
                                <Label htmlFor="Post-In-Community">Post-In-Community</Label>
                            </div>
                            <div className="flex items-center space-x-2" >
                                <RadioGroupItem value="Post-Personally" id="Post-Personally" onClick={swapButton} />
                                <Label htmlFor="Post-Personally">Post-Personally</Label>
                            </div>
                        </RadioGroup>
                        {defaultOption && <Field>
                            <FieldLabel htmlFor="Communityname">Community-Name</FieldLabel>
                            <Input id="Communityname" type="text" className="placeholder:text-green-600" placeholder="Go Green" />
                        </Field>
                        }
                        <Field>
                            <FieldLabel htmlFor="caption" >Caption</FieldLabel>
                            <Textarea id="caption" className="placeholder:text-green-600" placeholder="Let your work inspire other" />
                        </Field>

                        <Field>

                            <FieldLabel htmlFor="avatar"  >Image</FieldLabel>
                            <Input
                                className="file:text-green-600 "
                                id="avatar"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Field>
                        {avatar && <Avatar>
                            <AvatarImage src={URL.createObjectURL(avatar)} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>}
                        <Button className="bg-green-600" onClick={handleSubmit}>Upload</Button>

                    </FieldGroup>
                </FieldSet>
            </div>
        </div>
    )
}
