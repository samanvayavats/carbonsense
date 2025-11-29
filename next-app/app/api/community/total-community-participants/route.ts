import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const communityId = req.nextUrl.searchParams.get("communityId");

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

    const totalParticipants = await prisma.participants.count({
      where: {
        communityId: Number(communityId),
      },
    });

    return NextResponse.json({
      message: "the totalParticipants are feched successfully ",
      totalParticipants: totalParticipants,
    });
  } catch (error) {
    console.log("the error at the time of total participantion is : ", error);

    return NextResponse.json(
      {
        message: "total participantion request failed",
      },
      { status: 500 },
    );
  }
}
