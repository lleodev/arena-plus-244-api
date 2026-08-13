-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "refeshTokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_refeshTokenHash_key" ON "Session"("refeshTokenHash");

-- CreateIndex
CREATE INDEX "Session_userid_idx" ON "Session"("userid");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
