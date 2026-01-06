"use client"

import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"

const AiAndGroupChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 2, sender: "user", text: "Build a chat interface" },
    { id: 10, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 20, sender: "user", text: "Build a chat interface" },
    { id: 144, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 24, sender: "user", text: "Build a chat interface" },
    { id: 14, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 25, sender: "user", text: "Build a chat interface" },
    { id: 17, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 22, sender: "user", text: "Build a chat interface" },
    { id: 13, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 29, sender: "user", text: "Build a chat interface" },
    { id: 178, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 255, sender: "user", text: "Build a chat interface" },
    { id: 101, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 201, sender: "user", text: "Build a chat interface" },
    { id: 144, sender: "ai", text: "Hello 👋 How can I help you?" },
    { id: 42, sender: "user", text: "Build a chat interface" },
  ])

  return (
    <div className="flex flex-col h-screen w-full bg-background">

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
            <div
            key={msg.id}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-sm
                ${msg.sender === "user"
                    ? "mr-auto bg-green-600 text-primary-foreground"
                    : "mr-auto bg-muted text-foreground"}
                    `}
                    >
              <p className="font-medium ">{msg.sender.toUpperCase()}</p>
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="border-t bg-background p-4 mb-10">
        <div className="mx-auto w-full max-w-2xl">
          <InputGroup>
            <TextareaAutosize
              minRows={1}
              maxRows={5}
              placeholder="Type your message..."
              className="w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-sm outline-none"
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton size="sm" className="text-green-600">Send</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

    </div>
  )
}

export default AiAndGroupChat
