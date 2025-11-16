import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { uploadStreamToCloudinary } from "@/lib/uploadoncloudinary";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.formData();
    const name = body.get("name") as string;
    const email = body.get("email") as string;
    const password = body.get("password") as string;
    const avatar = body.get("avatar");

    if (!name || !email || !password || !avatar) {
      return NextResponse.json(
        { message: "all the field is required" },
        { status: 401 },
      );
    }

    const isExits = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    // checking that user is not there
    if (isExits) {
      return NextResponse.json(
        { message: "user already exits" },
        { status: 409 },
      );
    }

    // uploading on cloudinary
    const imageBuffer = Buffer.from(await (avatar as Blob).arrayBuffer());
    const storedImageOnCloudinary = await uploadStreamToCloudinary(imageBuffer);

    if (!storedImageOnCloudinary) {
      return NextResponse.json(
        { message: "something went wrong on uploading the media" },
        { status: 409 },
      );
    }

    const avatarFromCloudinary = storedImageOnCloudinary?.secure_url as string;

    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // creating the new user
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        avatar: avatarFromCloudinary,
        avatarPublicId: storedImageOnCloudinary?.public_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(
      { message: "user sign-up done", user: user },
      { status: 200 },
    );
  } catch (error) {
    console.log("the error while doing the sign-up : ", error);
    return NextResponse.json(
      { message: "something went wrong at time of sign-up" },
      { status: 500 },
    );
  }
}
