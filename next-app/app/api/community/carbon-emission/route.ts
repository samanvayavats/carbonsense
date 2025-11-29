import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const communityId = Number(req.nextUrl.searchParams.get("communityId"));

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

    const totalParticipants = await prisma.participants.findMany({
      where: { communityId },
      include: {
        participantsUserConnection: {
          select: {
            name: true,
            carbonEmission: true,
            avatar: true
          }
        }
      }
    });

    let carbonEmission=0;

    totalParticipants.forEach(element => {
       let tempCarbonEmission = Number(element.participantsUserConnection.carbonEmission) 
       carbonEmission+=tempCarbonEmission
    });

    return NextResponse.json({
      message: "total carbonEmission is feched successfully ",
      carbonEmission: carbonEmission,
    });
  } catch (error) {
    console.log("the error at the time of total participantion is : ", error);

    return NextResponse.json(
      {
        message: "fetching total carbonEmission request failed",
      },
      { status: 500 },
    );
  }
}
