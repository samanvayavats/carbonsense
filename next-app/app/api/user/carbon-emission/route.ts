import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// getting the carbon emission of the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session?.user?.id),
      },
    });

    return NextResponse.json(
      {
        message: "the carbon emission of the user found successfully ",
        carbonEmission: user?.carbonEmission,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message:
          "something went wrong in fetching the carbonEmission of the user ",
      },
      { status: 500 },
    );
  }
}
