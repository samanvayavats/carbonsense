import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { uploadStreamToCloudinary } from "@/lib/uploadoncloudinary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const body = await req.formData();

    const communityName = body.get("communityName") as string;
    const communityAvatar = body.get("communityAvatar");

    if (!communityAvatar || !communityName) {
      return NextResponse.json(
        {
          message: "all the fields are required",
        },
        { status: 401 },
      );
    }

    const communityAvatarBuffer = Buffer.from(
      await (communityAvatar as Blob).arrayBuffer(),
    );

    const cloudinaryReponse = await uploadStreamToCloudinary(
      communityAvatarBuffer,
    );

    if (!cloudinaryReponse) {
      return NextResponse.json(
        {
          message: "not able to upload the communityAvatar right now",
        },
        { status: 500 },
      );
    }

    const community = await prisma.communities.create({
      data: {
        communityOwnerName: session?.user?.name,
        communityOwnerId: Number(session?.user?.id),
        communityName: communityName,
        communityAvatar: cloudinaryReponse?.secure_url,
        CommunityAvatarPublicId: cloudinaryReponse?.public_id,
      },
    });

    if (!community) {
      return NextResponse.json(
        {
          message: "community not created please try agian later",
        },
        { status: 500 },
      );
    }

    const participant = await prisma.participants.create({
      data: {
        participantName: session?.user?.name,
        communityName: communityName,
        communityId: Number(community?.id),
        participantsUserId: Number(session?.user?.id),
      },
    });

    if (!participant) {
      return NextResponse.json(
        {
          message:
            "community not created please try agian later or participation failed",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: " community has been created successfully",
        community: community,
        participant: participant,
      },
      { status: 200 },
    );
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
