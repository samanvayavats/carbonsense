import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
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

    const isCommunityExits = await prisma.communities.findUnique({
      where: {
        id: Number(communityId),
      },
    });

    if (!isCommunityExits) {
      return NextResponse.json(
        { message: "community does not exits" },
        { status: 401 },
      );
    }

    const participant = await prisma.participants.deleteMany({
      where: {
        communityId: Number(communityId),
      },
    });

    const community = await prisma.communities.delete({
      where: {
        id: Number(communityId),
      },
    });

    return NextResponse.json(
      {
        message: "the community has been deleted",
        participant: participant,
        community: community,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("the error at the time of deleting the community is : ", error);
    return NextResponse.json(
      { message: "something went wrong at the time of deleting the community" },
      { status: 500 },
    );
  }
}
