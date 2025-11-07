-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "avatarPublicId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarPublicId" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
