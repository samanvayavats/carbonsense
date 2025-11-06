import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, email, password, avatar } = await req.json();

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

    // hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // creating the new user
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        avatar: avatar,
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
