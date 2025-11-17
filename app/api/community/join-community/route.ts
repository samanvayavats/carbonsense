import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const communityId = req.nextUrl.searchParams.get("communityId");
    console.log("the community id is ", communityId);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    if (!communityId) {
      return NextResponse.json(
        { message: "communityId is required" },
        { status: 401 },
      );
    }

    // const isExits = await prisma.participants.findFirst({
    //   where: {
    //     participantsUserId: Number(session?.user?.id),
    //   },
    // });

    // if (isExits) {
    //   return NextResponse.json(
    //     { message: "You are already there in the community" },
    //     { status: 401 },
    //   );
    // }

    const community = await prisma.communities.findFirst({
      where: {
        id: Number(communityId),
      },
      select: {
        communityName: true,
      },
    });

    if (!community) {
      return NextResponse.json(
        { message: "Invalid community" },
        { status: 401 },
      );
    }

    const participant = await prisma.participants.create({
      data: {
        participantName: session?.user?.name,
        communityName: community?.communityName,
        communityId: Number(communityId),
        participantsUserId: Number(session?.user?.id),
      },
    });

    if (!participant) {
      return NextResponse.json(
        {
          message: "participation failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "participation Success",
        participant: participant,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("the error at the time of the participantion is : ", error);

    return NextResponse.json(
      {
        message: "participation failed",
      },
      { status: 500 },
    );
  }
}
