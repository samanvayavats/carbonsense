-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_communityId_fkey";

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "communityName" DROP NOT NULL,
ALTER COLUMN "communityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Communities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
