'use client'
import axios from 'axios'
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

    const [avatar, setAvatar] = useState<File | null>(null)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files?.[0] || null
        setAvatar(selectedFile)
    }

    const handleSubmit = async() => {
        try {
             const formdata = new FormData()
                formdata.append('name' , name)
                formdata.append('email' , email)
                formdata.append('password' , password)
                formdata.append('avatar' , avatar || '')

                const data = await axios.post('http://localhost:3000/api/user/sign-up' , formdata);
                
                // if(data){
                    console.log('the response from the backend is')
                

        } catch (error) {
            
            console.error('something went wrong at the time of the signup' , error)
            
        }
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-md mt-10">
                <FieldSet>
                    <FieldGroup>

                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input id="username" type="text" className= "placeholder:text-green-600" placeholder="samanvaya vats" onChange={(e)=>{setname(e.target.value)}}/>
                        </Field>

                            <Field>
                                <FieldLabel htmlFor="email" >Email</FieldLabel>
                                <Input id="email" type="email" className= "placeholder:text-green-600" placeholder="samanvaya@gmail.com" onChange={(e)=>{setemail(e.target.value)}} />
                            </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" className= "placeholder:text-green-600" placeholder="••••••••" onChange={(e)=>{setpassword(e.target.value)}}/>
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
