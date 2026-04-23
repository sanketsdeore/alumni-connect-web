-- CreateTable
CREATE TABLE "DonationProject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "DonationProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationProject" ADD CONSTRAINT "DonationProject_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "DonationProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
