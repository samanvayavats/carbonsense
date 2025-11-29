import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import chatWithAi from "@/lib/aichat";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// getting all the ai and the user chats
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const user = await prisma.aiChats.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });

    return NextResponse.json({
      message: "all the chats fetched !!!",
      chats: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "something went wrong at the time of fetching the chats ",
      },
      { status: 500 },
    );
  }
}

// chat with the ai and updating the carbonEmission
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // checking for the session
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { chatFromUser } = await req.json();
    if (!chatFromUser) {
      return NextResponse.json(
        { message: "Input is required" },
        { status: 400 },
      );
    }

    // making the call to the ai
    const aiResponse = await chatWithAi(chatFromUser);

    // making the string more simple for parsing
    const response = aiResponse
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      // parsing the reponse from the ai
      const parseResponse = JSON.parse(response);

      // storing the chat of ai and the user in the db
      const storeReponseInTheDb = await prisma.aiChats.create({
        data: {
          userId: Number(session?.user?.id),
          chatFromUser: chatFromUser,
          aiResponse: parseResponse?.chat,
        },
      });

      // finding the user from the oldCarbonEmission
      const user = await prisma.user.findUnique({
        where: {
          id: Number(session?.user?.id),
        },
      });

      // calculating the new carbonEmission
      const oldCarbonEmission = Number(user?.carbonEmission);

      const carbonEmission = Number(parseResponse?.carbonEmission) || 0;

      const NewCarbonEmission = oldCarbonEmission + carbonEmission;

      // updating the new carbonEmission
      const updateTheCarbonEmission = await prisma.user.update({
        where: {
          id: Number(session?.user?.id),
        },
        data: {
          carbonEmission: JSON.stringify(NewCarbonEmission),
        },
      });

      if (!updateTheCarbonEmission) {
        return NextResponse.json(
          {
            message: "something went wrong on updating the carbonEmission ",
          },
          { status: 500 },
        );
      }

      if (!storeReponseInTheDb) {
        return NextResponse.json(
          {
            message: "something went wrong while saving the chats ",
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          message: "Reposne form ai",
          response: parseResponse,
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "something went wrong !!! please send the message again",
          response: {
            chat: "please message again",
            carbonEmission: 0,
          },
        },
        {
          status: 408,
        },
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error  for chating with the ai " },
      { status: 500 },
    );
  }
}
