/*
  Warnings:

  - You are about to drop the column `avatarPublicId` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Communities" ADD COLUMN     "CommunityAvatarPublicId" TEXT;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "avatarPublicId",
ADD COLUMN     "imagePublicId" TEXT;
