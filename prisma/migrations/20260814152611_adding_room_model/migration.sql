/*
  Warnings:

  - You are about to drop the column `owner` on the `Room` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "owner",
ADD COLUMN     "userid" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Room_userid_idx" ON "Room"("userid");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
