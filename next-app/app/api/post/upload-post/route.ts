import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadStreamToCloudinary } from "@/lib/uploadoncloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {

    try {
        const session = await getServerSession(authOptions);
        
            if (!session) {
              return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 },
              );
            }


        const form = await req.formData()
        const communityName = form.get('communityName') as string
        const communityId = form.get('communityId')
        const imageCaption = form.get('imageCaption') as string
        const post = form.get('post') as File

        if (!post ) {
            return NextResponse.json({
                message: "all the fields are required "
            }, { status: 401 })
        }

        const imageBuffer = Buffer.from(await (post as Blob).arrayBuffer())
        const uploadImage = await uploadStreamToCloudinary(imageBuffer)

        const uploadedPost = await prisma.posts.create({
            data: {
                communityName: communityName || '',
                communityId: Number(communityId),
                ownerId: Number(session?.user?.id),
                postedBy: session?.user?.name,
                imageUrl: uploadImage.url,
                imagePublicId: uploadImage.public_id,
                imageCaption: imageCaption || '',
            }
        })

        if (!uploadedPost) {
            return NextResponse.json({
            message: "post upload failed"
        }, { status: 500 })
        }

        return NextResponse.json({
                message: "post uploaded successfully !!!",
                uploadedPost: uploadedPost
            }, { status: 200 })
            
    } catch (error) {

        console.log('the error at the time of uploading the image is : ', error)

        return NextResponse.json({
            message: "post upload failed"
        }, { status: 500 })

    }

}