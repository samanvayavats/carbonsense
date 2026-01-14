import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const community = await prisma.communities.findMany();


    return NextResponse.json({
      message: "all the community fetched succefully",
      community: community
    }, { status: 200 })

  } catch (error) {

    console.log("the error at the time of creating the community is : ", error);

    return NextResponse.json(
      {
        message: "community not created please try agian later",
      },
      { status: 500 },
    );

  }

}